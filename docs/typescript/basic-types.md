### 基本数据类型

<p align="right">2018-12-28</p>

**TypeScript 支持：**
`boolean`，`number`，`string`，`Array`，`Tuple`，`Enum`，`Any`， `Void`，`Never`，`Object`等类型。

##### 1. Boolean
基本数据类型，表示`true/false` 。

##### 2. Number
基本数据类型，支持10进制，16进制数值， 也支持二进制和八进制数值(**ECMAScript 2015)**.

```
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

##### 3. String
基本数据类型，使用双引号或者单引号表达。

```
let color: string = "blue";
color = 'red';
```
**支持模板字符串** 使用反引号表达，可以跨行，也可以嵌入表达式 ```${expr}```

```
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```
##### 4. Array
基本数据类型， 用两种表达形式。

第一种：元素类型后面跟`[]`

```
let list: number[] = [1, 2, 3];
```

第二种： 使用模板类型

```
let list: Array<number> = [1, 2, 3];
```

##### 5. Tuple
元组，类似数组，表示一定数量的元素集合， 但是每个元素类型不必相同

##### 6. Enum
对Javascript的数据类型的补充， 使用`enum`关键字开头。

```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
默认开始的值是0， 但是可以手动的设置某一个或者所有的值。

**它可以从数值转换到该值值枚举中的名称**

```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // Displays 'Green' as its value is 2 above
```

##### 7. Any
表示任意类型，会忽略类型检查。

##### 8. Void
跟`Any`类型相反， 表示没有类型， 一般用作函数的返回值类型。

##### 9. Null and Undefined
在`TypeScript`中， `undefined`和`null` 实际上拥有自己的类型，分别叫做`undefined`和`null`。 

默认`undefined`和`null`是其他类型的子类型， 可以把他们赋值给其他类型；

##### 10. Never

```never```表示给类型的值从来不会出现， 一般用作函数返回值。

```
The never type represents the type of values that never occur.
For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns;
Variables also acquire the type never when narrowed by any type guards that can never be true.
```

##### 11. Object
`Object` 表示非基本类型，表示除`number`, `string`, `boolean`, `symbol`, `null`, `undefined`等之外的数据类型。 官网解释如下:

```
object is a type that represents the non-primitive type, i.e.
any thing that is not number, string, boolean, symbol, null, or undefined.
```
`Object` 允许任何变量的值给它赋值， 但是不能调用它其中的方法，即使该方法已经存在。

```
let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

##### 12. 类型转换
不执行数据检查，对运行时没有影响，只由编译器使用。
类型转换有两种表现形式。
第一种是尖括号的语法：

```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

第二种是`as`语法(**推荐使用该语法**):

```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

##### 参考资料
1. [basic-types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
