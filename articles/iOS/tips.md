### 目录

- [1. iOS 处理警告](#ios-warning)
- [2. Github搜索技巧](#github-search)
- [3. Google 搜索技巧](#google-search)
- [4. Xcode 崩溃调试技巧](#xcode-debug-crash)
- [5. Xcode 调试return](#xcode-debug-return)
- [6. Mac 看看端口号](#kill-port)



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

   `Mercedes -benz` 搜索 Mercedes 但是排除 benz 相关内容

3. ##### 模糊匹配

   使用星号 `*` 来进行模糊匹配

4. ##### 指定站点

   使用关键词 `site:` 来搜索指定站点

   `site:.gov covid-19`

5. ##### 指定文件类型

   使用关键词 `typefile:` 来指定搜索的文件类型
   
6. 计时器

   输入 `stopwatch`  或者 `timer`

7. 颜色提取

   输入 `color picker`  或者  `rgb 50 50 80`

8. 显示ip

   输入 `what is my ip` 或者 `my ip`

9. 世界时钟

   输入 `Japan time 5pm`

10. 查看社交媒体

    输入 `@username` 

11. 十万个为什么

    输入 `I’m feeling curious`

[参考 10 hidden features in google search](https://medium.com/swlh/10-hidden-features-in-google-search-83b347b48157)



#### <a name="xcode-debug-crash">Xcode 调试崩溃

`Show the Breakpoint navigator`  -->  `+`  --> `Exception Breakpoint`

点击 `Action`，选中 `Deebugger Command`, 添加 `po $arg1` 参数。

[Xcode-debugging-trick](https://www.natashatherobot.com/xcode-debugging-trick/)



#### <a name="xcode-debug-return">Xcode 调试return

1. 在函数入口添加断点；

2. 控制台输入如下指令并回车；

``` shell
breakpoint set -p return
或者输入:
br set -p return
```

3. 断点执行continue操作；

[如何断点到函数的return](https://mp.weixin.qq.com/s?__biz=MzUxMTkwNDg0OQ==&mid=2247484659&idx=1&sn=775d9f018330360a4aeda18709f5869e&chksm=f96dd9cdce1a50dbf0d755c041d3ecd63c208c4817f69634acafb38e0e1b383cdea12931c943&mpshare=1&scene=1&srcid=&sharer_sharetime=1587606656735&sharer_shareid=ba950e64c9e1fd56aad199c82bacc05d#rd)



#### <a name="kill-port">Mac 看看端口号

查看指定端口号

```sh
lsof -i :<port>
```



输入:

```bash
lsof -i :6008
```



输出：

```bash
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    76562 karmas   35u  IPv6 0x5b30baecc79198f9      0t0  TCP *:6008 (LISTEN)
```



杀掉相关进程

```bash
kill -9 <PID>
```

