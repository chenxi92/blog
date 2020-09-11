##### 步骤

1. 准备 plist 文件(文件名称无所谓)， 文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>ipa下载地址</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>url</key>
					<string>icon地址</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>full-size-image</string>
					<key>url</key>
					<string>icon地址</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>包名</string>
				<key>bundle-version</key>
				<string>版本号</string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>应用名称</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>

```
该 plist 文件必须放在 https 服务器下， 其中：

`ipa下载地址` 可以放在 `https` 或者 `http` 服务器下

`icon地址` 可以放在 `https` 或者 `http` 服务器下


2. 访问 `itms-services://?action=download-manifest&url=<plist下载地址>` 进行下载