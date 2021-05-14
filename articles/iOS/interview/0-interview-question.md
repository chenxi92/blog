### iOS 基础题

1. 分类和扩展有什么区别？可以分别用来做什么？分类有哪些局限性？分类的结构体里面有哪些成员？

	- [分类与扩展使用总结](./1-category-and-extension.md)


2. 讲一下 atomic 的实现机制；为什么不能保证绝对的线程安全（最好可以结合场景来说）？

   - [原子操作的理解](./2-atomic.md)
3. 被weak修饰的对象在被释放的时候会发生什么？是如何实现的？知道sideTable么？里面的结构可以画出来么？



4. 关联对象有什么应用? 系统如何管理关联对象？其被释放的时候需要手动将所有的关联对象的指针置空么？



5. KVO的底层实现？如何取消系统默认的KVO并手动触发（给KVO的触发设定条件：改变的值符合某个条件时再触发KVO）？



6. Autoreleasepool所使用的数据结构是什么？AutoreleasePoolPage结构体了解么？



7. 讲一下对象，类对象，元类，跟元类结构体的组成以及他们是如何相关联的？为什么对象方法没有保存的对象结构体里，而是保存在类对象的结构体里？



8. class\_ro\_t 和  class\_rw\_t 的区别？



9. iOS 中内省的几个方法？class方法和objc_getClass方法有什么区别?



10. 在运行时创建类的方法objc_allocateClassPair的方法名尾部为什么是pair（成对的意思）？



11. 一个int变量被__block修饰与否的区别？



12. 为什么在block外部使用\_\_weak修饰的同时需要在内部使用\_\_strong修饰？



13. RunLoop的作用是什么？它的内部工作机制了解么？（最好结合线程和内存管理来说）



14. 哪些场景可以触发离屏渲染？



15. 各个属性关键字的作用？

	- [iOS属性相关面试题](https://github.com/chenxi141017/blog/blob/master/articles/interview-iOS/property.md)


16. 常见的Objec-C的数据类型有哪些，和C的基本数据类型有什么区别？



17. iOS 多线程？

	- [iOS 多线程](https://github.com/chenxi141017/blog/blob/master/articles/iOS-multiple-thread.md)


18. 举例说明iOS响应链？



19. 说说对闭包(block)的认识，以及闭包在iOS中的应用场景？



20. iOS App间常用的通信方式有哪些？



21. 子View超出了父view的bounds，如何让子view响应点击事件？



22. 如何理解iOS runtime？



23. WebView中cookie的理解？



24. 消息转发经过了什么？



25. 怎么快速找到调用函数，做了什么处理？方法列表和继承有关系吗?



26. GCD怎么开辟线程？ 如何设置最大线程数？



### iOS 实战题

1. AppDelegate如何瘦身？

	- [AppDelegate瘦身指南](https://blog.csdn.net/zhuweideng/article/details/79607226)


2. 反射是什么？可以举出几个应用场景么？

	- [iOS反射机制](https://www.jianshu.com/p/5bbde2480680)


3. 有哪些场景是NSOperation比GCD更容易实现的？（或是NSOperation优于GCD的几点）

	- [NSoperation和GCD的使用场景](https://blog.csdn.net/neilhuang/article/details/51050892)


4. App 启动优化策略？最好结合启动流程来说（main()函数的执行前后都分别说一下）

	- [iOS App 启动性能优化](https://blog.csdn.net/Tencent_Bugly/article/details/77363817?locationNum=1&fps=1)


5. App 无痕埋点的思路了解么？你认为理想的无痕埋点系统应该具备哪些特点?



6. 你知道有哪些情况会导致app崩溃，分别可以用什么方法拦截并化解?



7. 你知道有哪些情况会导致app卡顿，分别可以用什么方法来避免？



8. 简单解释下Native App、Web App 和 Hybrid App？ 开发Hybrid App需要注意的关注点？



### 项目题

1. 音视频格式有哪些？

2. 视频直播的流程？ 拉流，推流，编码，解码的过程？

3. 屏幕录制如何实现？

4. 视频合成如何实现？ 

### 网络题

1. App 网络层有哪些优化策略？

	- [IOS移动APP网络层设计方案](https://casatwy.com/iosying-yong-jia-gou-tan-kai-pian.html)

2. TCP为什么要三次握手，四次挥手？

	- [TCP三次握手及四次挥手详解及常见面试题](https://blog.csdn.net/ZWE7616175/article/details/80432486)

3. 对称加密和非对称加密的区别？分别有哪些算法的实现？

	- [对称加密和非对称加密的区别？分别有哪些算法的实现？](https://www.jianshu.com/p/4d162a32d105)

4. HTTPS的握手流程？为什么密钥的传递需要使用非对称加密？双向认证了解么？

	- [Https单向认证和双向认证](https://blog.csdn.net/duanbokan/article/details/50847612)，因为安全性考虑，参考上题对称加密和非对称加密的区别。双向认证图解：[图解 https 单向认证和双向认证！](https://blog.csdn.net/superviser3000/article/details/80812263?utm_source=blogxgwz0)

5. HTTPS是如何实现验证身份和验证完整性的？

	- [详解HTTPS是如何确保安全性的？](https://blog.csdn.net/wx_962464/article/details/51043069)

6. 如何用Charles抓HTTPS的包？其中原理和流程是什么？

	- [浅谈Charles抓取HTTPS原理](https://www.jianshu.com/p/405f9d76f8c4)

7. 什么是中间人攻击？如何避免？

	- [HTTPS原理以及HTTPS中间人攻击](http://ju.outofmemory.cn/entry/327252)

8. 说说对http的理解？



### 计算机系统题

1. 了解编译的过程么？分为哪几个步骤？

	- [iOS App 的编译过程](https://blog.csdn.net/aas319/article/details/78606342)

2. 静态链接了解么？



3. 静态库和动态库的区别？

	- [iOS 静态库和动态库（库详解）](https://www.cnblogs.com/junhuawang/p/7598236.html)


4. 内存的几大区域，各自的职能分别是什么？

	- [iOS 内存的几大区域](https://www.jianshu.com/p/6fe8bf22acfb)

5. static和const有什么区别？

	- [iOS开发中Static和Const关键字的的作用](https://www.cnblogs.com/canghaixiaoyuer/p/4651504.html)


6. 了解内联函数么？

	- [iOS OC内联函数 inline](https://www.jianshu.com/p/d557b0831c6a),讲了宏和内联函数[华山论剑之浅谈iOS的宏定义以及内联函数的使用](https://www.jianshu.com/p/a39e79b1bed8)

7. 什么时候会出现死锁？如何避免？

	**参考：**[什么是死锁，发生原因是什么，如何解决和避免产生死锁？](https://blog.csdn.net/changfengxia/article/details/80313822)

8. 说一说你对线程安全的理解？

	**参考：**延伸解释了多线程以及各个多线程:[iOS多线程全套：线程生命周期，多线程的四种解决方案，线程安全问题，GCD的使用，NSOperation的使用](http://www.cocoachina.com/ios/20170707/19769.html)

9. 列举你知道的线程同步策略？

	**参考：**[iOS-线程同步详解](http://www.linyibin.cn/2015/04/18/ios-Thread-Sync/)

10. 有哪几种锁？各自的原理？它们之间的区别是什么？最好可以结合使用场景来说

	**参考：**[深入理解 iOS 开发中的锁](https://juejin.im/post/57f6e9f85bbb50005b126e5f)

### 设计模式题

1. 除了单例，观察者设计模式以外，还知道哪些设计模式？分别介绍一下
最喜欢哪个设计模式？为什么？

	- [iOS最实用的13种设计模式，iOS 中的 21 种设计模式](https://www.jianshu.com/p/9c4a219e9cf9),设计模式可以有很多种。

2. iOS SDK 里面有哪些设计模式的实践？

	- [iOS开发：设计模式那点事](http://www.cocoachina.com/ios/20141111/10187.html)，[iOS中那些精妙的设计模式](https://www.jianshu.com/p/42259126e96f)

3. 设计模式是为了解决什么问题的？



4. 设计模式的成员构成以及工作机制是什么？

	- [面向对象设计的六大设计原则](http://www.cocoachina.com/ios/20180914/24916.html)

5. 设计模式的优缺点是什么？

	- [iOS重构实践。](http://www.cocoachina.com/ios/20180322/22721.html)

### 架构 & 设计题

1. MVC和MVVM的区别？MVVM和MVP的区别？

	- [iOS 架构模式](https://blog.coding.net/blog/ios-architecture-patterns)

2. 面向对象的几个设计原则了解么？最好可以结合场景来说。



3. 可以说几个重构的技巧么？你觉得重构适合什么时候来做？



4. 你觉得框架和设计模式的区别是什么？



5. 看过哪些第三方框架的源码，它们是怎么设计的？设计好的地方在哪里，不好的地方在哪里，如何改进？（这道题的后三个问题的难度已经很高了，如果不是太N的公司不建议深究）



### 数据结构&算法题

1. 链表和数组的区别是什么？插入和查询的时间复杂度分别是多少？

	- [链表与数组的区别](https://blog.csdn.net/sunjiangangok/article/details/69943631),大致从内存存储，逻辑结构方面讲区别, [常用数据结构及复杂度](http://www.cnblogs.com/gaochundong/p/data_structures_and_asymptotic_analysis.html)。

2. 哈希表是如何实现的？<br>如何解决地址冲突？

	- [哈希表的设计与实现](https://blog.csdn.net/u010150046/article/details/76638174)，大概两种开放定址和链地址。

3. 排序题：<br>冒泡排序，选择排序，插入排序，快速排序（二路，三路）能写出那些？

	- [图形化排序算法比较：快速排序、插入排序、选择排序、冒泡排序](https://blog.csdn.net/zzzzzdddddxxxxx/article/details/53084903),很形象的比较了各种排序时间。<br>[常见排序算法](https://github.com/chenxi141017/blog/blob/master/articles/sort.md)

4. 链表题：<br>如何检测链表中是否有环？<br>如何删除链表中等于某个值的所有节点？<br>如何找到链表中的共同节点？

	- [判断单链表中是否有环，找到环的入口节点](https://blog.csdn.net/u011373710/article/details/54024366), 图文详解。<br>删除节点：[删除链表中等于给定值val的所有节点](https://blog.csdn.net/ssisse/article/details/50878199)

5. 数组题：<br>如何在有序数组中找出和等于给定值的两个元素？<br>如何合并两个有序的数组之后保持有序？

	- [在排序数组中寻找两个数的和等于给定数，合并两个有序数组成一个有序数组](https://blog.csdn.net/jiangyi711/article/details/5833072)

6. 二叉树题：<br>如何反转二叉树？<br>如何验证两个二叉树是完全相等的？

	- [反转二叉树--递归和非递归](https://blog.csdn.net/suibianshen2012/article/details/52068332)

7. 计算时间复杂度和空间复杂度？


#### 参考
[题目来源](https://juejin.im/post/5b56155e6fb9a04f8b78619b)

[答案来源](https://juejin.im/post/5b9b22d16fb9a05cdf307f1f)

[开发小知识（一）](https://www.jianshu.com/p/5a4ba3c165b9)

[开发小知识(二)](https://www.jianshu.com/p/13bfaf210567)