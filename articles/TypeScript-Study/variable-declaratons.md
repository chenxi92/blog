##### 变量声明
在`JavaScript`中，使用`let`，`const`，`var`来声明变量。`let`和`var`在某些情况下比较相似，但是使用`let`可以避免一些常见的陷阱. `const` 声明的变量无法对其进行重新赋值。

`TypeScript`作为`JavaScript`的超集，也支持也上几种变量的声明方式。

##### 参考资料
[variable-declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

##### `Var`声明

使用`var`关键字来声明变量。

```
var a = 10;
```

##### 作用域规则

`var`声明的变量有一些奇怪的作用域规则。

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
