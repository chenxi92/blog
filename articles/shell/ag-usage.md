<p align="right">Update: 2020-12-21</p>



#### 介绍

>  A code searching tool similar to `ack`, with a focus on speed.



#### 安装

```bash
brew install the_silver_searcher
```



#### 命令使用形式

```bash
ag [options] pattern [path ...]
```



#### 常见用法

##### 1. 基本用法

```bash
# 当前目录下搜索 foo 字符串所出现的位置，并且高亮显示
ag foo

# 在 ttt 目录下搜索 foo 字符串
ag foo ttt/
```



##### 2. 正则表达式

`ag` 默认支持正则表达式

```bash
# 在当前目录下搜索以 google 开头的字符串
ag ^google
```



##### 3.  `-Q` 参数

按照字面意思来搜索字符串

```bash
# 在当前目录下搜索 .rb 字符串
ag -Q .rb 
```



##### 4. `-G` 参数

指定文件类型

```bash
# 在当前目录下搜索txt文件中包含 以google开头的行
ag ^google -G .txt
```



##### 5. `-o` 参数

仅输出匹配到的内容

```bash
# 在当前目录的txt文件中搜索以google开头的内容
ag ^google -o -G .txt
```



##### 6. `-ignore-dir` 参数 

指定忽略的文件夹

```bash
# 当前目录忽略lib目录，搜索以google开头的内容
ag ^google -ignore-dir=lib
```





#### 参考资料

[ag - Man Page](https://www.mankier.com/1/ag)

[Ack/Ag](http://conqueringthecommandline.com/book/ack_ag)