
<p align="right">2019-7-26</p>

#### 用法 

```
find [path] [expression]
```



#### 表达式

表达式可以指定如下操作符，操作符号对应的数字可以在前面添加`+` 或 `-`， `+`表示大于， `-` 表示小于， 不加表示等于。



`-atime n` 最后访问时间到现在的时间间隔，`n` 表示具体数字，数字之后跟的时间单位有:

	s second
	m minute(60 seconds)
	h hour(60 minutes)
	d day(24 hours)
	w week(7 days)

`-delete` 删除找到的文件或者文件夹

`-d` 递归查找的层级, 等同 `-depth` ,默认遍历所有文件夹

`-empty` 查找空的文件或文件夹

`-exec` 执行程序，必须以`;` 结尾

`-mtime n` 上次修改时间到现在的时间间隔,  `n` 表示具体数字，后面可以跟时间单位

`-name` 指定文件名, 可以使用正则表达式

`-print` 输出文件名

`size n` 指定文件大小, `n` 后面指定的类型如下:

	k  kilbytes(1024 bytes)
	M  megabytes(1024 kilobytes)
	G  gigabytes(1024 megabytes)
	T  terabytes(1024 gigabytes)
	P  petabytes(2014 terabytes)

`type t` 指定文件类型, `t` 的类型如下:

	b  block special
	c  character special
	d  directory
	f  regular file
	l  symbolic link
	p  FIFO
	s  socket

`-and` 多个表达式执行与操作

`-or` 多个表达执行式或操作




#### 示例

```shell
find . \! -name "*.txt" -print
```

输出当前目录下所有的不是 txt 的文件。



```shell
find . -name "*.txt" -d 1 -type f -empty -print -delete
```

找到当前目录下空的 txt 文件，删除并打印文件名称。



```shell
find . -type f -size +10M -or -size -3k
```

找到当前文件夹及其子文件夹下大于 `60M` 或者小于 `3kb` 的文件。




```shell
find . -atime -2h -type f
```

找到当前文件夹及其子文件夹下最近 `2小时` 访问的文件。



```shell
find . -type f -exec echo {} \;
```

找到当前文件夹及其子文件夹下的所有文件，并输出名称。
