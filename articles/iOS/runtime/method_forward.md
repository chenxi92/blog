#### <p align="center">消息转发

<p align="right">2020-4-17</p>



##### `_objc_msgForward` 和 `_objc_msgForward_stret`

`_objc_msgForward` 用于消息转发：向一个对象发送消息，但是它没有实现的时候，`_objc_msgForward` 会尝试走消息转发。

`_objc_msgForward` 和 `_objc_msgForward_stret` 区别，引用自: [JSPatch 实现原理详解](http://blog.cnbang.net/tech/2855/)

对于某些架构某些 struct，必须使用 _objc_msgForward_stret 代替 _objc_msgForward。为什么要用 _objc_msgForward_stret 呢，找到一篇说明 objc_msgSend_stret 和 objc_msgSend 区别的[文章](http://sealiesoftware.com/blog/archive/2008/10/30/objc_explain_objc_msgSend_stret.html)），说得比较清楚，原理是一样的，是C的一些底层机制的原因，简单复述一下：

> 大多数 CPU 在执行 C 函数时会把前几个参数放进寄存器里，对 `obj_msgSend` 来说前两个参数固定是 `self` / `_cmd`，它们会放在寄存器上，在最后执行完后返回值也会保存在寄存器上，取这个寄存器的值就是返回值。



##### 消息转发的三个阶段

###### 第一阶段: Method resolution

调用 `resolveInstanceMethod:`方法 (或 `resolveClassMethod:`)。允许用户在此时为该 Class 动态添加实现。如果有实现了，则调用并返回YES，那么重新开始 `objc_msgSend` 流程。如果仍没实现，继续转发。

**代码实例:** 

为 `Test` 动态添加类方法`class_print` 和 实例方法`instance_print`

```objective-c
void instance_print(id self, SEL _cmd, NSString *text)
{
    NSLog(@"replaced instance method %@", text);
}

void class_print(id self, SEL _cmd, NSString *text)
{
    NSLog(@"replaced resolve class method %@", text);
}

@implementation Test

+ (BOOL)resolveClassMethod:(SEL)sel {
    if (sel == @selector(classPrint:)) {
        // 类方法列表在元类中查找
        class_addMethod(object_getClass(self), sel, (IMP)class_print, "v@:@");
        return YES;
    }
    return [super resolveClassMethod:sel];
}

+ (BOOL)resolveInstanceMethod:(SEL)sel {
    if (sel == @selector(instancePrint:)) {
        class_addMethod([self class], sel, (IMP)instance_print, "v@:@");
        return YES;
    }
    return [super resolveInstanceMethod:sel];
}
@end
```



###### 第二阶段: Fast forwarding

调用 `forwardingTargetForSelector:` 方法，找到一个能响应该消息的对象。如果获取到，则直接把消息转发给它，否则返回 nil ，继续转发。

**代码示例:** 

把`Test`的实例方法`run`转发给`Person`对象去执行。

```objective-c
@implementation Test
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    if (aSelector == @selector(read)) {
        return [NSMethodSignature signatureWithObjCTypes:"v@:"];
    } else {
        return [super methodSignatureForSelector:aSelector];
    }
}
@end

@implementation Person
- (void)run {
    NSLog(@"%@ run", [self class]);
}
@end
```



###### 第三阶段: Normal forwarding

1. 调用 `methodSignatureForSelector:` 方法，尝试获得一个方法签名。如果获取不到，则直接调用 `doesNotRecognizeSelector` 抛出异常。如果能够获取，继续进行第2步:
2. 调用 `forwardInvocation:` 方法，将第 1 步获取到的方法签名包装成`NSInvocation`  对象传入，处理消息转发。

**示例代码:** 

把`Test`的实例方法`read`转发给`Student`对象去执行。

```objective-c
@implementation Test
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    if (aSelector == @selector(read)) {
        return [NSMethodSignature signatureWithObjCTypes:"v@:"];
    } else {
        return [super methodSignatureForSelector:aSelector];
    }
}

- (void)forwardInvocation:(NSInvocation *)anInvocation {
    if (anInvocation.selector == @selector(read)) {
        Student *s = [Student new];
        [anInvocation invokeWithTarget:s];
    } else {
        [super forwardInvocation:anInvocation];
    }
}
@end

@implementation Student
- (void)read {
    NSLog(@"%@ read", [self class]);
}
@end
```



[文中代码位置](https://github.com/chenxi141017/demo/blob/master/iOS/runtime/method_forward/method_forward/main.m)



#### 参考文章

[神经病院 Objective-C Runtime 入院第一天—— isa 和 Class](https://halfrost.com/objc_runtime_isa_class/)

[What is a meta-class in Objective-C](http://www.cocoawithlove.com/2010/01/what-is-meta-class-in-objective-c.html)

[Objective-C对象模型及应用](https://blog.devtang.com/2013/10/15/objective-c-object-model/)

