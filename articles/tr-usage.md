`tr` 用于替换或者删除字符串。

```
The tr utility copies the standard input to the standard output with substitution or deletion of selected characters.
```



##### 语法

```shell
tr [-cdst] [第一字符集][第二字符集]  
```

##### 参数说明

- -c, --complement：反选设定字符。也就是符合 SET1 的部份不做处理，不符合的剩余部份才进行转换
- -d, --delete：删除指令字符
- -s, --squeeze-repeats：缩减连续重复的字符成指定的单个字符
- -t, --truncate-set1：削减 SET1 指定范围，使之与 SET2 设定长度相等

- 字符集1：指定要转换或删除的原字符集。当执行转换操作时，必须使用参数“字符集2”指定转换的目标字符集。但执行删除操作时，不需要参数“字符集2”；

- 字符集2：指定要转换成的目标字符集。



##### 字符类

```
[:alnum:]：字母和数字
[:alpha:]：字母
[:cntrl:]：控制（非打印）字符
[:digit:]：数字
[:graph:]：图形字符
[:lower:]：小写字母
[:print:]：可打印字符
[:punct:]：标点符号
[:space:]：空白字符
[:upper:]：大写字母
[:xdigit:]：十六进制字符
```



##### 实例

1. 将输入字符由小写转换