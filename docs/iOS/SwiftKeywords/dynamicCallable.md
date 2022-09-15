# dynamicCallable

`@dynamicCallable` is a new feature of Swift 5 and introduced at [SE-0216](https://github.com/apple/swift-evolution/blob/master/proposals/0216-dynamic-callable.md). It serves the purpose: to make it easier for Swift code to work alongside dynamic languages such as Python and Javascript.



## What is @dynamicCallable ?

The definition of [attribute](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html) about `@dynamicCallable` are as follows:

> `@dynamicCallable` is a attributes which can apply to a class, structure, enumeration or protocol to treat instances of the types as callable function. 
>
> The type must implement either a `dynamicallyCall(withArguments:)` method or a `dynamicallyCall(withKeywordArguments:)` method, or both.

We can call an instance of a dynamically callable types as if it's a function that takes any number of arguments.



## Code with explanation

We can use any anything that conforms to `ExpressibleByArrayLiteral` such as arrays sets to the method `dynamicallyCall(withArguments:)` 

```swift
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()
// Use a dynamic method call
dial(4, 1, 1) // Output: Get Swift help on forums.swift.org
dial(8, 7,6, 5) // Output: Unrecognized number

// Call the underlying method directly.
dial.dynamicallyCall(withArguments: [4, 1, 1]) // Output: Get Swift help on forums.swift.org
```



We can use any anything that conforms to `ExpressibleByDictionaryLiteral` such as dictionary, key value pairs to the method `dynamicallyCall(withKeywordArguments:)` 

```swift
@dynamicCallable
struct Repeater {
    func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
        return pairs.map { label, count in
            repeatElement(label, count: count).joined(separator: " ")
        }
        .joined(separator: "\n")
    }
}

let repeatLabels = Repeater()
print(repeatLabels(a: 1, b: 2, c: 3, d: 4, e: 5))
print(repeatLabels.dynamicallyCall(withKeywordArguments: ["a": 1, "b": 2, "c": 3, "d": 4, "e": 5]))
```





## Limitations

The attribute must be placed on the primary definition of a type, not on an **exension** .