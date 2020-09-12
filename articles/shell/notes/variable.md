<p align="right">Update: 2020-9-12</p>

### 环境变量

环境变量属于 Bash 环境自带的变量，通常由系统定义。 `env` 或者 `printenv` 命令可以显示所有环境变量。



函数内声明的变量属于全局变量， 整个脚本都可以读取。

函数内使用 `local` 修饰的变量属于局部变量，只在函数体内有效。



### 创建变量

创建变量必须遵守的规则:

- 字母、数字、下划线字符组成；
- 第一个字符必须是字母或下划线，不能是数字；
- 不允许出现空格和标点符号；



使用变量需要注意的细节：

- Bash 没有数据类型的概念，所有的变量值都是字符串。
- 变量可以重复赋值，后面的赋值会覆盖前面的赋值。
- 定义的变量表示路径，但是路径里面包含空格。
  - 使用该变量时需要使用双引号扩起来使用， 例如 `“${my_variable}"` 

### 默认变量

`@{varname:-word}` 
- 如果变量 `varname` 存在且不为空，则返回它的值，否则返回 `word` 。

`@{varname:=word}`
- 如果变量 `varname` 存在且不为空，则返回它的值，否则把它设置为 `wrod` 并返回 `word` 。

`@{varname:+word}`
- 如果变量 `varname` 存在且不为空，则返回 `word` ，否则返回空值。

`@{varname:?message}`
- 如果变量 `varname` 存在且不为空，则返回它的值，否则打印出 `varname: message` 并中断脚本的执行。



### `declare` 命令

`declare` 命令可以声明一些特殊类型的变量，为变量设置一些限制。

语法形式:

```shell
declare OPTION VARIABLE=value
```

OPTION 主要参数:

- `-a`  声明数组变量。
- `f` 输出所有函数定义。
- `F` 输出或有函数名。
- `i` 声明整数变量。
- `r` 声明只读变量。
- `x` 为该变量输出为环境变量。



### `readonly` 命令

`readonly `命令等同于 `declare -r`，用来声明只读变量。



### `let` 命令

`let `命令声明变量时，可以直接执行算术表达式。



### 参考文章:

- [Bash 变量](https://wangdoc.com/bash/variable.html)

- [函数](https://wangdoc.com/bash/function.html)