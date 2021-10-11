##### 字符串长度

获取字符串长度语法如下：
```shell
${#varname}
```



##### 子字符串

子字符串提取语法:
```shell
${varname:offset:length}
```

返回变量 `varname` 的子字符串，从位置 `offset` 开始(从 `0` 开始计算)，长度为 `length` 。

如果 `offset` 为负值，表示从字符串的末尾开始算起。注意，负数前面必须有一个空格， 以防止与 `${variable:-word}` 的变量的设置默认值语法混淆

```shell
$ foo="This string is long."
$ echo ${foo: -5}
long.
$ echo ${foo: -5:2}
lo
$ echo ${foo: -5:-2}
lon
```



##### 搜索和替换

###### 字符串头部匹配模式

```shell
# 如果 pattern 匹配变量 variable 的开头，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable#pattern}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable##pattern}
```

匹配模式 `pattern` 可以使用`*`、`?`、`[]`等通配符。

```shell
var=http://www.aaa.com/123.htm

# *// 表示从左边开始删除第一个 // 号及左边的所有字符
echo ${var#*//}  
# 结果: www.aaa.com/123.html

# ##*/ 表示从左边开始删除最后（最右边）一个 / 号及左边的所有字符即删除
echo ${var##*/}
# 结果: 123.htm
```



###### 字符串尾部的模式匹配

```shell
# 如果 pattern 匹配变量 variable 的结尾，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable%pattern}

# 如果 pattern 匹配变量 variable 的结尾，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable%%pattern}
```



```shell
var=http://www.aaa.com/123.htm

#  %/* 表示从右边开始，删除第一个 / 号及右边的字符
echo ${var%/*}
# 结果: http://www.aaa.com

#  %%/* 表示从右边开始，删除最后（最左边）一个 / 号及右边的字符
echo ${var%%/*}
# 结果: http
```



###### 任意位置的模式匹配

```shell
# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配
${variable/pattern/string}

# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换
${variable//pattern/string}
```

匹配成功，就删除匹配的部分，换成其他的字符串返回。原始变量不会发生变化。



```shell
$ path=/home/cam/foo/foo.name

# 替换第一个 foo 为 bar
$ echo ${path/foo/bar}
# 结果: /home/cam/bar/foo.name

# 替换所有 foo 为 bar
$ echo ${path//foo/bar}
# 结果: /home/cam/bar/bar.name
```



#### 参考

[字符串操作](https://wangdoc.com/bash/string.html)