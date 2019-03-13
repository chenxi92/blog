### <p align="center">iOS属性相关面试题</p>

#### 目录

- [1. @property中有哪些属性关键字?](#all-property-key-words)

- [2. @property的本质？](#property-essence)

- [3. 原子属性](#atomic)

- [4. copy的使用](#use-copy)

- [5. weak的使用](#use-weak)

#### 1. <a name="all-property-key-words"></a>`@property`中有哪些属性关键字?

- 原子性 -- `nonatomic`(非原子), `atomic`(原子)， 默认情况下是`atomic`;
- 读写权限 -- `readwrite`(读写), `readonly`(只读), 默认是`readwrite`;
- 内存管理 -- `assign`, `strong`, `weak`, `copy`, `unsafe_unretained`, 基本数据类型，默认关键字是`assign`, 普通Objective-C对象，默认是`strong`;

	- `unsafe_unretained`相当于`weak`；区别是，当weak引用的对象释放之后，会自动设置为nil，`unsafe_unretained `则不会
	
	- `weak`一般用来解决循环引用， 必须用于OC对象
	
	- `assign` 用于非OC对象
	
	- `copy` 制一份原来的内容
	
- 方法名 -- `setter`, `getter`; 默认自动合成存取器方法

##### 参考资料

[Properties Encapsulate an Object’s Values](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html#//apple_ref/doc/uid/TP40011210-CH5-SW4)


### 2. <a name="property-essence"></a>@property的本质？

“属性” (property)有两大概念：ivar（实例变量）、存取方法（access method ＝ getter + setter）。 @property的本质是:

```
@property = ivar + getter + setter;

```

常见问题：

1. **ivar、getter、setter 是如何生成并添加到这个类中的?**
	- 完成属性定义后，编译器会自动编写访问这些属性所需的方法，此过程叫做“**自动合成**”(autosynthesis)。需要强调的是，这个过程由编译器在**编译期**执行，所以编辑器里看不到这些“合成方法”(synthesized method)的源代码。除了生成方法代码 getter、setter 之外，编译器还要自动向类中添加适当类型的实例变量，并且在属性名前面加下划线，以此作为实例变量的名字。
	- 也可以在类的实现代码里通过 @synthesize 语法来指定实例变量的名字.
	
2. **@synthesize和@dynamic分别有什么作用？**
	- @property有两个对应的词，一个是 `@synthesize`，一个是 `@dynamic`。如果 @synthesize和 @dynamic都没写，那么默认的就是@syntheszie var = _var;
	- `@synthesize `的语义是如果你没有手动实现 setter 方法和 getter 方法，那么编译器会自动为你加上这两个方法。
	- `@dynamic` 告诉编译器：属性的 setter 与 getter 方法由用户自己实现，不自动生成。（当然对于 readonly 的属性只需提供 getter 即可）。假如一个属性被声明为 @dynamic var，然后你没有提供 @setter方法和 @getter 方法，编译的时候没问题，但是当程序运行到 instance.var = someVar，由于缺 setter 方法会导致程序崩溃；或者当运行到 someVar = var 时，由于缺 getter 方法同样会导致崩溃。编译时没问题，运行时才执行相应的方法，这就是所谓的动态绑定。
	
	
#### 3. <a name="atomic"></a>原子属性

`atomic`与`nonatomicd`的主要区别就是系统自动生成的`getter/setter`方法不一样

* `atomic`系统自动生成的`getter/setter`方法会进行加锁操作（**自旋锁**）
* `nonatomic`系统自动生成的`getter/setter`方法不会进行加锁操作


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

锁名 | 作用
--- | ---
互斥锁 | 当某个资源被先进入的线程上了锁以后，其它后面进入的线程会进入`休眠状态`。<br>当锁释放后，进入休眠状态的线程变为`唤醒状态`。
自旋锁 | 当某个资源被先进入的线程上了锁以后，其它后进入的线程会开启一个`循环`，不断检查锁有没有释放，当锁释放后，退出循环开始访问资源，整个过程中后进入的线程一直保持`运行状态`。

`atomic`只是保证了`getter`和`setter`存取方法的线程安全,并不能保证整个对象是线程安全的,因此在多线程编程时,线程安全还需要开发者自己来处理.

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

**错误原因：** 由于 **atomic** 仅仅能保证**读写**是线程安全的，而不是保证 **读 -> +1 -> 写**，这个整体是线程安全的。

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

修饰符	| 优势 | 劣势
|---|---|---|
nonatomic | 执行效率高，性能好 | 不是线程安全的
atomic | 线程安全，但是仅能保证写操作的线程安全 | 大幅降低执行效率

##### 参考资料
1. [Objective-C 原子属性](http://liuduo.me/2018/02/08/objective-c-atomic/)

2. [从@property说起（三）atomic与多线程锁](https://segmentfault.com/a/1190000008808143)

3. [iOS中atomic和nonatomic区别及内部实现](https://juejin.im/post/5a31dc76f265da430c11d3ab)


### 4. <a name="use-copy"></a>copy的使用

浅拷贝：指针复制, 深拷贝：内容复制

- 不可变对象copy出来的是不可变对象,       浅拷贝
- 不可变对象mutableCopy出来的是可变对象， 深拷贝
- 可变对象copy出来的是不可变对象，        深拷贝
- 可变对象mutableCopy出来的是可变对象，   深拷贝

常见问题：

1. **用@property声明的NSString（或NSArray，NSDictionary）经常使用copy关键字，为什么？如果改用strong关键字，可能造成什么问题？**
	
	- 因为父类指针可以指向子类对象,使用 copy 的目的是为了让本对象的属性不受外界影响,使用 copy 无论给我传入是一个可变对象还是不可对象,我本身持有的就是一个不可变的副本.
	- 如果我们使用是 strong ,那么这个属性就有可能指向一个可变对象,如果这个可变对象在外部被修改了,那么会影响该属性.
	- NSString、NSArray、NSDictionary 等等经常使用copy关键字，是因为他们有对应的可变类型：NSMutableString、NSMutableArray、NSMutableDictionary；
	- block 也经常使用 copy 关键字，具体原因见 [Objects Use Properties to Keep Track of Blocks](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithBlocks/WorkingwithBlocks.html#//apple_ref/doc/uid/TP40011210-CH8-SW12)

2. **这个写法会出什么问题：`@property (copy) NSMutableArray *array;`**
	- 添加,删除,修改数组内的元素的时候,程序会因为找不到对应的方法而崩溃.因为 copy 就是复制一个不可变 NSArray 的对象；
	- 使用了 atomic 属性会严重影响性能 ；

3. **block 如何修饰？**
	- 首先，MRR时代用retain修饰block会产生崩溃，因为作为属性的block在初始化时是被存放在静态区的(栈区)，如果block内调用外部变量，那么block无法保留其内存，在初始化的作用域内使用并不会有什么影响，但一旦出了block的初始化作用域，就会引起崩溃。
所有MRC中使用copy修饰，将block拷贝到堆上。
	- 其次，在ARC时代，因为ARC自动完成了对block的copy，所以修饰block用copy和strong都无所谓。 

4. **如何让自己的类用 copy 修饰符？**
	- 需声明该类遵从 NSCopying 协议
	- 实现 NSCopying 协议

5. **如何重写带 copy 关键字的 setter？**

	代码如下：
	
	```
	- (void)setName:(NSString *)name {
	    //[_name release];
	    _name = [name copy];
	}
	```
	
##### 参考资料

[Copying Collections](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Collections/Articles/Copying.html)

### 5. <a name="use-weak"></a>weak的使用

weak 的用处用一句话可归纳为：**弱引用，在对象释放后置为 nil，避免错误的内存访问**。

用更通俗的话来表述是：weak 可以在不增加对象的引用计数的同时，又使得指针的访问是安全的。

常见问题：

1.  **什么情况使用 weak 关键字？**
	- 在 ARC 中,在有可能出现循环引用的时候,往往要通过让其中一端使用 weak 来解决,比如: delegate 代理属性
	- 自身已经对它进行一次强引用,没有必要再强引用一次,此时也会使用 weak,自定义 IBOutlet 控件属性一般也使用 weak；当然，也可以使用strong

2. **weak 和 assign 比较**

	- weak 此特质表明该属性定义了一种“非拥有关系” (nonowning relationship)。为这种属性设置新值时，设置方法既不保留新值，也不释放旧值。此特质同assign类似， 然而在属性所指的对象遭到摧毁时，属性值也会清空(nil out)。 而 assign 的“设置方法”只会执行针对“纯量类型” (scalar type，例如 CGFloat 或 NSlnteger 等)的简单赋值操作。
	- assign 可以用非 OC 对象,而 weak 必须用于 OC 对象

3. **当weak引用指向的对象被释放时，又是如何去处理weak指针的呢？**
	- 调用`objc_release`
	- 因为对象的引用计数为0，所以执行`dealloc`
	- 在`dealloc`中，调用了`_objc_rootDealloc`函数
	- 在`_objc_rootDealloc`中，调用了`object_dispose`函数
	- 调用`objc_destructInstance`
	- 最后调用`objc_clear_deallocating`,详细过程如下：

		```
		a. 从weak表中获取废弃对象的地址为键值的记录
		b. 将包含在记录中的所有附有 weak修饰符变量的地址，赋值为 nil
		c. 将weak表中该记录删除
		d. 从引用计数表中删除废弃对象的地址为键值的记录
		```

4. **使用runtime Associate方法关联的对象, 需要在主对象dealloc的时候释放吗？**
	- 不需要

5. **weak实现原理**
	- `Runtime`维护了一个weak表，用于存储指向某个对象的所有weak指针。weak表其实是一个hash（哈希）表，表的 `key` 是**对象的内存地址**；`value` 是**指向该对象的所有弱引用的指针**数组； 具体处理流程如下：
		1. 初始化时：runtime会调用`objc_initWeak`函数，初始化一个新的weak指针指向对象的地址。
		2. 添加引用时：`objc_initWeak`函数会调用 `objc_storeWeak()` 函数， `objc_storeWeak()` 的作用是更新指针指向，创建对应的弱引用表。
		3. 释放时，调用`clearDeallocating`函数。`clearDeallocating` 函数首先根据对象地址获取所有weak指针地址的数组，然后遍历这个数组把其中的数据设为nil，最后把这个entry从weak表中删除，最后清理对象的记录。

6. **weak属性需要在dealloc中置nil么？**
	- 不需要。 在ARC环境无论是强指针还是弱指针都无需在 dealloc 设置为 nil ， ARC 会自动帮我们处理

7. **SideTable**

	- `SideTable`是一个用`C++`实现的类，它的具体定义在[NSObject.mm](https://opensource.apple.com/source/objc4/objc4-532.2/runtime/NSObject.mm)中, 它主要用于管理对象的引用计数和 weak 表。在 NSObject.mm 中声明其数据结构：

		```
		struct SideTable {
			// 保证原子操作的自旋锁
		    spinlock_t slock;
		    // 引用计数的 hash 表
		    RefcountMap refcnts;
		    // weak 引用全局 hash 表
		    weak_table_t weak_table;
		}
		```
	weak表是一个弱引用表，实现为一个weak_table_t结构体，存储了某个对象相关的的所有的弱引用信息。其定义如下(具体定义在[objc-weak.h](https://opensource.apple.com/source/objc4/objc4-646/runtime/objc-weak.h)中)：

		```
		struct weak_table_t {
		    // 保存了所有指向指定对象的 weak 指针
		    weak_entry_t *weak_entries;
		    // 存储空间
		    size_t    num_entries;
		    // 参与判断引用计数辅助量
		    uintptr_t mask;
		    // hash key 最大偏移值
		    uintptr_t max_hash_displacement;
		};
		```

8. **weak singleton**

	一种特殊的单例有一个有意思的特性：在所有使用该单例的对象都释放后，单例对象本身也会自己释放。
	
	我所见过的大部分单例使用场景，被创建都单例最后都会一直存活着，比如注册登录模块所需要共享状态所创建的 XXLoginManager，即使在用户注册成功进入主界面之后也不会被显式的释放，这在一定程度上会带来内存使用的浪费。<br>所谓的「weak singleton」代码很简单：

	```
	+ (id)sharedInstance
	{
	    static __weak ASingletonClass *instance;
	    ASingletonClass *strongInstance = instance;
	    @synchronized(self) {
	        if (strongInstance == nil) {
	            strongInstance = [[[self class] alloc] init];
	            instance = strongInstance;
	        }
	    }
	    return strongInstance;
	}
	```

9. **IBOutlet连出来的视图属性为什么可以被设置成weak?**

	- [Should IBOutlets be strong or weak under ARC?](http://stackoverflow.com/questions/7678469/should-iboutlets-be-strong-or-weak-under-arc) 文章告诉我们： 因为既然有外链那么视图在xib或者storyboard中肯定存在，视图已经对它有一个强引用了。

	- 不过这个回答漏了个重要知识，使用storyboard（xib不行）创建的vc，会有一个叫_topLevelObjectsToKeepAliveFromStoryboard的私有数组强引用所有top level的对象，所以这时即便outlet声明成weak也没关系

#### 参考资料
1. [iOS weak 关键字漫谈](http://mrpeak.cn/blog/ios-weak/)
2. [iOS-实现weak后，为什么对象释放后会自动为nil](https://www.jianshu.com/p/7c6400a04e58)
3. [iOS 底层解析weak的实现原理](https://www.jianshu.com/p/13c4fb1cedea)
4. [iOS（Objective-C）内存管理](http://zhoulingyu.com/2017/02/15/Advanced-iOS-Study-objc-Memory-2/)
5. [Objective-C 引用计数原理](http://yulingtianxia.com/blog/2015/12/06/The-Principle-of-Refenrence-Counting/)


