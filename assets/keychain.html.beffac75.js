import{r,o as i,c,a as n,e as s,F as l,d as t,b as a}from"./app.01142347.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";var p="/blog/assets/putting-data-and-attributes-into-a-keychain.ec4a0b48.png";const u={},o=t('<h3 id="\u94A5\u5319\u4E32\u5B66\u4E60" tabindex="-1"><a class="header-anchor" href="#\u94A5\u5319\u4E32\u5B66\u4E60" aria-hidden="true">#</a> \u94A5\u5319\u4E32\u5B66\u4E60</h3><p>\u57FA\u672C\u6982\u5FF5</p><blockquote><p>Securely store small chunks of data on behalf of the user.</p></blockquote><p>\u9664\u4E86\u5B58\u50A8\u6570\u636E\u672C\u8EAB\uFF0C\u8FD8\u53EF\u4EE5\u63D0\u4F9B\u4E00\u7EC4\u516C\u5F00\u53EF\u89C1\u7684\u5C5E\u6027\uFF0C\u4EE5\u63A7\u5236\u9879\u76EE\u7684\u53EF\u8BBF\u95EE\u6027\u5E76\u4F7F\u5176\u53EF\u641C\u7D22\u3002</p><p><img src="'+p+`" alt="putting-data-and-attributes-into-a-keychain"></p><p><code>keychain</code> \u5B58\u50A8\u7C7B\u522B\u5206\u4E3A\uFF1A<code>kSecClassInternetPassword</code> , <code>kSecClassGenericPassword</code> , <code>kSecClassCertificate</code> , <code>kSecClassKey</code> , <code>kSecClassIdentity</code></p><p>\u53EF\u4EE5\u7528 <code>kSecClass</code> \u6765\u6307\u5B9A\u5B58\u50A8\u6570\u636E\u7684\u7C7B\u522B\u3002</p><p><code>kSecClassGenericPassword</code> \u7C7B\u578B\u6709\u5982\u4E0B\u5C5E\u6027\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kSecClassGenericPassword item attributes:
        kSecAttrAccess (OS X only)
        kSecAttrAccessControl
        kSecAttrAccessGroup (iOS; also OS X if kSecAttrSynchronizable specified) // \u7528\u4E8E\u6307\u5B9A\u591A\u4E2AAPP\u5171\u4EAB\u6570\u636E
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>\u4E3B\u8981API\u63A5\u53E3</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// \u589E
OSStatus SecItemAdd(CFDictionaryRef attributes, CFTypeRef * __nullable CF_RETURNS_RETAINED result);
// \u5220
OSStatus SecItemDelete(CFDictionaryRef query);
// \u6539
OSStatus SecItemUpdate(CFDictionaryRef query, CFDictionaryRef attributesToUpdate);
// \u67E5
OSStatus SecItemCopyMatching(CFDictionaryRef query, CFTypeRef * __nullable CF_RETURNS_RETAINED result);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u7B80\u5355\u793A\u4F8B\u4EE3\u7801:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// \u8BBE\u7F6E\u8D26\u53F7\u5BC6\u7801
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

// \u66F4\u65B0\u8D26\u53F7\u5BC6\u7801
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

// \u67E5\u8BE2\u5BC6\u7801
+ (NSDictionary *)getPassword:(NSString *)account service:(NSString *)service {
    if (!account || !service) {
        return nil;
    }
    
    NSMutableDictionary *query = [self queryDic];
    query[(__bridge id)kSecAttrAccount] = account;
    query[(__bridge id)kSecAttrService] = service;
    query[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitOne; // \u67E5\u8BE2\u5339\u914D\u4E0A\u7684\u7B2C\u4E00\u6761\u6570\u636E
    query[(__bridge id)kSecReturnAttributes] = CFBridgingRelease(kCFBooleanTrue);
    query[(__bridge id)kSecReturnData] = CFBridgingRelease(kCFBooleanTrue);
    
    CFTypeRef result = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &amp;result);
    if (status != errSecSuccess) {
        return nil;
    }
    if (!result) return nil;
    
    return [self resultDic:(__bridge NSDictionary *)result];
}

// \u67E5\u8BE2\u6240\u6709\u7684\u5BC6\u7801
+ (NSArray *)getAllPassword:(NSString *)service {
    if (!service) return nil;
    NSMutableDictionary *query = [self queryDic];
    query[(__bridge id)kSecAttrService] = service;
    query[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitAll; // \u67E5\u8BE2\u6240\u6709\u6570\u636E
    query[(__bridge id)kSecReturnAttributes] = CFBridgingRelease(kCFBooleanTrue);
    query[(__bridge id)kSecReturnData] = CFBridgingRelease(kCFBooleanTrue);
    
    CFTypeRef result = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &amp;result);
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

// \u5220\u9664\u8D26\u53F7
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
        [ret setObject:account forKey:@&quot;account&quot;];
    }
    NSString *password = [[NSString alloc] initWithData:[dic objectForKey:(__bridge id)kSecValueData] encoding:NSUTF8StringEncoding];
    if (password) {
        [ret setObject:password forKey:@&quot;password&quot;];
    }
    
    return [ret copy];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br></div></div><h5 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h5>`,14),d={href:"https://developer.apple.com/documentation/security/keychain_services?language=objc",target:"_blank",rel:"noopener noreferrer"},m=a("Keychain Services"),S={href:"https://developer.apple.com/library/archive/samplecode/GenericKeychain/Introduction/Intro.html",target:"_blank",rel:"noopener noreferrer"},y=a("GenericKeychain");function _(g,k){const e=r("ExternalLinkIcon");return i(),c(l,null,[o,n("ul",null,[n("li",null,[n("a",d,[m,s(e)])]),n("li",null,[n("a",S,[y,s(e)])])])],64)}var A=b(u,[["render",_]]);export{A as default};
