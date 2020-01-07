### 目录

- [1. iOS 处理警告](#ios-warning)
- [2. Github搜索技巧](#github-search)
- [3. Google 搜索技巧](#google-search)
- [4. Xcode 崩溃调试技巧](#xcode-debug-crash)

#### <a name="ios-warning"></a>iOS 处理警告⚠️

##### 基本语法

```
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-relevant command"
    // your code
#pragma clang diagnostic pop
```

**1. 未使用变量警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wunused-variable"  
    NSInteger variableValue;   
#pragma clang diagnostic pop
```

**2. 方法弃用警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wdeprecated-declarations"  
    // Some function be deprecated   
#pragma clang diagnostic pop
```

**3. 不兼容指针类型**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wincompatible-pointer-types"  
   //  
#pragma clang diagnostic pop
```

**4. 循环引用**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored "-Warc-retain-cycles" 
   // retain cycles code. 
#pragma clang diagnostic pop
```

**5. 内存泄漏警告**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored   "-Warc-performSelector-leaks"
    // persform selector leaks code.
#pragma clang diagnostic pop
```

#### <a name="github-search">Github 搜索技巧

- 搜索star数目
	- `stars:>200`
	- `stars:<500`
	- `stars:"10..50"`

- 指定语言
	- language: Objective-C

- 截止日期
	- created:"2019-3-29"

[高级搜索页面](https://github.com/search/advanced)



#### <a name="google-search">Google 搜索技巧



1. ##### 完全匹配

   使用双引号 `""` 来进行精确匹配

2. ##### 排除关键词 

   使用减号 `-` 来排除某个关键词

3. ##### 模糊匹配

   使用星号 `*` 来进行模糊匹配

4. ##### 指定站点

   使用关键词 `site:` 来搜索指定站点

5. ##### 指定文件类型

   使用关键词 `typefile:` 来指定搜索的文件类型



#### <a name="xcode-debug-crash">Xcode 调试崩溃

`Show the Breakpoint navigator`  -->  `+`  --> `Exception Breakpoint`

点击 `Action`，选中 `Deebugger Command`, 添加 `po $arg1` 参数。

[Xcode-debugging-trick](https://www.natashatherobot.com/xcode-debugging-trick/)