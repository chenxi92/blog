#### `du` 命令使用

> display disk usage statistics.

`du` 展示磁盘空间使用情况。

##### 用法:

```shell
du [-H | -L | -P] [-a | -s | -d depth] [-c] [-h | -k | -m | -g] [-x]
        [-I mask] [file ...]
```

如果没有指定文件名称,则自动遍历当前目录下所有的文件。

常见参数选项：

- `-d` 遍历深度
- `-h` 以人类可读的方式展示结果 



##### 用法示例:

1. 以人类可读的方式显示当前仓库下 `articles` 目录下所有的 `.md` 文件大小

```shell
du -h articles/**.md
```

结果

```shell
 16K	articles/CocosCreator-JSBindings-Tutorial.md
8.0K	articles/RC4-implementation-for-C++-Python.md
 32K	articles/data-encrypt.md
 16K	articles/iOS-multiple-thread.md
4.0K	articles/ios-tips.md
  0B	articles/key-words-iOS.md
8.0K	articles/keychain-usage.md
8.0K	articles/learn-git.md
4.0K	articles/security-usage.md
 16K	articles/sort.md
 12K	articles/sql-study.md
4.0K	articles/svn-usage.md
4.0K	articles/unable-connect-app-store.md
4.0K	articles/untrusted-certificate.md
4.0K	articles/xor.md
```



2. 显示当前仓库下各个目录文件的大小

```shell
du -d 1 -h
```

结果

```shell
472K	./images
204K	./articles
1.2M	./.git
1.8M	.
```

