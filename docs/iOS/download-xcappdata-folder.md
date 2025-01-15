# Download `xcappdata`  folder

How can you download the `xcappdata` folder from an iOS device by using command line? 



## 1. install `libimobiledevice`

If `libimobiledevice` is not already installed, you can install it by using a package manager like Homebrew on macOS:

```bash
brew install libimobiledevice
```



## 2. install `ifuse`

Currently `ifuse` is not directly compatible with macOS. To use it [follow these steps](https://gist.github.com/cbatson/01a20a44c5c1a70ed3218c32d643e65d)

```bash
brew uninstall osxfuse
brew install --cask macfuse
brew install gromgit/fuse/ifuse-mac
```

 After running the above commands, restart your computer.

If you encounter the following error:

```bash
$ ifuse -h
dyld[1352]: Library not loaded: /opt/homebrew/opt/libplist/lib/libplist-2.0.3.dylib
  Referenced from: <04812DE0-30A0-367A-A4D5-0FCD978A3B1E> /opt/homebrew/Cellar/ifuse-mac/1.1.4/bin/ifuse
```

Run this command to resolve it:

```bash
( cd "$(brew --prefix)/opt/libplist/lib/" && ln -s libplist-2.0.4.dylib libplist-2.0.3.dylib )
```



## 3. Find the App's Bundle Identifier

Use the `ideviceinstaller` tool to list installed apps and find the bundle identifier of the app whose data you want to download

```bash
ideviceinstaller -l
```



## 4. Download the App's Data Container

Use the `ifuse` tool to mount the app's data container and copy it to your computer

- Mount the app's data container

```bash
ifuse <folder-to-mount> --container <bundle-identifier>
```



- Copy the `xcappdata` folder

```bash
cp -r <folder-to-mount> <destination-path>
```



## Reference

- [Browse files (including SQLite databases) on your iPhone with ifuse](https://til.simonwillison.net/macos/ifuse-iphone)

- [How to install ifuse on mayos](https://gist.github.com/cbatson/01a20a44c5c1a70ed3218c32d643e65d)