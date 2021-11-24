<p align="right">2021-11-24</p>



##### 作用

基于 ssh 远程文件拷贝

语法规则:
```
scp [option] source  target 
```

可选参数说明:

*  `-q`: 静默输出，不显示进度，警告，以及进度信息。
*  `-r`: 拷贝整个目录。
*  `-P`: 指定端口。
*  `-l`: 限制带宽，单位 `Kbit/s` 。

1. 本地拷贝到服务器上
```
scp /home/space/music/1.mp3 peak@192.168.2.101:/home/peak/others/music 
```

2. 远程拷贝到本地
```
scp peak@192.168.2.101:/home/peak/others/music /home/space/music/1.mp3 
```

3. 远程拷贝到本地(Identity file)

```shell
scp -C -i <path-to-file-identity-file> <remote-user>@<remote-ip>:<full-path-to-file> <full-local-path-where-to-save>
```

例如：

```shell
scp -i /Users/xx/workspace/xxxKeyOnAWS.pem root@14.71.22.145:/tmp/xx.sql /Users/xx/Desktop/xx.sql
```
