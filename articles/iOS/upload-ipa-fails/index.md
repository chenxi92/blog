### iOS 提审错误记录

<p align="right">Update: 2020-10-16</p>



#### 1. 为 "xxx.ipa"创建 .itmsp失败。

错误如下图所示:

![transporter-create-itmsp-fail](./transporter-create-itmsp-fail.png)



**环境：**

Transporter

Xcode 12

**解决办法**

1. 检查 App Store Connect 后台 `套装ID` 是否与 ipa 包内一致；
2. 确认电脑网络 (本次由于网络问题导致)



#### 2. Error ITMS-90503

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

[Why am I getting device support errors when uploading my app ?](https://developer.apple.com/library/archive/qa/qa1623/_index.html)









