# Swift Concurrency

Records some concepts about Swift concurrency and some usage code.



## `async/await`

`async/await` enables us to manage long-running, asynchronous operations that are executed in the background.



### 1. How to define a `async` function?

Define a function with `async` keyword:

``` swift
func fetchData() async throws -> Data? {
     // perform data request ...
}
```

If the asynchronous operation does not throw any error, you can define the function without `throws` keyword, like the following:

```swift
func fetchData() async -> Data {
     // perform data request ...
}
```



### 2. How to call a `async` function?

Call a `async` function which may throw error: 

```swift
Task {
  do {
      let data = try await fetchData()
      print("Fetched \(data).")
  } catch {
      print("Fetching data failed with error \(error)")
  }
}
```

> Note:  A `Task` provide a asynchronous context to call `async` function.



Call a `asyc` function which will not throw any error:

```
Task {
  let data = try await fetchData()
  print("Fetched \(data).")
}
```



### 3. How to convert a closure-based methods to `async/await` format?

Leverage with continuation to generate  `async/await` function, `Swift` provide four continuations:

- `withCheckedThrowingContinuation`
- `withCheckedContinuation`
- `withUnsafeThrowingContinuation`
- `withUnsafeContinuation`



Assume you have function with closure-based handler like the following :

```swift
func fetchData(_ completion: @escaping (Data?) -> Void) {
    // perform async request ...
    completion(nil)
}
```



First we can use `withCheckedContinuation` method:

```swift
func fetchData() async -> Data? {
    return await withCheckedContinuation { continuation in
        fetchData { data in
            continuation.resume(returning: data)
        }
    }
}
```

Throwing methods can use the `withCheckedThrowingContinuation` method.



Second we can use `withUnsafeContinuation` method:

```swift
func fetchData() async -> Data? {
    return await withUnsafeContinuation { continuation in
        fetchData { data in
            continuation.resume(returning: data)
        }
    }
}
```

Throwing method can use the `withUnsafeThrowingContinuation` method.



Keep in mind about continuation:

- Only call the continuation's `resume` once. No more, no less.
- Throwing closure must use `withCheckedThrowingContinuation` or `withUnsafeThrowingContinuation`.



What is the difference between `withCheckedContinuation` and `withUnsafeContinuation` ?

- They work in the exact same way.

- `withUnsafeContinuation` does not check any potential errors, which means mistake will not be caught early.
- `withCheckedContinuation` check some potential errors.



## `Task`

A `Task` represent a unit of asynchronous work, and give us access to a concurrent context in which we can cal `async` marked APIs to perform various operations in the background.



A sample task like the following:

```swift
let imageTask = Task { () -> UIImage? in
    let imageURL = URL(string: "https://example/random")!

    // Check for cancellation before the network request.
    try Task.checkCancellation()
    
    let (imageData, _) = try await URLSession.shared.data(from: imageURL)

    // Check for cancellation after the network request
    // to prevent starting our heavy image operations.
    try Task.checkCancellation()

    let image = UIImage(data: imageData)

    // Perform image operations since the task is not cancelled.
    return image
}
```



## `actor`

Since Swift 5.5 a new type declaration keyword has been added that is `actor`.

Actors in Swift protect their state from data races, and using them allows the compiler to give us helpful feedback while writing applications.

It prevent data races by creating synchronized access to its isolated data.  Before Actors, we would create the same result using all kinds of locks.



### Declare a `actor` type

Here is an example to declare a `actor` type:

```swift
actor Room {
    let roomNumber = "101"
    var visitorCount: Int = 0
    
    func visit() -> Int {
        visitorCount += 1
        return visitorCount
    }
}
```



### Access data in `actor` type

To access data in `actor` type, you need in the `async/awit` context, below is an example:

```swift
func test() async {
    let room = Room()
    let visitCount = await room.visit()
    print(visitCount)
    print(await room.visitorCount)
}
```



### Define your own actor

Below is an example to define your own actor:

```swift
@globalActor actor MyActor {
    static let shared = MyActor()
    
    private init() {}
    
    var value: Int = 0
    
    func increase() {
        value += 1
    }
}

@MyActor func bar(actor: MyActor) async {
    print(await actor.value)
    print(await MyActor.shared.value)
}

Task {
    let myActor = MyActor.shared
    await myActor.increase()
    
    await bar(actor: myActor)
}
```



## `@MainActor`

A MainActor is a globally unique actor who performs tasks on the main thread.



`@MainActor` can be used in class , properties and functions.

```swift
@MainActor
final class MyViewModel {
  
}

final class MyViewModel {
    @MainActor var images: [UIImage] = []
  
    @MainActor func fetchImage() -> {
        Task {
          do let images = try await loadImages()
          images = images
        } catch {
          images = []
        }
    }
}
```



Use MainActor directly

```swift
Task {
    await MainActor.run {
       /// do some operation on main thread
    }
}
```



## Reference

[Swift by Sundell](https://www.swiftbysundell.com/discover/concurrency/)

[SwiftLee](https://www.avanderlee.com/category/swift/)
