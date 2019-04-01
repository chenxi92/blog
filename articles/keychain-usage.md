### 钥匙串学习

基本概念

> 帮助用户安全的存储小块数据到加密的数据库中。

`kSecClass` 制定存储类别。

存储类别分为：`kSecClassInternetPassword`,`kSecClassGenericPassword`, 
`kSecClassCertificate`,`kSecClassKey`,`kSecClassIdentity`

除了存储数据本身，还可以提供一组公开可见的属性，以控制项目的可访问性并使其可搜索。

![putting-data-and-attributes-into-a-keychain](../images/keychain-usage/putting-data-and-attributes-into-a-keychain.png)

`kSecClassGenericPassword` 类型有如下属性：

```
kSecClassGenericPassword item attributes:
        kSecAttrAccess (OS X only)
        kSecAttrAccessControl
        kSecAttrAccessGroup (iOS; also OS X if kSecAttrSynchronizable specified)
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

	// 增
	OSStatus SecItemAdd(CFDictionaryRef attributes, CFTypeRef * __nullable CF_RETURNS_RETAINED result);
	// 删
	OSStatus SecItemDelete(CFDictionaryRef query);
	// 改
	OSStatus SecItemUpdate(CFDictionaryRef query, CFDictionaryRef attributesToUpdate);
	// 查
	OSStatus SecItemCopyMatching(CFDictionaryRef query, CFTypeRef * __nullable CF_RETURNS_RETAINED result);

- [Keychain Services](https://developer.apple.com/documentation/security/keychain_services?language=objc)