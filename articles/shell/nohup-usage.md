
#### 场景

如何在后台长时间运行某个命令？

##### nohup

nohup 的主要作用是让提交的命令忽略 hangup 信号。具体帮助信息如下:

```
nohup -- invoke a utility immune to hangups
```

#### 语法

```
nohup command &
```

nohup 会将标准输出和标准错误重定向到 nohup.out 文件中。在结尾添加 `&` 符号会将命令同时放入后台运行。

#### 示例

在后台执行 `ping www.baidu.com` 命令， 执行结果会输出当当前文件夹下的 `nohup.out` 文件中。

```
nohup ping www.baidu.com &
```


