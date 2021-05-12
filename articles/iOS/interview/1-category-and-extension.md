### 基本概念

#### Category

> 是OC中的特有语法，它是表示一个指向分类的结构体的指针。原则上它只能增加方法，不能增加成员（实例）变量。

##### 形式

```objective-c
@interface MyClass (MyCatetory)
@end
```



##### 作用

* 分类是用于给原有类添加方法的, 因为分类的结构体指针中，没有属性列表，只有方法列表。所以原则上讲它只能添加方法, 不能添加属性(成员变量), 实际上可以通过其它方式添加属性;
* 分类中的可以写 `@property`, 但不会生成 `setter`  和 `getter` 方法, 也不会生成实现以及私有的成员变量（`编译时会报警告`）;
* 可以在分类中访问原有类中 `.h` 中的属性;
* 如果分类中有和原有类同名的方法, 会优先调用分类中的方法, 就是说会忽略原有类的方法。所以同名方法调用的优先级为 `分类 > 本类 > 父类`。因此在开发中尽量不要覆盖原有类;
* 如果多个分类中都有和原有类中同名的方法, 那么调用该方法的时候执行谁由编译器决定；编译器会执行最后一个参与编译的分类中的方法。



在一个类中用 `@property` 声明属性，编译器会自动帮我们生成 `_成员变量`、 `setter`  和 `getter` 方法，

但分类的指针结构体中根本没有属性列表，所以在分类中用 `@property` 声明属性无法帮生成 `_成员变量`、 `setter`  和 `getter` 方法

因此结论是：我们可以用 `@property` 声明属性，编译和运行都会通过，只要不使用程序也不会崩溃。但如果调用了 `_成员变量` 和 `setter`  和 `getter` 方法，报错就在所难免了。



`Category` 是表示一个指向分类的结构体的指针，其定义如下：

```objective-c
typedef struct objc_category *Category;
struct objc_category {
  char *category_name                          OBJC2_UNAVAILABLE; // 分类名
  char *class_name                             OBJC2_UNAVAILABLE; // 分类所属的类名
  struct objc_method_list *instance_methods    OBJC2_UNAVAILABLE; // 实例方法列表
  struct objc_method_list *class_methods       OBJC2_UNAVAILABLE; // 类方法列表
  struct objc_protocol_list *protocols         OBJC2_UNAVAILABLE; // 分类所实现的协议列表
}
```





#### Extension

> Extension是Category的一个特例。 类扩展与分类相比只少了分类的名称，所以称之为“匿名分类”。



##### 形式

```objective-c
@interface XXX ()
//私有属性
//私有方法（如果不实现，编译时会报警,Method definition for 'XXX' not found）
@end
```



##### 作用

* 为一个类添加额外的原来没有变量，方法和属性
* 一般的类扩展写到.m文件中
* 一般的私有属性写到.m文件中的类扩展中



#### 区别

* 分类中原则上只能增加方法（能添加属性的的原因是通过 runtime 解决无 setter 和 getter 方法的问题）；
* 扩展不仅可以增加方法，还可以增加实例变量（或者属性），只是该实例变量默认是@private类型的（
用范围只能在自身类，而不是子类或其他地方）；
* 类扩展中声明的方法没被实现，编译器会报警，但是分类中的方法没被实现编译器是不会有任何警告的。这是因为类扩展是在编译阶段被添加到类中，而分类是在运行时添加到类中。(`Xcode9 也会警告`)
* 类扩展不能像分类那样拥有独立的实现部分（`@implementation` 部分），类扩展所声明的方法必须依托**对应类**的实现部分来实现。
* 定义在 `.m` 文件中的类扩展方法为私有的，定义在 `.h` 文件（头文件）中的类扩展方法为公有的。类扩展是在 .m 文件中声明私有方法的非常好的方式。




### 常见问题

#### 1. 分类为什么会覆盖掉类的同名方法，对应的类方法是不存在了么？

category 没有 **完全替换掉** 原来类已经有的方法，也就是说如果 category 和原来类都有 methodA ，那么 category 附加完成之后，类的方法列表里会有两个methodA;

category 的方法被放到了新方法列表的前面，而原来类的方法被放到了新方法列表的后面;

这也就是我们平常所说的 category 的方法会 **覆盖** 掉原来类的同名方法，这是因为运行时在查找方法的时候是顺着方法列表的顺序查找的，它只要一找到对应名字的方法就会罢休，殊不知后面可能还有一样名字的方法。



#### 2. 怎么解除分类对类方法的覆盖？

```objective-c
/**
怎么调用到原来类中被 category 覆盖掉的方法？
对于这个问题，我们已经知道 category 其实并不是完全替换掉原来类的同名方法，只是 category 在方法列表的前面而已，所以我们只要顺着方法列表找到最后一个对应名字的方法，就可以调用原来类的方法：
*/
+ (void)useClassMethodInsteadCayegoryMethod:(SEL)seletor {
    
    if (self) {
        unsigned int methodCount;
        Method *methodList = class_copyMethodList([self class], &methodCount);
        IMP lastImp = NULL;
        SEL lastSel = NULL;
        for (NSInteger i = 0; i < methodCount; i++) {
            Method method = methodList[i];
            NSString *methodName = [NSString stringWithCString:sel_getName(method_getName(method))
                                                      encoding:NSUTF8StringEncoding];
            NSString *selectorName = NSStringFromSelector(seletor);
            if ([selectorName isEqualToString:methodName]) {
                lastImp = method_getImplementation(method);
                lastSel = method_getName(method);
            }
        }
        typedef void (*fn)(id,SEL);
        
        if (lastImp != NULL) {
            fn f = (fn)lastImp;
            f(self,lastSel);
        }
        free(methodList);
    }
}
```



#### 3. category关联对象

``` objective-c
#import <Foundation/Foundation.h>
#import "LearnCategoryClass.h"

@interface LearnCategoryClass (Addition)
@property(nonatomic, strong) NSString *newName;
@end
```

``` objective-c
#import "LearnCategoryClass+Addition.h"
#import <objc/runtime.h>

@implementation LearnCategoryClass (Addition)

//运行时动态添加 set 和 get 方法
- (void)setNewName:(NSString *)newName
{
    objc_setAssociatedObject(self,
                             "newName",
                             newName,
                             OBJC_ASSOCIATION_COPY);
}

- (NSString*)newName
{
    NSString *nameObject = objc_getAssociatedObject(self, "newName");
    return nameObject;
}
@end
```



#### 4. 多个category，哪个方法优先执行？

加载 `category` 到类的工作会先于`+load` 方法的执行；

`+load` 方法执行的循序是先 `class`，后 `category`，多个 `category` 的 `+load` 方法的执行顺序是根据编译顺序决定的。



### Category 特性在 iOS 组件化中的应用与管控

##### 实际业务案例

> 例1：外卖的首页的商家列表（WMPageKit），在进入一个商家（WMRestaurantKit）选择5件商品返回到首页的时候，对应的商家cell需要显示已选商品“5”。

> 例2：搜索结果（WMSearchKit）跳转到商超的容器页（WMSupermarketKit），需要传递一个通用Domain（也有的说法叫模型、Model、Entity、Object等等，下文统一用Domain表示）。

> 例3：做一键下单需求（WMPageKit），需要调用下单功能的一个方法（WMOrderKit）入参是一个订单相关 Domain 和一个 VC，不需要返回值。

这几种场景基本涵盖了组件通信所需的的基本功能，那么怎样才可以实现最优雅的解决方案？

##### 组件通信方案

##### 1. Category+NSInvocation方案

这个方案将其对 NSInvocation 功能容错封装、参数判断、类型转换的代码写在下层，提供简易万能的接口。并在上层创建通信调度器类提供常用接口，在调度器的的 Category 里扩展特定业务的专用接口。所有的上层接口均有规范约束，这些规范接口的内部会调用下层的简易万能接口即可通过NSInvocation 相关的硬编码操作调用任何方法。

![UML图](https://p0.meituan.net/travelcube/1a59d7f90ea57058226929a3f9aab257133322.png)

示例代码:

```objective-c
// WMScheduler+AKit.h
#import "WMScheduler.h"
@interface WMScheduler(AKit)
/**
 * 通过商家id查到当前购物车已选e的小红点数量
 * @param poiid  商家id
 * @return 实际的小红点数量
 */
+ (NSUInteger)wms_getOrderedFoodCountWithPoiID:(NSNumber *)poiID;
@end
```

```objective-c
// WMScheduler+AKit.m
#import "WMSchedulerCore.h"
#import "WMScheduler+AKit.h"
#import "NSObject+WMScheduler.h"
@implementation WMScheduler (AKit)
+ (NSUInteger)wms_getOrderedFoodCountWithPoiID:(NSNumber *)poiID{
    if (nil == poiid) {
        return 0;
    }
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
    id singleton = [wm_scheduler_getClass("WMXXXSingleton") wm_executeMethod:@selector(sharedInstance)];
    NSNumber* orderFoodCount = [singleton wm_executeMethod:@selector(calculateOrderedFoodCountWithPoiID:) params:@[poiID]];
    return orderFoodCount == nil ? 0 : [orderFoodCount integerValue];
#pragma clang diagnostic pop
}
@end
```

```objective-c
// WMSchedulerInterfaceList.h
#ifndef WMSchedulerInterfaceList_h
#define WMSchedulerInterfaceList_h
// 这个文件会被加到上层业务的pch里，所以下文不用import本文件
#import "WMScheduler.h"
#import "WMScheduler+AKit.h"
#endif /* WMSchedulerInterfaceList_h */
```

BKit （调用方）一个文件：

```objective-c
// WMHomeVC.m
@interface WMHomeVC () <UITableViewDataSource, UITableViewDelegate>
@end
@implementation WMHomeVC
...
    NSUInteger *foodCount = [WMScheduler wms_getOrderedFoodCountWithPoiID:currentPoi.poiID];
    NSLog(@"%ld",foodCount);
...
@end
```

**阶段总结：**

Category+NSInvocation 方案的优点是便捷，因为 Category 的专用接口放在平台库，以后有除了 BKit 以外的其他调用方也可以直接调用，还有更多强大的功能。

但是，不优雅的地方我们也列举一下：
* 当这个跨组件方法内部的代码行数比较多时，会写很多硬编码。
* 硬编码method字符串，在现有方法被修改时，编译检测不报错（只能靠断言约束）。
* 下层库向上调用的设计会被诟病。


##### 2. CategoryCoverOrigin方案

**方案简介：**

首先说明下这个方案和 NSInvocation 没有任何关系，此方案与上一方案也是完全不同的两个概念，不要将上一个方案的思维带到这里。

此方案的思路是在平台层的 WMScheduler.h 提供接口方法，接口的实现只写空实现或者兜底实现（兜底实现中可根据业务场景在 Debug 环境下增加 toast 提示或断言），上层库的提供方实现接口方法并通过 Category 的特性，在运行时进行对基类同名方法的替换。

调用方则正常调用平台层提供的接口。在 CategoryCoverOrigin 的方案中 WMScheduler 的 Category 在提供方仓库内部，因此业务逻辑的依赖可以在仓库内部使用常规的OC调用。

![UML](https://p0.meituan.net/travelcube/577bb3b451cc26f621fbedc15118e3dc95493.png)

平台（通用功能库）两个文件

```objective-c
//  WMScheduler.h
@interface WMScheduler : NSObject
//  这个文件是所有组件通信方法的汇总
#pragma mark - AKit  
/**
 * 通过商家id查到当前购物车已选e的小红点数量
 * @param poiid  商家id
 * @return 实际的小红点数量
 */
+ (NSUInteger)wms_getOrderedFoodCountWithPoiID:(NSNumber *)poiID;
#pragma mark - CKit
// ...
#pragma mark - DKit
// ...
@end
```

```objective-c
// WMScheduler.m
#import "WMScheduler.h"
@implementation WMScheduler
#pragma mark - Akit
+ (NSUInteger)wms_getOrderedFoodCountWithPoiID:(NSNumber *)poiID
{
		return 0; // 这个.m里只要求一个空实现 作为兜底方案。
}
#pragma mark - Ckit
// ...
#pragma mark - Dkit
// ...
@end
```



AKit（提供方）一个 Category 文件：

```objective-c
// WMScheduler+AKit.m
#import "WMScheduler.h"
#import "WMAKitBusinessManager.h"
#import "WMXXXSingleton.h"  
// 直接导入了很多AKit相关的业务文件，因为本身就在AKit仓库内
@implementation WMScheduler (AKit)
// 这个宏可以屏蔽分类覆盖基类方法的警告
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"
// 在平台层写过的方法，这边是是自动补全的
+ (NSUInteger)wms_getOrderedFoodCountWithPoiID:(NSNumber *)poiID
{
  	if (nil == poiid) {
        return 0;
    }
  	// 所有AKIT相关的类都能直接接口调用，不需要任何硬编码，可以和之前的写法对比下。
    WMXXXSingleton *singleton = [WMXXXSingleton sharedInstance];
    NSNumber *orderFoodCount = [singleton calculateOrderedFoodCountWithPoiID:poiID];
    return orderFoodCount == nil ? 0 : [orderFoodCount integerValue];
}
#pragma clang diagnostic pop
@end
```



BKit（调用方） 一个文件写法不变：

```objective-c
// WMHomeVC.m
@interface WMHomeVC () <UITableViewDataSource, UITableViewDelegate>
@end
@implementation WMHomeVC
...
    NSUInteger *foodCount = [WMScheduler wms_getOrderedFoodCountWithPoiID:currentPoi.poiID];
    NSLog(@"%ld",foodCount);
...
@end
```



两种方案的选择

| 比较 | Category+NSInvocation                                        | CategoryCover                                                |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | 1. 只改两个仓库，流程上的时间成本更少；<br>2. 可以实现url调用方法（scheme://target/method:?para=x） | 1. 无任何硬编码，常规OC接口调用；<br>2. 除了接口声明、分类覆盖、调用，没有其他多余代码；不存在下层调用上层的场景 |
| 缺点 | 1. 功能复杂时硬编码写法成本较大；<br>2. 下层调上层，上层业务改变时会影响平台接口 | 1. 不能使用url调用方法；<br> 2. 新增接口时需改动三个仓库，稍有麻烦。（当接口已存在时，两种方式都只需修改一处） |



**内容来源:**

[1. iOS分类(category),类扩展(extension)—史上最全攻略](https://www.jianshu.com/p/9e827a1708c6)

[2. category的高级使用](https://www.jianshu.com/p/a057936e0dac)

[3. Category 特性在 iOS 组件化中的应用与管控](https://tech.meituan.com/2018/11/08/ios-category-module-communicate.html)