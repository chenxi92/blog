
&emsp; &emsp; &emsp; &emsp; 最近做日志模块的工作，有一个需求是需要把日志加密写进文件，然后读取文件的时候再解密。所以这个加解密方式就选择了RC4。

&emsp; &emsp; &emsp; &emsp; 百度百科了一下RC4，介绍如下：


> RC4加密算法是大名鼎鼎的RSA三人组中的头号人物Ronald Rivest在1987年设计的密钥长度可变的流加密算法簇。
> 之所以称其为簇，是由于其核心部分的S-box长度可为任意，但一般为256字节。
> 该算法的速度可以达到DES加密的10倍左右，且具有很高级别的非线性。RC4起初是用于保护商业机密的。
> 但是在1994年9月，它的算法被发布在互联网上，也就不再有什么商业机密了。RC4也被叫做ARC4（Alleged RC4——所谓的RC4），因为RSA从来就没有正式发布过这个算法。
	
**RC4 算法原理分为两步：初始化算法(KSA) 和 伪随机子密码生成算法(PRGA)两大部分。**

C++ 实现如下：

rc4.h 文件

```
class RC4
{

public:
    RC4();
    
    void rc4_init(unsigned char *key, unsigned long Len);
    
    // 加/解 密
    void do_crypt(unsigned char *Data, unsigned long Len);
    
private:
   
    int m_box[256]; // 对称加密中的置换盒 S盒
    int m_index_i;
    int m_index_j;
};
```


rc4.cpp 文件

```
RC4::RC4()
{
    m_index_i = 0;
    m_index_j = 0;
}

// 初始化算法
void RC4::rc4_init(unsigned char *key, unsigned long Len)
{
    if (key == NULL || Len == 0)
    {
        printf("rc4 key or len is 0, return! ");
        return ;
    }
    
    // for循环将0到255的互不重复的元素装入S盒
    for (int i = 0; i < 256 ; i++) {
        m_box[i] = i;
    }
    
    // for循环根据密钥打乱S盒
    int j = 0;
    unsigned char tmp;
    for (int i = 0; i < 256; i++)
    {
        j = ( j + m_box[i] + key[i % Len] ) % 256;
        
        tmp = m_box[i];
        m_box[i] = m_box[j]; //交换m_box[i]和m_box[j]
        m_box[j] = tmp;
    }
}
    
void RC4::do_crypt(unsigned char *Data, unsigned long Len)
{
    // 每收到一个字节，就进行while循环。通过一定的算法（(a),(b)）定位S盒中的一个元素，并与输入字节异或，得到k。循环中还改变了S盒（(c)）。如果输入的是明文，输出的就是密文；如果输入的是密文，输出的就是明文。
    unsigned char tmp;
    for(unsigned long k = 0 ; k < Len ; k++)
    {
        m_index_i = (m_index_i + 1) % 256;    // a
        m_index_j = (m_index_j + m_box[m_index_i] ) % 256; // b
        
        tmp = m_box[m_index_i];
        m_box[m_index_i] = m_box[m_index_j]; //交换m_box[x]和m_box[y]
        m_box[m_index_j] = tmp;
        
        // 生成伪随机数
        int r = ( m_box[m_index_i] + m_box[m_index_j] ) % 256;
        Data[k] ^= m_box[r];
    }
    
}

```

Python 实现方式如下：

rc4.py 文件


```
# coding=utf-8

class RC4:

    def __init__(self,public_key = None):
        if not public_key:
            public_key = 'none_public_key'
        self.public_key = public_key
        self.index_i = 0;
        self.index_j = 0;
        self._init_box()
 
    def _init_box(self):
        """
        初始化 置换盒
        """

        self.Box = range(256)
        key_length = len(self.public_key)
        j = 0
        for i in range(256):
            index = ord(self.public_key[(i % key_length)])
            j = (j + self.Box[i] + index ) % 256
            self.Box[i],self.Box[j] = self.Box[j],self.Box[i]

    def do_crypt(self,string):
        """
        加密/解密
        string : 待加/解密的字符串
        """

        out = []
        for s in string:
            self.index_i = (self.index_i + 1) % 256
            self.index_j = (self.index_j + self.Box[self.index_i]) % 256
            self.Box[self.index_i], self.Box[self.index_j] = self.Box[self.index_j],  self.Box[self.index_i]

            r = (self.Box[self.index_i] + self.Box[self.index_j]) % 256
            R = self.Box[r] # 生成伪随机数
            out.append(chr(ord(s) ^ R))

        return ''.join(out)
        
```

####  遇到的坑

&emsp; &emsp; &emsp; &emsp; 网上查了很多资料，不少人给出了rc4算法的实现，因为客户端会一直的写数据到文件中去，所以在RC4 初始化之后， 会连续多次调用 **do_crypt** 这个方法，最初遇到的坑是：C++ 加密之后，使用Python 解密的时候，往往只能够解密出最开始的一句，之后的就是乱码了。解决办法是： 把m_index_i 和 m_index_j 作为成员变量，这样连续多次调用之后，对称加密中的置换盒 S盒 中的数据就会不停的滚动， 解密才能全部完成。
