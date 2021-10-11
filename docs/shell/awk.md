<p align=right>2019-7-14</p>
awk 是处理文本的工具，Mac 自带这个程序。

适合文本比较复杂的格式化数据。



#### 基本语法

```shell
awk [可选参数] [模式-动作] 文件名
```

awk 会一行一行的处理文件里面的内容。

##### 可选参数说明:

* `-F`  指定分隔符, 默认是以空格作为分隔符;
* `-f`  从脚本文件中读取 awk 命令;

可选参数可以省略。



##### 模式-动作 说明:

其中模式可以有 0 个或者多个，每一行的内容会依次测试每个模式，所有的模式都匹配之后，会执行相应的动作。

每个模式或者动作里面可以使用 awk 中的 [运算符](#operator)， [内置变量](#variable)， [内置函数](#function)等。



假设有一个 emp.data 文件， 里面内容是部分 NBA 球员的姓名，身高， 年龄的数据:

```
Stephen Curry, 1.91, 31
Kevin Durant, 2.06, 30
LeBron James, 2.03, 34
Russell Westbrook, 1.92, 30
Kyrie Lrving, 1.90, 27
```



1. ###### 没有模式

输出每一行的内容, 使用如下命令:

```
awk '{print $0}' emp.data 
```

结果如下:

```
Stephen Curry, 1.91, 31
Kevin Durant, 2.06, 30
LeBron James, 2.03, 34
Russell Westbrook, 1.92, 30
Kyrie Lrving, 1.90, 27
```



输出第一列的内容, 使用如下命令:

```
awk '{print $1}' emp.data
```

结果如下:

```
Stephen
Kevin
LeBron
Russell
Kyrie
```

 发现第一列的姓名没有显示完全, 因为 awk 默认是以空格作为分隔符的，如果需要显示完全需要我们显示的指定分隔符。



输出每个人的名字, 使用如下命令:

```
awk -F "," '{print $1}' emp.data
```

结果如下:

```
Stephen Curry
Kevin Durant
LeBron James
Russell Westbrook
Kyrie Lrving
```



输出每个球员名字的小写字母, 使用如下命令:

```
awk -F "," ' {print tolower($1)}' emp.data
```

结果如下:

```
stephen curry
kevin durant
lebron james
russell westbrook
kyrie lrving
```



2. ###### 单个模式

输出年龄大于30岁的球员的姓名和身高, 使用如下命令:

```
awk -F "," '$3 > 30 {print $1, $2}' emp.data
```

结果如下:

```
Stephen Curry  1.91
LeBron James  2.03
```



输出姓名大于12个字符(含空格)的球员信息, 使用如下命令:

```
awk -F "," 'length($1) > 12 {print $0}' emp.data
```

结果如下:

```
Stephen Curry, 1.91, 31
Russell Westbrook, 1.92, 30
```



3. ###### 多个模式

输出年龄大于30岁，并且身高大于2米的球员的信息，使用如下命令:

```
awk -F "," '$3 > 30 &&  $2 > 2.00 {print $0}' emp.data
```

结果如下:

```
LeBron James, 2.03, 34
```



#### awk 脚本

语法结构如下:

```
BEGIN {放置的是执行前的语句}
{处理每一行时要执行的语句}
END {处理完所有的行后要执行的语句}
```

其中 `BEGIN` 和 `END` 都是可选的。



统计所有球员的总身高，使用如下命令:

```
awk -F "," '{sum+=$2} END {print sum}' emp.data
```

其中 `sum` 为自定义的变量， `$2` 为内置变量，表示第二列的值。

结果如下:

```
9.82
```



#### <a name="operator"></a> 运算符

| 运算符                  | 描述                             |
| :---------------------- | :------------------------------- |
| = += -= *= /= %= ^= **= | 赋值                             |
| ?:                      | C条件表达式                      |
| \|\|                    | 逻辑或                           |
| &&                      | 逻辑与                           |
| ~ ~!                    | 匹配正则表达式和不匹配正则表达式 |
| < <= > >= != ==         | 关系运算符                       |
| 空格                    | 连接                             |
| + -                     | 加，减                           |
| * / %                   | 乘，除与求余                     |
| + - !                   | 一元加，减和逻辑非               |
| ^ ***                   | 求幂                             |
| ++ --                   | 增加或减少，作为前缀或后缀       |
| $                       | 字段引用                         |
| in                      | 数组成员                         |



#### <a name="variable"></a>变量

`$ + 数字` 表示某个字段：  `$1` 表示第一个字段， `$2` 表示第二个字段， `$3` 表示第三个字段, … , `$0` 表示一整行。

变量 `NF` 表示当前行有多少个字段。

变量 `NR` 表示当前是第几行。



其他常用变量：

- `FILENAME`：当前文件名
- `FS`：字段分隔符，默认是空格和制表符。
- `RS`：行分隔符，用于分割每一行，默认是换行符。
- `OFS`：输出字段的分隔符，用于打印时分隔字段，默认为空格。
- `ORS`：输出记录的分隔符，用于打印时分隔记录，默认为换行符。
- `OFMT`：数字输出的格式，默认为`％.6g`。



#### <a name="function"></a>函数

常用的函数如下：

- `tolower()`：字符转为小写。
- `toupper()`: 字符串转为大写。
- `length()`：返回字符串长度。
- `substr()`：返回子字符串。
- `sin()`：正弦。
- `cos()`：余弦。
- `sqrt()`：平方根。
- `rand()`：随机数。

`awk` 内置函数的完整列表，可以查看[手册](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)。



#### 参考

* [awk 入门教学](http://www.ruanyifeng.com/blog/2018/11/awk.html)
* [Linux awk 命令](https://www.runoob.com/linux/linux-comm-awk.html)
* [awk 简明教程](https://coolshell.cn/articles/9070.html)
* [awk 入门指南](https://awk.readthedocs.io/en/latest/chapter-one.html)