

### iOS 处理警告⚠️

##### 基本语法

```
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-relevant command"
    // your code
#pragma clang diagnostic pop
```

**1. 未使用变量警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wunused-variable"  
    NSInteger variableValue;   
#pragma clang diagnostic pop
```

**2. 方法弃用警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wdeprecated-declarations"  
    // Some function be deprecated   
#pragma clang diagnostic pop
```

**3. 不兼容指针类型**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wincompatible-pointer-types"  
   //  
#pragma clang diagnostic pop
```

**4. 循环引用**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored "-Warc-retain-cycles" 
   // retain cycles code. 
#pragma clang diagnostic pop
```

**5. 内存泄漏警告**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored   "-Warc-performSelector-leaks"
    // persform selector leaks code.
#pragma clang diagnostic pop
```



### Github 搜索技巧

- 搜索star数目
	- `stars:>200`
	- `stars:<500`
	- `stars:"10..50"`

- 指定语言
	- language: Objective-C

- 截止日期
	- created:"2019-3-29"

[高级搜索页面](https://github.com/search/advanced)



### Google 搜索技巧



1. ##### 完全匹配

   使用双引号 `""` 来进行精确匹配

2. ##### 排除关键词 

   使用减号 `-` 来排除某个关键词

   `Mercedes -benz` 搜索 Mercedes 但是排除 benz 相关内容

3. ##### 模糊匹配

   使用星号 `*` 来进行模糊匹配

4. ##### 指定站点

   使用关键词 `site:` 来搜索指定站点

   `site:.gov covid-19`

5. ##### 指定文件类型

   使用关键词 `typefile:` 来指定搜索的文件类型
   
6. 计时器

   输入 `stopwatch`  或者 `timer`

7. 颜色提取

   输入 `color picker`  或者  `rgb 50 50 80`

8. 显示ip

   输入 `what is my ip` 或者 `my ip`

9. 世界时钟

   输入 `Japan time 5pm`

10. 查看社交媒体

    输入 `@username` 

11. 十万个为什么

    输入 `I’m feeling curious`

[参考 10 hidden features in google search](https://medium.com/swlh/10-hidden-features-in-google-search-83b347b48157)



### Xcode 调试崩溃

`Show the Breakpoint navigator`  -->  `+`  --> `Exception Breakpoint`

点击 `Action`，选中 `Deebugger Command`, 添加 `po $arg1` 参数。

[Xcode-debugging-trick](https://www.natashatherobot.com/xcode-debugging-trick/)



### Xcode 调试return

1. 在函数入口添加断点；

2. 控制台输入如下指令并回车；

``` shell
breakpoint set -p return
或者输入:
br set -p return
```

3. 断点执行continue操作；

[如何断点到函数的return](https://mp.weixin.qq.com/s?__biz=MzUxMTkwNDg0OQ==&mid=2247484659&idx=1&sn=775d9f018330360a4aeda18709f5869e&chksm=f96dd9cdce1a50dbf0d755c041d3ecd63c208c4817f69634acafb38e0e1b383cdea12931c943&mpshare=1&scene=1&srcid=&sharer_sharetime=1587606656735&sharer_shareid=ba950e64c9e1fd56aad199c82bacc05d#rd)



### Mac 看看端口号

查看指定端口号

```sh
lsof -i :<port>
```



输入:

```bash
lsof -i :6008
```



输出：

```bash
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    76562 karmas   35u  IPv6 0x5b30baecc79198f9      0t0  TCP *:6008 (LISTEN)
```



杀掉相关进程

```bash
kill -9 <PID>
```





### iPhone is not available. 

问题:

手机连接Xcode调试， 提示 【xxx iPhone is not available. Please reconnect the device】

手机版本： 14.2

Xcode 版本： 12.2

解决方案：

- 查看本机 `DeviceSupport` 文件

  > /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/

  > 有 14.2 文件夹
  >
  > 如果没有可以参考: https://github.com/filsv/iPhoneOSDeviceSupport 下载对应的 DeviceSupport

- 查看Xcode `DeviceSupport` 文件

  > ~/Library/Developer/Xcode/iOS DeviceSupport
  >
  > 没有对应的  DeviceSupport 文件
  >
  > 重新Xcode， 重启手机



### 为 `xxx.ipa` 创建 .itmsp失败。

错误如下图所示:

![transporter-create-itmsp-fail](../.vuepress/public/images/iOS/tips/transporter-create-itmsp-fail.png)



**环境：**

Transporter

Xcode 12

**解决办法**

1. 检查 App Store Connect 后台 `套装ID` 是否与 ipa 包内一致；
2. 确认电脑网络 (本次由于网络问题导致)



###  Error ITMS-90503

提审报错，内容如下:

```objective-c
Error ITMS-90503: "Invalid Bundle. You've include the "arme64" value for the
UIRequiredDeviceCapabilities key in you Xcode project, indicating that your app may only support
64-bit. Your binary, 'com.global.west.ios', must only contain the 64-bit architecture slice.
```

**环境**

Unity 升级到 2019.4.7f1 后， 导出Xcode工程配置有所修改。



**解决办法：**

Info.plist 文件内 `UIRequiredDeviceCapabilities` 删除 `arm64` ， `metal`, 仅仅保留 `armv7`。

与升级之前工程保持一致的配置。



**参考**

[UIRequiredDeviceCapabilities](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html#//apple_ref/doc/uid/TP40009252-SW3)



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



### 解决 `iPhone Developer(XXX)` 证书不受信任

#### 问题描述

新项目创建苹果账号之后，从苹果官网下载下来的`开发`/`发布`证书，本地安装之后显示 `iPhone Developer(XXX)` 证书不受信任。该证书导出p12文件之后，其他电脑安装该p12文件显示没有私钥。

#### 原因

创建证书的电脑的`钥匙串`没有AppleWWDRCA(**Apple Worldwide Developer Relations Certification Authority**)证书

#### 解决办法

1. 下载最新的[AppleWWDRCA证书](https://developer.apple.com/certificationauthority/AppleWWDRCA.cer)，双击安装到“登录”项的钥匙串下；
2. 重新安装`开发`/`发布`证书


### Visual Studio Code 打开Unity工程无法正常工作

#### 问题描述

按照 [Unity Development with VS Code](https://code.visualstudio.com/docs/other/unity) 操作后能正常开发Unity工程，但是某一天打开 Unity工程无法正常查看变量的引用，函数无法跳转等。

控制台输出如下错误:

```
[fail]: OmniSharp.MSBuild.ProjectLoader
        The reference assemblies for .NETFramework,Version=v4.7.1 were not found. To resolve this, install the developer
        Pack (SDK/Targeting Pack) for this framework version or retarget your application. You can download .Net
        Framework Developer Packs at https://aka.ms/msbuild/developerpacks
```

#### 解决方法

在 Visual Studio Code 中的 `设置` -> `Omnisharp: Use Global Mono` 勾选 `always`