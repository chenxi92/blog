# Android FAQS

Record some faqs during learning Android Development. 



## Could not resolve com.android.tools.build:gradle:7.4.2

### Description

Create a Kotlin multiplatofrm mobile application project,  and build the corresponding Xcode project, output the following error:

```shell
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring root project 'MyKMMSDK'.
> Could not resolve all files for configuration ':classpath'.
   > Could not resolve com.android.tools.build:gradle:7.4.2.
     Required by:
         project : > com.android.application:com.android.application.gradle.plugin:7.4.2
         project : > com.android.library:com.android.library.gradle.plugin:7.4.2
      > No matching variant of com.android.tools.build:gradle:7.4.2 was found. The consumer was configured to find a runtime of a library compatible with Java 8, packaged as a jar, and its dependencies declared externally, as well as attribute 'org.gradle.plugin.api-version' with value '7.5' but:
          - Variant 'apiElements' capability com.android.tools.build:gradle:7.4.2 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares an API of a component compatible with Java 11 and the consumer needed a runtime of a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'javadocElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'runtimeElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component compatible with Java 11 and the consumer needed a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'sourcesElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
                  
* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 727ms
Command PhaseScriptExecution failed with a nonzero exit code
```

### Environment

- macOS 120.01
- Android Studio Electric Eel | 2022.1.1 Patch 2



### Solution

It seems execute the gradle command `:shared:embedAndSignAppleFrameworkForXcode` need Java 11, while during Xcode build it detect the java8.

Check Java version:

```shell
$ java -version
java version "1.8.0_251"
Java(TM) SE Runtime Environment (build 1.8.0_251-b08)
Java HotSpot(TM) 64-Bit Server VM (build 25.251-b08, mixed mode)
```



Check Java location

```shell
$ where java
/usr/bin/java
/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home/bin/java
```



According to the explanation about [Java Home](https://developer.apple.com/library/archive/qa/qa1170/_index.html)

>Many Java applications need to know the location of a `$JAVA_HOME` directory. 
>
>The `$JAVA_HOME` on Mac OS X should be found using the `/usr/libexec/java_home` command line tool on Mac OS X 10.5 or later. 
>
>On older Mac OS X versions where the tool does not exist, use the fixed path "/Library/Java/Home".
>
>The `/usr/libexec/java_home` tool dynamically finds the top Java version specified in Java Preferences for the current user. This path allows access to the bin subdirectory where command line tools such as `java`, `javac`, etc. exist as on other platforms.
>
>The tool `/usr/libexec/java_home` allows you to specify a particular CPU architecture and Java platform version when locating a `$JAVA_HOME`.
>
> Another advantage of dynamically finding this path, as opposed to hardcoding the fixed endpoint, is that it is updated when a new version of Java is downloaded via Software Update or installed with a newer version of Mac OS X. 
>
>For this reason, it is important that developers do not install files in the JDKs inside of System, since the changes will be lost with subsequent updates by newer versions of Java.
>
>To obtain the path to the currently executing `$JAVA_HOME`, use the java.home System property.



I add the environment to the `~/.bash_profile` file with the following content:

```shell
export JAVA8_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home"
export JAVA11_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export JAVA_HOME=${JAVA11_HOME}
export PATH=${PATH}:${JAVA_HOME}
```

and then execute `source ~/.bash_profile` to restart the environment config. 

After that my java version become to java 11

```shell
$ java -version
openjdk version "11.0.15" 2022-04-19
OpenJDK Runtime Environment (build 11.0.15+0-b2043.56-8887301)
OpenJDK 64-Bit Server VM (build 11.0.15+0-b2043.56-8887301, mixed mode)
```



It seems everything is ok, but when I rebuild the XCode project, the same error.

I decided to output the Java version when XCode build by replace the `Build Script` with the following content:

```shell
cd "$SRCROOT/.."

java -version

./gradlew :shared:embedAndSignAppleFrameworkForXcode
```

It still output the Java 8

```shell
java version "1.8.0_251"
Java(TM) SE Runtime Environment (build 1.8.0_251-b08)
Java HotSpot(TM) 64-Bit Server VM (build 25.251-b08, mixed mode)
```

I decided to expose the JAVA_HOME to XCode directly by replace the `Build Script` with the following content:

```shell
cd "$SRCROOT/.."

export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"

echo "after export java:"
java -version

./gradlew :shared:embedAndSignAppleFrameworkForXcode
```

It's OK.

