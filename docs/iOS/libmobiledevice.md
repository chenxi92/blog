

### libimobiledevice

libimobiledevice 是一个跨平台的与iOS设备交互模块。



安装

> **brew** install libimobiledevice



#### 常见用法

```sh
idevice_id -l
```

获取设备 UDID



```shell
idevicename
```

获取当前设备名称



```shell
idevicename -u <UDID>
```

根据UDID获取设备名称



```shell
ideviceinfo -u <UDID>
```

获取设备信息



```shell
ideviceprovision list
```

获取设备内的所有描述文件信息



```shell
ideviceprovision copy <path>
```

复制设备内的描述文件到指定路径



```shell
idevicecrashreport -u <UDID> <path>
```

移动崩溃信息到指定目录下



```shell
idevicecrashreport -u <UDID> -k <path>
```

复制崩溃信息到指定目录下



```shell
idevicediagnostics shutdown
```

设备关机



```shell
idevicediagnostics restart
```

设备重启



```shell
idevicepair -u <UDID> pair
```

指定设备与电脑配对(需要手机输入密码)



```
idevicesyslog -d -p <process>
```

获取指定进程下的游戏日志信息



### ideviceinstaller

用来管理 iOS app 的命令行工具， 需要依赖 libimobiledevice 模块。



安装

> brew install ideviceinstaller



#### 常见用法

>ideviceinstaller -h

显示帮助信息



> ideviceinstaller -i

显示所有的 app 信息 （bundleIdentifier， version, name)



> ideviceinstaller -i <ipa-file-path>

安装 ipa 到当前设备



> ideviceinstaller -u <bundle-identifier>

卸载指定 BundleIdentifier 的ipa





### 参考资料

- [libimobiledevice](https://github.com/libimobiledevice/libimobiledevice)

- [ideviceinstaller](https://github.com/libimobiledevice/ideviceinstaller)