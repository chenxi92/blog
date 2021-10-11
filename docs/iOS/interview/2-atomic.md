#### 原子操作

`atomic` 与 `nonatomicd` 的主要区别就是系统自动生成的 `getter` / `setter` 方法不一样

* `atomic` 系统自动生成的 `getter` / `setter` 方法会进行加锁操作（**自旋锁**）
* `nonatomic`系统自动生成的 `getter` / `setter` 方法不会进行加锁操作


```
@synthesize name = _name;
- (void)setName:(NSString *)name {
    @synchronized(self) {
    _name = [name copy];
    }
}

- (NSString *)name {
    @synchronized(self) {
        return _name;
    }
}
```

上面代码实现了和 `atomic` 相同的功能，但是底层的工作方式还是有区别的。我们常常用 `@synchronized` 来加锁，这种锁是**互斥锁**。而 `atomic` 修饰的属性自带了一把**自旋锁**。

**互斥锁和自旋锁的区别：**

| 锁名   | 作用                                                         |
| ------ | ------------------------------------------------------------ |
| 互斥锁 | 当某个资源被先进入的线程上了锁以后，其它后面进入的线程会进入`休眠状态`。<br>当锁释放后，进入休眠状态的线程变为`唤醒状态`。 |
| 自旋锁 | 当某个资源被先进入的线程上了锁以后，其它后进入的线程会开启一个`循环`，不断检查锁有没有释放，当锁释放后，退出循环开始访问资源，整个过程中后进入的线程一直保持`运行状态`。 |



#### 应用

`atomic` 只是保证了 `getter` 和 `setter` 存取方法的线程安全,并不能保证整个对象是线程安全的,因此在多线程编程时,线程安全还需要开发者自己来处理.

下面看一个简单的例子：

```
#import "ViewController.h"

@interface ViewController ()
@property (atomic, assign) NSInteger count;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.count = 0;
    
    NSThread *threadA = [[NSThread alloc] initWithTarget:self selector:@selector(doSomething) object:nil];
    [threadA start];
    
    NSThread *threadB = [[NSThread alloc] initWithTarget:self selector:@selector(doSomething) object:nil];
    [threadB start];
}

- (void)doSomething {
    for (NSInteger i = 0; i < 10; i++) {
        [NSThread sleepForTimeInterval:1.0];
        self.count++;
        NSLog(@"self.count = %@ %@", @(self.count), [NSThread currentThread]);
    }
}

@end
```

为了让异常情况出现的概率提高，加入一句 `[NSThread sleepForTimeInterval:1.0];`。

运行上面的代码，会发现打印的结果中，最后一条 `self.count` 的值往往是小于 20 的，在中间的某些打印日志中，会发现有些数字被重复打印的两次。

错误原因： 由于 atomic 仅仅能保证读写是线程安全的，而不是保证 `读` -> `+1` -> `写` ，这个整体是线程安全的。

线程安全的代码：

```
- (void)doSomething {
    for (NSInteger i = 0; i < 10; i++) {
        [NSThread sleepForTimeInterval:1.0];
        @synchronized (self) {
            self.count++;
        }
        NSLog(@"self.count = %@ %@", @(self.count), [NSThread currentThread]);
    }
}
```

|修饰符|优势|劣势|
|---|---|---|
|nonatomic | 执行效率高，性能好 | 不是线程安全的|
|atomic    | 线程安全，但是仅能保证写操作的线程安全 | 大幅降低执行效率|



#### 参考资料

1. [Objective-C 原子属性](http://liuduo.me/2018/02/08/objective-c-atomic/)

2. [从@property说起（三）atomic与多线程锁](https://segmentfault.com/a/1190000008808143)

3. [iOS中atomic和nonatomic区别及内部实现](https://juejin.im/post/5a31dc76f265da430c11d3ab)