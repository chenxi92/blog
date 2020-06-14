#### 框架目录结构

```objective-c
Masonry.h
	- 头文件

MasUtilities.h
	- 宏定义 以及 内联函数

View+MASAdditions.h
	- UIView/NSView 分类， 提供 mas_xx 属性、方法做约束

View+MASShorthandAdditions.h
	- UIView/NSView 分类， 简化 View+MASAdditions.h 属性以及方法前缀

ViewController+MASAdditions.h
	- UIViewController 分类， 提供 topLayoutGuide 等约束

NSArray+MASAdditions.h
	- 数组分类，提供类似批处理功能
	
NSArray+MASShorthandAdditions.h
	- 数组分类，提供类似批处理工程，方法名称去掉 mas_ 前缀
	
MASConstraint.h
	- 约束类，实现了链式编程的语法
MASContraint+Private.h
	- 定义约束类的抽象接口， 定义约束类相关的协议

MASCompositeConstraint.h
	- 表示一组约束对象，继承自 MASConstraint
	
MASConstraintMaker.h
	- 表示单个约束对象，继承自 MASConstraint

MASViewAttribute.h
	- 存储约束对象以及该对象的约束属性
	
MASConstraintMaker.h
	- 工厂方法，用于创建约束对象
	
MASLayoutConstrain.h
	- 继承自 NSLayoutConstraint， 用于Debug

NSLayoutConstraint+MASDebugAdditions.h
	- NSLayoutConstraint 分类， 用于Debug
```



#### 源码实现

根据下面一个例子来看源码实现。

创建一个子视图，距离父视图的边缘20， 使用 Masonry 添加约束。

```objective-c
UIView *superview = self.view;

UIView *view = [[UIView alloc] init];
view1.backgroundColor = [UIColor greenColor];
[superview addSubview:view];

UIEdgeInsets padding = UIEdgeInsetsMake(20, 20, 20, 20);

[view mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(superview.mas_top).offset(padding.top); 
    make.left.equalTo(superview.mas_left).offset(padding.left);
    make.bottom.equalTo(superview.mas_bottom).offset(-padding.bottom);
    make.right.equalTo(superview.mas_right).offset(-padding.right);
}];
```



#####  `mas_makeConstraints:` 方法实现：

```objective-c
- (NSArray *)mas_makeConstraints:(void(^)(MASConstraintMaker *))block {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    MASConstraintMaker *constraintMaker = [[MASConstraintMaker alloc] initWithView:self];
    block(constraintMaker);
    return [constraintMaker install];
}
```



###### 1. 禁用 `translatesAutoresizingMaskIntoConstraints`  ；

默认情况下 UIView 上的 `autoresizing mask` 会产生约束条件，以完全确定视图的位置, `AutoLayout` 会自动根据 UIView 的 `frame` 等来确定视图的位置。 当需要自定义约束时， 需要禁用该属性。



###### 2. 构造 `MASConstraintMaker` 对象；

`MASConstraintMaker`  是一个工厂类， 其构造方法如下：

```objective-c
- (id)initWithView:(MAS_VIEW *)view {
    self = [super init];
    if (!self) return nil;
    
    self.view = view;
    self.constraints = NSMutableArray.new;
    
    return self;
}
```

存储当前视图(弱引用)；

初始化约束数组；



###### 3. 执行 `block` ；

`mas_makeConstraints:` 方法传入了一个 block 作为函数参数， 该 block 无返回值，参数是一个 `MASConstraintMaker` 对象。 我们所有的约束都是在这个block 里面设定的。



根据代码看看约束如何创建：

```objective-c
make.top.equalTo(superview.mas_top).offset(padding.top); 
```

首先 `make.top` 是调用 `MASConstraintMaker`  对象的 `top` 属性的 `get` 方法， 该方法返回一个 `MASConstraint` 对象；

该 `get` 方法执行流程如下:

```objective-c
// MASConstraintMaker.m

- (MASConstraint *)top {
    return [self addConstraintWithLayoutAttribute:NSLayoutAttributeTop];
}

- (MASConstraint *)addConstraintWithLayoutAttribute:(NSLayoutAttribute)layoutAttribute {
    return [self constraint:nil addConstraintWithLayoutAttribute:layoutAttribute];
}

- (MASConstraint *)constraint:(MASConstraint *)constraint addConstraintWithLayoutAttribute:(NSLayoutAttribute)layoutAttribute {
  	// constraint 为 nil
  	// layoutAttribute 为 NSLayoutAttributeTop
  	
  	// 构造约束视图的信息
    MASViewAttribute *viewAttribute = [[MASViewAttribute alloc] initWithView:self.view layoutAttribute:layoutAttribute];
  	
  	// 根据约束视图信息，构造约束对象
    MASViewConstraint *newConstraint = [[MASViewConstraint alloc] initWithFirstViewAttribute:viewAttribute];
  
    if ([constraint isKindOfClass:MASViewConstraint.class]) {
        //replace with composite constraint
        NSArray *children = @[constraint, newConstraint];
        MASCompositeConstraint *compositeConstraint = [[MASCompositeConstraint alloc] initWithChildren:children];
        compositeConstraint.delegate = self;
        [self constraint:constraint shouldBeReplacedWithConstraint:compositeConstraint];
        return compositeConstraint;
    }
  	// constrain 为空，为新构造的 constrain 对象设置代理
  	// 并把该 constrain 对象存储在约束数组内，供后续使用
    if (!constraint) {
        newConstraint.delegate = self;
        [self.constraints addObject:newConstraint];
    }
  	// 返回新创建的约束对象， 该对象的实际类型是 MASViewConstraint
    return newConstraint;
}
```



其次 `.equalTo(superview.mas_top)` 会根据 `make.top` 返回的 `MASConstraint` 对象( 该对象的实际类型是 **MASViewConstraint**) 去执行 `equalTo` 方法返回的 block ：

```objective-c
// MASConstraint.m

- (MASConstraint * (^)(id))equalTo {
    return ^id(id attribute) {
        return self.equalToWithRelation(attribute, NSLayoutRelationEqual);
    };
}
```

`equalTo` 方法会去调用 `equalToWithRelation` 方法， 因为  `equalToWithRelation` 方法需要在子类实现， 实际会调用到 `MASViewConstraint`  中， 因为 `MASViewConstraint` 重新实现了   `equalToWithRelation` 方法 (该方法返回了一个 block， 该 block 的返回值是 `MASConstraint` 对象，此处实际返回的当前的 `MASViewConstraint` 对象， block 有2个参数， 第一个参数为 `superview.mas_top` ，第二个参数为 `NSLayoutRelationEqual`)



 `superview.mas_top` 执行流程为:

```objective-c
// View+MASAdditions.m

- (MASViewAttribute *)mas_top {
    return [[MASViewAttribute alloc] initWithView:self layoutAttribute:NSLayoutAttributeTop];
}

// MASViewAttribute.m
- (id)initWithView:(MAS_VIEW *)view layoutAttribute:(NSLayoutAttribute)layoutAttribute {
    self = [self initWithView:view item:view layoutAttribute:layoutAttribute];
    return self;
}

- (id)initWithView:(MAS_VIEW *)view item:(id)item layoutAttribute:(NSLayoutAttribute)layoutAttribute {
    self = [super init];
    if (!self) return nil;
    
    _view = view;
    _item = item;
    _layoutAttribute = layoutAttribute;
    
    return self;
}
```

主要是构建约束对象。



`equalToWithRelation`  执行流程为:

```objective-c
// MASViewConstraint.m

- (MASConstraint * (^)(id, NSLayoutRelation))equalToWithRelation {
    return ^id(id attribute, NSLayoutRelation relation) {
      	// attribute 为 MASViewAttribute 对象
      	// relation  为 NSLayoutRelationEqual
        if ([attribute isKindOfClass:NSArray.class]) {
            NSAssert(!self.hasLayoutRelation, @"Redefinition of constraint relation");
            NSMutableArray *children = NSMutableArray.new;
            for (id attr in attribute) {
                MASViewConstraint *viewConstraint = [self copy];
                viewConstraint.layoutRelation = relation;
                viewConstraint.secondViewAttribute = attr;
                [children addObject:viewConstraint];
            }
            MASCompositeConstraint *compositeConstraint = [[MASCompositeConstraint alloc] initWithChildren:children];
            compositeConstraint.delegate = self.delegate;
            [self.delegate constraint:self shouldBeReplacedWithConstraint:compositeConstraint];
            return compositeConstraint;
        } else {
            NSAssert(!self.hasLayoutRelation || self.layoutRelation == relation && [attribute isKindOfClass:NSValue.class], @"Redefinition of constraint relation");
            
          	// 存储约束对象间的线性等式关系，此处为 NSLayoutRelationEqual
          	self.layoutRelation = relation;
          	
          	// 存储第二个约束对象， 此处主要是 存储 superview 的 NSLayoutAttributeTop 约束属性
            self.secondViewAttribute = attribute;
          
            return self;
        }
    };
}
```



`make.top.equalTo(superview.mas_top)` 执行完毕后，还是会返回由 `make.top`  里面创建的 `MASViewConstraint` 约束对象。

`.offset(padding.top); ` 会实际执行 `MASViewConstraint`  内的 `setOffset:` 方法， 此处参数为 20。



```objective-c
// MASViewConstraint.m

- (void)setOffset:(CGFloat)offset {
  	// 重写了 setLayoutConstant: 方法， 此处会给 _layoutConstant 赋值为 20。
    self.layoutConstant = offset;
}

- (void)setLayoutConstant:(CGFloat)layoutConstant {
    _layoutConstant = layoutConstant;

#if TARGET_OS_MAC && !(TARGET_OS_IPHONE || TARGET_OS_TV)
    if (self.useAnimator) {
        [self.layoutConstraint.animator setConstant:layoutConstant];
    } else {
        self.layoutConstraint.constant = layoutConstant;
    }
#else
    self.layoutConstraint.constant = layoutConstant;
#endif
}
```



到此一条约束 `make.top.equalTo(superview.mas_top).offset(padding.top); `  执行完毕， 其它约束情况类似。



###### 4. 执行 `MASConstraintMaker` 对象内的 `install` 方法；

该方法会依次去执行每个约束对象(`MASViewConstraint`) 的 install 方法:

```objective-c
// MASConstraintMaker.m
- (NSArray *)install {
    if (self.removeExisting) {
        NSArray *installedConstraints = [MASViewConstraint installedConstraintsForView:self.view];
        for (MASConstraint *constraint in installedConstraints) {
            [constraint uninstall];
        }
    }
  	// 复制所有的约束对象
    NSArray *constraints = self.constraints.copy;
    for (MASConstraint *constraint in constraints) {
        constraint.updateExisting = self.updateExisting;
      	// 每个约束对象执行 install 方法
        [constraint install];
    }
    [self.constraints removeAllObjects];
    return constraints;
}
```



 ```objective-c
// MASViewConstraint.m

- (void)install {
    if (self.hasBeenInstalled) {
        return;
    }
    
    if ([self supportsActiveProperty] && self.layoutConstraint) {
        self.layoutConstraint.active = YES;
        [self.firstViewAttribute.view.mas_installedConstraints addObject:self];
        return;
    }
    // 取出第一个和第二个约束视图，以及各自的约束属性
    MAS_VIEW *firstLayoutItem = self.firstViewAttribute.item;
    NSLayoutAttribute firstLayoutAttribute = self.firstViewAttribute.layoutAttribute;
    MAS_VIEW *secondLayoutItem = self.secondViewAttribute.item;
    NSLayoutAttribute secondLayoutAttribute = self.secondViewAttribute.layoutAttribute;

    // alignment attributes must have a secondViewAttribute
    // therefore we assume that is refering to superview
    // eg make.left.equalTo(@10)
    if (!self.firstViewAttribute.isSizeAttribute && !self.secondViewAttribute) {
        secondLayoutItem = self.firstViewAttribute.view.superview;
        secondLayoutAttribute = firstLayoutAttribute;
    }
    
  	// 构造 NSLayoutConstraint 约束对象
    MASLayoutConstraint *layoutConstraint
        = [MASLayoutConstraint constraintWithItem:firstLayoutItem
                                        attribute:firstLayoutAttribute
                                        relatedBy:self.layoutRelation
                                           toItem:secondLayoutItem
                                        attribute:secondLayoutAttribute
                                       multiplier:self.layoutMultiplier
                                         constant:self.layoutConstant];
    // 设置优先级
    layoutConstraint.priority = self.layoutPriority;
  	// 设置调试的 key 值
    layoutConstraint.mas_key = self.mas_key;
    
    if (self.secondViewAttribute.view) {
      	// 若第二个约束视图存在， 则约束添加在两个约束视图最近的父视图上
        MAS_VIEW *closestCommonSuperview = [self.firstViewAttribute.view mas_closestCommonSuperview:self.secondViewAttribute.view];
        NSAssert(closestCommonSuperview,
                 @"couldn't find a common superview for %@ and %@",
                 self.firstViewAttribute.view, self.secondViewAttribute.view);
        self.installedView = closestCommonSuperview;
    } else if (self.firstViewAttribute.isSizeAttribute) {
      	// 约束宽高， 则约束添加在第一个约束视图上
        self.installedView = self.firstViewAttribute.view;
    } else {
      	// 约束添加在第一个约束视图的父视图上
        self.installedView = self.firstViewAttribute.view.superview;
    }


    MASLayoutConstraint *existingConstraint = nil;
    if (self.updateExisting) {
        existingConstraint = [self layoutConstraintSimilarTo:layoutConstraint];
    }
    if (existingConstraint) {
        // just update the constant
        existingConstraint.constant = layoutConstraint.constant;
        self.layoutConstraint = existingConstraint;
    } else {
      	// 添加约束
        [self.installedView addConstraint:layoutConstraint];
      	// 存储约束(弱引用)
        self.layoutConstraint = layoutConstraint;
      	// 存储约束对象， 方便以后好卸载该约束
        [firstLayoutItem.mas_installedConstraints addObject:self];
    }
}
 ```



#### 学习收获

##### 链式调用

block 通常作为函数的参数用的比较多， 但是block作为返回值，则可以写出链式调用的优雅语法:



定义一个计算器类， 实现加减乘除。

```objective-c
interface Caculator : NSObject

@property (nonatomic, assign, readonly) CGFloat result;

- (Caculator * (^) (CGFloat number))addition;

- (Caculator * (^) (CGFloat number))substraction;

- (Caculator * (^) (CGFloat number))multiplication;

- (Caculator * (^) (CGFloat number))division;
@end

@implementation Caculator

- (Caculator * _Nonnull (^)(CGFloat))addition {
    return ^Caculator *(CGFloat number) {
        self -> _result += number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))substraction {
    return ^Caculator *(CGFloat number) {
        self -> _result -= number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))multiplication {
    return ^Caculator *(CGFloat number) {
        self -> _result *= number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))division {
    return ^Caculator *(CGFloat number) {
        self -> _result /= number;
        return self;
    };
}
@end
```



定义一个分类，负责调用。

```objective-c
@interface NSObject (Caculator)

- (CGFloat)caculate:(void (^)(Caculator *caculate))block;

@end

@implementation NSObject (Caculator)

- (CGFloat)caculate:(void (^)(Caculator * _Nonnull))block {
    Caculator *caculate = [[Caculator alloc] init];
    block(caculate);
    return caculate.result;
}
@end
```



测试如下代码， 结果输出为 6 。

```objective-c
CGFloat result = [NSObject caculate:^(Caculator * _Nonnull caculate) {
  	// 0 + 10 = 10
  	// 10 - 2 = 8
  	// 8 / 4 = 2
  	// 2 * 3 = 6
    caculate.addition(10).substraction(2).division(4).multiplication(3);
}];

NSLog(@"result : %.f", result);
```

