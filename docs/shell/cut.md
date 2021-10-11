#### `cut` 命令使用总结

<p align="right">Update: 2019-5-15</p>

> cut out selected portions of each line of a file.

> 显示文件每一行的指定部分内容。

##### 语法
```
cut -b list [-n] [file ...]
cut -c list [file ...]
cut -f list [-d delim] [-s] [file ...]
```

##### 参数


> <mark>-b</mark> 显示指定的字节

> <mark>-c</mark> 显示指定的字符

> <mark>-d</mark> 指定分隔符(默认分割符是 `tab`)

> <mark>-f</mark> 显示指定字段

> <mark>-s</mark> 只显示有指定分隔符的那一行

##### 用法

创建 `test.txt` 文件，内容如下
```
No      Name    Mark    Percent
01      tom     69      91
02      jack    71      87
03      alex    68      98
```

###### 提取第1项字段(默认以 `tab` 作为分隔符)
```
chenxi$ cut -f 1 test.txt 
No
01
02
03
```

##### 提取第2和第3项内容
```
chenxi$ cut -f 2-3 test.txt 
Name	Mark
tom	69
jack	71
alex	68
```

##### 提取前两个字符
```
chenxi$ cut -c 1-2 test.txt 
No
01
02
03
```

###### 提取第4个字符以及之后所有内容
```
chenxi$ cut -c 4- test.txt 
Name	Mark	Percent
tom	69	91
jack	71	87
alex	68	98
```

修改 `test.txt` 文件
```
No	Name	Mark	Percent
01;tom;69;91
02;jack;71;87
03	alex	68	98
```

###### 以 `;` 分割，提取第 2 项内容
```
chenxi$ cut -f 2 -d ";"  test.txt 
No	Name	Mark	Percent
tom
jack
03	alex	68	98
```

###### 以 `;` 分割，提取第 2 项内容（排除没有 `;` 分割符的行）
```
chenxi$ cut -f 2 -d ";"  -s test.txt 
tom
jack
```

##### 参考

[cut命令](http://man.linuxde.net/cut)