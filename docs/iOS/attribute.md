

### `__attribute__`



`__attribute__` 用于修饰 变量、结构体、函数、类型的关键字。



语法形式：

```c
__attribute__((attribute1, attribute2, ...))
__attribute__((__attribute1__, __attribute2__, ...))
```



常见用法

- `__attribute__((alias))`
- `__attribute__((always_inline))`
- `__attribute__((const))`
- `__attribute__((constructor(priority)))`
- `__attribute__((deprecated))`
- `__attribute__((malloc))`
- `__attribute__((nonull))`
- `__attribute__((unused))`
- `__attribute__((used))`
- [更多用法...](https://www.keil.com/support/man/docs/armclang_ref/armclang_ref_chr1383738420227.htm)



### constructor 

`__attribute__((constructor))` 修饰的函数会在main函数之前调用。

#### 语法

```
__attribute__((constructor(priority))
```

`priority` 表示调用的优先级，是一个可选的整数。

 `priority` 值越小优先级越高。

 有 `priority` 修饰的优先级高于没有的。

`priority` 小于100的用作保留字段。



#### Example



```c
#include <stdio.h>
void my_constructor1(void) __attribute__((constructor));
void my_constructor2(void) __attribute__((constructor(102)));
void my_constructor3(void) __attribute__((constructor(103)));

void my_constructor1(void) /* This is the 3rd constructor */
{                        /* function to be called */
    printf("Called my_constructor1()\n");
}
void my_constructor2(void) /* This is the 1st constructor */
{                         /* function to be called */
    printf("Called my_constructor2()\n");
}
void my_constructor3(void) /* This is the 2nd constructor */
{                         /* function to be called */
    printf("Called my_constructor3()\n");
}
int main(void)
{
    printf("Called main()\n");
}
```



上面程序产生如下输出:

```c
Called my_constructor2()
Called my_constructor3()
Called my_constructor1()
Called main()
```



#### 参考资料

https://www.keil.com/support/man/docs/armclang_ref/armclang_ref_chr1383738546439.htm



### unused

如果函数、变量等，未被引用，用 `__attrubute__((unused))` 修饰可以阻止编译器生成警告。



#### Example

```c
void test() 
{
    int a __attribute__((unused)) = 10;
}
```



#### 参考资料

https://www.keil.com/support/man/docs/armclang_ref/armclang_ref_chr1393261558987.htm



### cleanup

用于修饰一个变量，在它的作用域结束后自动执行一个指定的方法。

> The `cleanup` attribute runs a function when the variable goes out of scope. This attribute can only be applied to auto function scope variables; it may not be applied to parameters or variables with static storage duration. The function must take one parameter, a pointer to a type compatible with the variable. The return value of the function (if any) is ignored.



#### Example

```objective-c
static void stringCleanUp(__strong NSString **string) {
    NSLog(@"%@", *string);
}

static void blockCleanUp(__strong void(^*block)(void)) {
  	NSLog(@"call block");
    (*block)();
}

- (void)test {
    __strong NSString *string __attribute__((cleanup(stringCleanUp), unused)) = @"peak";
    void (^block)(void)  __attribute__((cleanup(blockCleanUp), unused)) = ^ {
        NSLog(@"this is a block implementation.");
    };
}
```



#### 参考

https://nshipster.com/__attribute__/