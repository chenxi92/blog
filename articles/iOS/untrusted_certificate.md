### 解决 `iPhone Developer(XXX)` 证书不受信任

#### 问题描述

新项目创建苹果账号之后，从苹果官网下载下来的`开发`/`发布`证书，本地安装之后显示 `iPhone Developer(XXX)` 证书不受信任。该证书导出p12文件之后，其他电脑安装该p12文件显示没有私钥。

#### 原因

创建证书的电脑的`钥匙串`没有AppleWWDRCA(**Apple Worldwide Developer Relations Certification Authority**)证书

#### 解决办法

1. 下载最新的[AppleWWDRCA证书](https://developer.apple.com/certificationauthority/AppleWWDRCA.cer)，双击安装到“登录”项的钥匙串下；
2. 重新安装`开发`/`发布`证书
