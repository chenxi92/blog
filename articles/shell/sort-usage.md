<p align="right">Update: 2020-12-21</p>



#### 作用

> The **sort** utility sorts text and binary files by lines. 
>
> A line is a record separated from the subsequent record by a newline (default) or NUL '\0' character (-z option). 



#### 常见用法

##### 1. 基本用法

将文件的每一行做为一个单位，按照ASCII 码值进行比较， 最后升序输出。

> sort [file-path]



##### 2.  `-u` 参数

去除文件中重复的行

> sort -u [file-path]



##### 3. `-r` 参数

降序输出

> sort -r [file-path]



##### 4. `-n` 参数

按照 **数值大小** 来排序

> sort -n [file-path]



##### 5.  `-t` 和 `-k` 参数

`-t` 用于指定分隔符， `-k` 用于指定排序的列

```bash
# 以 : 为分隔符， 用 第2列 的值，按照 数值大小 来升序排列
sort -n -k 2 -t : [file-path]

# 以 空格 为分隔符， 第2列的值按照数值大小降序排列， 如果第二列的值相同，则用第3列的值按照数值大小升序排列
sort -t ' '  -k 2nr -k 3n [file-path]

# 以 空格 为分隔符, 按照第1列的第2个字符升序排列
sort -t ' ' -k 1.2 [file-path]
```











