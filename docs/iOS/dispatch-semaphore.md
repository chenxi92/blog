# Dispatch Semaphore

<p align="right">2022-10-17</p>

[What is Dispatch Semaphore?](#what-is-dispatch-semaphore)

[How to use Dispatch Semaphore?](#how-to-use-dispatch-semaphore)

[Examples](#examples)



## What is Dispatch Semaphore?

The definition of `Dispatch Semaphore` of [Apple](https://developer.apple.com/documentation/dispatch/dispatch_semaphore?language=objc) is:

> An object that controls access to a resource across multiple execution contexts through use of a traditional counting semaphore.

Semaphores give us the ability to control access to a shared resources by multiple threads. 

A semaphore consists of a threads queue and a counter value (type int).

**The counter value** is used by the semaphore to decide whether a thread should get access to a shared resource or not. The counter value changes when we call `dispatch_semaphore_wait` or `dispatch_semaphore_signal` method.



## How to use Dispatch Semaphore?

### The relative API

```objective-c
/// Create a semaphore with an initial value.
dispatch_semaphore_t dispatch_semaphore_create(intptr_t value);

/// decrements a semaphore.
intptr_t dispatch_semaphore_wait(dispatch_semaphore_t dsema, dispatch_time_t timeout);

/// increments a semaphore.
intptr_t dispatch_semaphore_signal(dispatch_semaphore_t dsema);
```



### When we call `dispatch_semaphore_wait` or `dispatch_semaphore_signal`

- Call `dispatch_semaphore_wait` each time before we want using the shared resource. We are asking the semaphore whether the shared resource is available or not. If not, we will wait.

- Call `dispatch_semaphore_signal` each time after we finished using the shared resource.



### Calling `dispatch_semaphore_wait` will do the following:

- Decrement semaphore counter by 1.
- If the **result value** is less than zero, the thread is frozen.
- If the **result value** is equal to or bigger than zero, the code will get executed without waiting.



### Calling `dispatch_semaphore_wait` will do the following:

- Increment semaphore counter by 1.
- If the **previous value** was less than zero, this method wakes the oldest thread currently waiting in the thread queue.
- If the **previous value** was euqal to or bigger than zero, it means the thread queue is empty, no one is waiting.



## Examples

### Use semaphore to synchronize

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

The output:

```objective-c
2019-05-19 08:55:38.260560+0800 testSem[61543:4914620] begin request. thread = <NSThread: 0x60000105d3c0>{number = 1, name = main}
2019-05-19 08:55:39.493776+0800 testSem[61543:4914676] request success, thread = <NSThread: 0x600001028300>{number = 5, name = (null)}
2019-05-19 08:55:39.494228+0800 testSem[61543:4914620] received response. thread = <NSThread: 0x60000105d3c0>{number = 1, name = main}
```



### Use semaphore to lock/unlock

Declare the variables:

```objective-c
@interface ViewController ()
@property (nonatomic, strong) NSMutableArray *array;
@property (nonatomic, strong) dispatch_semaphore_t lock;
@end
```



#### Test method without using semaphore:

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

The output:

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



#### Test method using semaphore:

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

The output

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

