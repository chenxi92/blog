### Aspects 源码阅读

<p align="right">Update: 2020-4-15</p>

SDK 版本 1.4.2

#### 文件结构

##### AspectToken

用于撤回被hook的方法。

```objective-c
@protocol AspectToken <NSObject>
- (BOOL)remove;
@end
```



##### AspectInfo

用作block回调里面的第一个参数。

```objective-c
@protocol AspectInfo <NSObject>
- (id)instance;
- (NSInvocation *)originalInvocation;
- (NSArray *)arguments;
@end
```



##### Aspects分类

跟NSObject新建一个分类， 分别用户hook类方法和实例方法。

```objective-c
@interface NSObject (Aspects)

/// hook 类方法
+ (id<AspectToken>)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;

/// hook 实例方法
- (id<AspectToken>)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;

@end
```



##### AspectIdentifier

保存单个需要hook的信息。

```objective-c
@interface AspectIdentifier : NSObject
+ (instancetype)identifierWithSelector:(SEL)selector object:(id)object options:(AspectOptions)options block:(id)block error:(NSError **)error;
- (BOOL)invokeWithInfo:(id<AspectInfo>)info;
@property (nonatomic, assign) SEL selector;
@property (nonatomic, strong) id block;
@property (nonatomic, strong) NSMethodSignature *blockSignature;
@property (nonatomic, weak) id object;
@property (nonatomic, assign) AspectOptions options;
@end
```



##### AspectsContainer

容器对象，保存所有的 `AspectIdentifier ` 信息

```objective-c
@interface AspectsContainer : NSObject
- (void)addAspect:(AspectIdentifier *)aspect withOptions:(AspectOptions)injectPosition;
- (BOOL)removeAspect:(id)aspect;
- (BOOL)hasAspects;
@property (atomic, copy) NSArray *beforeAspects;
@property (atomic, copy) NSArray *insteadAspects;
@property (atomic, copy) NSArray *afterAspects;
@end
```



##### AspectTracker

最终被hook的类以及子类的信息。

```objective-c
@interface AspectTracker : NSObject
- (id)initWithTrackedClass:(Class)trackedClass;
@property (nonatomic, strong) Class trackedClass;
@property (nonatomic, readonly) NSString *trackedClassName;
@property (nonatomic, strong) NSMutableSet *selectorNames;
@property (nonatomic, strong) NSMutableDictionary *selectorNamesToSubclassTrackers;
- (void)addSubclassTracker:(AspectTracker *)subclassTracker hookingSelectorName:(NSString *)selectorName;
- (void)removeSubclassTracker:(AspectTracker *)subclassTracker hookingSelectorName:(NSString *)selectorName;
- (BOOL)subclassHasHookedSelectorName:(NSString *)selectorName;
- (NSSet *)subclassTrackersHookingSelectorName:(NSString *)selectorName;
@end
```



#### hook流程

入口函数:

```objective-c
static id aspect_add(id self, SEL selector, AspectOptions options, id block, NSError **error) {
    NSCParameterAssert(self);
    NSCParameterAssert(selector);
    NSCParameterAssert(block);

    __block AspectIdentifier *identifier = nil;
  	// 1. 使用自旋锁来执行block，保证线程安全
    aspect_performLocked(^{
        // 2. 检查selector是否能被hook
        if (aspect_isSelectorAllowedAndTrack(self, selector, options, error)) {
            // 3. 获取容器对象
            AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector); 
           // 4. 生成 AspectIdentifier 对象，保存hook信息
            identifier = [AspectIdentifier identifierWithSelector:selector object:self options:options block:block error:error];
            if (identifier) {
                // 5. 添加到容器
                [aspectContainer addAspect:identifier withOptions:options];

                // 6. 开始方法拦截
                aspect_prepareClassAndHookSelector(self, selector, error);
            }
        }
    });
    return identifier;
}
```



##### 1.  `aspect_performLocked` 自旋锁执行block

自旋锁是效率比较高的一种锁，相比@synchronized来说效率高得多。但是也可能出现问题:[不再安全的 OSSpinLock](https://blog.ibireme.com/2016/01/16/spinlock_is_unsafe_in_ios/) : 如果一个低优先级的线程获得锁并访问共享资源，这时一个高优先级的线程也尝试获得这个锁，它会处于 spin lock 的忙等状态从而占用大量 CPU。此时低优先级线程无法与高优先级线程争夺 CPU 时间，从而导致任务迟迟完不成、无法释放 lock。



##### 2. 检查selector是否能被hook

这些方法 `retain`, `release`,  `autorelease`,  `forwardInvocation:` 不能被hook;

hook `dealloc`  方法时只能使用 `AspectPositionBefore` 这个枚举值;

未被实现的方法不能hook；

元类时，一个方法只能在一个类的层级结构里面被hook一次；



##### 3. 获取容器对象

动态为当前对象关联一个 `AspectsContainer` 属性， 保存该对象所有需要hook的信息。



##### 4. 生成 AspectIdentifier 对象，保存hook信息

保存需要hook的信息，同时为传入的block生成一个签名信息。

作者仿照 [原生block的结构](http://clang.llvm.org/docs/Block-ABI-Apple.html#high-level) ，声明了一个类似的结构体 `AspectBlockRef` , 通过如下方法把block转成结构体: 

```objective-c
static NSMethodSignature *aspect_blockMethodSignature(id block, NSError **error) {
    //// 将block转换为自定义的block形式
    AspectBlockRef layout = (__bridge void *)block;
    if (!(layout->flags & AspectBlockFlagsHasSignature)) {// 比对layout的第8字节到11字节的第三十位 是不是1（1就是有签名）
        NSString *description = [NSString stringWithFormat:@"The block %@ doesn't contain a type signature.", block];
        AspectError(AspectErrorMissingBlockSignature, description);
        return nil;
    }
    void *desc = layout->descriptor;
    desc += 2 * sizeof(unsigned long int); //desc 地址加上16字节
    if (layout->flags & AspectBlockFlagsHasCopyDisposeHelpers) {//比对layout的第8字节到11字节的第25位 是不是1（1就是有COPY_DISPOSE）
        desc += 2 * sizeof(void *); //desc 再加 8 字节，这时候的地址才是真正signature的地址
    }
    if (!desc) {
        NSString *description = [NSString stringWithFormat:@"The block %@ doesn't has a type signature.", block];
        AspectError(AspectErrorMissingBlockSignature, description);
        return nil;
    }
    // 转化成NSMethodSignature 对象输出签名
    const char *signature = (*(const char **)desc);
    //根据类型编码返回真正方法签名
    return [NSMethodSignature signatureWithObjCTypes:signature];
}
```

具体解释参考: [[Aspects 源码学习](https://www.cnblogs.com/DafaRan/p/8192069.html)]



##### 5. 把需要hook的信息保存进入进入容器 `AspectsContainer` 中, 方便后续使用

##### 6. 开始拦截方法

具体代码实现为:

```objective-c
static void aspect_prepareClassAndHookSelector(NSObject *self, SEL selector, NSError **error) {
    NSCParameterAssert(selector);
  	// 1. hook class
    Class klass = aspect_hookClass(self, error);
  	// 2. hook selector
    Method targetMethod = class_getInstanceMethod(klass, selector);
    IMP targetMethodIMP = method_getImplementation(targetMethod);
    if (!aspect_isMsgForwardIMP(targetMethodIMP)) {
        // Make a method alias for the existing method implementation, it not already copied.
        const char *typeEncoding = method_getTypeEncoding(targetMethod);
        SEL aliasSelector = aspect_aliasForSelector(selector);
        if (![klass instancesRespondToSelector:aliasSelector]) {
           // 给子类生成一个辅助方法，方法实现指向被hook的方法的实现
            __unused BOOL addedAlias = class_addMethod(klass, aliasSelector, method_getImplementation(targetMethod), typeEncoding);
            NSCAssert(addedAlias, @"Original implementation for %@ is already copied to %@ on %@", NSStringFromSelector(selector), NSStringFromSelector(aliasSelector), klass);
        }
				
      	// 强制让被hook的方法，走消息转发流程
        // We use forwardInvocation to hook in.
        class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);
        AspectLog(@"Aspects: Installed hook for -[%@ %@].", klass, NSStringFromSelector(selector));
    }
}
```



###### 6.1 hook class

```objective-c
static Class aspect_hookClass(NSObject *self, NSError **error) {
    NSCParameterAssert(self);
	Class statedClass = self.class; // 类对象
	Class baseClass = object_getClass(self); // 获取当前对象的isa指针
	NSString *className = NSStringFromClass(baseClass);

    // Already subclassed
	if ([className hasSuffix:AspectsSubclassSuffix]) {
		return baseClass;

        // We swizzle a class object, not a single object.
	}else if (class_isMetaClass(baseClass)) {
        return aspect_swizzleClassInPlace((Class)self);
        // Probably a KVO'ed class. Swizzle in place. Also swizzle meta classes in place.
    }else if (statedClass != baseClass) {
        return aspect_swizzleClassInPlace(baseClass);
    }

    // Default case. Create dynamic subclass.
	const char *subclassName = [className stringByAppendingString:AspectsSubclassSuffix].UTF8String;
	Class subclass = objc_getClass(subclassName);

	if (subclass == nil) {
    // 创建子类
		subclass = objc_allocateClassPair(baseClass, subclassName, 0);
		if (subclass == nil) {
            NSString *errrorDesc = [NSString stringWithFormat:@"objc_allocateClassPair failed to allocate class %s.", subclassName];
            AspectError(AspectErrorFailedToAllocateClassPair, errrorDesc);
            return nil;
    }
	  // 子类的`forwardInvocation:`方法，指向`__aspects_forwardInvocation:`
		aspect_swizzleForwardInvocation(subclass); 
    // 子类的isa指针指向statedClass
		aspect_hookedGetClass(subclass, statedClass);
    // 子类的元类的isa指针指向statedClass
		aspect_hookedGetClass(object_getClass(subclass), statedClass);
    // 注册子类
		objc_registerClassPair(subclass);
	}
	// 把当前对象的isa指针指向子类
	object_setClass(self, subclass);
	return subclass;
}
```

其中 `Class object_getClass(id obj);` 

```objective-c
// 均返回isa指针
// 1. obj 是实例对象，返回类对象
// 2. obj 是类对象，返回(meta-class)元类
// 3. obj 是元类，返回根类的元类
```



先判断是否已经被hook，然后判断是否是类对象，之后判断是否被kvc， 最后动态创建了一个子类。

核心思想是: 

创建完子类后，替换子类的 `forwardInvocation:`方法， 并且把子类和当前对象关联。这么做的好处是调用当前对象的方法(当前对象的isa指针指向了子类)，如果找不到实现，走自动转发流程的时候，会调用到子类的 `forwardInvocation:` 方法里面，子类的 `forwardInvocation:` 实现被指向了自定义的方法，从而实现了 hook 过程。这里的 [demo](https://github.com/chenxi92/demos/blob/main/iOS/runtime/aspects/aspects/main.m) 模拟了 `Aspects` 的 hook 流程。

###### 6.2 hook selector

先给子类生成一个 `aliasSelector` 方法，该方法实现指向被hook的方法实现，然后强制让被hook的方法，走消息转发流程。

 其中关于`_objc_msgForward` 和 `_objc_msgForward_stret`  知识可以参考: [JSPatch实现原理详解<二>](http://blog.cnbang.net/tech/2855/) 和 [objc_explain_objc_msgSend_stret](http://sealiesoftware.com/blog/archive/2008/10/30/objc_explain_objc_msgSend_stret.html) 这两篇文章。



###### 7. 消息转发

当被hook的方法被外部调用时，会自动走消息转发流程，而消息转发的实现被 `Aspects` hook住了， 具体代码如下:

```objective-c
// This is a macro so we get a cleaner stack trace.
#define aspect_invoke(aspects, info) \
for (AspectIdentifier *aspect in aspects) {\
    [aspect invokeWithInfo:info];\
    if (aspect.options & AspectOptionAutomaticRemoval) { \
        aspectsToRemove = [aspectsToRemove?:@[] arrayByAddingObject:aspect]; \
    } \
}

// This is the swizzled forwardInvocation: method.
static void __ASPECTS_ARE_BEING_CALLED__(__unsafe_unretained NSObject *self, SEL selector, NSInvocation *invocation) {
    NSCParameterAssert(self);
    NSCParameterAssert(invocation);
    SEL originalSelector = invocation.selector;
  	// 获取辅助方法，该方法的实现指向原来被hook的方法
	  SEL aliasSelector = aspect_aliasForSelector(invocation.selector);
    invocation.selector = aliasSelector;
  	// 获取实例对象的容器objectContainer
    AspectsContainer *objectContainer = objc_getAssociatedObject(self, aliasSelector);
    // 获取获得类对象容器classContainer
  	AspectsContainer *classContainer = aspect_getContainerForClass(object_getClass(self), aliasSelector);
    AspectInfo *info = [[AspectInfo alloc] initWithInstance:self invocation:invocation];
    NSArray *aspectsToRemove = nil;

    // Before hooks.
    aspect_invoke(classContainer.beforeAspects, info);
    aspect_invoke(objectContainer.beforeAspects, info);

    // Instead hooks.
    BOOL respondsToAlias = YES;
    if (objectContainer.insteadAspects.count || classContainer.insteadAspects.count) {
        aspect_invoke(classContainer.insteadAspects, info);
        aspect_invoke(objectContainer.insteadAspects, info);
    }else {
        Class klass = object_getClass(invocation.target);
        do {
            if ((respondsToAlias = [klass instancesRespondToSelector:aliasSelector])) 						{
                [invocation invoke];
                break;
            }
        }while (!respondsToAlias && (klass = class_getSuperclass(klass)));
    }

    // After hooks.
    aspect_invoke(classContainer.afterAspects, info);
    aspect_invoke(objectContainer.afterAspects, info);

    // If no hooks are installed, call original implementation (usually to throw an exception)
    if (!respondsToAlias) {
        invocation.selector = originalSelector;
        SEL originalForwardInvocationSEL = NSSelectorFromString(AspectsForwardInvocationSelectorName);
        if ([self respondsToSelector:originalForwardInvocationSEL]) {
            ((void( *)(id, SEL, NSInvocation *))objc_msgSend)(self, originalForwardInvocationSEL, invocation);
        }else {
            [self doesNotRecognizeSelector:invocation.selector];
        }
    }

    // Remove any hooks that are queued for deregistration.
    [aspectsToRemove makeObjectsPerformSelector:@selector(remove)];
}
#undef aspect_invoke

```



一. 消息转发前的准备工作：

1. 获取原始的selector
2. 获取带有aspects_xxxx前缀的方法
3. 替换selector
4. 获取实例对象的容器objectContainer
5. 获取获得类对象容器classContainer
6. 初始化AspectInfo，传入self、invocation参数



二. 分别在 函数调用之前，替换函数，函数调用之后，执行block；

主要调用 `aspect_invoke` 宏定义执行hook功能, 该宏定义有2个作用：

1. 调用 `invokeWithInfo:` 方法执行block，把被hook方法里面的参数依次拷贝到block里面，然后执行block；
2. 记录需要移除的 `AspectInfo` 信息， 方便后续移除



三.  移除hook的信息。