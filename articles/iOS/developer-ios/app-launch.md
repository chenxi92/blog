

#### App 启动分类

- 冷启动

  > App 点击前，它的进程不在系统内，需要系统创建一个进程分配给它启动。

- 热启动

  > App 在冷启动后用户将App退后台，在 App 的进程还在系统内的情况下，用户重新启动进入 App 的过程。



#### App 冷启动流程

1. main() 函数执行前；
2. main() 函数执行后；
3. 首屏渲染完成后；



##### main() 函数执行前

- 加载可执行文件（App 的 .o 文件集合)
- 加载动态链接库，进行 rebase 指针调整和 bind 符号绑定；
- Objc 运行时的初始化处理，包括 Objc 相关类的注册、category 注册、selector 唯一性检查；
- 初始化（执行 +load() 方法、 attribute((constructor)) 修饰的函数的调用、创建 C++ 静态全局变量



##### main() 函数执行后

指的是从 main() 函数开始执行 到 appDelegate 的 didFinishLaunchingWithOptions 方法里 首屏渲染相关方法执行完成。

- 首屏初始化所需配置文件的读写操作；
- 网络数据读取；
- 首屏渲染的大量计算；



##### 首屏渲染完成后

值的是 从首屏渲染完成后开始到 didFinishLaunchingWithOptions 方法作用域结束。



#### 优化方法

减少动态库加载（多个动态库进行合并， 建议使用6个非系统动态库)

减少无用类

+load() 方法延后执行或者放到 +initialize() 方法内

控制 C++ 全局变量的数量

非首屏业务的初始化、监听、配置文件读取等都放到首屏渲染完成之后操作

定时抓取方法调用堆栈，计算一段时间里各个方法的耗时

对 objc_msgSend 方法进行 hook 来掌握所有方法的执行耗时



#### objc_msgSend

objc_msgSend 用汇编语言编写，主要原因：

- 调用频次最高，汇编在性能上更优化；
- 能实现跳转到任意函数指针的功能；



[源代码位置](https://opensource.apple.com/source/objc4/objc4-723/runtime/Messengers.subproj/)



objc_msgSend 执行逻辑： 先获取对象对应的类的信息，在获取该类的方法缓存，根据方法的 selector 查找函数指针，经过异常错误处理后跳转到对应函数的实现。





