# How to create `dmg` file?



## What is a dmg file?

A file with the `dmg` extension is an [Apple Disk Image](https://en.wikipedia.org/wiki/Apple_Disk_Image) file. When opened, an Apple Disk Image is mounted as a volume within the Finder. 

For this reason, a `dmg` file is often the file format used to store compressed software installers instead of having to use a physical disk.



## Four ways to create dmg file

### 1. [node-appdmg](https://github.com/LinusU/node-appdmg)

`node-appdmg` is a package to generate beautiful DMG-images for your OS X applications.

**Install**

```sh
npm install -g appdmg
```

**Usage**

```sh
appdmg <config-json-path> <dmg-path>
```



### 2. [create-dmg](https://github.com/create-dmg/create-dmg)

`create-dmg` is a shell script to build fancy DMGs.

**Install**

```sh
brew install create-dmg
```

**Usage**

```sh
create-dmg [options ...] <output_name.dmg> <source_folder>
```



### 3. Create dmg manually

Open `Disk Utility`  app on your Mac;

Click the `File` menu at the top left of the window;

Select `New Image` -> `Image from Folder ...`  , Select the source file you want to convert to `dmg` file;

Enter the name of the export `dmg` file;

Click `Done` .



### 4. Exploit `hdiutil` command

`hdiutil` is a command line to manipulate disk images (attach, verify, create, etc).

For more detail, read [this answer](https://stackoverflow.com/a/1513578/5972156).



A demo script to create dmg for your application:

```sh
#! /bin/bash

set -x
set -e

AppName="myAppName"
VolumeName="myAppInstaller"

xcodebuild build -configuration Release

# make sure .app file exist
test -d ./build/Release/${AppName}.app || exit 1

# if the target dmg file exist, remove it
test -f ${AppName}.dmg && rm ${AppName}.dmg

hdiutil create -megabytes 54 -fs HFS+ -volname ${VolumeName} ${AppName}.dmg
hdiutil mount ${AppName}.dmg

cp -r ./build/Release/${AppName}.app /Volumes/${VolumeName}
```



## Conclusion

Using the `Disk Utility` is the sampest way to create a `dmg` file.

Use the third-party package `node-dmg` or `create-dmg` can provide more configuration.