# adb command line usage



## 1. Install adb command on your mac

Open your terminal and execute the following command:

```sh
brew install adb
```



## 2. How to extract apk file from your phone to your Mac?

1. Connect your phone to your Mac using a USB cable and enable USB debugging mode on your phone



2. Verify your phone is connected success with running the following command:

```shell
adb devices
```



3. List all the packages in your phone

```sh
adb shell pm list packages
```



4. Find the path of the apk

```sh
adb shell pm path <packages_id>
```



5. Extracte the base.apk

```sh
adb pull <apk_path> <destination_path>
```



6. Redirect output and save it into local file

```sh
adb logcat > <path-to-file>
```

> To stop the logging process, preses `Command` + `Z`

