#### <p align="center">GCD 信号量

<p align="right">2019-5-19

#### 函数

1. 创建一个信号量

```objective-c
dispatch_semaphore_t
dispatch_semaphore_create(long value);
```

该函数接受一个整形参数，可理解为一个信号量的总量。

2. 等待信号量

```objective-c
long
dispatch_semaphore_wait(dispatch_semaphore_t dsema, dispatch_time_t timeout);
```

该函数会把信号量的总量 -1 ，如果 -1 之后该信号量的总量的值小于0，会阻塞当前线程，负责会继续执行。

3. 发送信号量

```objective-c
long
dispatch_semaphore_signal(dispatch_semaphore_t dsema);
```

该函数会把信号量的总量 +1。



##### 测试

###### 测试线程同步

```objective-c
- (void)testSynchronize {
    NSURL *url = [NSURL URLWithString:@"https://github.com/chenxi141017/blog"];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    NSLog(@"begin request. thread = %@", [NSThread currentThread]);
    [[session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSLog(@"request success, thread = %@", [NSThread currentThread]);
        dispatch_semaphore_signal(semaphore);
    }] resume];
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    NSLog(@"received response. thread = %@", [NSThread currentThread]);
}
```

输出

```objective-c
2019-05-19 08:55:38.260560+0800 testSem[61543:4914620] begin request. thread = <NSThread: 0x60000105d3c0>{number = 1, name = main}
2019-05-19 08:55:39.493776+0800 testSem[61543:4914676] request success, thread = <NSThread: 0x600001028300>{number = 5, name = (null)}
2019-05-19 08:55:39.494228+0800 testSem[61543:4914620] received response. thread = <NSThread: 0x60000105d3c0>{number = 1, name = main}
```

###### 测试线程加锁

先声明变量

```objective-c
@interface ViewController ()
@property (nonatomic, strong) NSMutableArray *array;
@property (nonatomic, strong) dispatch_semaphore_t lock;
@end
```

不加锁

```objective-c
- (void)testLock {
    self.array = [NSMutableArray array];
    self.lock = dispatch_semaphore_create(1);
    for (NSInteger i = 0; i < 5; i++) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            [self addContent:i];
        });
    }
}

- (void)addContent:(NSInteger)index {
    // dispatch_semaphore_wait(self.lock, DISPATCH_TIME_FOREVER);
    [self.array addObject:@(index)];
    NSLog(@"array = %@", self.array);
    // dispatch_semaphore_signal(self.lock);
}
```

不加锁 输出

```objective-c
2019-05-19 08:57:47.899357+0800 testSem[61579:4916193] array = (
    0,
    1,
    2
)
2019-05-19 08:57:47.899362+0800 testSem[61579:4916194] array = (
    0,
    1,
    2
)
2019-05-19 08:57:47.899385+0800 testSem[61579:4916191] array = (
    0,
    1,
    2
)
```

加锁

```objective-c
- (void)testLock {
    self.array = [NSMutableArray array];
    self.lock = dispatch_semaphore_create(1);
    for (NSInteger i = 0; i < 3; i++) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            [self addContent:i];
        });
    }
}

- (void)addContent:(NSInteger)index {
    dispatch_semaphore_wait(self.lock, DISPATCH_TIME_FOREVER);
    [self.array addObject:@(index)];
    NSLog(@"array = %@", self.array);
    dispatch_semaphore_signal(self.lock);
}
```

加锁 输出

```objective-c
2019-05-19 08:59:06.386425+0800 testSem[61606:4917387] array = (
    1
)
2019-05-19 08:59:06.386570+0800 testSem[61606:4917386] array = (
    1,
    0
)
2019-05-19 08:59:06.386696+0800 testSem[61606:4917388] array = (
    1,
    0,
    2
)
```

