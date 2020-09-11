###  iOS常见加密算法总结


#### [1. 安全散列算法](#Secure-Hash-Algorithm)
> **Secure Hash Algorithm**，常见的算法包括了 **[MD5](#md5)**、**[SHA1](#SHA)**、**[HMAC](#HMAC)** 等。

> 将任意长度的二进制值映射为较短的固定长度的二进制值，这个短的二进制值称为哈希值，这个算法具有不可逆、碰撞低等特性。同时该类算法可以用作数字签名，用来证实某个信息确实是由某个人发出的，同时可以保证信息没有被修改。

> 实际上，简单来说，这种算法有两个特性：
> 
> A) 不同的输入一定得出不同的 hash 值；
> 
> B) 无法从 hash 值倒推出原来的输入。

#### [2. 对称加密](#symmetric-key-encryption)
> **symmetric-key encryption**，其中常见的算法包括了 **[AES](#AES)**、**[DES](#DES)**、**3DES**、**[RC4](#RC4)** 等。

> 对称加密指的是可以使用同一个密钥对内容进行加密和解密，相比非对称加密，它的特点是加/解密速度快，并且加密的内容长度几乎没有限制。

#### [3. 非对称加密](#asymmetric-public-key-encryption)
> **asymmetric/public-key encryption**，常见的加密算法有 **[RSA](#RSA)**、**DSA**、**ECC** 等。

> 非对称加密有两个密钥，分别为公钥和私钥，其中公钥公开给所有人，私钥永远只能自己知道。

> 使用公钥加密的信息只能使用私钥解密，使用私钥加密只能使用公钥解密。前者用来传输需要保密的信息，因为全世界只有知道对应私钥的人才可以解密；后者用来作数字签名，因为公钥对所有人公开的，可以用来确认这个信息是否是从私钥的拥有者发出的。


### <a name="Secure-Hash-Algorithm"></a>安全散列算法

**<a name="md5"></a>MD5信息摘要**

> **MD5 Message-Digest Algorithm**，一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。
> 
> MD5由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于1992年公开，用以取代MD4算法。
>
> 将数据（如一段文字）运算变为另一固定长度值，是散列算法的基础原理。
> 
> 1996年后被证实存在弱点，可以被加以破解，对于需要高度安全性的数据，专家一般建议改用其他算法，如SHA-2。2004年，证实MD5算法无法防止碰撞（collision），因此不适用于安全性认证，如SSL公开密钥认证或是数字签名等用途。


```
#include <CommonCrypto/CommonCrypto.h>

@implementation NSData (Add)

- (NSString *)md5String {
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString string];
    for (int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}
@end
```

### <a name="SHA"></a>SHA家族

> **安全散列算法**（英语：Secure Hash Algorithm，缩写为SHA）是一个密码散列函数家族，是FIPS所认证的安全散列算法。
能计算出一个数字消息所对应到的，长度固定的字符串（又称消息摘要）的算法。且若输入的消息不同，它们对应到不同字符串的机率很高。
SHA家族的算法，由美国国家安全局（NSA）所设计，并由美国国家标准与技术研究院（NIST）发布，是美国的政府标准，其分别是：

>**SHA-0**：1993年发布，当时称做安全散列标准（Secure Hash Standard），发布之后很快就被NSA撤回，是SHA-1的前身。

>**SHA-1**：1995年发布，SHA-1在许多安全协议中广为使用，包括TLS和SSL、PGP、SSH、S/MIME和IPsec，曾被视为是MD5（更早之前被广为使用的散列函数）的后继者。但SHA-1的安全性在2000年以后已经不被大多数的加密场景所接受。
2017年荷兰密码学研究小组CWI和Google正式宣布攻破了SHA-1。

>**SHA-2**：2001年发布，包括SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256。
虽然至今尚未出现对SHA-2有效的攻击，它的算法跟SHA-1基本上仍然相似；因此有些人开始发展其他替代的散列算法。

>**SHA-3**：2015年正式发布，SHA-3并不是要取代SHA-2，因为SHA-2目前并没有出现明显的弱点。
由于对MD5出现成功的破解，以及对SHA-0和SHA-1出现理论上破解的方法，NIST感觉需要一个与之前算法不同的，可替换的加密散列算法，也就是现在的SHA-3。

```
#include <CommonCrypto/CommonCrypto.h>

@implementation NSData (Add)

- (NSString *)sha1String {
    unsigned char result[CC_SHA1_DIGEST_LENGTH];
    CC_SHA1(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString stringWithCapacity:CC_SHA1_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA1_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

- (NSString *)sha224String {
    unsigned char result[CC_SHA224_DIGEST_LENGTH];
    CC_SHA224(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString
                             stringWithCapacity:CC_SHA224_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA224_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

- (NSString *)sha256String {
    unsigned char result[CC_SHA256_DIGEST_LENGTH];
    CC_SHA256(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString
                             stringWithCapacity:CC_SHA256_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA256_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

- (NSString *)sha384String {
    unsigned char result[CC_SHA384_DIGEST_LENGTH];
    CC_SHA384(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString
                             stringWithCapacity:CC_SHA384_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA384_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

- (NSString *)sha512String {
    unsigned char result[CC_SHA512_DIGEST_LENGTH];
    CC_SHA512(self.bytes, (CC_LONG)self.length, result);
    NSMutableString *hash = [NSMutableString
                             stringWithCapacity:CC_SHA512_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA512_DIGEST_LENGTH; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

@end
```

### <a name="HMAC"></a>HMAC
> HMAC加密算法是一种安全的基于加密hash函数和共享密钥的消息认证协议． 它可以有效地防止数据在传输过程中被截获和篡改，维护了数据的完整性、可靠性和安全性. HMAC加密算法是一种基于密钥的报文完整性的验证方法，其安全性是建立在Hash加密算法基础上的

[HMAC 维基百科](https://en.wikipedia.org/wiki/HMAC)

```
#include <CommonCrypto/CommonCrypto.h>

@implementation NSData (Add)


- (NSString *)hmacStringUsingAlg:(CCHmacAlgorithm)alg withKey:(NSString *)key {
    size_t size;
    switch (alg) {
        case kCCHmacAlgMD5: size = CC_MD5_DIGEST_LENGTH; break;
        case kCCHmacAlgSHA1: size = CC_SHA1_DIGEST_LENGTH; break;
        case kCCHmacAlgSHA224: size = CC_SHA224_DIGEST_LENGTH; break;
        case kCCHmacAlgSHA256: size = CC_SHA256_DIGEST_LENGTH; break;
        case kCCHmacAlgSHA384: size = CC_SHA384_DIGEST_LENGTH; break;
        case kCCHmacAlgSHA512: size = CC_SHA512_DIGEST_LENGTH; break;
        default: return nil;
    }
    unsigned char result[size];
    const char *cKey = [key cStringUsingEncoding:NSUTF8StringEncoding];
    CCHmac(alg, cKey, strlen(cKey), self.bytes, self.length, result);
    NSMutableString *hash = [NSMutableString stringWithCapacity:size * 2];
    for (int i = 0; i < size; i++) {
        [hash appendFormat:@"%02x", result[i]];
    }
    return hash;
}

- (NSString *)hmacMD5StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgMD5 withKey:key];
}


- (NSString *)hmacSHA1StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgSHA1 withKey:key];
}


- (NSString *)hmacSHA224StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgSHA224 withKey:key];
}


- (NSString *)hmacSHA256StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgSHA256 withKey:key];
}


- (NSString *)hmacSHA384StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgSHA384 withKey:key];
}


- (NSString *)hmacSHA512StringWithKey:(NSString *)key {
    return [self hmacStringUsingAlg:kCCHmacAlgSHA512 withKey:key];
}

@end
```


### <a name="symmetric-key-encryption"></a>对称加密
#### <a name="AES"></a>AES

> 高级加密标准，在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由美国国家标准与技术研究院于2001年11月26日发布于FIPS PUB 197，并在2002年5月26日成为有效的标准.

密码说明

> 严格地说，`AES`和`Rijndael`加密法并不完全一样（虽然在实际应用中两者可以互换），因为`Rijndael`加密法可以支持更大范围的区块和密钥长度：`AES`的区块长度固定为128比特，密钥长度则可以是128，192或256比特；而`Rijndael`使用的密钥和区块长度均可以是128，192或256比特

加/解密NSData：

```
#include <CommonCrypto/CommonCrypto.h>

@implementation NSData (Add)

- (NSData *)AES256EncryptWithKey:(NSData *)key iv:(NSData *)iv {
    if (key.length != 16 && key.length != 24 && key.length != 32) return nil;
    if (iv.length != 16 && iv.length != 0) return nil;
    
    NSData *result = nil;
    size_t bufferSize = self.length + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);
    if (!buffer) return nil;
    
    size_t encryptedSize = 0;
    CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt,
                                          kCCAlgorithmAES,
                                          kCCOptionPKCS7Padding,
                                          key.bytes,
                                          key.length,
                                          iv.bytes,
                                          self.bytes,
                                          self.length,
                                          buffer,
                                          bufferSize,
                                          &encryptedSize);
    if (cryptStatus == kCCSuccess) {
        result = [[NSData alloc] initWithBytes:buffer length:(NSUInteger)encryptedSize];
        free(buffer);
        return result;
    } else {
        free(buffer);
        return nil;
    }
}

- (NSData *)AES256DecryptWithKey:(NSData *)key iv:(NSData *)iv {
    if (key.length != 16 && key.length != 24 && key.length != 32) return nil;
    if (iv.length != 16 && iv.length != 0) return nil;
    
    NSData *result = nil;
    size_t bufferSize = self.length + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);
    if (!buffer) return nil;
    
    size_t encryptedSize = 0;
    CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt,
                                          kCCAlgorithmAES,
                                          kCCOptionPKCS7Padding,
                                          key.bytes,
                                          key.length,
                                          iv.bytes,
                                          self.bytes,
                                          self.length,
                                          buffer,
                                          bufferSize,
                                          &encryptedSize);
    if (cryptStatus == kCCSuccess) {
        result = [[NSData alloc] initWithBytes:buffer length:(NSUInteger)encryptedSize];
        free(buffer);
        return result;
    } else {
        free(buffer);
        return nil;
    }
}
@end
```

加/解密文件：

```// cryptor.m

+ (NSString *)AESEncrypt:(NSString *)filePath withKey:(NSString *)key withIv:(NSString *)iv {
    
    NSString *content = [[NSString alloc] initWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    
    NSData *data = [content dataUsingEncoding:NSUTF8StringEncoding];
    NSData *encryptData = [data AES256EncryptWithKey:[key dataUsingEncoding:NSUTF8StringEncoding] iv:[iv dataUsingEncoding:NSUTF8StringEncoding]];
    
    // convert to hex string
    return [self _hexStringFromData:encryptData];
}

+ (NSString *)AESDecrypt:(NSString *)filePath withKey:(NSString *)key withIv:(NSString *)iv {
    
    NSString *content = [[NSString alloc] initWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    
    // convert hex string to NSData
    NSData *data = [self _dataFromHexString:content];
   
    NSData *result = [data AES256DecryptWithKey:[key dataUsingEncoding:NSUTF8StringEncoding] iv:[iv dataUsingEncoding:NSUTF8StringEncoding]];
    
    return [[NSString alloc] initWithData:result encoding:NSUTF8StringEncoding];
}

#pragma mark - Private Method

+ (NSString *)_hexStringFromData:(NSData *)data {
    Byte *bytes = (Byte *)[data bytes];
    NSMutableString *output = [NSMutableString stringWithCapacity:data.length * 2];
    for (int i = 0; i < data.length; i++) {
        [output appendFormat:@"%02x", bytes[i]];
    }
    return output;
}

+ (NSData *)_dataFromHexString:(NSString *)hexString {
    
    NSMutableData *data = [NSMutableData dataWithCapacity:hexString.length/2];
    unsigned char whole_byte;
    char byte_chars[3] = {'\0','\0','\0'};
    int i;
    for (i=0; i < [hexString length] / 2; i++) {
        byte_chars[0] = [hexString characterAtIndex:i*2];
        byte_chars[1] = [hexString characterAtIndex:i*2+1];
        whole_byte = strtol(byte_chars, NULL, 16);
        [data appendBytes:&whole_byte length:1];
    }
    
    return data;
}
```


**参考：**

[RSA 1024和AES 256，这两种加密算法理论上哪种更安全？](https://www.zhihu.com/question/20874499)

[密码算法详解——AES](https://www.cnblogs.com/luop/p/4334160.html)

[高级加密标准](https://zh.wikipedia.org/wiki/高级加密标准)

[converting hex nsstring to nsdata](https://stackoverflow.com/questions/7317860/converting-hex-nsstring-to-nsdata)



#### <a name="DES"></a>DES

> **数据加密标准**（英语：Data Encryption Standard，缩写为 DES）是一种[对称密钥加密](https://zh.wikipedia.org/wiki/對稱密鑰加密)[块密码](https://zh.wikipedia.org/wiki/塊密碼)算法，1976年被[美国](https://zh.wikipedia.org/wiki/美国)联邦政府的[国家标准局](https://zh.wikipedia.org/wiki/国家标准局)确定为[联邦资料处理标准](https://zh.wikipedia.org/wiki/联邦资料处理标准)（FIPS），随后在国际上广泛流传开来。它基于使用56位密钥的[对称算法](https://zh.wikipedia.org/w/index.php?title=密钥密码学&action=edit&redlink=1)。这个算法因为包含一些[机密](https://zh.wikipedia.org/wiki/機密)设计元素，相对短的[密钥长度](https://zh.wikipedia.org/wiki/密钥长度)以及怀疑内含[美国国家安全局](https://zh.wikipedia.org/wiki/美國國家安全局)（NSA）的[后门](https://zh.wikipedia.org/wiki/后门)而在开始时有争议，DES因此受到了强烈的学院派式的审查，并以此推动了现代的[块密码](https://zh.wikipedia.org/wiki/塊密碼)及其[密码分析](https://zh.wikipedia.org/wiki/密码分析)的发展。



iOS 代码示例

```objective-c
+ (NSString *)base64EncodedStringWithData:(NSData *)data {
    return [data base64EncodedStringWithOptions:0];
}

+ (NSData *)base64DecodedDataWithString:(NSString *)string {
    return [self base64DecodedDataWithData:[string dataUsingEncoding:NSUTF8StringEncoding]];
}

+ (NSData *)base64DecodedDataWithData:(NSData *)data {
    return [[NSData alloc] initWithBase64EncodedData:data options:0];
}

// DES 加密
+ (NSString *)DESEncrypt:(NSString *)content withKey:(NSString *)key {
    NSData *data = [content dataUsingEncoding:NSUTF8StringEncoding];
    NSData *encryptedData = [self DESCrypt:data withKey:key withIV:nil operation:kCCEncrypt];
    return [self base64EncodedStringWithData:encryptedData];
}

// DES 解密
+ (NSString *)DESDecrypt:(NSString *)content withKey:(NSString *)key {
    NSData *encryptedData = [self base64DecodedDataWithString:content];
    NSData *decryptData = [self DESCrypt:encryptedData withKey:key withIV:nil operation:kCCDecrypt];
    return [[NSString alloc] initWithData:decryptData encoding:NSUTF8StringEncoding];
}

+ (NSData *)DESCrypt:(NSData *)contentData withKey:(NSString *)key withIV:(NSString *)iv operation:(CCOperation)operation {
    
    NSUInteger dataLength = contentData.length;
    
    const void *keyBytes = [key dataUsingEncoding:NSUTF8StringEncoding].bytes;
    const void *ivBytes = [iv dataUsingEncoding:NSUTF8StringEncoding].bytes;
    const void *contentBytes = contentData.bytes;
    
    size_t operationSize = dataLength + kCCBlockSizeDES;
    void *operationBytes = malloc(operationSize);
    if (operationBytes == NULL) return nil;
    
    size_t actualOutSize = 0;
    CCCryptorStatus status = CCCrypt(operation, kCCAlgorithmDES, kCCOptionPKCS7Padding | kCCOptionECBMode, keyBytes, kCCKeySizeDES, ivBytes, contentBytes, dataLength, operationBytes, operationSize, &actualOutSize);
    
    NSData *outputData = nil;
    if (status == kCCSuccess) {
        outputData = [NSData dataWithBytes:operationBytes length:actualOutSize];
    }
    
    free(operationBytes);
    return outputData;
}
```




#### <a name="RC4"></a>RC4

> **Rivest Cipher 4**是一种流加密算法，密钥长度可变。它加解密使用相同的密钥，因此也属于对称加密算法。


```
#ifndef CX_SWAP // swap two value
#define CX_SWAP(_a_, _b_) do {__typeof__(_a_) _tmp_ = (_a_); (_a_) = (_b_); (_b_) = (_tmp_); } while(0)
#endif

@implementation NSString (CX)
- (NSString *)rc4WithKey:(NSString *)key {
    int j = 0;
    unichar res[self.length];
    const unichar *buffer = res;
    unsigned char s[256];
    for (int i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (int i = 0; i < 256; i++) {
        j = (j + s[i] + [key characterAtIndex:(i%key.length)])%256;
        CX_SWAP(s[i], s[j]);
    }
    int i = j = 0;
    for (int y = 0; y < self.length; y++) {
        i = (i + 1) % 256;
        j = (j + 1) % 256;
        CX_SWAP(s[i], s[j]);
        
        unsigned char f = [self characterAtIndex:y] ^ s[ (s[i] + s[j]) % 256 ];
        res[y] = f;
    }
    return [NSString stringWithCharacters:buffer length:self.length];
}
@end
```

### <a name="asymmetric-public-key-encryption"></a>非对称加密
#### <a name="RSA"></a>RSA

**以下代码参考自** [Objective-C-RSA](https://github.com/ideawu/Objective-C-RSA) 

```
@interface RSA : NSObject

// return base64 encoded string
+ (NSString *)encryptString:(NSString *)str publicKey:(NSString *)pubKey;
// return raw data
+ (NSData *)encryptData:(NSData *)data publicKey:(NSString *)pubKey;
// return base64 encoded string
+ (NSString *)encryptString:(NSString *)str privateKey:(NSString *)privKey;
// return raw data
+ (NSData *)encryptData:(NSData *)data privateKey:(NSString *)privKey;

// decrypt base64 encoded string, convert result to string(not base64 encoded)
+ (NSString *)decryptString:(NSString *)str publicKey:(NSString *)pubKey;
+ (NSData *)decryptData:(NSData *)data publicKey:(NSString *)pubKey;
+ (NSString *)decryptString:(NSString *)str privateKey:(NSString *)privKey;
+ (NSData *)decryptData:(NSData *)data privateKey:(NSString *)privKey;

@end
```

```
#import "RSA.h"
#import <Security/Security.h>

@implementation RSA

static NSString *base64_encode_data(NSData *data){
	data = [data base64EncodedDataWithOptions:0];
	NSString *ret = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return ret;
}

static NSData *base64_decode(NSString *str){
	NSData *data = [[NSData alloc] initWithBase64EncodedString:str options:NSDataBase64DecodingIgnoreUnknownCharacters];
	return data;
}

+ (NSData *)stripPublicKeyHeader:(NSData *)d_key{
	// Skip ASN.1 public key header
	if (d_key == nil) return(nil);
	
	unsigned long len = [d_key length];
	if (!len) return(nil);
	
	unsigned char *c_key = (unsigned char *)[d_key bytes];
	unsigned int  idx	 = 0;
	
	if (c_key[idx++] != 0x30) return(nil);
	
	if (c_key[idx] > 0x80) idx += c_key[idx] - 0x80 + 1;
	else idx++;
	
	// PKCS #1 rsaEncryption szOID_RSA_RSA
	static unsigned char seqiod[] =
	{ 0x30,   0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01,
		0x01, 0x05, 0x00 };
	if (memcmp(&c_key[idx], seqiod, 15)) return(nil);
	
	idx += 15;
	
	if (c_key[idx++] != 0x03) return(nil);
	
	if (c_key[idx] > 0x80) idx += c_key[idx] - 0x80 + 1;
	else idx++;
	
	if (c_key[idx++] != '\0') return(nil);
	
	// Now make a new NSData from this buffer
	return([NSData dataWithBytes:&c_key[idx] length:len - idx]);
}

//credit: http://hg.mozilla.org/services/fx-home/file/tip/Sources/NetworkAndStorage/CryptoUtils.m#l1036
+ (NSData *)stripPrivateKeyHeader:(NSData *)d_key{
	// Skip ASN.1 private key header
	if (d_key == nil) return(nil);

	unsigned long len = [d_key length];
	if (!len) return(nil);

	unsigned char *c_key = (unsigned char *)[d_key bytes];
	unsigned int  idx	 = 22; //magic byte at offset 22

	if (0x04 != c_key[idx++]) return nil;

	//calculate length of the key
	unsigned int c_len = c_key[idx++];
	int det = c_len & 0x80;
	if (!det) {
		c_len = c_len & 0x7f;
	} else {
		int byteCount = c_len & 0x7f;
		if (byteCount + idx > len) {
			//rsa length field longer than buffer
			return nil;
		}
		unsigned int accum = 0;
		unsigned char *ptr = &c_key[idx];
		idx += byteCount;
		while (byteCount) {
			accum = (accum << 8) + *ptr;
			ptr++;
			byteCount--;
		}
		c_len = accum;
	}

	// Now make a new NSData from this buffer
	return [d_key subdataWithRange:NSMakeRange(idx, c_len)];
}

+ (SecKeyRef)addPublicKey:(NSString *)key{
	NSRange spos = [key rangeOfString:@"-----BEGIN PUBLIC KEY-----"];
	NSRange epos = [key rangeOfString:@"-----END PUBLIC KEY-----"];
	if(spos.location != NSNotFound && epos.location != NSNotFound){
		NSUInteger s = spos.location + spos.length;
		NSUInteger e = epos.location;
		NSRange range = NSMakeRange(s, e-s);
		key = [key substringWithRange:range];
	}
	key = [key stringByReplacingOccurrencesOfString:@"\r" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@"\n" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@"\t" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@" "  withString:@""];
	
	// This will be base64 encoded, decode it.
	NSData *data = base64_decode(key);
	data = [RSA stripPublicKeyHeader:data];
	if(!data){
		return nil;
	}

	//a tag to read/write keychain storage
	NSString *tag = @"RSAUtil_PubKey";
	NSData *d_tag = [NSData dataWithBytes:[tag UTF8String] length:[tag length]];
	
	// Delete any old lingering key with the same tag
	NSMutableDictionary *publicKey = [[NSMutableDictionary alloc] init];
	[publicKey setObject:(__bridge id) kSecClassKey forKey:(__bridge id)kSecClass];
	[publicKey setObject:(__bridge id) kSecAttrKeyTypeRSA forKey:(__bridge id)kSecAttrKeyType];
	[publicKey setObject:d_tag forKey:(__bridge id)kSecAttrApplicationTag];
	SecItemDelete((__bridge CFDictionaryRef)publicKey);
	
	// Add persistent version of the key to system keychain
	[publicKey setObject:data forKey:(__bridge id)kSecValueData];
	[publicKey setObject:(__bridge id) kSecAttrKeyClassPublic forKey:(__bridge id)
	 kSecAttrKeyClass];
	[publicKey setObject:[NSNumber numberWithBool:YES] forKey:(__bridge id)
	 kSecReturnPersistentRef];
	
	CFTypeRef persistKey = nil;
	OSStatus status = SecItemAdd((__bridge CFDictionaryRef)publicKey, &persistKey);
	if (persistKey != nil){
		CFRelease(persistKey);
	}
	if ((status != noErr) && (status != errSecDuplicateItem)) {
		return nil;
	}

	[publicKey removeObjectForKey:(__bridge id)kSecValueData];
	[publicKey removeObjectForKey:(__bridge id)kSecReturnPersistentRef];
	[publicKey setObject:[NSNumber numberWithBool:YES] forKey:(__bridge id)kSecReturnRef];
	[publicKey setObject:(__bridge id) kSecAttrKeyTypeRSA forKey:(__bridge id)kSecAttrKeyType];
	
	// Now fetch the SecKeyRef version of the key
	SecKeyRef keyRef = nil;
	status = SecItemCopyMatching((__bridge CFDictionaryRef)publicKey, (CFTypeRef *)&keyRef);
	if(status != noErr){
		return nil;
	}
	return keyRef;
}

+ (SecKeyRef)addPrivateKey:(NSString *)key{
	NSRange spos;
	NSRange epos;
	spos = [key rangeOfString:@"-----BEGIN RSA PRIVATE KEY-----"];
	if(spos.length > 0){
		epos = [key rangeOfString:@"-----END RSA PRIVATE KEY-----"];
	}else{
		spos = [key rangeOfString:@"-----BEGIN PRIVATE KEY-----"];
		epos = [key rangeOfString:@"-----END PRIVATE KEY-----"];
	}
	if(spos.location != NSNotFound && epos.location != NSNotFound){
		NSUInteger s = spos.location + spos.length;
		NSUInteger e = epos.location;
		NSRange range = NSMakeRange(s, e-s);
		key = [key substringWithRange:range];
	}
	key = [key stringByReplacingOccurrencesOfString:@"\r" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@"\n" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@"\t" withString:@""];
	key = [key stringByReplacingOccurrencesOfString:@" "  withString:@""];

	// This will be base64 encoded, decode it.
	NSData *data = base64_decode(key);
	data = [RSA stripPrivateKeyHeader:data];
	if(!data){
		return nil;
	}

	//a tag to read/write keychain storage
	NSString *tag = @"RSAUtil_PrivKey";
	NSData *d_tag = [NSData dataWithBytes:[tag UTF8String] length:[tag length]];

	// Delete any old lingering key with the same tag
	NSMutableDictionary *privateKey = [[NSMutableDictionary alloc] init];
	[privateKey setObject:(__bridge id) kSecClassKey forKey:(__bridge id)kSecClass];
	[privateKey setObject:(__bridge id) kSecAttrKeyTypeRSA forKey:(__bridge id)kSecAttrKeyType];
	[privateKey setObject:d_tag forKey:(__bridge id)kSecAttrApplicationTag];
	SecItemDelete((__bridge CFDictionaryRef)privateKey);

	// Add persistent version of the key to system keychain
	[privateKey setObject:data forKey:(__bridge id)kSecValueData];
	[privateKey setObject:(__bridge id) kSecAttrKeyClassPrivate forKey:(__bridge id)
	 kSecAttrKeyClass];
	[privateKey setObject:[NSNumber numberWithBool:YES] forKey:(__bridge id)
	 kSecReturnPersistentRef];

	CFTypeRef persistKey = nil;
	OSStatus status = SecItemAdd((__bridge CFDictionaryRef)privateKey, &persistKey);
	if (persistKey != nil){
		CFRelease(persistKey);
	}
	if ((status != noErr) && (status != errSecDuplicateItem)) {
		return nil;
	}

	[privateKey removeObjectForKey:(__bridge id)kSecValueData];
	[privateKey removeObjectForKey:(__bridge id)kSecReturnPersistentRef];
	[privateKey setObject:[NSNumber numberWithBool:YES] forKey:(__bridge id)kSecReturnRef];
	[privateKey setObject:(__bridge id) kSecAttrKeyTypeRSA forKey:(__bridge id)kSecAttrKeyType];

	// Now fetch the SecKeyRef version of the key
	SecKeyRef keyRef = nil;
	status = SecItemCopyMatching((__bridge CFDictionaryRef)privateKey, (CFTypeRef *)&keyRef);
	if(status != noErr){
		return nil;
	}
	return keyRef;
}

/* START: Encryption & Decryption with RSA private key */

+ (NSData *)encryptData:(NSData *)data withKeyRef:(SecKeyRef) keyRef isSign:(BOOL)isSign {
	const uint8_t *srcbuf = (const uint8_t *)[data bytes];
	size_t srclen = (size_t)data.length;
	
	size_t block_size = SecKeyGetBlockSize(keyRef) * sizeof(uint8_t);
	void *outbuf = malloc(block_size);
	size_t src_block_size = block_size - 11;
	
	NSMutableData *ret = [[NSMutableData alloc] init];
	for(int idx=0; idx<srclen; idx+=src_block_size){
		//NSLog(@"%d/%d block_size: %d", idx, (int)srclen, (int)block_size);
		size_t data_len = srclen - idx;
		if(data_len > src_block_size){
			data_len = src_block_size;
		}
		
		size_t outlen = block_size;
		OSStatus status = noErr;
        
        if (isSign) {
            status = SecKeyRawSign(keyRef,
                                   kSecPaddingPKCS1,
                                   srcbuf + idx,
                                   data_len,
                                   outbuf,
                                   &outlen
                                   );
        } else {
            status = SecKeyEncrypt(keyRef,
                                   kSecPaddingPKCS1,
                                   srcbuf + idx,
                                   data_len,
                                   outbuf,
                                   &outlen
                                   );
        }
		if (status != 0) {
			NSLog(@"SecKeyEncrypt fail. Error Code: %d", status);
			ret = nil;
			break;
		}else{
			[ret appendBytes:outbuf length:outlen];
		}
	}
	
	free(outbuf);
	CFRelease(keyRef);
	return ret;
}

+ (NSString *)encryptString:(NSString *)str privateKey:(NSString *)privKey{
	NSData *data = [RSA encryptData:[str dataUsingEncoding:NSUTF8StringEncoding] privateKey:privKey];
	NSString *ret = base64_encode_data(data);
	return ret;
}

+ (NSData *)encryptData:(NSData *)data privateKey:(NSString *)privKey{
	if(!data || !privKey){
		return nil;
	}
	SecKeyRef keyRef = [RSA addPrivateKey:privKey];
	if(!keyRef){
		return nil;
	}
	return [RSA encryptData:data withKeyRef:keyRef isSign:YES];
}

+ (NSData *)decryptData:(NSData *)data withKeyRef:(SecKeyRef) keyRef{
	const uint8_t *srcbuf = (const uint8_t *)[data bytes];
	size_t srclen = (size_t)data.length;
	
	size_t block_size = SecKeyGetBlockSize(keyRef) * sizeof(uint8_t);
	UInt8 *outbuf = malloc(block_size);
	size_t src_block_size = block_size;
	
	NSMutableData *ret = [[NSMutableData alloc] init];
	for(int idx=0; idx<srclen; idx+=src_block_size){
		//NSLog(@"%d/%d block_size: %d", idx, (int)srclen, (int)block_size);
		size_t data_len = srclen - idx;
		if(data_len > src_block_size){
			data_len = src_block_size;
		}
		
		size_t outlen = block_size;
		OSStatus status = noErr;
		status = SecKeyDecrypt(keyRef,
							   kSecPaddingNone,
							   srcbuf + idx,
							   data_len,
							   outbuf,
							   &outlen
							   );
		if (status != 0) {
			NSLog(@"SecKeyEncrypt fail. Error Code: %d", status);
			ret = nil;
			break;
		}else{
			//the actual decrypted data is in the middle, locate it!
			int idxFirstZero = -1;
			int idxNextZero = (int)outlen;
			for ( int i = 0; i < outlen; i++ ) {
				if ( outbuf[i] == 0 ) {
					if ( idxFirstZero < 0 ) {
						idxFirstZero = i;
					} else {
						idxNextZero = i;
						break;
					}
				}
			}
			
			[ret appendBytes:&outbuf[idxFirstZero+1] length:idxNextZero-idxFirstZero-1];
		}
	}
	
	free(outbuf);
	CFRelease(keyRef);
	return ret;
}


+ (NSString *)decryptString:(NSString *)str privateKey:(NSString *)privKey{
	NSData *data = [[NSData alloc] initWithBase64EncodedString:str options:NSDataBase64DecodingIgnoreUnknownCharacters];
	data = [RSA decryptData:data privateKey:privKey];
	NSString *ret = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return ret;
}

+ (NSData *)decryptData:(NSData *)data privateKey:(NSString *)privKey{
	if(!data || !privKey){
		return nil;
	}
	SecKeyRef keyRef = [RSA addPrivateKey:privKey];
	if(!keyRef){
		return nil;
	}
	return [RSA decryptData:data withKeyRef:keyRef];
}

/* END: Encryption & Decryption with RSA private key */

/* START: Encryption & Decryption with RSA public key */

+ (NSString *)encryptString:(NSString *)str publicKey:(NSString *)pubKey{
	NSData *data = [RSA encryptData:[str dataUsingEncoding:NSUTF8StringEncoding] publicKey:pubKey];
	NSString *ret = base64_encode_data(data);
	return ret;
}

+ (NSData *)encryptData:(NSData *)data publicKey:(NSString *)pubKey{
	if(!data || !pubKey){
		return nil;
	}
	SecKeyRef keyRef = [RSA addPublicKey:pubKey];
	if(!keyRef){
		return nil;
	}
	return [RSA encryptData:data withKeyRef:keyRef isSign:NO];
}

+ (NSString *)decryptString:(NSString *)str publicKey:(NSString *)pubKey{
	NSData *data = [[NSData alloc] initWithBase64EncodedString:str options:NSDataBase64DecodingIgnoreUnknownCharacters];
	data = [RSA decryptData:data publicKey:pubKey];
	NSString *ret = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
	return ret;
}

+ (NSData *)decryptData:(NSData *)data publicKey:(NSString *)pubKey{
	if(!data || !pubKey){
		return nil;
	}
	SecKeyRef keyRef = [RSA addPublicKey:pubKey];
	if(!keyRef){
		return nil;
	}
	return [RSA decryptData:data withKeyRef:keyRef];
}

/* END: Encryption & Decryption with RSA public key */
```

**参考：**

[RSA算法原理](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)





---------------------

### 其他

#### CRC
> CRC即**循环冗余校验码**（Cyclic Redundancy Check [1]  ）：是数据通信领域中最常用的一种查错校验码，其特征是信息字段和校验字段的长度可以任意选定。
> 
> 循环冗余检查（CRC）是一种数据传输检错功能，对数据进行多项式计算，并将得到的结果附在帧的后面，接收设备也执行类似的算法，以保证数据传输的正确性和完整性。

```

#import <zlib.h>

ZEXTERN uLong ZEXPORT crc32   OF((uLong crc, const Bytef *buf, uInt len));
/*
     Update a running CRC-32 with the bytes buf[0..len-1] and return the
   updated CRC-32.  If buf is Z_NULL, this function returns the required
   initial value for the crc.  Pre- and post-conditioning (one's complement) is
   performed within this function so it shouldn't be done by the application.

   Usage example:

     uLong crc = crc32(0L, Z_NULL, 0);

     while (read_buffer(buffer, length) != EOF) {
       crc = crc32(crc, buffer, length);
     }
     if (crc != original_crc) error();
*/

```

**参考**

[CRC的校验原理  ](http://blog.163.com/du_minchao@126/blog/static/107495394201075114028606/)

[算法原理](https://www.cnblogs.com/esestt/archive/2007/08/09/848856.html)


[加密算法简介](https://jin-yang.github.io/post/security-encryption-introduce.html)