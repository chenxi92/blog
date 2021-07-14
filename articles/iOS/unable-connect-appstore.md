### 解决 Mac 无法连接App Store 的问题？

#### 问题描述

新的Mac电脑，开机之后提示登录AppleID，

点击跳过，打开App Store登录已有账号，转圈之后无任何提示，创建新的Apple账号，提示无法连接App Store。

在该电脑的safari浏览器上登录已有Apple账号，正常登录。

#### 解决步骤 

1. 修改DNS
	
	系统偏好设置 --> 网络 --> 高级 --> DNS, 增加新的DNS`8.8.8.8`。然后重启电脑，重新登录App Store。~~无法解决。~~

2. 查看时间

	系统偏好设置 --> 日期与时间 --> 日期与时间 --> ☑️自动设置日期与时间。然后重启电脑，重新登录App Store。~~无法解决。~~

3. 连接VPN
	
	连接VPN重新登录App Store。~~无法解决。~~

4. 登录iTunes

	使用同一账号登录iTunes,发现可以正常登录，注销该账号。然后重启电脑，重新登录App Store。~~无法解决。~~
	
5. 更新系统
	
	系统偏好设置 --> 软件更新，更新到最新的系统。然后重启电脑，重新登录App Store。~~无法解决。~~

6. 使用终端

	在终端输入以下命令：```defaults delete com.apple.appstore.commerce Storefront```。然后重启电脑，重新登录App Store。**解决。**