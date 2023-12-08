# Modifying and APK File



Decompile, modify, recompile and  re-sign an APK file.



## Problem

I have an `.apk` file and I wish to view/edit the following contents:

- Resources such as `strings.xml` or other drawables
- App configurations such as `AndroidManifest.xml`
- Other SDK configurations
- Source code such as Java classes



## Environment

- MacOS
- Android Studio Electric Eel
- Java 11



## Prerequisties

Download the following tools:

- [apktool](https://apktool.org/) -- A tool for reverse engineering Android apk files.
- [JD-JUI](https://java-decompiler.github.io/) -- Java Decompiler.
- [dex2jar](https://github.com/pxb1988/dex2jar) -- Converts Android dex files to class/jar files.



## Solution

###  Step 1: Decompile apk file

```bash
$ apktool d -f -o <apk-decompile-folder> <apk-file>
# -s: keep classes.dex, default will convert dex file to smali code
# -f: force rewrite
# -o: output path
```



#### How to view the source code?

- Add the `-s` option to keep the `classes.dex` code.

- Convert `dex` file to `jar` file.

```bash
# convert dex to jar
$ d2j-dex2jar.sh <dex-file> -o <jar-file>
```

- Open the JD-JUI and drag the converted jar file to JD-JUI to view the source code



#### How to edit the source code?

- The easiest way is to replace the `smali` code.
  - Create a Java class with the same name you want to replace
  - Build the Java class into a `smali` code (Create a hello world project, integrate the java class, then build it into an apk)
  - Replace it in the apk decompiled folder

- If you are familiar with `smali` grammar, you can edit the  `smali` code directly.



### Step 2: Recompile apk file

```bash
$ apktool b -f <apk-decompile-folder>
```

The recompiled apk file will be located at: `<apk-decompile-folder>/dist/`



### Step3: Sign apk file

I'm using the debug keystore file generate by Android Studio to sign the apk file (you can use you own keystore file)

```bash
key_store_path="$HOME/.android/debug.keystore"
key_store_alias="androiddebugkey"
key_store_password="android"

build_tools="${HOME}/Library/Android/sdk/build-tools"
apksigner="$(ls -d ${build_tools}/* | tail -n 1)/apksigner"
	
$apksigner sign\
--ks ${key_store_path} \
--ks-key-alias ${key_store_alias} \
--ks-pass pass:${key_store_password}\
--in  ${apk_source_path} \
--out ${apk_output_path}
```

`apksigner` is located in `~/Library/Android/sdk/build-tools/<version-number>/`, if you have multiple versions of the build tool, simply use the latest one.

For more usage about `apksigner`  see [apksigner](https://developer.android.com/tools/apksigner).



### Step 4: Verify apk file

```bash
$apksigner verify <apk-file>
```





## References

- [Modfying an APK File](https://ntcho.github.io/software/decompiling-apk/)
- [Decompile and Recompile Android APK](https://medium.com/@_sathishshan/decompile-and-recompile-android-apk-7d375e1bca83)



## FAQs

1. To install `apktool`

```bash
$ brew install apktool
```



2. To install `dex2jar`

```sh
$ brew install dex2jar
```



3. If  opening `jd-jui` results in the following error:

```bash
Performing Streamed Install
adb: failed to install xxx.apk: Failure [-124: Failed parse during installPackageLI: Targeting R+ (version 30 and above) requires the resources.arsc of installed APKs to be stored uncompressed and aligned on a 4-byte boundary]
```

Try the following solution:


```bash
$ java -jar /Applications/JD-GUI.app/Contents/Resources/Java/jd-gui-1.6.6-min.jar
```



4. Another way to view the java source code is to install [jadx](https://github.com/skylot/jadx)

```bash
$ brew install jadx
```

Then open it:

> jadx-gui



5. To unzip `.jar` file

```shell
jar xf file_name.jar
```



6. To zip to `.jar` file

```shell
jar cf file_name.jar source_folder/
```

