
SVN 常用命令总结：

##### 检出
```shell
svn checkout <project-path>
```

##### 添加

- 添加单个文件

```shell
svn add <file-path>
```

- 添加所有文件
```shell
svn add \`svn st | grep ? | awk '{print $2}'\`
```

##### 提交
```shell
svn commit -m "add some file"
```

##### 更新
```shell
svn update
```

##### 删除
```shell
svn delete <file-path> -m "delete a file"
```

##### 查看文件状态
```shell
svn status
```

**文件状态列表**
- A  ->  新增
- C  ->  冲突问阿金
- D  ->  删除文件
- M  ->  修改
- ?  ->  不在版本控制范围内
- U  ->  服务器更新
- R  ->  服务器替换
- i  ->  忽略文件


##### 文件撤销

> 1. 改动没有被提交

```shell
svn revert [-R] something
```
- 其中something可以是（目录或文件的）相对路径也可以是绝对路径;
- 当something为单个文件时，直接`svn revert something`就行了；
- 当something为目录时，需要加上参数-R(Recursive,递归)，否则只会将something这个目录的改动。


> 2. 改动已经提交

1. 保证我们拿到的是最新代码
```shell
svn update
```

假设最新版本号是28。

2. 然后找出要回滚的确切版本号

```shell
svn log [something]
```

假设根据`svn log`日志查出要回滚的版本号是25，此处的something可以是文件、目录或整个项目

如果想要更详细的了解情况，可以使用`svn diff -r 28:25 [something]`

3. 回滚到版本号25：

```shell
svn merge -r 28:25 something
```

为了保险起见，再次确认回滚的结果：`svn diff [something]` 发现正确无误，提交。

> 4、提交回滚
```shell
svn commit -m "Revert revision from r28 to r25,because of .."
```

##### 设置忽略文件

> 1. 用户目录下打开 `.subversion/config` 文件

> 2. `global-ignores` 字段取消注释， 并添加需要忽略的文件

