

Runtime 学习目标

- 方法调用流程
- 类别，分类
- 自动归档
- 字典模型互换
- 动态增加方法
- 关联对象
- 消息转发AOP
- objc_msgSend()
- kvo 和 kvc
- Aspect 源码阅读解析
- ios， 类， 元类



[Runtime 住院第二天 消息转发与发送](https://halfrost.com/objc_runtime_objc_msgsend/)



##### 元类:

元类是类对象的类。类对象的 `isa` 指针指向元类。根元类的 `isa` 指针指向自己。

元类保存了类方法的列表。类方法调用时，通过类的 `isa` 指针在元类中获取方法的实现，如果没有，则该元类会向它的父类查找该方法，直到一直找到继承链的头。



![](/Users/chenxi/Documents/gitHub/blog/images/runtime/instance_class_metaClass.png)

在实现中，Root Class 是指 NSObject，我们可以从图中看出：

- NSObject 类包括它的对象实例方法。

- NSObject 的元类包括它的类方法，例如 alloc 方法。

- NSObject 的元类继承自 NSObject 类。

- 一个 NSObject 的类中的方法同时也会被 NSObject 的子类在查找方法时找到。



##### 接口说明:

```objective-c
Class objc_getClass(const char * name);
// 返回类对象
```



```objective-c
Class object_getClass(id obj);
// 均返回isa指针
// 1. obj 是实例对象，返回类对象
// 2. obj 是类对象，返回(meta-class)元类
// 3. obj 是元类，返回根类的元类
```



```objective-c
+ (Class)class;
// 返回类对象
- (Class)class;
// 返回类对象
```


