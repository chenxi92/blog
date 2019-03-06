## 多线程技术方案

> 1. pthread
> 2. NSThread
> 3. GCD
> 4. NSOperation

### 1.pthread

**特点**

程序员自己管理线程的生命周期

**定义**

```
线程库实行了POSIX线程标准通常称为Pthreads。
POSIX线程具有很好的可移植性，使用pthreads编写的代码可运行于Solaris、FreeBSD、Linux 等平台，Windows平台亦有pthreads-win32可供使用 。
Pthreads定义了一套C语言的类型、函数与常量，它以pthread.h头文件和一个线程库实现。
```

**头文件**

```
#import <pthread.h>
```

**创建线程**

```
/**

- (void)demo {

    
    //1.创建线程对象
    pthread_t thread;
    
    /**2.创建线程
    参数：
     1.指向线程标识符的指针，C 语言中类型的结尾通常 _t/Ref，而且不需要使用 *;
     2.用来设置线程属性;
     3.指向函数的指针,传入函数名(函数的地址)，线程要执行的函数/任务;
     4.运行函数的参数;
     */
    NSString *param = @"参数";
    int result = pthread_create(&thread, NULL, func, (__bridge void *)(param));
    if (result == 0) {
    	NSLog(@"success")
    } else {
    	NSLog(@"failure");
    	return;
    }
    
    //3.设置子线程的状态设置为detached,则该线程运行结束后会自动释放所有资源，或者在子线程中添加 pthread_detach(pthread_self()),其中pthread_self()是获得线程自身的id
    pthread_detach(thread);
 }
 
 void *func(void *param) {
	//在此做耗时操作
    NSLog(@"new thread : %@  参数是: %@",[NSThread currentThread],(__bridge NSString *)(param));
    
    return NULL;
 }
```

**其他函数**

```
pthread_t：线程ID
pthread_attr_t：线程属性
pthread_create()：创建一个线程
pthread_exit()：终止当前线程
pthread_cancel()：中断另外一个线程的运行
pthread_join()：阻塞当前的线程，直到另外一个线程运行结束
pthread_attr_init()：初始化线程的属性
pthread_attr_setdetachstate()：设置脱离状态的属性（决定这个线程在终止时是否可以被结合）
pthread_attr_getdetachstate()：获取脱离状态的属性
pthread_attr_destroy()：删除线程的属性
pthread_kill()：向线程发送一个信号
pthread_equal(): 对两个线程的线程标识号进行比较
pthread_detach(): 分离线程
pthread_self(): 查询线程自身线程标识号
```

### 2.NSThread

**特点**

程序员管理线程的生命周期；

使用OC对象， 简单易用，可直接操作线程对象

**创建方式**

**1. 实例方法创建线程**

```
- (IBAction)useInstanceMehotd:(id)sender {
    NSLog(@"===== begin %@", [NSThread currentThread]);
    // 创建NSThread 对象
    NSThread *thread = [[NSThread alloc] initWithTarget:self selector:@selector(myOperation:) object:@"instance method"];
    // 启动线程 -> 开辟子线程执行方法
    [thread start];
    NSLog(@"===== end %@", [NSThread currentThread]);
}

- (void)myOperation:(id)param {
    NSLog(@"begin %@", [NSThread currentThread]);
    NSLog(@"param = %@", param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@"end %@", [NSThread currentThread]);
}
```

**2. 类方法创建线程**

```
- (IBAction)useClassMethod:(id)sender {
    NSLog(@"===== begin %@", [NSThread currentThread]);
    // 自动创建线程，并执行方法
    [NSThread detachNewThreadSelector:@selector(myOperation:) toTarget:self withObject:@"class method"];
    NSLog(@"===== end %@", [NSThread currentThread]);

}

- (void)myOperation:(id)param {
    NSLog(@"begin %@", [NSThread currentThread]);
    NSLog(@"param = %@", param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@"end %@", [NSThread currentThread]);
}
```

**3. NSObject分类方法创建线程**

```
- (IBAction)useCatgoryMethod:(id)sender {
    NSLog(@"===== begin %@", [NSThread currentThread]);
    // 是NSObject分类方法
    // 自动在后台线程执行
    [self performSelectorInBackground:@selector(myOperation:) withObject:@"category method"];
    NSLog(@"===== end %@", [NSThread currentThread]);
}

- (void)myOperation:(id)param {
    NSLog(@"begin %@", [NSThread currentThread]);
    NSLog(@"param = %@", param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@"end %@", [NSThread currentThread]);
}
```

### 3.GCD

**特点**

不用关心线程的生命周期

**执行任务方式**
 
 1. 同步的方式执行：
 
 ```
 dispatch_sync(dispatch_queue_t queue, dispatch_block_t block);
 queue: 队列
 block: 任务
 ```
 
 2. 异步的方式执行
 
 ```
 dispatch_async(dispatch_queue_t queue, dispatch_block_t block);
 queue: 队列
 block: 任务

 
 同步：
 只能在当前线程中执行任务， 不具备开启线程能力
 必须等待任务执行完毕，才会执行下一条语句
 
 异步：
 可以在新的线程中执行， 具备开启新线程能力
 不用等待任务执行完毕， 就可以执行下一条语句
 ```
 
**队列类型**

 ```
 1. 并发队列(Concurrent Dispatch Queue)
    * 允许多个任务并发（同时）执行
    * 并发功能只有在异步函数下才有效
 2. 串行队列（Serial Dispatch Queue)
    * 让任务一个接着一个的执行
 
 全局队列（dispatch_get_global_queue): 是一个并发队列
 主队列（dispatch_get_main_queue): 主队列专门用于在主线程上执行任务， 是一个串行队列
 ```
 
 **队列执行效果**
 
|     | 并发队列 | 串行队列 |
| :---: |:---|:---|
|**同步** | 1.没有开启新线程<br>2.串行执行任务 | 1. 没有开启新线程<br>2. 串行执行任务 |
|**异步** | 1. 开启新线程<br>2. 并发执行任务  | 1. 开启新线程<br>2. 串行执行任务 |


 
#### dispatch\_barrier\_async 使用

> 该函数会等待dispatch\_barrier\_async 前面所有任务完成

> 然后在执行 dispatch\_barrier\_async 的任务

```
- (IBAction)test_barrier_async:(id)sender {
    dispatch_queue_t queue = dispatch_queue_create("com.chenxi.learn.thread", DISPATCH_QUEUE_CONCURRENT);
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@"task1 complete, %@", [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@"task2 complete, %@", [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        int time = arc4random() % 5;
        [NSThread sleepForTimeInterval:time];
        NSLog(@"task3 complete, %@", [NSThread currentThread]);
    });
    
    // 阻塞
    dispatch_barrier_async(queue, ^{
        NSLog(@"barrier asycn task ..., %@", [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@"another task1 complete, %@", [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@"another task2 complete, %@", [NSThread currentThread]);
    });
}
```

#### GCD 调度组

> 使用 dispatch\_group\_async 和 dispatch\_group\_notify 函数来完成调度组的工作

```
- (void)demo {
    
    // 1. 调度组
    dispatch_group_t group = dispatch_group_create();
    
    // 2. 并发队列
    dispatch_queue_t queue = dispatch_queue_create("com.chenxi.learn.thread", DISPATCH_QUEUE_CONCURRENT);
    
    // 3. 任务添加到调度组
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@"task1 comolete, %@", [NSThread currentThread]);
    });
    
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@"task2 comolete, %@", [NSThread currentThread]);
    });
    
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@"task3 comolete, %@", [NSThread currentThread]);
    });
    
    // 等待所有任务离开调度组， 调用该函数
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        NSLog(@"all task completed, %@", [NSThread currentThread]);
    });
    
    NSLog(@"other things ...");
}
```

#### 4. NSOperation

**特点**

> 是使用OC语言对GCD的封装

> 完全面向对象，不需要管理线程的生命周期

NSOperation 只是一个抽象类， 需要使用子类来执行任务。 苹果提供了两个子类： NSInvocationOperation 和 NSBlockOperation。

**核心**

> 操作(NSoperation)： 要做的事情

> 队列(NSOperationQueue): 存放操作

**使用步骤**

> 创建操作

> 创建队列

> 将操作放入队列


##### NSInvocationOperation 使用

```
- (IBAction)tes_invocation:(id)sender {
    
    NSInvocationOperation *invocationOperation = [[NSInvocationOperation alloc] initWithTarget:self selector:@selector(demo:) object:@{@"name":@"invocationOperation", @"param": @"hello world"}];
    
    // 操作完成回调
    [invocationOperation setCompletionBlock:^{
        NSLog(@"end invocation thread = %@", [NSThread currentThread]);
    }];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:invocationOperation];
}

- (void)demo:(id)obj {
    [NSThread sleepForTimeInterval:arc4random()%4];
    NSLog(@"thread = %@, msg = %@", [NSThread currentThread], obj);
}
```

##### NSBlockOperation

```
- (IBAction)test_block:(id)sender {
    
    NSBlockOperation *blockOperation = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@"block operation 1, thread = %@", [NSThread currentThread]);
    }];
    
    // 可以添加多个任务
    [blockOperation addExecutionBlock:^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@"block operation 2, thread = %@", [NSThread currentThread]);
    }];
    
    [blockOperation addExecutionBlock:^{
        [NSThread sleepForTimeInterval:1.5];
        NSLog(@"block operation 3, thread = %@", [NSThread currentThread]);
    }];
    
    [blockOperation setCompletionBlock:^{
        NSLog(@"end block operation, thread = %@", [NSThread currentThread]);
    }];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:blockOperation];
}
```

##### 操作依赖

```
- (IBAction)test_dependency:(id)sender {
    
    _queue = [[NSOperationQueue alloc] init];
    
    NSBlockOperation *op1 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@"op1 , thread = %@", [NSThread currentThread]);
    }];
    
    NSBlockOperation *op2 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@"op2 , thread = %@", [NSThread currentThread]);
    }];
    
    NSBlockOperation *op3 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:0.5];
        NSLog(@"op3 , thread = %@", [NSThread currentThread]);
    }];
    
    // op1 完成之后，开始op2 / op3 任务
    [op2 addDependency:op1];
    [op3 addDependency:op1];
    
    [_queue addOperation:op1];
    [_queue addOperation:op2];
    [_queue addOperation:op3];
    
    NSLog(@"test dependency , thread = %@", [NSThread currentThread]);
}

```

##### 自定义NSOperation

> 自定义 Operation 需要继承 NSOperation 类，并实现其 main() 方法，因为在调用 start() 方法的时候，内部会调用 main() 方法完成相关逻辑。

```
// 创建 CustomOperation 类， 继承自 NSOperation
@interface CustomOperation : NSOperation
@end

@implementation CustomOperation

- (void)main
{
    NSTimeInterval time = arc4random() % 6;
    [NSThread sleepForTimeInterval:time];
    NSLog(@"thread %@", [NSThread currentThread]);
}

@end

// ======= 在其他文件调用

- (IBAction)test_custom_operation:(id)sender {
    
    CustomOperation *operation1 = [[CustomOperation alloc] init];
    CustomOperation *operation2 = [[CustomOperation alloc] init];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:operation1];
    [queue addOperation:operation2];
}

```


##### 队列其他方法

> maxConcurrentOperationCount 这是最大并发数

> suspended 队列暂停/继续

> cancelAllOperations 取消所有操作

#### 常见面试题

下面代码会输出什么？ 为什么？

```
- (void)viewDidLoad {
	[super viewDidLoad];
	NSLog(@"1");
   	dispatch_sync(dispatch_get_main_queue(), ^{
        NSLog(@"2");
    });
    NSLog(@"3");
}
```

##### 答案

**输出: 1**， 然后崩溃

##### 原因

系统维护的`dispatch_get_main_queue()`这个队列里面在执行`viewDidLoad`方法，在`viewDidLoad`中又再次在`dispatch_get_main_queue()`这个相同的队列里面执行`block`方法。

由于串行队列`FIFO`原则，系统维护的`dispatch_get_main_queue()`先进栈，所以要先执行完毕后，再执行后进栈的队列任务，而系统维护的`dispatch_get_main_queue()`执行完的条件时`viewDidLoad`方法执行完毕，所以系统维护的`dispatch_get_main_queue()`会等待`dispatch_sync`调用的`dispatch_get_main_queue()`执行完毕，`dispatch_sync`调用的`dispatch_get_main_queue()`又在等待先进栈的系统维护的`dispatch_get_main_queue()`执行完毕，这样就陷入死循环.


#####  参考

1. [关于iOS多线程，你看我就够了](https://www.jianshu.com/p/0b0d9b1f1f19)
