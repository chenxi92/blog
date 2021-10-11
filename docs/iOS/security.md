
> 总结了一波iOS出包相关的命令行，内容如下：

##### 1.解锁钥匙串

```
security unlock-keychain -p `mac_password` /Users/xx/Library/Keychains/login.keychain

mac_password 表示mac电脑开机密码
```

##### 2.安装p12文件

```
security import `p12_filepath` -k /Users/xx/Library/Keychains/login.keychain -P `p12_password` -T /usr/bin/codesign

p12_filepath 表示p12文件路径
p12_password 表示p12文件密码
```

##### 3.从p12文件提取证书名称
```
openssl pkcs12 -password pass:"p12_password" -in `p12_filepath`  -nodes  2>&1 | grep friendlyName  | head -n 2 | sed 's/friendlyName://g' | grep -o "[^ ]\+\( \+[^ ]\+\)*"

p12_filepath 表示p12文件路径
p12_password 表示p12文件密码
```

##### 4.查看电脑上有多少可供签名使用的证书

```
security find-identity -v -p codesigning
```

搜索 REVOKED 关键字来判断证书是否被撤销
```
$ security find-identity -v -p codesigning | grep REVOKED
12) BC94E9400C1F7A96101475CE6D3603C8FF5C561F "iPhone Developer: Guo Qun Wan (5N6XPS8SJT)" (CSSMERR_TP_CERT_REVOKED)
```

##### 5.截取证书名称:
```
security find-identity -v -p codesigning | cut -d \" -f2
```

##### 6.对一个未经过签名的 .app 文件进行签名
```
codesign -s  ‘iPhone Developer: xxxxx’   **.app
```

##### 7.对一个已经签名过的  .app  文件进行重签名
```
codesign -f -s ‘iPhone Developer:xxxx’  **.app
```

##### 8.查看一个 .app 文件的签名信息
```
codesign  -vv -d  **.app
```

##### 9.检查一个 .app 文件 的签名是否被破坏
```
codisign  --verify **.app

如果未被破坏，输出为空；否则输出错误原因
```


##### 10.查看配置文件信息  
 ```
 security cms -D -i example.mobileprovision
 ```
 
####  参考资料
- [code sign](https://www.objc.io/issues/17-security/inside-code-signing/)
- [security 命令总结](http://www.cnblogs.com/pixy/p/4817579.html)
