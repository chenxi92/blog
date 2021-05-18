weak 的用处用一句话可归纳为：**弱引用，在对象释放后置为 nil，避免错误的内存访问**。<br>用更通俗的话来表述是：weak 可以在不增加对象的引用计数的同时，又使得指针的访问是安全的。



#### 实现weak后，为什么对象释放后会自动为nil

`runtime` 对注册的类， 会进行布局，对于 weak 对象会放入一个 `hash` 表中。 用 weak 指向的对象内存地址作为 key，当此对象的引用计数为 0 的时候会 dealloc，假如 weak 指向的对象内存地址是 a ，那么就会以 a 为键， 在这个 weak 表中搜索，找到所有以 a 为键的 weak 对象，从而设置为 `nil` 。



#### 当weak引用指向的对象被释放时，又是如何去处理weak指针的呢？

1. 调用 objc_release
2. 因为对象的引用计数为0，所以执行 dealloc
3. 在 dealloc中，调用了_objc_rootDealloc 函数
4. 在 _objc_rootDealloc 中，调用了object_dispose 函数
5. 调用 objc_destructInstance
6. 最后调用 objc_clear_deallocating,详细过程如下：

```
a. 从weak表中获取废弃对象的地址为键值的记录
b. 将包含在记录中的所有附有 weak 修饰符变量的地址，赋值为 nil
c. 将 weak 表中该记录删除
d. 从引用计数表中删除废弃对象的地址为键值的记录
```



#### weak实现原理：

`Runtime` 维护了一个 weak 表，用于存储指向某个对象的所有 weak 指针。weak 表其实是一个hash（哈希）表，key 是所指对象的地址，value 是 weak 指针的地址（这个地址的值是所指对象指针的地址）数组。

1. 初始化时：runtime 会调用 `objc_initWeak` 函数，初始化一个新的 weak 指针指向对象的地址。
2. 添加引用时：`objc_initWeak `函数会调用 `objc_storeWeak()` 函数， `objc_storeWeak()` 的作用是更新指针指向，创建对应的弱引用表。
3. 释放时，调用 `clearDeallocating` 函数。`clearDeallocating` 函数首先根据对象地址获取所有 weak 指针地址的数组，然后遍历这个数组把其中的数据设为 nil，最后把这个 entry 从 weak 表中删除，最后清理对象的记录。



#### SideTable

`SideTable `是一个用 `C++` 实现的类，它的具体定义在[NSObject.mm](https://opensource.apple.com/source/objc4/objc4-532.2/runtime/NSObject.mm)中, 它主要用于管理对象的引用计数和 weak 表。在 NSObject.mm 中声明其数据结构：

```c
struct SideTable {
	// 保证原子操作的自旋锁
    spinlock_t slock;
    // 引用计数的 hash 表
    RefcountMap refcnts;
    // weak 引用全局 hash 表
    weak_table_t weak_table;
}
```
weak表是一个弱引用表，实现为一个weak_table_t结构体，存储了某个对象相关的的所有的弱引用信息。其定义如下(具体定义在[objc-weak.h](https://opensource.apple.com/source/objc4/objc4-646/runtime/objc-weak.h)中)：

```c
struct weak_table_t {
    // 保存了所有指向指定对象的 weak 指针
    weak_entry_t *weak_entries;
    // 存储空间
    size_t    num_entries;
    // 参与判断引用计数辅助量
    uintptr_t mask;
    // hash key 最大偏移值
    uintptr_t max_hash_displacement;
};
```



#### weak singleton

在所有使用该单例的对象都释放后，单例对象本身也会自己释放。我所见过的大部分单例使用场景，被创建都单例最后都会一直存活着，比如注册登录模块所需要共享状态所创建的 `XXLoginManager`，即使在用户注册成功进入主界面之后也不会被显式的释放，这在一定程度上会带来内存使用的浪费。所谓的「`weak singleton`」代码很简单：

```
+ (id)sharedInstance
{
    static __weak ASingletonClass *instance;
    ASingletonClass *strongInstance = instance;
    @synchronized(self) {
        if (strongInstance == nil) {
            strongInstance = [[[self class] alloc] init];
            instance = strongInstance;
        }
    }
    return strongInstance;
}
```

Controller A， B， C 都可以持有 `ASingletonClass` 的强引用，一旦 A，B，C 都销毁后，`ASingletonClass` 的单例对象也会随之销毁，略巧妙不是吗？

「weak singleton」这个漂亮名字背后其实只是简单而巧妙的利用了 weak 特性，sharedInstance 中的 weak 就像是一个智能管家，在无人使用 instance 之后就置为 nil 销毁，当 sharedInstance 再次被调用时，instance 又会重新被创建。

#### 参考
1. [iOS weak 关键字漫谈](http://mrpeak.cn/blog/ios-weak/)
2. [iOS-实现weak后，为什么对象释放后会自动为nil](https://www.jianshu.com/p/7c6400a04e58)
3. [iOS 底层解析weak的实现原理](https://www.jianshu.com/p/13c4fb1cedea)
4. [iOS（Objective-C）内存管理](http://zhoulingyu.com/2017/02/15/Advanced-iOS-Study-objc-Memory-2/)
5. [Objective-C 引用计数原理](http://yulingtianxia.com/blog/2015/12/06/The-Principle-of-Refenrence-Counting/)