

### <p align="center">`tar` 命令使用总结

<p align="right">2019-5-14

> manipulate tape archives.
>
> **tar** creates and manipulates streaming archive files.  
>
> This implementation can extract from tar, pax, cpio, zip, jar, ar, and ISO 9660 cdrom images
>
> and can create tar, pax, cpio, ar, and shar archives.

用来压缩和解压文件。`tar` 本身不具有压缩功能, 它是调用压缩功能实现的。

#### 常用参数

模式说明符( `tar` 命令后的第一个参数必须是下面中的某一个)

> <mark>-c</mark>  压缩文件
>
> <mark>-x</mark> 解压文件
>
> <mark>-t</mark> 查看文件压缩内容
>
> <mark>-r</mark>  向压缩归档文件末尾追加文件 

可选参数

> <mark>-v</mark> 显示操作过程所有信息
>
> <mark>-C</mark> 切换到指定目录
>
> <mark>-f</mark> 指定压缩文件

#### 常见用法

新建 `a.txt` 和 `b.txt` 文件。

1. 把 `a.txt` 和 `b.txt` 文件打包成 `new.tar` 文件.

```shell
tar -cf new.tar a.txt b.txt
```

2. 列举出 `new.tar` 文件压缩内容

```shell
chenxi$ tar -tvf new.tar 
-rw-r--r--  0 chenxi staff       5  5 14 22:46 a.txt
-rw-r--r--  0 chenxi staff       6  5 14 22:46 b.txt
```

3. 解压 `new.tar` 到 `dir`  目录下

新建 `dir` 目录, 执行命令

```shell
chenxi$ tar -xvf new.tar -C dir
x a.txt
x b.txt
```









 

