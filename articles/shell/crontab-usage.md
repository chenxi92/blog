
<p align="right">2019-7-17</p>

#### crontab 执行定时任务

使用于Mac电脑。

##### 语法

```shell
crontab [-u user] file
crontab [-u user] { -l | -r | -e }
```

参数说明:
* `-l` 列举当前的定时任务
* `-r` 删除当前的定时任务
* `-e` 编辑定时任务

##### crontab 文件格式

* 第一列分钟 0 ~ 59
* 第二列小时 0 ~ 23 (0 表示子夜)
* 第三列日 1 ~ 31
* 第四列月 1 ~ 12
* 第五列星期 0 ~ 7 (0和7表示星期天)
* 第六列 需要执行的命令

##### 时间格式说明

* `*`  在第一列表示每分钟， 在第二列表示每小时，其他依次类推；
* `a-b`  在第一列表示第a 到 b 分钟，在第二列表示 a 到 b 小时，其他依次类推； 
* `*/n` 在第一列表示每n分钟执行一次， 在第二列表示每n小时执行一次，其他依次类推；
* `a, b, c`  在第一列时，表示每在第 a，b，c分钟执行一次，在第二列表示每a， b，c小时执行一次，其他依次类推；

##### 使用实例

每分钟定时执行 `/User/peak/Desktop/test.sh` 脚本。

1. `crontab -e` 进入定时任务编辑界面

2. `* * * * * /bin/sh  /User/peak/Desktop/test.sh`

##### 注意事项

1. 待执行的脚本如果需要处理路径问题，需要使用绝对路径，判断当前脚本位置，可以使用如下代码：

```
dir="$(cd $(dirname ${BASH_SOURCE[0]});  pwd)"
echo $dir
```
解释说明:

`BASH_SOURCE[0]` 等价与 `BASH_SOURCE`, 取得当前执行的 shell 文件的文件名。

`dirname` 取得当前执行的脚本的父目录。

`cd $(dirname ${BASH_SOURCE[0]})` 进入这个目录(切换当前工作目录)。

`pwd` 显示当前工作目录( cd 执行后的)

2. 执行后，系统会寄一封信给你，显示该程序执行的内容。
