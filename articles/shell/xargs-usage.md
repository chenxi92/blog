<p align="right">2019-7-22</p>



`xargs` 可以将接受到的内容转化为后续命令的参数。

#### 语法

```shell
xargs [option] someCommand
```

参数：
* `-I` 替换字符串;
* `-n` 后面跟数字，表示命令在执行的时候，一次用的参数个数，默认是所有参数;
* `-t` 先打印命令，在执行程序;

#### 示例：

定义测试文件 test.txt

输入如下内容:

```
a b c d e f g
h i j k l m n
o p q
r s t
u v w x y z
```

1. ##### 多行变单行

```shell
cat test.txt | xargs
a b c d e f g h i j k l m n o p q r s t u v w x y z
```

2. ##### 多行输出

```shell
cat test.txt | xargs -n3

a b c
d e f
g h i
j k l
m n o
p q r
s t u
v w x
y z
```

3. ##### 替换

创建 `a.js` , `b.js` , `c.js` 文件, 修改 `js` 后缀为 `.js.backup`

```shell
ls *.js | xargs -t -I {} mv {} {}.backup
mv a.js a.js.backup
mv b.js b.js.backup
mv c.js c.js.backup
```
* 先列举出所有的 js 文件

* 然后把 js 文件重命名，后缀统一修改为 `.js.backup`

其中:

` -t` 表示打印参数内容
`-I` 表示替换
`{}` 表示以 `{}` 来代替每一个 js 文件，该字符串可以其他字符串来代替, 例如: `ls *.js | xargs -t -I $ mv $ $.backup`

#### 参考

[Linux xargs 命令](http://www.runoob.com/linux/linux-comm-xargs.html)

[Linux基础：xargs命令](https://www.cnblogs.com/chyingp/p/linux-command-xargs.html)

