#### SIG(11) 崩溃

现象： 

1. Unity 项目导出的 Xcode 工程通过命令行导出的 ipa 运行一段时间后崩溃； 
2. 在 Xcode上真机运行正常；
3. 通过 Xcode 导出 ipa 运行正常；

4. 导出 ipa 命令：

```shell
# 生成 archive 文件
xcodebuild \
		-sdk iphoneos \
		-configuration Debug \
		-target ${target} \
		-scheme ${target} \
		CODE_SIGN_IDENTITY="${sign}" \
		PROVISIONING_PROFILE_SPECIFIER="${profile}" \
		-archivePath ${archivePath}\
		-quiet \
		archive

# 导出 ipa
xcodebuild \
		-exportArchive \
	    -archivePath ${archivePath} \
	    -exportOptionsPlist ${exportOptionsPlist} \
	    -exportPath ${exportPath} \
	    -quiet
```

5. Bugly 上报错误信息为：

```
SIGSEGV
SEGV_ACCERR
```



思路：

Xcode 可能会对 ipa 文件做优化，导致命令行导出的 ipa 运行后崩溃；

优化设置一般是在 `Build Settings` 中；

命令行选择的是 `Debug` 配置；Xcode 默认选中了 `Release` 配置；

Xcode 修改编译配置为 `Debug` , 真机运行一段时间后还是崩溃；

- 崩溃由于堆栈调用过深导致

iOS 线程堆栈大小信息：

- 主线程堆栈大小为 1 MB且无法更改；
- 辅助线程默认会分配 512 KB 的堆栈大小



解决方法：

1. 在 Debug 配置下设置堆栈大小到 16 MB

- `Xcode` -> `Build Settings` -> `Other Linker Flags` 添加 `-Wl,-stack_size,1000000`  

2. 打包脚本制定 Release 配置



原因：

Unity 项目采用了 ILRuntime 框架， 导致代码调用层级比较深，会出现爆栈现象。



参考链接

[ILRuntime 常见问题解答](https://ourpalm.github.io/ILRuntime/public/v1/guide/FastQA.html)

[Concurrent Programming](https://www.oreilly.com/library/view/high-performance-ios/9781491910993/ch04.html)

[Customizing Process Stack Size](https://developer.apple.com/library/archive/qa/qa1419/_index.html)