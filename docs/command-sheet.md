Record some command usage in my daily working.



| Command                                     | Description                                                  |
| ------------------------------------------- | ------------------------------------------------------------ |
| `caffeinate -d`                             | Prevent the display from sleeping.                           |
| `adb shell`                                 | Run the shell command on your device.                        |
| `adb pull <src> <dest>`                     | Copy the file  `<src>` from your device to remote `<dest>`.  |
| `adb install <apk-file-path>`               | Install `apk` file on your device.                           |
| `sudo spctl --master-disable`               | Disable Gatekeeper on macOS. (`spct` stand for "Security Policy Control") |
| `sudo spctl --master-enable`                | Enable Gatekeeper on macOS.                                  |
| `ideviceinstaller -i <ipa-file-path>`       | Install `ipa` file on your device.                           |
| `security cms -D -i <mobileprovision-file>` | Display the `.mobileprovision` file's information.           |
| `python3 -m http.server <port>`             | Start a simple HTTP server on your device.                   |
| `gzexe <bash-script-path>`                  | Compress the shell script.                                   |
| `gzexe -d <bash-script-path>`               | Decompress the shell script.                                 |

