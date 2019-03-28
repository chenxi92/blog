### 目录

- [1. iOS 处理警告](#ios-warning)

#### <a name="ios-warning"></a>iOS 处理警告⚠️

##### 基本语法

```
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-relevant command"
    // your code
#pragma clang diagnostic pop
```

**1. 未使用变量警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wunused-variable"  
    NSInteger variableValue;   
#pragma clang diagnostic pop
```

**2. 方法弃用警告**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wdeprecated-declarations"  
    // Some function be deprecated   
#pragma clang diagnostic pop
```

**3. 不兼容指针类型**

```
#pragma clang diagnostic push   
#pragma clang diagnostic ignored "-Wincompatible-pointer-types"  
   //  
#pragma clang diagnostic pop
```

**4. 循环引用**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored "-Warc-retain-cycles" 
   // retain cycles code. 
#pragma clang diagnostic pop
```

**5. 内存泄漏警告**

```
#pragma clang diagnostic push  
#pragma clang diagnostic ignored   "-Warc-performSelector-leaks"
    // persform selector leaks code.
#pragma clang diagnostic pop
```