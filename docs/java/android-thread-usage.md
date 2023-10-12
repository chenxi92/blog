Notes about Android thread.




## Terminology

### [Thread](https://developer.android.com/reference/java/lang/Thread)

> A `thread` is a thread of execution in a program. The Java Virtual Machine allows an application to have multiple threads running concurrently.



### [Executor](https://developer.android.com/reference/java/util/concurrent/Executor)

> An object that executes submitted `Runnable` tasks. 



### [ExecutorService](https://developer.android.com/reference/java/util/concurrent/ExecutorService)

> An `Executor` that provides methods to manage termination and methods that can produce a `Future` for tracking progress of one or more asynchronous tasks.
>
> Implements `Executor` interface.



###  [ScheduledExecutorService](https://developer.android.com/reference/java/util/concurrent/ScheduledExecutorService)

> An `ExecutorService` that can schedule commands to run after a given delay, or to execute periodically.
>
> Extends from `ExecutorService`.



###  [ThreadPoolExecutor](https://developer.android.com/reference/java/util/concurrent/ThreadPoolExecutor)

> An `ExecutorService` that executes each submitted task using one of possibly several pooled threads, normally configured using `Executors` factory methods.
>
> Extends from `ExecutorService`.



###  [ThreadFactory](https://developer.android.com/reference/java/util/concurrent/ThreadFactory)

> An object that creates new threads on demand.



### [Executors](https://developer.android.com/reference/java/util/concurrent/Executors)

> Factory and utilty methods for `Executor`, `ExecutorService`, `ScheduledExecutorService`, `ThreadFactory` and `Callable` classes.



###  [Handler](https://developer.android.com/reference/android/os/Handler)

> A Handler allows you to send and process `Message` and `Runnable` objects associated with a thread's `MessageQueue`.
> There are two main uses for a Handler:
>
> 1. to schedule messages and runnables to be executed at some point in the future
> 2. to enqueue an action to be performed on a different thread than your own.



| Concept                                                      | Definition                                                   | Usage                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| UI Thread (Main Thread)                                      | A thread usually to operate UI.                              | Handle UI release events                                     |
| [Message](https://developer.android.com/reference/android/os/Message) | Defines a message containing a description and arbitrary data object that can be sent to a `Handler` | Data structure need to be transferred.                       |
| [MessageQueue](https://developer.android.com/reference/android/os/MessageQueue) | Low-Level class holding the list of messages to be dispatched by a Looper. | Save the `Message` send by `Handler`                         |
| [Handler](https://developer.android.com/reference/android/os/Handler) | A Handler allows you to send and process `Message` and `Runnable` objects associated with a thread's `MessageQueue`. | 1. Add `Message` to the `MessageQueue` <br> 2. Loop the dispatched `Message` |
| [Looper](https://developer.android.com/reference/android/os/Looper) | Class used to run a message loop for a thread                | Loop message                                                 |

- Every thread only have one Looper;
- One looper can bind to multiple thread;



## Code Examples



### 1. How to submit a task on UI thread?

```java
public void runOnUIThread(Runnable runnable) {
    if (Looper.myLooper() == Looper.getMainLooper()) {
        runnable.run();
    } else {
        (new Handler(Looper.getMainLooper())).post(runnable);
    }
}
```



### 2. How to submit a task on other thread?



#### 2.1 Create a new thread and submit a runnable task

```java
public void submitTaskAsync(Runnable runnable) {
    new Thread(new Runnable() {
        @Override
        public void run() {
            runnable.run();
        }
    }).start();
}
```



#### 2.2 Creat a single thread executor and submit a runnable task sequentially

```java
private final ExecutorService serialQueue = Executors.newSingleThreadExecutor();

public void submitTaskAsync(Runnable runnable) {
    this.serialQueue.submit(new Runnable() {
        @Override
        public void run() {
            runnable.run();
        }
    });
}
```



### 3. How to communicate from work thread to UI thread?

#### 3.1 Send message from work thread to UI thread by `Handler.sendMessage()`

```java
public class ThreadDemo {
    // 1. define handler
    private Handler mHandler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            // 4. operate message at UI thread
            switch (msg.what) {
                case 1: 
                    // do something
                    break;
                default:
                    break;
            }
        }
    };
    
    private void fetchDadaAndUpdateOnUIThread() {
        // Start a new thread
        new Thread(new Runnable() {
            @Override
            public void run() {
                // Mock do something for a long time ...
                Thread.sleep(1000);
              
                // 2. Create Message 
                Bundle bundle = new Bundle();
                bundle.putString("key", "value");
                
                Message msg = new Message();
                msg.setData(bundle);
                msg.what = 1;
                
                // 3. Send Message
                mHandler.sendMessage(msg);
            }
        }).start();
    }
}
```



#### 3.2 Send message from work thread to UI thread by `Handler.post()`

```java
private void notifyOnUIThread() {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
            // do some work on UI thread
        }
    });
}
```

