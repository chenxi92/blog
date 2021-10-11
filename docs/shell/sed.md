### sed 使用总结

#### 替换

创建 `dog.txt` 文件，输入如下内容

```
I have a dog, my cat's name is xxx.
I love my dog.
My dog love my too.
My dog was 2 years old.
```

替换每一行中第一次出现的 `dog` 为 `cat` 。（**注** 在替换的时候，不仅仅是  `/`  可作为分隔符， 其他字符也可作为分隔符， 只需要前后的分隔符一致即可）

```
sed 's/dog/cat/' dog.txt
```

结果为:

```
I have a cat, my cat's name is xxx.
I love my cat.
My cat love my too.
My cat was 2 years old.
```

##### 全部替换

`g` 表示把左右的 `dog` 替换为 `cat` 。

```
$ sed 's/dog/cat/g' dog.txt
```

结果为:

```
I have a cat, my cat's name is xxx.
I love my cat.
My cat love my too.
My cat was 2 years old.
```

##### 替换指定内容

替换第2行

```
$ sed "2s/dog/cat/g" dog.txt 
I have a dog, my cat's name is xxx.
I love my cat.
My dog love my too.
My dog was 2 years old.
```

替换3-5行

```
$ sed '3,5s/dog/cat/g' dog.txt 
I have a dog, my cat's name is xxx.
I love my dog.
My cat love my too.
My cat was 2 years old.
```

替换最后一行

```shell
$ sed '$s/dog/cat/g' dog.txt 
I have a dog, my cat's name is xxx.
I love my dog.
My dog love my too.
My cat was 2 years old.
```

替换第2行到最后一行

```shell
$ sed '2,$s/dog/cat/g' dog.txt 
I have a dog, my cat's name is xxx.
I love my cat.
My cat love my too.
My cat was 2 years old.
```

只替换每一行第一个o

```shell
$ sed 's/o/O/1' dog.txt 
I have a dOg, my cat's name is xxx.
I lOve my dog.
My dOg love my too.
My dOg was 2 years old.
```

只替换每一行第一个o

```shell
sed 's/o/O/2' dog.txt 
I have a dog, my cat's name is xxx.
I love my dOg.
My dog lOve my too.
My dog was 2 years Old.
```

##### 替换源文件

使用 `-i` 参数编辑源文件

```shell
sed -i "s/dog/cat/g" dog.txt
```

在 `Mac` 上会出现如下错误

```
sed: 1: "dog.txt": extra characters at the end of d command
```

原因：

`sed` 编辑源文件的时候，需要指定一个文件后缀，`sed` 把源文件添加后缀后进行备份，如果后缀名称长度为 0 ，则不会进行备份。

```shelll
 Edit files in-place, saving backups with the specified extension.
 If a zero-length extension is given, no backup will be saved.  It
 is not recommended to give a zero-length extension when in-place
 editing files, as you risk corruption or partial content in situ-
 ations where disk space is exhausted, etc.
```

解决方式: 添加长度为 `0` 的后缀名称。

```
sed -i '' "s/dog/cat/g" dog.txt
```



####  正则表达式

- `^` 表示一行的开头。如：`/^#/` 以 `#` 开头的匹配。
- `$` 表示一行的结尾。如：`/}$/` 以 `}` 结尾的匹配。
- `\<` 表示词首。 如：`\<abc` 表示以 `abc` 为首的词。
- `\>` 表示词尾。 如：`abc\>` 表示以 `abc` 结尾的词。
- `.` 表示任何单个字符。
- `*` 表示某个字符出现了0次或多次。
- `[ ]` 字符集合。 如：`[abc]` 表示匹配a或b或c，还有 `[a-zA-Z]` 表示匹配所有的26个字符。如果其中有^表示反，如 `[^a]` 表示非a的字符。
- `&` 保存搜索字符用来替换其他字符，如 `s/love/-&-/`，love替换成 `-love-`。



#### 多个匹配

`-e` 选项允许在同一行里执行多条命令：（第 1 行到第 3 行的 `dog` 替换成 `cat` ，第 3 行到最后一行的 `My` 替换成 `Her` ）

```
$ sed -e '1,3s/dog/cat/g' -e '3,$s/My/Her/g' dog.txt 
I have a cat, my cat's name is xxx.
I love my cat.
Her cat love my too.
Her dog was 2 years old.
```

使用 `&` 来当做被匹配的变量, 在该变量左右添加其他字符

```
$ sed 's/My/**&**/g' dog.txt 
I have a dog, my cat's name is xxx.
I love my dog.
**My** dog love my too.
**My** dog was 2 years old.
```

#### 插入

在第 1 行上插入 `I have a cat.` 。(1 表示第1行， i 表示插入的意思。在 Mac 上， `i\` 之后需要换行，原因参考[这里](<https://unix.stackexchange.com/questions/52131/sed-on-osx-insert-at-a-certain-line?answertab=votes#tab-top>))

```shell
$ sed '1 i\
I have a cat. ' dog.txt
I have a cat. I have a dog, my cat's name is xxx.
I love my dog.
My dog love my too.
My dog was 2 years old.
```

#### 追加

在最后一行追加 `Test append.` 。(在 Mac 上，`a\` 之后需要换行， 具体原因同上)

```shell
sed '$ a\
Test append.' dog.txt
I have a dog, my cat's name is xxx.
I love my dog.
My dog love my too.
My dog was 2 years old.
Test append.
```



#### [删除操作](http://man.linuxde.net/sed)

删除空白行：

```shell
sed '/^$/d' [file]
```

删除连续空白行，只保留一个空行

```shell
sed -i '' 'N;/^\n/D' [file]
```

删除文件的第2行：

```shell
sed '2d' [file]
```

删除文件的第2行到末尾所有行：

```shell
sed '2,$d' [file]
```

删除文件最后一行：

```shell
sed '$d' [file]
```

删除文件中所有开头是test的行：

```shell
sed '/^test/'d [file]
```



#### `Pattern Space` 和 `Hold Space` 理解

`sed` 会逐行处理文件， 首先 `sed` 把当前正在处理的行保存在一个临时缓存区中（`Pattern Space`），然后处理临时缓冲区中的行，完成后把该行发送到屏幕上。`sed` 每处理完一行就将其从临时缓冲区删除，然后将下一行读入，进行处理和显示。处理完输入文件的最后一行后，`sed` 便结束运行。

`Hold Space` 能够长期存贮 `sed`读取的数据，当 sed 在其他行处理我们可以重用 `Hold Space`  空间里面的数据， 但是不能直接访问 `Hold Space` 内的数据，而是如果要对其执行某些操作，则需要将其复制或附加到 `Pattern Space` 。

`g`： 将 `hold space` 中的内容拷贝到 `pattern space` 中，原来 `pattern space` 里的内容清除;
`G`： 将 `hold space` 中的内容append到 `pattern space` 后
`h`： 将 `pattern space` 中的内容拷贝到 `hold space` 中，原来的 `hold space` 里的内容被清除
`H`： 将 `pattern space` 中的内容append到 `hold space` 后
`x`： 交换 `pattern space` 和 `hold space` 的内容



使用如下示例文件

```shell
$ cat t.txt
one
two
three
```

反序输出文件每一行的内容：（参考[sed 简明教程](https://coolshell.cn/articles/9104.html)）

```shell
$ sed '1!G;h;$!d' t.txt
three
two
one
```

其中的 ‘1!G;h;$!d’ 可拆解为三个命令

- 1!G —— 只有第一行不执行G命令，将hold space中的内容append回到pattern space
- h —— 第一行都执行h命令，将pattern space中的内容拷贝到hold space中
- $!d —— 除了最后一行不执行d命令，其它行都执行d命令，删除当前行

![执行序列图](https://coolshell.cn/wp-content/uploads/2013/02/sed_demo.jpg)



#### 用法举例

##### 从provisioning profiles中提取 codeSign

```sh
# URL: https://mgrebenets.github.io/mobile%20ci/2015/05/15/provisioning-profiles-sigh

codeSign=$(/usr/libexec/PlistBuddy -c 'Print :DeveloperCertificates:0' /dev/stdin <<< $(security cms -D -i "$path_to_mobileprovision") | openssl x509 -inform DER -noout -subject | sed -n '/^subject/s/^.*CN=\(.*\)\/OU=.*/\1/p')

1. security cms -D -i "$path_to_mobileprovision"
获取描述文件信息， 描述文件位置 [~/Library/MobileDevice/Provisioning Profiles/xxx.mobileprovision]

2. /usr/libexec/PlistBuddy -c 'Print :DeveloperCertificates:0' 
提取描述文件内证书信息

3. openssl x509 -inform DER -noout -subject
decode 证书信息， 内容格式一般为： subject= /UID=5GZU79FW4H/CN=iPhone Developer: hsh peak (N24RAL9484)/OU=F8ARKU83W2/O=AIMCOMMUNITY LIMITED/C=GB

4. sed -n '/^subject/s/^.*CN=\(.*\)\/OU=.*/\1/p'
提取“CN=” 和 “/OU=” 之间的内容

/ 界定符， 默认是'/'
n 读取下一个输入行，用下一个命令处理新的行而不是用第一个命令；
p 打印
^subject 匹配以subject 开头的行
s 标记为替换
^.*CN=\(.*\)\/OU=.* 匹配 “CN=” 和 “/OU=” 之间的内容
\1 保存匹配的内容
```





#### 参考资料：

[sed use: expected context address](https://stackoverflow.com/questions/26124650/sed-use-expected-context-address)

[The concept of "Hold space" and "Pattern space" in sed](https://stackoverflow.com/questions/12833714/the-concept-of-hold-space-and-pattern-space-in-sed)

[more than one number or g in substitute flags](https://stackoverflow.com/questions/26056438/more-than-one-number-or-g-in-substitute-flags)

[sed命令](http://man.linuxde.net/sed)

[sed command](http://www.gnu.org/software/sed/manual/sed.html#Overview)