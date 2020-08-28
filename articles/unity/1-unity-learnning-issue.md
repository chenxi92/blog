<p align="right">Update: 2020-8-28</p>



### <p align="center">Unity 学习问题总结</p>



#### iOS提审报错 (Error ITMS-90503)

###### 问题描述：

升级到 Unity2019.4.7f1 后， 提审包报错

```
Error ITMS-90503: "Invalid Bundle. You've include the "arme64" value for the
UIRequiredDeviceCapabilities key in you Xcode project, indicating that your app may only support
64-bit. Your binary, 'xxx', must only contain the 64-bit architecture slice.
```



###### 产生原因

Unity升级之前导出的 Xcode 工程里面的 Info.plist 文件中 `UIRequiredDeviceCapabilities` 只包含 `armv7` 字段；

Unity升级到 2019.4.7f1 后导出的 Xcode 工程里面的 Info.plist 文件中 `UIRequiredDeviceCapabilities` 包含 `armv7` , `arm64`, `metal` 字段；

导致升级之后的提审包无法兼容之前版本。

###### 解决办法

把 Info.plist 文件内 `UIRequiredDeviceCapabilities` 删除 `arm64` ， `metal`, 仅保留 `armv7`。  

与升级之前工程保持一致的配置。

###### 参考文档

[UIRequiredDeviceCapabilities](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html#//apple_ref/doc/uid/TP40009252-SW3)

[Why am I getting device support errors when uploading my app ?](https://developer.apple.com/library/archive/qa/qa1623/_index.html)



#### Visual Studio Code 打开Unity工程无法正常工作

###### 问题描述

按照 [Unity Development with VS Code](https://code.visualstudio.com/docs/other/unity) 操作后能正常开发Unity工程，但是某一天打开 Unity工程无法正常查看变量的引用，函数无法跳转等。

控制台输出如下错误:

```
[fail]: OmniSharp.MSBuild.ProjectLoader
        The reference assemblies for .NETFramework,Version=v4.7.1 were not found. To resolve this, install the developer
        Pack (SDK/Targeting Pack) for this framework version or retarget your application. You can download .Net
        Framework Developer Packs at https://aka.ms/msbuild/developerpacks
```

###### 解决方法

在 Visual Studio Code 中的 `设置` -> `Omnisharp: Use Global Mono` 勾选 `always`