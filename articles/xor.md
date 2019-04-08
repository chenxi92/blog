### XOR运算

`XOR`运算，中文称为“异或运算”。

它的定义是：两个值相同时，返回`false`，否则返回`true`。也就是说，`XOR`可以用来判断两个值是否不同。

对应的真值表如下：

| 输入 <br> A B | 输出<br>A XOR B |
| :---: | :---: |
0  0	| 0
0	1	| 1
1	0	| 1
1	1	| 0

### XOR 应用

XOR 运算有一个很奇妙的特点：如果对一个值连续做两次 XOR，会返回这个值本身。

```
// 第一次 XOR
1010 ^ 1111 // 0101

// 第二次 XOR
0101 ^ 1111 // 1010
```

### 加密数据

iOS加密数据如下：

循环遍历数据中的每一个字节，每个字节对应的数据与加密key对应的值做异或运算，然后把异或后的数据与原数据做交换。

```
- (NSData *)obfuscate:(NSData *)data withKey:(NSString *)key
{
     NSMutableData *result = [data mutableCopy];

    char *dataPtr = (char *) [result mutableBytes];
    char *keyData = (char *) [[key dataUsingEncoding:NSUTF8StringEncoding] bytes];

    char *keyPtr = keyData;
    int keyIndex = 0;

    // For each character in data, xor with current value in key
    for (int x = 0; x < [data length]; x++) 
    {
        *dataPtr = *dataPtr ^ *keyPtr;
        dataPtr++;
        keyPtr++; 

        // If at end of key data, reset count and 
        // set key pointer back to start of key value
        if (keyIndex == [key length]) {
        	keyIndex = 0;
        	keyPtr = keyData;
        }
    }

    return result;
}
```

#### 参考

* [XOR 加密简介](http://www.ruanyifeng.com/blog/2017/05/xor.html)
* [xor-file-encryption-in-ios](https://stackoverflow.com/questions/11724527/xor-file-encryption-in-ios)

