### 变量

<p align="right">2019-1-5</p>

在`JavaScript`中，使用`let`，`const`，`var`来声明变量。`let`和`var`在某些情况下比较相似，但是使用`let`可以避免一些常见的陷阱. `const` 声明的变量无法对其进行重新赋值。

`TypeScript`作为`JavaScript`的超集，也支持也上几种变量的声明方式。

#### var声明

使用`var`关键字来声明变量。

```
var a = 10;
```

在一个函数内部声明变量。

```
function f() {
    var message = "Hello, world!";

    return message;
}
```

在其他函数中方法相同的变量.

```
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

var g = f();
g(); // returns '11'
```
在上面的例子中函数`g`捕获了声明在f函数中的变量`a`， 当`g`函数被调用的时候，内部的a的值与在f函数中的变量`a`的值相关联。 尽管`g`调用的时候函数f已经执行完了，还是能够对变量`a`进行读写操作。

如下示例:

```
function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

f(); // returns '2'
```

##### 作用域规则

相对于其他语言，`JavaScript`中`var`声明的变量有一些奇怪的作用域规则。

```
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

变量`x`声明在`if`语句内，但是我们能够在`if`语句之外访问它。这是因为`var`声明的变量可以在它所在的函数，模块，命名空间或全局范围内的任何地方访问。

这种作用域规则可能会导致多种类型的错误，其中一个问题是**多次声明同一个变量并不抛出错误提示**：

```
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```
很容易发现错误， 内部的`for`循环声明的变量`i`会覆盖外部的`for`循环声明的变量`i`，他们引用了同一个变量。

##### 变量捕获的模式

看一下如下的例子：
```
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i); // setTimeout 延时执行函数
}
```

实际输出结果如下:

```
10
10
10
10
10
10
10
10
10
10
```

许多`JavaScript`开发人员都非常熟悉这种行为, 但是对很多新手来书，期待的输出如下:

```
0
1
2
3
4
5
6
7
8
9
```

产生错误的原因是我们传递给`setTimeout`函数的参数实际上引用的同一个值. `setTimeout`函数将会在延迟一段时间之后执行，这时候`for`循环已经执行完毕，`i`的值是10，所以每次输出都是10.

常见的解决办法是： 每次循环都捕获一下变量i:
 
```
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

#### let 声明

除了关键字之外使用`let`声明变量跟使用`var`声明变量的方式没什么不同。

```
let hello = "Hello!";
```
##### 块作用域

与使用`var`声明的变量（其范围泄漏到其包含的函数）不同，使用`let`声明的变量在块作用域之外无法访问。

```
function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here
    return b;
}
```

有两个本地变量`a`和`b`， `a`的作用范围限制在了函数`f`内， `b`的作用范围限制在了`if`语句内。

变量声明在catch语句中有同样的作用域规则。

```
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);
```

**变量在声明之前禁止使用:**

```
a++; // illegal to use 'a' before it's declared;
let a;
```

##### 重复声明

使用`var`可以声明一个变量多次， 使用`let`禁止声明同一个变量多次。

```
function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
```

```
let x = 10;
let x = 20; // error: can't re-declare 'x' in the same scope
```


##### 变量捕获

每次在一个作用域范围内运行时，它都会创建一个变量的“环境”。 即使在其范围内的所有内容都已完成执行后，该环境及其捕获的变量也可以存在。

```
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
```


```
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

```
0
1
2
3
4
5
6
7
8
9
```

#### const 声明

const声明的变量无法对其重新赋值。

#### 解构

ECMAScript 2015 的一个新特性之一就是解构。

##### 数组解构

```
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```

创建了两个新的变量first和name并对他们重新赋值， 这比使用下标赋值更加方便。

```
first = input[0];
second = input[1];
```

解构对于已经声明过的变量来说同样适用：

```
// 变量交换
[first, second] = [second, first];
```
对于数组中剩下的元素可以使用`...`语法来表示:

```
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

可以忽略不关心的元素:

```
let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1

let [, second, , fourth] = [1, 2, 3, 4];
```

##### Object 解构

创建变量a、b，使用o.a 和 o.b分别对他们进行赋值：
```
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
```

**属性重命名**

```
let { a: newName1, b: newName2 } = o;
```

等价于:

```
let newName1 = o.a;
let newName2 = o.b;
```

**分号在这里不要是变量类型**

#### Spread(扩展)

跟解构是相反的操作。它能够将数组扩展到另一个数组，或将对象扩展到另一个对象。

```
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]; // [0, 1, 2, 3, 4, 5]
```

**扩展Object**: (只能扩展[自己的可枚举属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)，无法对函数进行扩展)

```
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" }; // { food: "rich", price: "$$", ambiance: "noisy" }
```


#### 参考资料

[variable-declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)