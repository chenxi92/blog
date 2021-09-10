## iOS 崩溃日志符号化总结



### 提取崩溃日志信息



通过 [libimobiledevice](https://github.com/libimobiledevice/libimobiledevice) 复制手机内崩溃文件

```shell
# 手机内崩溃文件复制到电脑上当前目录下的crash文件夹下
idevicecrashreport -k crash
```



获取崩溃日志内容 

```shell
$ cat TestBacktrace-2021-09-10-121512.ips
{"app_name":"TestBacktrace","timestamp":"2021-09-10 12:15:12.00 +0800","app_version":"1.0","slice_uuid":"0a5d60f5-0d1d-30df-a904-fc494041b25b","adam_id":0,"build_version":"1","platform":2,"bundleID":"com.global.godsstrikeios","share_with_app_devs":1,"is_first_party":0,"bug_type":"109","os_version":"iPhone OS 14.0 (18A373)","incident_id":"7832B73B-9521-4571-B2AE-CCD99AC61AA9","name":"TestBacktrace"}
Incident Identifier: 7832B73B-9521-4571-B2AE-CCD99AC61AA9
CrashReporter Key:   debfb332ec9be1d784c259f5589984e410f668af
Hardware Model:      iPhone8,1
Process:             TestBacktrace [16268]
Path:                /private/var/containers/Bundle/Application/D4D45804-0E43-44B4-81BB-0DBB7E145B23/TestBacktrace.app/TestBacktrace
Identifier:          com.global.godsstrikeios
Version:             1 (1.0)
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd [1]
Coalition:           com.global.godsstrikeios [638]


Date/Time:           2021-09-10 12:15:12.4808 +0800
Launch Time:         2021-09-10 12:14:57.1478 +0800
OS Version:          iPhone OS 14.0 (18A373)
Release Type:        User
Baseband Version:    8.02.01
Report Version:      104

Exception Type:  EXC_CRASH (SIGABRT)
Exception Codes: 0x0000000000000000, 0x0000000000000000
Exception Note:  EXC_CORPSE_NOTIFY
Triggered by Thread:  0

Application Specific Information:
abort() called

Last Exception Backtrace:
(0x18f74c114 0x1a2f72cb4 0x18f7b6398 0x18f6503f0 0x1024f62a8 0x191fbe774 0x191fbe624 0x191fcc9cc 0x191fce550 0x191fa9934 0x19202ba20 0x1920301c0 0x192027480 0x18f6cc240 0x18f6cc140 0x18f6cb488 0x18f6c5a40 0x18f6c5200 0x1a57c0598 0x191f8b004 0x191f905d8 0x1024f63f0 0x18f3a4598)

Thread 0 name:  Dispatch queue: com.apple.main-thread
Thread 0 Crashed:
0   libsystem_kernel.dylib        	0x00000001b9fb495c 0x1b9f8e000 + 158044
1   libsystem_pthread.dylib       	0x00000001d4ff39e8 0x1d4fe9000 + 43496
2   libsystem_c.dylib             	0x0000000198396934 0x198323000 + 473396
3   libc++abi.dylib               	0x00000001a306ecc8 0x1a305c000 + 77000
4   libc++abi.dylib               	0x00000001a3060ca0 0x1a305c000 + 19616
5   libobjc.A.dylib               	0x00000001a2f72f64 0x1a2f69000 + 40804
6   libc++abi.dylib               	0x00000001a306e154 0x1a305c000 + 74068
7   libc++abi.dylib               	0x00000001a3070e68 0x1a305c000 + 85608
8   libobjc.A.dylib               	0x00000001a2f72e64 0x1a2f69000 + 40548
9   CoreFoundation                	0x000000018f6c52ec 0x18f632000 + 602860
10  GraphicsServices              	0x00000001a57c0598 0x1a57bd000 + 13720
11  UIKitCore                     	0x0000000191f8b004 0x19146a000 + 11669508
12  UIKitCore                     	0x0000000191f905d8 0x19146a000 + 11691480
13  TestBacktrace                 	0x00000001024f63f0 0x1024f0000 + 25584
14  libdyld.dylib                 	0x000000018f3a4598 0x18f3a3000 + 5528

Thread 1 name:  com.apple.uikit.eventfetch-thread
Thread 1:
0   libsystem_kernel.dylib        	0x00000001b9f918c4 0x1b9f8e000 + 14532
1   libsystem_kernel.dylib        	0x00000001b9f90cc8 0x1b9f8e000 + 11464
2   CoreFoundation                	0x000000018f6cb74c 0x18f632000 + 628556
3   CoreFoundation                	0x000000018f6c5bd0 0x18f632000 + 605136
4   CoreFoundation                	0x000000018f6c5200 0x18f632000 + 602624
5   Foundation                    	0x00000001908cf278 0x1908c7000 + 33400
6   Foundation                    	0x00000001908cf158 0x1908c7000 + 33112
7   UIKitCore                     	0x00000001920369fc 0x19146a000 + 12372476
8   Foundation                    	0x0000000190a2bc48 0x1908c7000 + 1461320
9   libsystem_pthread.dylib       	0x00000001d4ff2b70 0x1d4fe9000 + 39792
10  libsystem_pthread.dylib       	0x00000001d4ff7880 0x1d4fe9000 + 59520

Thread 2:
0   libsystem_pthread.dylib       	0x00000001d4ff786c 0x1d4fe9000 + 59500

Thread 0 crashed with ARM Thread State (64-bit):
    x0: 0x0000000000000000   x1: 0x0000000000000000   x2: 0x0000000000000000   x3: 0x0000000000000000
    x4: 0x00000001a3071f31   x5: 0x000000016d90f3e0   x6: 0x000000000000006e   x7: 0x0000000000000033
    x8: 0x0000000102657880   x9: 0x33a492d44a30ffe2  x10: 0x0000000000000002  x11: 0x000000000000000b
   x12: 0x00000001d60e2c4a  x13: 0x0000000000000001  x14: 0x0000000000000010  x15: 0x0000000000000031
   x16: 0x0000000000000148  x17: 0x0000000000000000  x18: 0x0000000000000000  x19: 0x0000000000000006
   x20: 0x0000000000000407  x21: 0x0000000102657960  x22: 0x0000000000000001  x23: 0x00000002822e40e0
   x24: 0x0000000000000000  x25: 0x0000000000000001  x26: 0x0000000eb1e31100  x27: 0x00000001e4b76000
   x28: 0x0000000000000001   fp: 0x000000016d90f340   lr: 0x00000001d4ff39e8
    sp: 0x000000016d90f320   pc: 0x00000001b9fb495c cpsr: 0x40000000
   esr: 0x56000080  Address size fault

Binary Images:
0x1024f0000 - 0x1024f7fff TestBacktrace arm64  <0a5d60f50d1d30dfa904fc494041b25b> /var/containers/Bundle/Application/D4D45804-0E43-44B4-81BB-0DBB7E145B23/TestBacktrace.app/TestBacktrace
0x1025b0000 - 0x10261bfff dyld arm64  <db2dc234676830f889db5b18092543c0> /usr/lib/dyld
0x1045f8000 - 0x104603fff libobjc-trampolines.dylib arm64  <531731c8e9f131659c4be4d34eb3ad02> /usr/lib/libobjc-trampolines.dylib
0x18f324000 - 0x18f3a2fff libdispatch.dylib arm64  <a564fa91a3e33a41afd1410fad72e52a> /usr/lib/system/libdispatch.dylib
0x18f3a3000 - 0x18f3d9fff libdyld.dylib arm64  <77e573148a58306490c08af9a4745430> /usr/lib/system/libdyld.dylib
0x18f3da000 - 0x18f631fff libicucore.A.dylib arm64  <b69f2d5b339d3615816342da657b3a4a> /usr/lib/libicucore.A.dylib
0x18f632000 - 0x18f9dafff CoreFoundation arm64  <f80fca31bf7632938bc61729588ae8b6> /System/Library/Frameworks/CoreFoundation.framework/CoreFoundation
0x18f9db000 - 0x18fb73fff CoreServices arm64  <7831e6e5279d3a0bbde2de0b9ea2d43a> /System/Library/Frameworks/CoreServices.framework/CoreServices
0x18fbbd000 - 0x18fc35fff SystemConfiguration arm64  <9a8a9b4a8d233d76a3e00d2e23adc717> /System/Library/Frameworks/SystemConfiguration.framework/SystemConfiguration
0x18fc36000 - 0x18fd1dfff CoreTelephony arm64  <080a8015d906315b95b5d151427bb5ef> /System/Library/Frameworks/CoreTelephony.framework/CoreTelephony
0x18fd1e000 - 0x19019efff CFNetwork arm64  <c2a586f195cb35cfb58d7c215706514e> /System/Library/Frameworks/CFNetwork.framework/CFNetwork
0x19019f000 - 0x190855fff libnetwork.dylib arm64  <76479c40a7f539f98c08062009d8cf1b> /usr/lib/libnetwork.dylib
0x190856000 - 0x1908c6fff Accounts arm64  <1119c5897f3f318eb36fb7cadd13b35d> /System/Library/Frameworks/Accounts.framework/Accounts
0x1908c7000 - 0x190b61fff Foundation arm64  <4b7b9c0abad3348d95a394784bfed02e> /System/Library/Frameworks/Foundation.framework/Foundation
0x190b62000 - 0x190ec3fff ImageIO arm64  <1eb4eb79e3d63843bdf651030946d702> /System/Library/Frameworks/ImageIO.framework/ImageIO
0x190edd000 - 0x191469fff CoreGraphics arm64  <8db9d5e0ae2e3452ba61e08b61d0b5a7> /System/Library/Frameworks/CoreGraphics.framework/CoreGraphics
0x19146a000 - 0x19281efff UIKitCore arm64  <00ea142638f73fd2be0104ebd44eca35> /System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore
0x19281f000 - 0x19283bfff libAccessibility.dylib arm64  <6eaa2bbb983c31e0a54445ab83e375e7> /usr/lib/libAccessibility.dylib
0x19283c000 - 0x192aaefff QuartzCore arm64  <3e647da558433774b65aa1928066ebbc> /System/Library/Frameworks/QuartzCore.framework/QuartzCore
0x192aaf000 - 0x192b14fff BackBoardServices arm64  <8d8ff0c391863e14b59fba5a0379b135> /System/Library/PrivateFrameworks/BackBoardServices.framework/BackBoardServices
0x192b15000 - 0x192b9cfff TextInput arm64  <38541dc1398a31429a5764b434068b97> /System/Library/PrivateFrameworks/TextInput.framework/TextInput
0x1934af000 - 0x1934c3fff UIKitServices arm64  <1f3cd175224d3f26a5600d139f4f1f40> /System/Library/PrivateFrameworks/UIKitServices.framework/UIKitServices
0x19381b000 - 0x1939d3fff CoreText arm64  <acab3f31cda932a28fe5566404fc7b76> /System/Library/Frameworks/CoreText.framework/CoreText
0x1939d4000 - 0x1939ecfff ExtensionKit arm64  <eb2e265374973c91ae06db90c531dee8> /System/Library/PrivateFrameworks/ExtensionKit.framework/ExtensionKit
0x193a02000 - 0x193a7ffff BaseBoard arm64  <b9796c0d4cb6374bbfefc4211e2a621b> /System/Library/PrivateFrameworks/BaseBoard.framework/BaseBoard
0x19545e000 - 0x1957c0fff CoreData arm64  <d6bd337e6232360cbc36ab1edb921118> /System/Library/Frameworks/CoreData.framework/CoreData
0x1963b9000 - 0x1963f7fff AppSupport arm64  <7007fbe50270309dbb72a9675db02535> /System/Library/PrivateFrameworks/AppSupport.framework/AppSupport
0x1963f8000 - 0x196514fff ManagedConfiguration arm64  <4af6524e93173aafaf9f264dcac12fd8> /System/Library/PrivateFrameworks/ManagedConfiguration.framework/ManagedConfiguration
0x196685000 - 0x1967c1fff Security arm64  <d6b2c1cb544d3d628f8b0e86922622dc> /System/Library/Frameworks/Security.framework/Security
0x1972e3000 - 0x1975d7fff CoreImage arm64  <36f179cea2393257b48e1f20786da448> /System/Library/Frameworks/CoreImage.framework/CoreImage
0x1975d8000 - 0x197691fff ColorSync arm64  <486b1137d98a3a9f91f386bd7f2f425d> /System/Library/PrivateFrameworks/ColorSync.framework/ColorSync
0x197692000 - 0x1976cafff CoreVideo arm64  <9e006d465bb939e9ab31782d3f254f8c> /System/Library/Frameworks/CoreVideo.framework/CoreVideo
0x197de1000 - 0x197eccfff CoreMedia arm64  <b48e8ae41fe437b0bfc9bf9255a835ef> /System/Library/Frameworks/CoreMedia.framework/CoreMedia
0x197ecd000 - 0x198137fff AudioToolbox arm64  <623cddc84b86320ea5843eac139f9d83> /System/Library/Frameworks/AudioToolbox.framework/AudioToolbox
0x1981e5000 - 0x1982e4fff UIFoundation arm64  <ac4b381071c5329eab3171245848a2a3> /System/Library/PrivateFrameworks/UIFoundation.framework/UIFoundation
0x1982e5000 - 0x198322fff libsystem_info.dylib arm64  <86ea93b2cc963d8ca53ebfcf708b5ec5> /usr/lib/system/libsystem_info.dylib
0x198323000 - 0x19839ffff libsystem_c.dylib arm64  <e64a11f730ec313c8acfb0de81756ee6> /usr/lib/system/libsystem_c.dylib
0x1983a0000 - 0x1983e8fff RunningBoardServices arm64  <4bd250113ccc351eaa970f2b8ce9436d> /System/Library/PrivateFrameworks/RunningBoardServices.framework/RunningBoardServices
0x1983e9000 - 0x19931bfff JavaScriptCore arm64  <5f868c00551331a1adf812a5ade40e41> /System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore
0x199c64000 - 0x199d09fff IOKit arm64  <ac262e0f73c53352a36cd240aed00570> /System/Library/Frameworks/IOKit.framework/Versions/A/IOKit
0x199d0a000 - 0x199d19fff DataMigration arm64  <36ee29905cf33ea4b63c9e57ebff658a> /System/Library/PrivateFrameworks/DataMigration.framework/DataMigration
0x199d1a000 - 0x199d71fff SpringBoardServices arm64  <159a44bea3c33324adb33c5ed8b4d4af> /System/Library/PrivateFrameworks/SpringBoardServices.framework/SpringBoardServices
0x19a87b000 - 0x19aa12fff CoreUtils arm64  <f509e9b22a093c2d88d34f0411370f74> /System/Library/PrivateFrameworks/CoreUtils.framework/CoreUtils
0x19afe1000 - 0x19b0a2fff CoreUI arm64  <06b307c805fb365c9a17bf28e03315ad> /System/Library/PrivateFrameworks/CoreUI.framework/CoreUI
0x19b819000 - 0x19db78fff WebCore arm64  <24a23357aaff3969b8ac1c1b9e59b652> /System/Library/PrivateFrameworks/WebCore.framework/WebCore
0x19db79000 - 0x19dbd5fff libMobileGestalt.dylib arm64  <dc5e8552363c3a369d3f34167d2ee890> /usr/lib/libMobileGestalt.dylib
0x19dbd6000 - 0x19dbf1fff CommonUtilities arm64  <0b5a598e0add354085b5beb2bcfa6dc1> /System/Library/PrivateFrameworks/CommonUtilities.framework/CommonUtilities
0x19df91000 - 0x19dfc1fff UserNotifications arm64  <609d7b0ee0523347a0f9a80503675b1e> /System/Library/Frameworks/UserNotifications.framework/UserNotifications
0x19dfc2000 - 0x19e042fff FrontBoardServices arm64  <4722b22ec68836a38a0fb123cada07ce> /System/Library/PrivateFrameworks/FrontBoardServices.framework/FrontBoardServices
0x19e043000 - 0x19e065fff libsystem_malloc.dylib arm64  <ab9cee1431f83a1d88a6a326ab836926> /usr/lib/system/libsystem_malloc.dylib
0x19ed04000 - 0x19ef5bfff AudioToolboxCore arm64  <d7ca5d15a5c13addae7d6fefb1c2fd56> /System/Library/PrivateFrameworks/AudioToolboxCore.framework/AudioToolboxCore
0x19f396000 - 0x19f435fff ShareSheet arm64  <a6c9670a5f6b3ea68a0a5c44b37f8af4> /System/Library/PrivateFrameworks/ShareSheet.framework/ShareSheet
0x19ff6c000 - 0x19ff7ffff MSUDataAccessor arm64  <84d5e50dff2a331eb1108248336bcab1> /System/Library/PrivateFrameworks/MSUDataAccessor.framework/MSUDataAccessor
0x19ff80000 - 0x19ffa5fff MobileAsset arm64  <b584963553bb3adca793f115acbf49ff> /System/Library/PrivateFrameworks/MobileAsset.framework/MobileAsset
0x19ffa6000 - 0x19ffb5fff libsystem_networkextension.dylib arm64  <a135b009fd9b3b3299978ba024bd4544> /usr/lib/system/libsystem_networkextension.dylib
0x1a0df9000 - 0x1a0ee4fff VideoToolbox arm64  <a151f840cfed3618a0077f3314424eaf> /System/Library/Frameworks/VideoToolbox.framework/VideoToolbox
0x1a1020000 - 0x1a102ffff AXCoreUtilities arm64  <639753bc281334d89a36eeaff0d77176> /System/Library/PrivateFrameworks/AXCoreUtilities.framework/AXCoreUtilities
0x1a20d5000 - 0x1a20ddfff InternationalSupport arm64  <368cef823686339bab0f913210fdfaad> /System/Library/PrivateFrameworks/InternationalSupport.framework/InternationalSupport
0x1a279b000 - 0x1a27abfff UniformTypeIdentifiers arm64  <d350a3b2316c31dd80e97c844188d78a> /System/Library/Frameworks/UniformTypeIdentifiers.framework/UniformTypeIdentifiers
0x1a2f69000 - 0x1a2fa1fff libobjc.A.dylib arm64  <19e9f9a3f38334eaa5f2a59774933351> /usr/lib/libobjc.A.dylib
0x1a2fa2000 - 0x1a3001fff LoggingSupport arm64  <4c06c79633853395850ce8fa3fa81141> /System/Library/PrivateFrameworks/LoggingSupport.framework/LoggingSupport
0x1a3002000 - 0x1a305bfff libc++.1.dylib arm64  <da67cb48478c3703b904cdb242a7f957> /usr/lib/libc++.1.dylib
0x1a305c000 - 0x1a3074fff libc++abi.dylib arm64  <9bdc8fb7f27b37588232411f2a070984> /usr/lib/libc++abi.dylib
0x1a31d3000 - 0x1a3213fff CoreAutoLayout arm64  <3bc7cf7c2e7538829037e607c116b9ca> /System/Library/PrivateFrameworks/CoreAutoLayout.framework/CoreAutoLayout
0x1a3214000 - 0x1a3369fff Network arm64  <67039f9e1e69383ea880069034391a06> /System/Library/Frameworks/Network.framework/Network
0x1a336a000 - 0x1a339efff MobileKeyBag arm64  <d29b9fde1baf36ad8961c36fbb2a70fc> /System/Library/PrivateFrameworks/MobileKeyBag.framework/MobileKeyBag
0x1a35d0000 - 0x1a366afff libvDSP.dylib arm64  <c55aaf2d958a33a0ad9bf4cfdd8e48c6> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libvDSP.dylib
0x1a366b000 - 0x1a369dfff libAudioToolboxUtility.dylib arm64  <e0bdfdab0049343ab35dac6f69cc78ab> /usr/lib/libAudioToolboxUtility.dylib
0x1a38c4000 - 0x1a39cffff FileProvider arm64  <02b95742eef73bc688fdb11dcf0c910c> /System/Library/Frameworks/FileProvider.framework/FileProvider
0x1a3a2d000 - 0x1a3ab7fff Symbolication arm64  <1b798f7ce66b33589838af2e889e6ebd> /System/Library/PrivateFrameworks/Symbolication.framework/Symbolication
0x1a3ab8000 - 0x1a3ad5fff CrashReporterSupport arm64  <02a6ad802ab137e9a23a4936922c071e> /System/Library/PrivateFrameworks/CrashReporterSupport.framework/CrashReporterSupport
0x1a3c11000 - 0x1a3df8fff MPSNeuralNetwork arm64  <a0568a6501de34ef81c8cdc81f96044d> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSNeuralNetwork.framework/MPSNeuralNetwork
0x1a3df9000 - 0x1a3e4cfff MPSCore arm64  <ed6393fdf55a3ef4919adc36a3caa181> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSCore.framework/MPSCore
0x1a4281000 - 0x1a4297fff ProtocolBuffer arm64  <d054565aab6a384c8a34ab50862e369f> /System/Library/PrivateFrameworks/ProtocolBuffer.framework/ProtocolBuffer
0x1a44fb000 - 0x1a4509fff AssertionServices arm64  <441bcb1580e9332bbdaa932daf272733> /System/Library/PrivateFrameworks/AssertionServices.framework/AssertionServices
0x1a4584000 - 0x1a465dfff Metal arm64  <127b5a5e58ed3ba18771ea667305519d> /System/Library/Frameworks/Metal.framework/Metal
0x1a465e000 - 0x1a478cfff MediaExperience arm64  <69dbd1b3ebfb34509d7513f20e3c6bfc> /System/Library/PrivateFrameworks/MediaExperience.framework/MediaExperience
0x1a4b3a000 - 0x1a4b50fff libsystem_trace.dylib arm64  <27106d0783f33262a2186c09cb43bbd6> /usr/lib/system/libsystem_trace.dylib
0x1a4b51000 - 0x1a4b81fff CoreServicesInternal arm64  <a1f716fc85c235bfa842533b5056a21f> /System/Library/PrivateFrameworks/CoreServicesInternal.framework/CoreServicesInternal
0x1a57bd000 - 0x1a57c5fff GraphicsServices arm64  <7762c1613c1b3e56ba759cb873604898> /System/Library/PrivateFrameworks/GraphicsServices.framework/GraphicsServices
0x1a597c000 - 0x1a5990fff PowerLog arm64  <fa316322274a3edfb0f24695fdfa39cb> /System/Library/PrivateFrameworks/PowerLog.framework/PowerLog
0x1a725d000 - 0x1a7283fff BoardServices arm64  <c7a26f1fed133352b792e02a7d6189a0> /System/Library/PrivateFrameworks/BoardServices.framework/BoardServices
0x1a7403000 - 0x1a744efff OSAnalytics arm64  <4fe5520295d93e4287b2f3d284b8340c> /System/Library/PrivateFrameworks/OSAnalytics.framework/OSAnalytics
0x1a76e1000 - 0x1a7713fff MobileInstallation arm64  <7e4f8f06ecfc3eab890efcb394dabdaa> /System/Library/PrivateFrameworks/MobileInstallation.framework/MobileInstallation
0x1a7714000 - 0x1a77a2fff libTelephonyUtilDynamic.dylib arm64  <30eaf24df2793f489b51d83e50ad6177> /usr/lib/libTelephonyUtilDynamic.dylib
0x1a78dc000 - 0x1a78f8fff CoreMaterial arm64  <8b58bde11d7d3a12aa801bfd971db617> /System/Library/PrivateFrameworks/CoreMaterial.framework/CoreMaterial
0x1a7968000 - 0x1a7aeafff libsqlite3.dylib arm64  <2c36458eaa8b3745a820f81bc42a8205> /usr/lib/libsqlite3.dylib
0x1a865f000 - 0x1a8669fff libsystem_notify.dylib arm64  <53d35bc61c833bb8bdd07cb45194afdc> /usr/lib/system/libsystem_notify.dylib
0x1a8714000 - 0x1a8785fff libcorecrypto.dylib arm64  <0132fdd2a91538919c322733a68c136f> /usr/lib/system/libcorecrypto.dylib
0x1a8786000 - 0x1a87a8fff UserManagement arm64  <446f0ed5432e39f7ba07fc13098c05cd> /System/Library/PrivateFrameworks/UserManagement.framework/UserManagement
0x1a8879000 - 0x1a888ffff libsystem_asl.dylib arm64  <2d732c1c91d739da8981bb8ea0265b47> /usr/lib/system/libsystem_asl.dylib
0x1a8b2f000 - 0x1a8b65fff CoreServicesStore arm64  <5f2ae90d70833f00af3df3e126b3ddd6> /System/Library/PrivateFrameworks/CoreServicesStore.framework/CoreServicesStore
0x1a8b66000 - 0x1a8b8afff CoreAnalytics arm64  <43ed2b52d6bf34ff85a81fa594917963> /System/Library/PrivateFrameworks/CoreAnalytics.framework/CoreAnalytics
0x1a952d000 - 0x1a9557fff IconServices arm64  <3f645203f06b3c5494b55cbc282a8018> /System/Library/PrivateFrameworks/IconServices.framework/IconServices
0x1a9f1f000 - 0x1aa1bafff vImage arm64  <4d2753e5ccc03c1ebeb4d89472ebf7cd> /System/Library/Frameworks/Accelerate.framework/Frameworks/vImage.framework/vImage
0x1aafec000 - 0x1ab041fff ktrace arm64  <097420ebaa7e36ae9dbf36f796be63e9> /System/Library/PrivateFrameworks/ktrace.framework/ktrace
0x1ab41e000 - 0x1ab57cfff WebKitLegacy arm64  <02f26121740a3a808167d6e3e1041857> /System/Library/PrivateFrameworks/WebKitLegacy.framework/WebKitLegacy
0x1ac292000 - 0x1ac29cfff IOMobileFramebuffer arm64  <dcdc7f06833c3f8e9e1d245cf8b94f02> /System/Library/PrivateFrameworks/IOMobileFramebuffer.framework/IOMobileFramebuffer
0x1ac8f0000 - 0x1ac90efff PrototypeTools arm64  <d3f78765bb3137baacf8009e96d8b371> /System/Library/PrivateFrameworks/PrototypeTools.framework/PrototypeTools
0x1ac90f000 - 0x1ac93afff PersistentConnection arm64  <16765b75546c37c381d5e435d025a787> /System/Library/PrivateFrameworks/PersistentConnection.framework/PersistentConnection
0x1adaa3000 - 0x1adaa5fff OSAServicesClient arm64  <4976b7be0b953226a56f02869e05429b> /System/Library/PrivateFrameworks/OSAServicesClient.framework/OSAServicesClient
0x1ae5f4000 - 0x1ae6a3fff CoreSymbolication arm64  <757c9f0b17273bba990c590adc517fa5> /System/Library/PrivateFrameworks/CoreSymbolication.framework/CoreSymbolication
0x1aed9a000 - 0x1aedabfff IOSurface arm64  <8f94086085d737abb5aaac2b1866d86c> /System/Library/Frameworks/IOSurface.framework/IOSurface
0x1aedac000 - 0x1aee0bfff MobileWiFi arm64  <1a97840fcb963453be177d661925cefb> /System/Library/PrivateFrameworks/MobileWiFi.framework/MobileWiFi
0x1af2e5000 - 0x1af31efff libGLImage.dylib arm64  <cf2eef14d66d36aa949e5befda03088b> /System/Library/Frameworks/OpenGLES.framework/libGLImage.dylib
0x1af31f000 - 0x1af326fff libsystem_symptoms.dylib arm64  <b85143fe2be737688af32e1d37a86a1d> /usr/lib/system/libsystem_symptoms.dylib
0x1af369000 - 0x1af915fff CoreAudio arm64  <67773bc042d8391eaa3fdadf97f39bab> /System/Library/Frameworks/CoreAudio.framework/CoreAudio
0x1b2b32000 - 0x1b2b3bfff ContextKitExtraction arm64  <21524cab8edf34a1b467a8c8081a30b4> /System/Library/PrivateFrameworks/ContextKitExtraction.framework/ContextKitExtraction
0x1b4351000 - 0x1b435ffff MobileIcons arm64  <babb5e4371b53c38a6cb824c212e6fe6> /System/Library/PrivateFrameworks/MobileIcons.framework/MobileIcons
0x1b5948000 - 0x1b5952fff MallocStackLogging arm64  <858acb277af3359a8fd07152b168f83a> /System/Library/PrivateFrameworks/MallocStackLogging.framework/MallocStackLogging
0x1b649b000 - 0x1b64ccfff Bom arm64  <7cb897977fe03d0e84104df94cfc60a5> /System/Library/PrivateFrameworks/Bom.framework/Bom
0x1b64fc000 - 0x1b6502fff PushKit arm64  <ffa088e21dab396d84943bb7aa81819a> /System/Library/Frameworks/PushKit.framework/PushKit
0x1b6745000 - 0x1b674cfff StudyLog arm64  <93b1a618f6083a1aa2ab05298e2db029> /System/Library/PrivateFrameworks/StudyLog.framework/StudyLog
0x1b9751000 - 0x1b9757fff IOAccelerator arm64  <eab9ed1834473d798cae3b74751ab9b6> /System/Library/PrivateFrameworks/IOAccelerator.framework/IOAccelerator
0x1b9f8e000 - 0x1b9fbdfff libsystem_kernel.dylib arm64  <82dbf088d58735cf959815f79c12eaa4> /usr/lib/system/libsystem_kernel.dylib
0x1ba8f7000 - 0x1ba903fff FontServices arm64  <dba6ff60c1d3311da5d116ae5092e555> /System/Library/PrivateFrameworks/FontServices.framework/FontServices
0x1baa95000 - 0x1baaa0fff MediaAccessibility arm64  <b2d8b4ea7bde35c6a97130bb23dc1305> /System/Library/Frameworks/MediaAccessibility.framework/MediaAccessibility
0x1bc69a000 - 0x1bc6a6fff libdscsym.dylib arm64  <4eb292dfd43834d4a7b219841e8326c5> /usr/lib/libdscsym.dylib
0x1bc6a7000 - 0x1bc6b8fff HangTracer arm64  <28aed98179ea3d32a8dc4e8a397ff700> /System/Library/PrivateFrameworks/HangTracer.framework/HangTracer
0x1bc865000 - 0x1bc91dfff SampleAnalysis arm64  <74a526e5693b39f9a867d04debeac387> /System/Library/PrivateFrameworks/SampleAnalysis.framework/SampleAnalysis
0x1bc91e000 - 0x1bc94cfff PlugInKit arm64  <a1dae7ad9f003dbc8baec9d505b5e2fe> /System/Library/PrivateFrameworks/PlugInKit.framework/PlugInKit
0x1bc9e3000 - 0x1bc9e4fff libSystem.B.dylib arm64  <ebdb6d14cbdc3ce0ab68c0ee237a16e0> /usr/lib/libSystem.B.dylib
0x1bce1c000 - 0x1bce8afff libarchive.2.dylib arm64  <584a70fd7da63008b71604ef99254229> /usr/lib/libarchive.2.dylib
0x1bce8b000 - 0x1bceaefff libtailspin.dylib arm64  <fa2e827ad7b334e58a715cf79f831b7f> /usr/lib/libtailspin.dylib
0x1bceaf000 - 0x1bd2d5fff libBNNS.dylib arm64  <a42c621f162e32d5a9672b9ad124d346> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libBNNS.dylib
0x1bd8e5000 - 0x1bd8e5fff Accelerate arm64  <61d6e706b1863b32a2a8e01ac1d46443> /System/Library/Frameworks/Accelerate.framework/Accelerate
0x1bd8e6000 - 0x1bd995fff libBLAS.dylib arm64  <b404152c5ebe3ab5bba9c852ee97ea31> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libBLAS.dylib
0x1bd996000 - 0x1bdca8fff libLAPACK.dylib arm64  <8625162ce6dc3c7e8c654a7d6bf57cbe> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libLAPACK.dylib
0x1bdca9000 - 0x1bdcbdfff libLinearAlgebra.dylib arm64  <1cab0d8379243f9296d553ac0d70cbd6> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libLinearAlgebra.dylib
0x1bdcbe000 - 0x1bdcc2fff libQuadrature.dylib arm64  <c4b76ae2a5783857b19b17e7a82e7309> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libQuadrature.dylib
0x1bdcc3000 - 0x1bdd24fff libSparse.dylib arm64  <9fff1eaa7a4f3e619368364d0721f352> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libSparse.dylib
0x1bdd25000 - 0x1bdd36fff libSparseBLAS.dylib arm64  <7dd5047a29e9366197256c1e0020011a> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libSparseBLAS.dylib
0x1bdd37000 - 0x1bdd90fff libvMisc.dylib arm64  <220714da804534e2b661bd16662bbc7f> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/libvMisc.dylib
0x1bdd91000 - 0x1bdd91fff vecLib arm64  <adeee68d3e453776add246aad6dae801> /System/Library/Frameworks/Accelerate.framework/Frameworks/vecLib.framework/vecLib
0x1be8ba000 - 0x1be93ffff MPSImage arm64  <a744a1dc0803351d962c706046fe56a6> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSImage.framework/MPSImage
0x1be940000 - 0x1be966fff MPSMatrix arm64  <55d5253d52b432c89fc1d451f9d55f6e> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSMatrix.framework/MPSMatrix
0x1be967000 - 0x1be99ffff MPSNDArray arm64  <5cb7c6034ece3efc9d0fe60311e96562> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSNDArray.framework/MPSNDArray
0x1be9a0000 - 0x1be9e8fff MPSRayIntersector arm64  <a2457e1d186c35df8e6b720f51604300> /System/Library/Frameworks/MetalPerformanceShaders.framework/Frameworks/MPSRayIntersector.framework/MPSRayIntersector
0x1be9e9000 - 0x1be9e9fff MetalPerformanceShaders arm64  <cea4592557393600bbf50a1ea2e23dd0> /System/Library/Frameworks/MetalPerformanceShaders.framework/MetalPerformanceShaders
0x1bed65000 - 0x1bed65fff MobileCoreServices arm64  <434bbf96e27e328cbb52b460c26486a2> /System/Library/Frameworks/MobileCoreServices.framework/MobileCoreServices
0x1bf94b000 - 0x1bf953fff OpenGLES arm64  <3f31fb62ab1733009a9bfe21c1507898> /System/Library/Frameworks/OpenGLES.framework/OpenGLES
0x1bf954000 - 0x1bf955fff libCVMSPluginSupport.dylib arm64  <f357556cd2df3ac39603664f87aa04c8> /System/Library/Frameworks/OpenGLES.framework/libCVMSPluginSupport.dylib
0x1bf956000 - 0x1bf95cfff libCoreFSCache.dylib arm64  <c198a37a10713397910d44bbbe89f354> /System/Library/Frameworks/OpenGLES.framework/libCoreFSCache.dylib
0x1bf95d000 - 0x1bf962fff libCoreVMClient.dylib arm64  <ef1d65f5b0f03a04b64c80209bce055f> /System/Library/Frameworks/OpenGLES.framework/libCoreVMClient.dylib
0x1bf963000 - 0x1bf96bfff libGFXShared.dylib arm64  <ac3853445de336668360e5b93f2dc30d> /System/Library/Frameworks/OpenGLES.framework/libGFXShared.dylib
0x1c0515000 - 0x1c0515fff UIKit arm64  <0684bbaa65d33a28aa9770f30beb518c> /System/Library/Frameworks/UIKit.framework/UIKit
0x1c174a000 - 0x1c174dfff AFKUser arm64  <69c1d09c8a403dfabb1a2d3e06c22000> /System/Library/PrivateFrameworks/AFKUser.framework/AFKUser
0x1c1aa1000 - 0x1c1b58fff APFS arm64  <823ea73b7581318ca59d5efb59d0e199> /System/Library/PrivateFrameworks/APFS.framework/APFS
0x1c1b59000 - 0x1c1b5efff ASEProcessing arm64  <43e5bc61f8ad3e9a8cea6787497bd35e> /System/Library/PrivateFrameworks/ASEProcessing.framework/ASEProcessing
0x1c2337000 - 0x1c233cfff AggregateDictionary arm64  <59d523348b21398b880ac82a7af28390> /System/Library/PrivateFrameworks/AggregateDictionary.framework/AggregateDictionary
0x1c3963000 - 0x1c3972fff AppleFSCompression arm64  <ff58c35416ed37628f2315b40db8e5c6> /System/Library/PrivateFrameworks/AppleFSCompression.framework/AppleFSCompression
0x1c398d000 - 0x1c39d0fff AppleJPEG arm64  <ca73b2334751376d8d20e48fc7bf9366> /System/Library/PrivateFrameworks/AppleJPEG.framework/AppleJPEG
0x1c3a69000 - 0x1c3a8cfff AppleSauce arm64  <98773b29d1ca32859bb2e33e372e7ad4> /System/Library/PrivateFrameworks/AppleSauce.framework/AppleSauce
0x1c426b000 - 0x1c4275fff CMCaptureCore arm64  <46a5a06a59cb33448f65493275cacd3b> /System/Library/PrivateFrameworks/CMCaptureCore.framework/CMCaptureCore
0x1c428f000 - 0x1c429efff CPMS arm64  <e39e55f4bd8b3eb8a2c67baa319925b5> /System/Library/PrivateFrameworks/CPMS.framework/CPMS
0x1c45b1000 - 0x1c45bcfff CaptiveNetwork arm64  <5d00f4e42152382fb63fbd925f29fd05> /System/Library/PrivateFrameworks/CaptiveNetwork.framework/CaptiveNetwork
0x1c4782000 - 0x1c47d0fff ChunkingLibrary arm64  <c720b94d770535e990d278956ad4c6d3> /System/Library/PrivateFrameworks/ChunkingLibrary.framework/ChunkingLibrary
0x1c4c8a000 - 0x1c4c8dfff ConstantClasses arm64  <0acd87d41849364085c69009cf692c90> /System/Library/PrivateFrameworks/ConstantClasses.framework/ConstantClasses
0x1c4ec3000 - 0x1c4fb4fff CoreBrightness arm64  <f0ead13cec4232fc864fceb96b90362b> /System/Library/PrivateFrameworks/CoreBrightness.framework/CoreBrightness
0x1c563c000 - 0x1c5644fff CorePhoneNumbers arm64  <64a166806f5031a997756c064232fe11> /System/Library/PrivateFrameworks/CorePhoneNumbers.framework/CorePhoneNumbers
0x1c6024000 - 0x1c604cfff CoreSVG arm64  <3217d7e9ae72350c87ebb30b3b364cc6> /System/Library/PrivateFrameworks/CoreSVG.framework/CoreSVG
0x1c6560000 - 0x1c659afff DocumentManager arm64  <7c3051c977cd374db31b43b733d94e4e> /System/Library/PrivateFrameworks/DocumentManager.framework/DocumentManager
0x1c659b000 - 0x1c65b9fff DocumentManagerCore arm64  <602d77fd1c8d3df6ab53f027fdb0695e> /System/Library/PrivateFrameworks/DocumentManagerCore.framework/DocumentManagerCore
0x1c663d000 - 0x1c663ffff DragUI arm64  <19371251fd3433e2b7299e371b5d8db5> /System/Library/PrivateFrameworks/DragUI.framework/DragUI
0x1c666e000 - 0x1c669efff EAP8021X arm64  <723dfd9ab82837e6a343f505d7e6144c> /System/Library/PrivateFrameworks/EAP8021X.framework/EAP8021X
0x1c681a000 - 0x1c6821fff ExtensionFoundation arm64  <3057cf1d42953e77929fb8679c6e9ff9> /System/Library/PrivateFrameworks/ExtensionFoundation.framework/ExtensionFoundation
0x1c69c8000 - 0x1c6ddafff FaceCore arm64  <1212449c1d813831a67f01c0bbb73ccd> /System/Library/PrivateFrameworks/FaceCore.framework/FaceCore
0x1c6f7a000 - 0x1c70b6fff libFontParser.dylib arm64  <811fcf65dfa1310ba7269cb3184c18c4> /System/Library/PrivateFrameworks/FontServices.framework/libFontParser.dylib
0x1c70b7000 - 0x1c70bffff libGSFont.dylib arm64  <23ada823abf434bda35b475e1b402f79> /System/Library/PrivateFrameworks/FontServices.framework/libGSFont.dylib
0x1c70c0000 - 0x1c70fdfff libGSFontCache.dylib arm64  <2e6bbc94fcb13b36bb6848ea16466410> /System/Library/PrivateFrameworks/FontServices.framework/libGSFontCache.dylib
0x1c7161000 - 0x1c716efff libhvf.dylib arm64  <c9c2ba49f172327fa09b274b163bebfa> /System/Library/PrivateFrameworks/FontServices.framework/libhvf.dylib
0x1c7dd5000 - 0x1c7df3fff GenerationalStorage arm64  <e5421432be29351b9a27bc7462df8a3d> /System/Library/PrivateFrameworks/GenerationalStorage.framework/GenerationalStorage
0x1c7df4000 - 0x1c7e01fff GraphVisualizer arm64  <8d7ecf3365e43e499586765506ebd73f> /System/Library/PrivateFrameworks/GraphVisualizer.framework/GraphVisualizer
0x1c7e38000 - 0x1c7e43fff HID arm64  <4121b87277253bc2bd754a4cba7daa72> /System/Library/PrivateFrameworks/HID.framework/HID
0x1c86ea000 - 0x1c86ecfff IOSurfaceAccelerator arm64  <d2c560b91ce9359f8aa43eb55cd6b530> /System/Library/PrivateFrameworks/IOSurfaceAccelerator.framework/IOSurfaceAccelerator
0x1c8710000 - 0x1c8717fff IdleTimerServices arm64  <545551ecfa1a38faa6836766fc80200d> /System/Library/PrivateFrameworks/IdleTimerServices.framework/IdleTimerServices
0x1c96b7000 - 0x1c977ffff MetalTools arm64  <b5ad1500f65a3872bed8180b6c3fee2d> /System/Library/PrivateFrameworks/MetalTools.framework/MetalTools
0x1c9894000 - 0x1c989afff MobileSystemServices arm64  <34a5144899f431068ab1eb0c593a56a8> /System/Library/PrivateFrameworks/MobileSystemServices.framework/MobileSystemServices
0x1c9ddb000 - 0x1c9e1bfff OTSVG arm64  <29902cc4eb1732728b22d4340051a2e6> /System/Library/PrivateFrameworks/OTSVG.framework/OTSVG
0x1ca423000 - 0x1ca44bfff Pasteboard arm64  <8326ef1a9c53387683bf62097e6c3ef6> /System/Library/PrivateFrameworks/Pasteboard.framework/Pasteboard
0x1ca69d000 - 0x1ca6e8fff PhysicsKit arm64  <8700df181762319689b0666d96317e0b> /System/Library/PrivateFrameworks/PhysicsKit.framework/PhysicsKit
0x1ca79c000 - 0x1ca7a7fff PointerUIServices arm64  <7af31d2a3bfe3889984fd2123249d11f> /System/Library/PrivateFrameworks/PointerUIServices.framework/PointerUIServices
0x1cc8ba000 - 0x1cc8c3fff SignpostCollection arm64  <32cfeee632f130839759f0825bea533f> /System/Library/PrivateFrameworks/SignpostCollection.framework/SignpostCollection
0x1cc8c4000 - 0x1cc8c4fff SignpostMetrics arm64  <5cfb0c69eb7e31c0a20c0dbb5da662c1> /System/Library/PrivateFrameworks/SignpostMetrics.framework/SignpostMetrics
0x1cc8c6000 - 0x1cc904fff SignpostSupport arm64  <297b123ed97a3d3e911caa9e50c9f51b> /System/Library/PrivateFrameworks/SignpostSupport.framework/SignpostSupport
0x1cd147000 - 0x1cd147fff SoftLinking arm64  <97fdfaaec8e5375bbcc4f54ccb9d35ed> /System/Library/PrivateFrameworks/SoftLinking.framework/SoftLinking
0x1cd653000 - 0x1cd690fff StreamingZip arm64  <728b1d8e97b23e95a25895b8c4ddd8e4> /System/Library/PrivateFrameworks/StreamingZip.framework/StreamingZip
0x1cd698000 - 0x1cd6a2fff SymptomDiagnosticReporter arm64  <b0f71b4cf8323f8f94c0ac3a51fb7a8f> /System/Library/PrivateFrameworks/SymptomDiagnosticReporter.framework/SymptomDiagnosticReporter
0x1cd729000 - 0x1cd739fff TCC arm64  <7d96fad4a42e3cfc9fa0d0819adc51c4> /System/Library/PrivateFrameworks/TCC.framework/TCC
0x1cdffc000 - 0x1ce0aefff TextureIO arm64  <8d6baa10d66b347f966b89ecb1ad7882> /System/Library/PrivateFrameworks/TextureIO.framework/TextureIO
0x1ce2c8000 - 0x1ce2cffff URLFormatting arm64  <a9906aa18ea53cf7a839182c8442d836> /System/Library/PrivateFrameworks/URLFormatting.framework/URLFormatting
0x1cf4e9000 - 0x1cf4eafff WatchdogClient arm64  <fd203ca56dc93fc0a6a4c565efccaee7> /System/Library/PrivateFrameworks/WatchdogClient.framework/WatchdogClient
0x1cf7aa000 - 0x1cfed2fff libwebrtc.dylib arm64  <95ef997e2cda36829d1e60e5af1001f2> /System/Library/PrivateFrameworks/WebCore.framework/Frameworks/libwebrtc.dylib
0x1d0462000 - 0x1d0465fff XCTTargetBootstrap arm64  <4db35f739c0e351dbab043c5d3f4c6ba> /System/Library/PrivateFrameworks/XCTTargetBootstrap.framework/XCTTargetBootstrap
0x1d04c1000 - 0x1d04e0fff caulk arm64  <3862d3b38b0339c096e2e1ecbc1eff2e> /System/Library/PrivateFrameworks/caulk.framework/caulk
0x1d2917000 - 0x1d291cfff kperf arm64  <b50ef8fda61f3350b15fd654c4338625> /System/Library/PrivateFrameworks/kperf.framework/kperf
0x1d291d000 - 0x1d2925fff kperfdata arm64  <86e99d81f33a34439b09a139668b516d> /System/Library/PrivateFrameworks/kperfdata.framework/kperfdata
0x1d2926000 - 0x1d293bfff libEDR arm64  <a09e7c62d2903d39b63575e7d9275262> /System/Library/PrivateFrameworks/libEDR.framework/libEDR
0x1d2957000 - 0x1d2967fff perfdata arm64  <d4bad467622e32c2b1b67c655a3dd666> /System/Library/PrivateFrameworks/perfdata.framework/perfdata
0x1d385d000 - 0x1d386cfff libAudioStatistics.dylib arm64  <941dacf1afb63a5f8e674a0b35d6d12b> /usr/lib/libAudioStatistics.dylib
0x1d3a06000 - 0x1d3a38fff libCRFSuite.dylib arm64  <38dd74de263e32c4aa9f98a5c1dbdf33> /usr/lib/libCRFSuite.dylib
0x1d3a39000 - 0x1d3a3afff libCTGreenTeaLogger.dylib arm64  <71c2384339923959a065ad15d9ea065a> /usr/lib/libCTGreenTeaLogger.dylib
0x1d3cdf000 - 0x1d3ce6fff libIOReport.dylib arm64  <47776e894e7c3d3cb063ed9653f68742> /usr/lib/libIOReport.dylib
0x1d3faf000 - 0x1d3fb1fff libapp_launch_measurement.dylib arm64  <d1735d998c2d3be78b696b6d39142141> /usr/lib/libapp_launch_measurement.dylib
0x1d3fb2000 - 0x1d3fc8fff libapple_nghttp2.dylib arm64  <15aed6e3e0873b0599ed6efe290b728a> /usr/lib/libapple_nghttp2.dylib
0x1d3fc9000 - 0x1d405afff libate.dylib arm64  <0c19f1907abc3e0ea07189310a496ee2> /usr/lib/libate.dylib
0x1d40e9000 - 0x1d40f9fff libbsm.0.dylib arm64  <143fbc15b02d338fb6a1b39767b0d8d6> /usr/lib/libbsm.0.dylib
0x1d40fa000 - 0x1d4106fff libbz2.1.0.dylib arm64  <080f312258a2361d9557680fa41fb3ea> /usr/lib/libbz2.1.0.dylib
0x1d4107000 - 0x1d4107fff libcharset.1.dylib arm64  <d2bfd5647e693ce2acbd75d812dcc6e1> /usr/lib/libcharset.1.dylib
0x1d411a000 - 0x1d4131fff libcompression.dylib arm64  <aed5585423dc3ee98604ba680abd1af2> /usr/lib/libcompression.dylib
0x1d4132000 - 0x1d4147fff libcoretls.dylib arm64  <10f0a6718f0f3a79bb127189648ca0fd> /usr/lib/libcoretls.dylib
0x1d4148000 - 0x1d4149fff libcoretls_cfhelpers.dylib arm64  <35c08391a163309589115dd323a82c36> /usr/lib/libcoretls_cfhelpers.dylib
0x1d416d000 - 0x1d4173fff libcupolicy.dylib arm64  <ef0f2a7ba6e936af8936e0db17e323ac> /usr/lib/libcupolicy.dylib
0x1d4174000 - 0x1d417bfff libdns_services.dylib arm64  <354111811df03f3dbc9422a2f0029e42> /usr/lib/libdns_services.dylib
0x1d4199000 - 0x1d4199fff libenergytrace.dylib arm64  <49849d3b12be3842a0dea70c436742c5> /usr/lib/libenergytrace.dylib
0x1d419a000 - 0x1d41b1fff libexpat.1.dylib arm64  <9380047a0ed13d20aa54a8ba1c7238d7> /usr/lib/libexpat.1.dylib
0x1d41e6000 - 0x1d42d7fff libiconv.2.dylib arm64  <d4a9a55a604038338f69b29eddf4984a> /usr/lib/libiconv.2.dylib
0x1d42fb000 - 0x1d42fcfff liblangid.dylib arm64  <4bb82b46fc223c43b783c6a6bd162e1b> /usr/lib/liblangid.dylib
0x1d42fd000 - 0x1d4308fff liblockdown.dylib arm64  <7c5295079d7e3d42bc17efc5e7f43fbc> /usr/lib/liblockdown.dylib
0x1d4309000 - 0x1d4321fff liblzma.5.dylib arm64  <3c34ab768cdb312aba64cb27ef9ec744> /usr/lib/liblzma.5.dylib
0x1d45cc000 - 0x1d45defff libmis.dylib arm64  <38cd9bee64a536f397b90688a3398702> /usr/lib/libmis.dylib
0x1d498e000 - 0x1d49c1fff libpcap.A.dylib arm64  <7480e8ed4b0a36aea58f3f22f7e371dc> /usr/lib/libpcap.A.dylib
0x1d49c2000 - 0x1d49cffff libperfcheck.dylib arm64  <616d38d57d6e3911ab6af0d9d561d9e4> /usr/lib/libperfcheck.dylib
0x1d49d7000 - 0x1d49e8fff libprequelite.dylib arm64  <6be5e72e06f733e18fa03f8477252e2e> /usr/lib/libprequelite.dylib
0x1d4b1a000 - 0x1d4b1dfff libutil.dylib arm64  <855d6c2ba0fe3bb987fc1750eaa844bb> /usr/lib/libutil.dylib
0x1d4b1e000 - 0x1d4c03fff libxml2.2.dylib arm64  <a1fa300be30537d5b8cd229bf10711f6> /usr/lib/libxml2.2.dylib
0x1d4c31000 - 0x1d4c42fff libz.1.dylib arm64  <b5c9f814a8163e21a9b1a7fb9cd49723> /usr/lib/libz.1.dylib
0x1d4e71000 - 0x1d4e76fff libcache.dylib arm64  <c03e75419e3838759e85571c9c91265e> /usr/lib/system/libcache.dylib
0x1d4e77000 - 0x1d4e83fff libcommonCrypto.dylib arm64  <398a60893251355c8e2a4a756006b994> /usr/lib/system/libcommonCrypto.dylib
0x1d4e84000 - 0x1d4e88fff libcompiler_rt.dylib arm64  <3b729469f4bc324f887d7760ae88dfdc> /usr/lib/system/libcompiler_rt.dylib
0x1d4e89000 - 0x1d4e91fff libcopyfile.dylib arm64  <c44a9ca1863931de8b239455d58fd5f6> /usr/lib/system/libcopyfile.dylib
0x1d4f72000 - 0x1d4f72fff liblaunch.dylib arm64  <239b4628269d3a30befc4a1cdde62200> /usr/lib/system/liblaunch.dylib
0x1d4f73000 - 0x1d4f78fff libmacho.dylib arm64  <1f4e88a2765131f19fbc3e4e4778513d> /usr/lib/system/libmacho.dylib
0x1d4f79000 - 0x1d4f7bfff libremovefile.dylib arm64  <20332a9fbf18357daa68f9d3c38de5ef> /usr/lib/system/libremovefile.dylib
0x1d4f7c000 - 0x1d4f7dfff libsystem_blocks.dylib arm64  <c82a363dbe2937079b856b63e9750ac6> /usr/lib/system/libsystem_blocks.dylib
0x1d4f7e000 - 0x1d4f80fff libsystem_collections.dylib arm64  <529aa57f7ed83d6582239e358795e383> /usr/lib/system/libsystem_collections.dylib
0x1d4f81000 - 0x1d4f85fff libsystem_configuration.dylib arm64  <7aeaf1d58b8c3916b207dfe53f70d36f> /usr/lib/system/libsystem_configuration.dylib
0x1d4f86000 - 0x1d4f96fff libsystem_containermanager.dylib arm64  <0e46f112fbab39ae80c66e7f2d8a88c7> /usr/lib/system/libsystem_containermanager.dylib
0x1d4f97000 - 0x1d4f98fff libsystem_coreservices.dylib arm64  <0676c79bd19e3733bc767cb4bb5ea03e> /usr/lib/system/libsystem_coreservices.dylib
0x1d4f99000 - 0x1d4fa2fff libsystem_darwin.dylib arm64  <2ec6f22cd9323dadae5f69e95eead17d> /usr/lib/system/libsystem_darwin.dylib
0x1d4fa3000 - 0x1d4fabfff libsystem_dnssd.dylib arm64  <0105e492820c3b28818db2a4faabc858> /usr/lib/system/libsystem_dnssd.dylib
0x1d4fac000 - 0x1d4faefff libsystem_featureflags.dylib arm64  <6740a2aaf41b3c3a8065cf127b500502> /usr/lib/system/libsystem_featureflags.dylib
0x1d4faf000 - 0x1d4fdcfff libsystem_m.dylib arm64  <5a30e5550a8d3d4f958099a8e166f84b> /usr/lib/system/libsystem_m.dylib
0x1d4fdd000 - 0x1d4fe7fff libsystem_platform.dylib arm64  <4eb8aaf4abbe393ebeb7709438b60b01> /usr/lib/system/libsystem_platform.dylib
0x1d4fe8000 - 0x1d4fe8fff libsystem_product_info_filter.dylib arm64  <9f86cf4ccb7633dd847ad851dafe9fde> /usr/lib/system/libsystem_product_info_filter.dylib
0x1d4fe9000 - 0x1d4ff9fff libsystem_pthread.dylib arm64  <9a31891727db312e91d681661034fcc6> /usr/lib/system/libsystem_pthread.dylib
0x1d4ffa000 - 0x1d4ffdfff libsystem_sandbox.dylib arm64  <98c632a1deb039d3924f81fed09a1cd7> /usr/lib/system/libsystem_sandbox.dylib
0x1d4ffe000 - 0x1d5007fff libunwind.dylib arm64  <a8f36de8879b32c2a0eeceb65e6d8fe7> /usr/lib/system/libunwind.dylib
0x1d5008000 - 0x1d5039fff libxpc.dylib arm64  <2c2fdbd6c4a93dfbb3850ecf6f0f97f8> /usr/lib/system/libxpc.dylib

EOF
```



根据关键行提取崩溃信息的 UUID (**0a5d60f50d1d30dfa904fc494041b25b**)

```
Binary Images:
0x1024f0000 - 0x1024f7fff TestBacktrace arm64  <0a5d60f50d1d30dfa904fc494041b25b> /var/containers/Bundle/Application/D4D45804-0E43-44B4-81BB-0DBB7E145B23/TestBacktrace.app/TestBacktrace
```



转换UUID 格式

```sh
$ echo "0a5d60f50d1d30dfa904fc494041b25b" | sed 's/\(........\)\(....\)\(....\)\(....\)/\1-\2-\3-\4-/' | awk '{print toupper($0)}'
$ 0A5D60F5-0D1D-30DF-A904-FC494041B25B
```



查看 dSYM 文件对应的 UUID

```shell
$ xcrun dwarfdump --uuid <dSYM-path>
```



在本机根据 UUID 查找对应的 dSYM 文件

```shell
$ mdfind "com_apple_xcode_dsym_uuids == 0A5D60F5-0D1D-30DF-A904-FC494041B25B"
```





### 符号化流程

1. 获取崩溃日志信息
   - 运行起始地址
   - 偏移量
   - 运行时堆栈地址

2. 获取 dSYM 文件起始地址

3. 计算崩溃日志在 dSYM 文件内的运行时地址
   - dSYM 文件起始地址 + 崩溃文件内获取的偏移量 = 崩溃日志在 dSYM 文件内的运行时地址

4. 根据 dSYM 文件内的运行时地址 获取具体函数信息
5. 组装并格式化信息



#### 崩溃日志关键信息

```
Thread 0 name:  Dispatch queue: com.apple.main-thread
Thread 0 Crashed:
0   libsystem_kernel.dylib        	0x00000001b9fb495c 0x1b9f8e000 + 158044
1   libsystem_pthread.dylib       	0x00000001d4ff39e8 0x1d4fe9000 + 43496
2   libsystem_c.dylib             	0x0000000198396934 0x198323000 + 473396
3   libc++abi.dylib               	0x00000001a306ecc8 0x1a305c000 + 77000
4   libc++abi.dylib               	0x00000001a3060ca0 0x1a305c000 + 19616
5   libobjc.A.dylib               	0x00000001a2f72f64 0x1a2f69000 + 40804
6   libc++abi.dylib               	0x00000001a306e154 0x1a305c000 + 74068
7   libc++abi.dylib               	0x00000001a3070e68 0x1a305c000 + 85608
8   libobjc.A.dylib               	0x00000001a2f72e64 0x1a2f69000 + 40548
9   CoreFoundation                	0x000000018f6c52ec 0x18f632000 + 602860
10  GraphicsServices              	0x00000001a57c0598 0x1a57bd000 + 13720
11  UIKitCore                     	0x0000000191f8b004 0x19146a000 + 11669508
12  UIKitCore                     	0x0000000191f905d8 0x19146a000 + 11691480
13  TestBacktrace                 	0x00000001024f63f0 0x1024f0000 + 25584
14  libdyld.dylib                 	0x000000018f3a4598 0x18f3a3000 + 5528
```



提取关键行

```
13  TestBacktrace                 	0x00000001024f63f0 0x1024f0000 + 25584
```

**TestBacktrace** 是二进制文件名称

**0x00000001024f63f0** 运行时堆栈地址

**0x1024f0000** 运行时起始地址

**25584** 偏移量 (十进制转成十六进制为: 0x63f0)

> 0x1024f0000 + 0x63f0 = 0x1024f630f



#### 获取 dSYM 地址地址

```shell
$ otool -l TestBacktrace.app.dSYM/Contents/Resources/DWARF/TestBacktrace | grep __TEXT -C 5 
   nsects 0
    flags 0x0
Load command 4
      cmd LC_SEGMENT_64
  cmdsize 712
  segname __TEXT
   vmaddr 0x0000000100000000
   vmsize 0x0000000000008000
  fileoff 0
 filesize 0
  maxprot 0x00000005

......
```

起始地址为: **0x0000000100000000**



#### 计算崩溃地址在 dSYM 内运行时地址

> 0x0000000100000000 + 0x63f0 = 0x00000001000063f0



#### 获取具体函数信息

```shell
$ TestBacktrace.app.dSYM --lookup 0x00000001000063f0           
TestBacktrace.app.dSYM/Contents/Resources/DWARF/TestBacktrace:	file format Mach-O arm64
0x00047722: Compile Unit: length = 0x00000117 version = 0x0004 abbr_offset = 0x0000 addr_size = 0x08 (next unit at 0x0004783d)

0x0004772d: DW_TAG_compile_unit
              DW_AT_producer	("Apple clang version 12.0.0 (clang-1200.0.32.27)")
              DW_AT_language	(DW_LANG_ObjC)
              DW_AT_name	("/Users/peak/Desktop/symbol-backtrace/ObjC/TestBacktrace/TestBacktrace/main.m")
              DW_AT_LLVM_sysroot	("/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS14.2.sdk")
              DW_AT_APPLE_sdk	("iPhoneOS14.2.sdk")
              DW_AT_stmt_list	(0x0000a9dc)
              DW_AT_comp_dir	("/Users/peak/Desktop/symbol-backtrace/ObjC/TestBacktrace")
              DW_AT_APPLE_optimized	(true)
              DW_AT_APPLE_major_runtime_vers	(0x02)
              DW_AT_low_pc	(0x0000000100006398)
              DW_AT_high_pc	(0x0000000100006410)

0x0004775d:   DW_TAG_subprogram
                DW_AT_low_pc	(0x0000000100006398)
                DW_AT_high_pc	(0x0000000100006410)
                DW_AT_frame_base	(DW_OP_reg29 W29)
                DW_AT_call_all_calls	(true)
                DW_AT_name	("main")
                DW_AT_decl_file	("/Users/peak/Desktop/symbol-backtrace/ObjC/TestBacktrace/TestBacktrace/main.m")
                DW_AT_decl_line	(11)
                DW_AT_prototyped	(true)
                DW_AT_type	(0x00047824 "int")
                DW_AT_external	(true)
                DW_AT_APPLE_optimized	(true)
Line info: file 'main.m', line 17, column 12, start line 11
```



- **DW_TAG_Subprogram** 表示这个DIE单元表示的是函数方法。
- **DW_AT_low_pc** 表示这个方法起始地址为 0x0000000100006398 。
- **DW_AT_high_pc** 表示这个方法结束地址为 0x0000000100006410 。这就表示崩溃日志中 **0x00000001024f63f0** 转化后的偏移地址 **0x00000001000063f0** 正好位于这 DW_AT_low_p 和 DW_AT_high_pc 之间。
- **DW_AT_name** 表示我们的函数名为 main。
- **DW_AT_decl_file**表示函数所在文件路径为 main.m。
- **DW_AT_decl_line** 表示函数开始行数为 11。



#### 组装并格式化

```
3   TestBacktrace                   0x00000001024f63f0 -main + 25584 (main.m:11
```



### symbolicatecrash 

通过 symbolicatecrash 命令行来符号化日志

```shell
export DEVELOPER_DIR="/Applications/XCode.App/Contents/Developer"
	symbolicatecrash="/Applications/Xcode.App/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash"

${symbolicatecrash} ${crashFile} -d ${dSYMFile} -o symbol.log
```

