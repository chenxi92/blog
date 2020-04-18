

#### <p align="center">理解: ISA指针、类和元类</p>

<p align="right">2020-4-18</p>



##### isa指针

> 每一个对象都是一个类的实例。在 Objective-C 语言的内部，每一个对象都有一个名为 isa 的指针，指向该对象的类。



##### 类

> 每一个类描述了一系列它的实例的特点，包括成员变量的列表，成员函数的列表等。每一个对象都可以接受消息，而对象能够接收的消息列表是保存在它所对应的类中。



##### 元类:

> 元类是类对象的类。类对象的 `isa` 指针指向元类。元类的isa指针指向根元类， 根元类的 `isa` 指针指向自己。元类保存了类方法的列表。类方法调用时，通过类的 `isa` 指针在元类中获取方法的实现，如果没有，则该元类会向它的父类查找该方法，直到一直找到继承链的头。



描述继承关系的如下所示:

![图片](./../../../images/runtime/class_diagram.pdf)



在实现中，Root Class 是指 NSObject，我们可以从图中看出：

- NSObject 的元类继承自 NSObject 类。

- 元类的 isa 指针指向根元类。



##### 代码说明

```objective-c
#import <objc/runtime.h>

void ReportFunction(id self, SEL _cmd)
{
    NSLog(@"This object is %p.", self);
    NSLog(@"Class is %@, and super is %@.", [self class], [self superclass]);
    
    Class currentClass = [self class];
    for (int i = 1; i < 6; i++)
    {
        NSLog(@"Following the isa pointer %d times gives %p, is meta class [%@]",
              i,
              currentClass,
              class_isMetaClass(currentClass) ? @"true" : @"false");
        currentClass = object_getClass(currentClass);
    }
    NSLog(@"NSObject's class is %p", [NSObject class]);
    NSLog(@"NSObject's meta class is %p", object_getClass([NSObject class]));
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
      	// 动态创建一个子类
        Class newClass = objc_allocateClassPair([NSError class], "RuntimeErrorSubclass", 0);
      	// 添加一个方法
        SEL sel = NSSelectorFromString(@"report");
        class_addMethod(newClass, sel, (IMP)ReportFunction, "v@:");
        // 注册该类，方便后续使用
        objc_registerClassPair(newClass);
            
         id instanceOfNewClass = [[newClass alloc] initWithDomain:@"someDomain" code:0 userInfo:nil];
#pragma clang diagnostic push
#pragma clang diagnostic ignored   "-Warc-performSelector-leaks"
           [instanceOfNewClass performSelector:sel];
#pragma clang diagnostic pop
    }
    return 0;
}
```



输出结果如下:

```objective-c
This object is 0x10064f160.
Class is RuntimeErrorSubclass, and super is NSError.
Following the isa pointer 1 times gives 0x10064ea80,    is meta class [false]
Following the isa pointer 2 times gives 0x10064eab0,    is meta class [true]
Following the isa pointer 3 times gives 0x7fff9510e0f0, is meta class [true]
Following the isa pointer 4 times gives 0x7fff9510e0f0, is meta class [true]
Following the isa pointer 5 times gives 0x7fff9510e0f0, is meta class [true]
NSObject's class is 0x7fff9510e118
NSObject's meta class is 0x7fff9510e0f0
```



输出结果说明:

> 元类的isa指针指向根元类
>
> 根元类的isa指针指向自己
>
> NSObject的元类就是根元类



##### API 说明:

```objective-c
Class objc_getClass(const char * name);
// 返回类对象
```



```objective-c
Class object_getClass(id obj);
// 返回isa指针
// 1. obj 是实例对象，返回类对象的isa指针
// 2. obj 是类对象，返回(meta-class)元类的isa指针
// 3. obj 是元类，返回根元类的isa指针
```



```objective-c
+ (Class)class;
// 返回类对象

- (Class)class;
// 返回类对象
```



##### 参考文章

[What is a meta-class in Objective-C](http://www.cocoawithlove.com/2010/01/what-is-meta-class-in-objective-c.html)

[Objective-C对象模型及应用](https://blog.devtang.com/2013/10/15/objective-c-object-model/)

