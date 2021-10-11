### 钥匙串学习

基本概念

> Securely store small chunks of data on behalf of the user.

除了存储数据本身，还可以提供一组公开可见的属性，以控制项目的可访问性并使其可搜索。

![putting-data-and-attributes-into-a-keychain](../.vuepress/public/images/iOS/keychain/putting-data-and-attributes-into-a-keychain.png)

`keychain` 存储类别分为：`kSecClassInternetPassword`  , `kSecClassGenericPassword` ,  `kSecClassCertificate` , `kSecClassKey` , `kSecClassIdentity`  

可以用 `kSecClass` 来指定存储数据的类别。

`kSecClassGenericPassword`  类型有如下属性：

```
kSecClassGenericPassword item attributes:
        kSecAttrAccess (OS X only)
        kSecAttrAccessControl
        kSecAttrAccessGroup (iOS; also OS X if kSecAttrSynchronizable specified) // 用于指定多个APP共享数据
        kSecAttrAccessible (iOS; also OS X if kSecAttrSynchronizable specified)
        kSecAttrCreationDate 
        kSecAttrModificationDate 
        kSecAttrDescription 
        kSecAttrComment
        kSecAttrCreator
        kSecAttrType
        kSecAttrLabel
        kSecAttrIsInvisible
        kSecAttrIsNegative
        kSecAttrAccount
        kSecAttrService
        kSecAttrGeneric
        kSecAttrSynchronizable
```



主要API接口

```objective-c
// 增
OSStatus SecItemAdd(CFDictionaryRef attributes, CFTypeRef * __nullable CF_RETURNS_RETAINED result);
// 删
OSStatus SecItemDelete(CFDictionaryRef query);
// 改
OSStatus SecItemUpdate(CFDictionaryRef query, CFDictionaryRef attributesToUpdate);
// 查
OSStatus SecItemCopyMatching(CFDictionaryRef query, CFTypeRef * __nullable CF_RETURNS_RETAINED result);
```



简单示例代码:

```objective-c
// 设置账号密码
+ (BOOL)setPassword:(NSString *)password account:(NSString *)account service:(NSString *)service {
    if (!account || !service || !password) {
        return NO;
    }
    
    NSMutableDictionary *dic = [self queryDic];
    dic[(__bridge id)kSecAttrAccount] = account;
    dic[(__bridge id)kSecAttrService] = service;
    dic[(__bridge id)kSecValueData] = [password dataUsingEncoding:NSUTF8StringEncoding];
    
    OSStatus status = SecItemAdd((__bridge CFDictionaryRef)dic, NULL);
    if (status != errSecSuccess) {
        return NO;
    }
    return YES;
}

// 更新账号密码
+ (BOOL)updatePassword:(NSString *)password account:(NSString *)account service:(NSString *)service {
    if (!account || !service || !password) {
        return NO;
    }
    
    NSMutableDictionary *query = [self queryDic];
    query[(__bridge id)kSecAttrAccount] = account;
    query[(__bridge id)kSecAttrService] = service;
    
    NSMutableDictionary *update = [NSMutableDictionary dictionary];
    update[(__bridge id)kSecAttrAccount] = account;
    update[(__bridge id)kSecAttrService] = service;
    update[(__bridge id)kSecValueData] = [password dataUsingEncoding:NSUTF8StringEncoding];
    
    OSStatus status = SecItemUpdate((__bridge CFDictionaryRef)query, (__bridge CFDictionaryRef)update);
    if (status != errSecSuccess) {
        return NO;
    }
    return YES;
}

// 查询密码
+ (NSDictionary *)getPassword:(NSString *)account service:(NSString *)service {
    if (!account || !service) {
        return nil;
    }
    
    NSMutableDictionary *query = [self queryDic];
    query[(__bridge id)kSecAttrAccount] = account;
    query[(__bridge id)kSecAttrService] = service;
    query[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitOne; // 查询匹配上的第一条数据
    query[(__bridge id)kSecReturnAttributes] = CFBridgingRelease(kCFBooleanTrue);
    query[(__bridge id)kSecReturnData] = CFBridgingRelease(kCFBooleanTrue);
    
    CFTypeRef result = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &result);
    if (status != errSecSuccess) {
        return nil;
    }
    if (!result) return nil;
    
    return [self resultDic:(__bridge NSDictionary *)result];
}

// 查询所有的密码
+ (NSArray *)getAllPassword:(NSString *)service {
    if (!service) return nil;
    NSMutableDictionary *query = [self queryDic];
    query[(__bridge id)kSecAttrService] = service;
    query[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitAll; // 查询所有数据
    query[(__bridge id)kSecReturnAttributes] = CFBridgingRelease(kCFBooleanTrue);
    query[(__bridge id)kSecReturnData] = CFBridgingRelease(kCFBooleanTrue);
    
    CFTypeRef result = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &result);
    if (status != errSecSuccess) {
        return nil;
    }
    
    if (!result) return nil;
    
    NSMutableArray *res = [NSMutableArray new];
    if (CFGetTypeID(result) == CFDictionaryGetTypeID()) {
        [res addObject:[self resultDic:(__bridge NSDictionary *)result]];
    } else if (CFGetTypeID(result) == CFArrayGetTypeID()) {
        for (NSDictionary *dic in (__bridge NSArray *)result) {
            [res addObject:[self resultDic:dic]];
        }
    }
    
    return res;
}

// 删除账号
+ (BOOL)deletePassword:(NSString *)account service:(NSString *)service {
    if (!account || !service) {
        return NO;
    }
    NSMutableDictionary *queryDic = [self queryDic];
    [queryDic setObject:account forKey:(__bridge id)kSecAttrAccount];
    [queryDic setObject:service forKey:(__bridge id)kSecAttrService];
    
    OSStatus status = SecItemDelete((__bridge CFDictionaryRef)queryDic);
    if (status != errSecSuccess) {
        return NO;
    }
    return YES;
}

+ (NSMutableDictionary *)queryDic {
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    dic[(__bridge id)kSecClass] = (__bridge id)kSecClassGenericPassword;
    return dic;
}

+ (NSDictionary *)resultDic:(NSDictionary *)dic {
    NSMutableDictionary *ret = [NSMutableDictionary new];
    NSString *account = [dic objectForKey:(__bridge id)kSecAttrAccount];
    if (account) {
        [ret setObject:account forKey:@"account"];
    }
    NSString *password = [[NSString alloc] initWithData:[dic objectForKey:(__bridge id)kSecValueData] encoding:NSUTF8StringEncoding];
    if (password) {
        [ret setObject:password forKey:@"password"];
    }
    
    return [ret copy];
}
```



##### 参考链接

- [Keychain Services](https://developer.apple.com/documentation/security/keychain_services?language=objc)
- [GenericKeychain](https://developer.apple.com/library/archive/samplecode/GenericKeychain/Introduction/Intro.html)