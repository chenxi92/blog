#### XOR运算

`XOR`运算，中文称为“异或运算”。

它的定义是：两个值相同时，返回 0，否则返回 1。

| x    | y    | x^y  |
| ---- | ---- | ---- |
| 0    | 0    | 0    |
| 0    | 1    | 1    |
| 1    | 0    | 1    |
| 1    | 1    | 0    |



#### 运算定律

##### 一个值与自身的运算结果为 0

```c++
x ^ x = 0
```

##### 一个值与 0 的运算结果为本身

```c++
x ^ 0 = x
```

##### 可交换性

```c++
x ^ y = y ^ x
```



#### XOR 应用

##### 1. 原地交换

```c++
x ^= y
y ^= x
x ^= y
```



计算展开过程如下：

```c++
x ^= y
// x = x ^ y
// y = y

y ^= x
// x = x ^ y
// y = x ^ y ^ x = x

x ^= y
// x = x ^ y ^ y = x
// y = x
```



##### 2. 加/解密

- 明文（text）与 密钥（key）进行异或运算，可以得到密文（cipherText）
- 密文（cipherText）与 密钥（key）进行异或运算，可以得到明文（text）

```c++
text ^ key = cipherText
cipherText ^ key = text
// text ^ key ^ key 
// 0 ^ text
// text
```



##### 3. 面试题

###### 1. 查找缺失的数字

> 给定一个包含 n-1个 元素的数组A， 元素的取值范围是 1 到 n 且没有重复，找出缺少的那个数字

解决方案：把数组中的每个元素和 1 到 n 的整数进行异或运算，结果就是缺少的数字

> 1 ^ 2 ^  ... ^ n ^ A[0] ^ A[1] ... A[n - 2]

原理：

- 出现 2 次的数字，异或之后结果是0

- 缺失的数字出现一次，和 0 进行异或之后，结果是它本身



###### 2.  查找重复的数字

>给定一个包含 n + 1个 元素的数组A， 元素的取值范围是 1 到 n 且只有一个数字重复，找出重复的那个数字

解决方案：把数组中的每个元素和 1 到 n 的整数进行异或运算，结果就是重复的数字

> 1 ^ 2 ^  ... ^ n ^ A[0] ^ A[1] ... A[n]

原理：

- 出现 2 次的数字，异或之后结果是0

- 重复的数字出现 3 次，异或之后，结果是它本身



#### 代码片段

iOS加密数据如下：

循环遍历数据中的每一个字节，每个字节对应的数据与加密key对应的值做异或运算，然后把异或后的数据与原数据做交换。

```objective-c
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
        if (++keyIndex == [key length]) {
        	keyIndex = 0;
        	keyPtr = keyData;
        }
    }
    return result;
}
```



查找缺失的数字

```python
def find_missing(A, n):
  result = 0

  # Add all the values from 1 to n
  for value in range(1, n + 1):
    result += value

  # Subtract all values in the given array
  for value in A:
    result -= value

  return result
```



#### 参考

* [XOR 加密简介](http://www.ruanyifeng.com/blog/2017/05/xor.html)
* [xor-file-encryption-in-ios](https://stackoverflow.com/questions/11724527/xor-file-encryption-in-ios)
* [xor-trick](https://florian.github.io/xor-trick/)

