import{d as n}from"./app.01142347.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const e={},a=n(`<p>\u6700\u8FD1\u505A\u65E5\u5FD7\u6A21\u5757\u7684\u5DE5\u4F5C\uFF0C\u6709\u4E00\u4E2A\u9700\u6C42\u662F\u9700\u8981\u628A\u65E5\u5FD7\u52A0\u5BC6\u5199\u8FDB\u6587\u4EF6\uFF0C\u7136\u540E\u8BFB\u53D6\u6587\u4EF6\u7684\u65F6\u5019\u518D\u89E3\u5BC6\u3002\u6240\u4EE5\u8FD9\u4E2A\u52A0\u89E3\u5BC6\u65B9\u5F0F\u5C31\u9009\u62E9\u4E86RC4\u3002</p><p>\u767E\u5EA6\u767E\u79D1\u4E86\u4E00\u4E0BRC4\uFF0C\u4ECB\u7ECD\u5982\u4E0B\uFF1A</p><blockquote><p>RC4\u52A0\u5BC6\u7B97\u6CD5\u662F\u5927\u540D\u9F0E\u9F0E\u7684RSA\u4E09\u4EBA\u7EC4\u4E2D\u7684\u5934\u53F7\u4EBA\u7269Ronald Rivest\u57281987\u5E74\u8BBE\u8BA1\u7684\u5BC6\u94A5\u957F\u5EA6\u53EF\u53D8\u7684\u6D41\u52A0\u5BC6\u7B97\u6CD5\u7C07\u3002 \u4E4B\u6240\u4EE5\u79F0\u5176\u4E3A\u7C07\uFF0C\u662F\u7531\u4E8E\u5176\u6838\u5FC3\u90E8\u5206\u7684S-box\u957F\u5EA6\u53EF\u4E3A\u4EFB\u610F\uFF0C\u4F46\u4E00\u822C\u4E3A256\u5B57\u8282\u3002 \u8BE5\u7B97\u6CD5\u7684\u901F\u5EA6\u53EF\u4EE5\u8FBE\u5230DES\u52A0\u5BC6\u768410\u500D\u5DE6\u53F3\uFF0C\u4E14\u5177\u6709\u5F88\u9AD8\u7EA7\u522B\u7684\u975E\u7EBF\u6027\u3002RC4\u8D77\u521D\u662F\u7528\u4E8E\u4FDD\u62A4\u5546\u4E1A\u673A\u5BC6\u7684\u3002 \u4F46\u662F\u57281994\u5E749\u6708\uFF0C\u5B83\u7684\u7B97\u6CD5\u88AB\u53D1\u5E03\u5728\u4E92\u8054\u7F51\u4E0A\uFF0C\u4E5F\u5C31\u4E0D\u518D\u6709\u4EC0\u4E48\u5546\u4E1A\u673A\u5BC6\u4E86\u3002RC4\u4E5F\u88AB\u53EB\u505AARC4\uFF08Alleged RC4\u2014\u2014\u6240\u8C13\u7684RC4\uFF09\uFF0C\u56E0\u4E3ARSA\u4ECE\u6765\u5C31\u6CA1\u6709\u6B63\u5F0F\u53D1\u5E03\u8FC7\u8FD9\u4E2A\u7B97\u6CD5\u3002</p></blockquote><p><strong>RC4 \u7B97\u6CD5\u539F\u7406\u5206\u4E3A\u4E24\u6B65\uFF1A\u521D\u59CB\u5316\u7B97\u6CD5(KSA) \u548C \u4F2A\u968F\u673A\u5B50\u5BC6\u7801\u751F\u6210\u7B97\u6CD5(PRGA)\u4E24\u5927\u90E8\u5206\u3002</strong></p><p>C++ \u5B9E\u73B0\u5982\u4E0B\uFF1A</p><p>rc4.h \u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class RC4
{

public:
    RC4();
    
    void rc4_init(unsigned char *key, unsigned long Len);
    
    // \u52A0/\u89E3 \u5BC6
    void do_crypt(unsigned char *Data, unsigned long Len);
    
private:
   
    int m_box[256]; // \u5BF9\u79F0\u52A0\u5BC6\u4E2D\u7684\u7F6E\u6362\u76D2 S\u76D2
    int m_index_i;
    int m_index_j;
};
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>rc4.cpp \u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>RC4::RC4()
{
    m_index_i = 0;
    m_index_j = 0;
}

// \u521D\u59CB\u5316\u7B97\u6CD5
void RC4::rc4_init(unsigned char *key, unsigned long Len)
{
    if (key == NULL || Len == 0)
    {
        printf(&quot;rc4 key or len is 0, return! &quot;);
        return ;
    }
    
    // for\u5FAA\u73AF\u5C060\u5230255\u7684\u4E92\u4E0D\u91CD\u590D\u7684\u5143\u7D20\u88C5\u5165S\u76D2
    for (int i = 0; i &lt; 256 ; i++) {
        m_box[i] = i;
    }
    
    // for\u5FAA\u73AF\u6839\u636E\u5BC6\u94A5\u6253\u4E71S\u76D2
    int j = 0;
    unsigned char tmp;
    for (int i = 0; i &lt; 256; i++)
    {
        j = ( j + m_box[i] + key[i % Len] ) % 256;
        
        tmp = m_box[i];
        m_box[i] = m_box[j]; //\u4EA4\u6362m_box[i]\u548Cm_box[j]
        m_box[j] = tmp;
    }
}
    
void RC4::do_crypt(unsigned char *Data, unsigned long Len)
{
    // \u6BCF\u6536\u5230\u4E00\u4E2A\u5B57\u8282\uFF0C\u5C31\u8FDB\u884Cwhile\u5FAA\u73AF\u3002\u901A\u8FC7\u4E00\u5B9A\u7684\u7B97\u6CD5\uFF08(a),(b)\uFF09\u5B9A\u4F4DS\u76D2\u4E2D\u7684\u4E00\u4E2A\u5143\u7D20\uFF0C\u5E76\u4E0E\u8F93\u5165\u5B57\u8282\u5F02\u6216\uFF0C\u5F97\u5230k\u3002\u5FAA\u73AF\u4E2D\u8FD8\u6539\u53D8\u4E86S\u76D2\uFF08(c)\uFF09\u3002\u5982\u679C\u8F93\u5165\u7684\u662F\u660E\u6587\uFF0C\u8F93\u51FA\u7684\u5C31\u662F\u5BC6\u6587\uFF1B\u5982\u679C\u8F93\u5165\u7684\u662F\u5BC6\u6587\uFF0C\u8F93\u51FA\u7684\u5C31\u662F\u660E\u6587\u3002
    unsigned char tmp;
    for(unsigned long k = 0 ; k &lt; Len ; k++)
    {
        m_index_i = (m_index_i + 1) % 256;    // a
        m_index_j = (m_index_j + m_box[m_index_i] ) % 256; // b
        
        tmp = m_box[m_index_i];
        m_box[m_index_i] = m_box[m_index_j]; //\u4EA4\u6362m_box[x]\u548Cm_box[y]
        m_box[m_index_j] = tmp;
        
        // \u751F\u6210\u4F2A\u968F\u673A\u6570
        int r = ( m_box[m_index_i] + m_box[m_index_j] ) % 256;
        Data[k] ^= m_box[r];
    }
    
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><p>Python \u5B9E\u73B0\u65B9\u5F0F\u5982\u4E0B\uFF1A</p><p>rc4.py \u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># coding=utf-8

class RC4:

    def __init__(self,public_key = None):
        if not public_key:
            public_key = &#39;none_public_key&#39;
        self.public_key = public_key
        self.index_i = 0;
        self.index_j = 0;
        self._init_box()
 
    def _init_box(self):
        &quot;&quot;&quot;
        \u521D\u59CB\u5316 \u7F6E\u6362\u76D2
        &quot;&quot;&quot;

        self.Box = range(256)
        key_length = len(self.public_key)
        j = 0
        for i in range(256):
            index = ord(self.public_key[(i % key_length)])
            j = (j + self.Box[i] + index ) % 256
            self.Box[i],self.Box[j] = self.Box[j],self.Box[i]

    def do_crypt(self,string):
        &quot;&quot;&quot;
        \u52A0\u5BC6/\u89E3\u5BC6
        string : \u5F85\u52A0/\u89E3\u5BC6\u7684\u5B57\u7B26\u4E32
        &quot;&quot;&quot;

        out = []
        for s in string:
            self.index_i = (self.index_i + 1) % 256
            self.index_j = (self.index_j + self.Box[self.index_i]) % 256
            self.Box[self.index_i], self.Box[self.index_j] = self.Box[self.index_j],  self.Box[self.index_i]

            r = (self.Box[self.index_i] + self.Box[self.index_j]) % 256
            R = self.Box[r] # \u751F\u6210\u4F2A\u968F\u673A\u6570
            out.append(chr(ord(s) ^ R))

        return &#39;&#39;.join(out)
        
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h4 id="\u9047\u5230\u7684\u5751" tabindex="-1"><a class="header-anchor" href="#\u9047\u5230\u7684\u5751" aria-hidden="true">#</a> \u9047\u5230\u7684\u5751</h4><p>\u7F51\u4E0A\u67E5\u4E86\u5F88\u591A\u8D44\u6599\uFF0C\u4E0D\u5C11\u4EBA\u7ED9\u51FA\u4E86rc4\u7B97\u6CD5\u7684\u5B9E\u73B0\uFF0C\u56E0\u4E3A\u5BA2\u6237\u7AEF\u4F1A\u4E00\u76F4\u7684\u5199\u6570\u636E\u5230\u6587\u4EF6\u4E2D\u53BB\uFF0C\u6240\u4EE5\u5728RC4 \u521D\u59CB\u5316\u4E4B\u540E\uFF0C \u4F1A\u8FDE\u7EED\u591A\u6B21\u8C03\u7528 <strong>do_crypt</strong> \u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u6700\u521D\u9047\u5230\u7684\u5751\u662F\uFF1AC++ \u52A0\u5BC6\u4E4B\u540E\uFF0C\u4F7F\u7528Python \u89E3\u5BC6\u7684\u65F6\u5019\uFF0C\u5F80\u5F80\u53EA\u80FD\u591F\u89E3\u5BC6\u51FA\u6700\u5F00\u59CB\u7684\u4E00\u53E5\uFF0C\u4E4B\u540E\u7684\u5C31\u662F\u4E71\u7801\u4E86\u3002\u89E3\u51B3\u529E\u6CD5\u662F\uFF1A \u628Am_index_i \u548C m_index_j \u4F5C\u4E3A\u6210\u5458\u53D8\u91CF\uFF0C\u8FD9\u6837\u8FDE\u7EED\u591A\u6B21\u8C03\u7528\u4E4B\u540E\uFF0C\u5BF9\u79F0\u52A0\u5BC6\u4E2D\u7684\u7F6E\u6362\u76D2 S\u76D2 \u4E2D\u7684\u6570\u636E\u5C31\u4F1A\u4E0D\u505C\u7684\u6EDA\u52A8\uFF0C \u89E3\u5BC6\u624D\u80FD\u5168\u90E8\u5B8C\u6210\u3002</p>`,14);function l(r,p){return a}var c=s(e,[["render",l]]);export{c as default};
