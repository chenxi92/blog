

# libimobiledevice

`libimobiledevice` is a cross-platform software library used for communicating with `iPhone`, `iPod Touch`, `iPad`, and `Apple TV `devices running iOS. It allows for interaction with these devices on Linux and provides practical tools such as extracting crash logs and generating iTunes backups.



## Install

> **brew** install libimobiledevice



## Usage

1. Get the  `UDID` from the connected device.

```sh
idevice_id -l
```



2. Get the `name` from the connected device.

```shell
idevicename
```



3. Get the `name` from the specific `UDID`.

```shell
idevicename -u <UDID>
```



4. Get the device info from the specific `UDID`.

```shell
ideviceinfo -u <UDID>
```



5. List the provision file from the connected device.

```shell
ideviceprovision list
```



6. Copy the provision file to a specific path from the connected device.

```shell
ideviceprovision copy <path>
```



7. Move the crash report file to a specific path.

```shell
idevicecrashreport -u <UDID> <path>
```



8. Copy the crash report file to a specific path.

```shell
idevicecrashreport -u <UDID> -k <path>
```



9. Shutdown the device.

```shell
idevicediagnostics shutdown
```



10. Restart the device.

```shell
idevicediagnostics restart
```



11. Pair with your computer.

```shell
idevicepair -u <UDID> pair
```



12. Get the log info from a specific `process`.

```
idevicesyslog -d -p <process>
```





## ideviceinstaller

### Install

> brew install ideviceinstaller



#### Usage

1. Show the helper info.

```
ideviceinstaller -h
```



2. Show the info from the connected device.

```
ideviceinstaller -i
```



3. Install the `ipa` file to the connected device.

```shell
ideviceinstaller -i <ipa-file-path>`
```


4. Uninstall `ipa` file.

```shell
ideviceinstaller -u <bundle-identifier>
```




## Reference

- [libimobiledevice](https://github.com/libimobiledevice/libimobiledevice)

- [ideviceinstaller](https://github.com/libimobiledevice/ideviceinstaller)