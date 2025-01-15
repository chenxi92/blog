import{r as l,o as t,c as i,a as n,e as s,F as p,d as r,b as a}from"./app.01142347.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";var c="/blog/assets/Insertion_sort_animation.7016a1ad.gif";const o={},u=r(`<h3 id="\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u76EE\u5F55" aria-hidden="true">#</a> \u76EE\u5F55</h3><p><a href="#binary-search">1. \u4E8C\u5206\u67E5\u627E\u6CD5</a></p><p><a href="#bubble-sort">2. \u5192\u6CE1\u6392\u5E8F</a></p><p><a href="#quick-sort">3. \u5FEB\u901F\u6392\u5E8F</a></p><p><a href="#insert-sort">4. \u63D2\u5165\u6392\u5E8F</a></p><p><a href="#cock-tail-sort">5. \u9E21\u5C3E\u9152\u6392\u5E8F</a></p><p><a href="#section-sort">6. \u9009\u62E9\u6392\u5E8F</a></p><h3 id="\u4E8C\u5206\u67E5\u627E\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u5206\u67E5\u627E\u6CD5" aria-hidden="true">#</a> <a name="binary-search"></a>\u4E8C\u5206\u67E5\u627E\u6CD5</h3><p><strong>\u9002\u7528\u8303\u56F4\uFF1A</strong> \u5F53\u6570\u636E\u91CF\u5F88\u5927\u9002\u5B9C\u91C7\u7528\u8BE5\u65B9\u6CD5\u3002</p><p><strong>\u524D\u63D0\u6761\u4EF6\uFF1A</strong> \u6570\u636E\u9700\u662F\u6392\u597D\u5E8F\u7684</p><p><strong>\u57FA\u672C\u601D\u60F3\uFF1A</strong> \u5047\u8BBE\u6570\u636E\u662F\u6309\u5347\u5E8F\u6392\u5E8F\u7684\uFF0C\u5BF9\u4E8E\u7ED9\u5B9A\u503Cx\uFF0C\u4ECE\u5E8F\u5217\u7684\u4E2D\u95F4\u4F4D\u7F6E\u5F00\u59CB\u6BD4\u8F83\uFF0C\u5982\u679C\u5F53\u524D\u4F4D\u7F6E\u503C\u7B49\u4E8Ex\uFF0C\u5219\u67E5\u627E\u6210\u529F\uFF1B\u82E5x\u5C0F\u4E8E\u5F53\u524D\u4F4D\u7F6E\u503C\uFF0C\u5219\u5728\u6570\u5217\u7684\u524D\u534A\u6BB5 \u4E2D\u67E5\u627E\uFF1B\u82E5x\u5927\u4E8E\u5F53\u524D\u4F4D\u7F6E\u503C\u5219\u5728\u6570\u5217\u7684\u540E\u534A\u6BB5\u4E2D\u7EE7\u7EED\u67E5\u627E\uFF0C\u76F4\u5230\u627E\u5230\u4E3A\u6B62\u3002</p><p><strong>\u4EE3\u7801\u5B9E\u73B0\uFF1A</strong></p><div class="language-oc ext-oc line-numbers-mode"><pre class="language-oc"><code>// Sort.m
+ (NSInteger)binarySearch:(NSArray *)array target:(id)key {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    NSInteger left = 0;
    NSInteger right = [arr count] - 1;

    while (right &gt;= left) {
        // NSInteger middle = (right + left) / 2; \u5982\u679Cright\u7684\u503C\u5FEB\u8981\u6EA2\u51FA\u8FB9\u754C\uFF0C\u8BE5\u64CD\u4F5C\u4F1A\u5BFC\u81F4\u503C\u6EA2\u51FA
        NSInteger middle = right / 2 + left / 2;
        if (arr[middle] == key) {
            return middle;
        } else if (arr[middle] &gt; key) {
            right = middle - 1;
        } else if (arr[middle] &lt; key) {
            left = middle + 1;
        }
    }
    return -1;
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSInteger binary = [Sort binarySearch:@[@&quot;2&quot;,@&quot;5&quot;,@&quot;6&quot;,@&quot;8&quot;,@&quot;9&quot;, @&quot;12&quot;] target:@&quot;8&quot;];
NSLog(@&quot;%ld&quot;,binary);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u5192\u6CE1\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5192\u6CE1\u6392\u5E8F" aria-hidden="true">#</a> <a name="bubble-sort"></a>\u5192\u6CE1\u6392\u5E8F</h3>`,16),d=n("strong",null,"\u53C2\u8003:",-1),m=a(),g={href:"https://mp.weixin.qq.com/s/wO11PDZSM5pQ0DfbQjKRQA",target:"_blank",rel:"noopener noreferrer"},h=a("\u5192\u6CE1\u6392\u5E8F"),S=r(`<p><strong>\u57FA\u672C\u601D\u60F3\uFF1A\u4F7F\u7528\u53CC\u5FAA\u73AF\u6765\u8FDB\u884C\u6392\u5E8F\u3002\u5916\u90E8\u5FAA\u73AF\u63A7\u5236\u6240\u6709\u7684\u56DE\u5408\uFF0C\u5185\u90E8\u5FAA\u73AF\u4EE3\u8868\u6BCF\u4E00\u8F6E\u7684\u5192\u6CE1\u5904\u7406\uFF0C\u5148\u8FDB\u884C\u5143\u7D20\u6BD4\u8F83\uFF0C\u518D\u8FDB\u884C\u5143\u7D20\u4EA4\u6362</strong></p><p><strong>\u4EE3\u7801\u5B9E\u73B0\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (NSMutableArray *)bubbleSort:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    for (int i = 0; i &lt; arr.count; i++) {
        for (int j = 0; j &lt; [arr count] - i - 1; j++) {
            if ([arr[j] intValue] &gt; [arr[j+1] intValue]) { // \u5347\u5E8F\u6392\u5217
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
            }
        }
    }
    return arr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u4EE3\u7801\u4F18\u53161\uFF1A<strong>\u5224\u65AD\u5982\u679C\u6570\u5217\u5DF2\u7ECF\u6709\u5E8F\uFF0C\u5E76\u4E14\u505A\u51FA\u6807\u8BB0\uFF0C\u5269\u4E0B\u7684\u51E0\u8F6E\u6392\u5E8F\u5C31\u53EF\u4EE5\u4E0D\u5FC5\u6267\u884C\uFF0C\u63D0\u65E9\u7ED3\u675F\u5DE5\u4F5C</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (NSMutableArray *)bubbleSortOptimize1:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    for (int i = 0; i &lt; arr.count; i++) {
        BOOL isSorted = YES; // \u6807\u8BB0\u662F\u5426\u6709\u5E8F
        for (int j = 0; j &lt; arr.count - i - 1; j++) {
            if ([arr[j] intValue] &gt; [arr[j+1] intValue]) { // \u5347\u5E8F\u6392\u5217
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                // \u6709\u5143\u7D20\u4EA4\u6362\uFF0C\u6240\u4EE5\u4E0D\u662F\u6709\u5E8F\uFF0C\u6807\u8BB0\u53D8\u4E3ANO
                isSorted = NO;
            }
            
        }
        if (isSorted) break;
    }
    return arr;
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>\u4EE3\u7801\u4F18\u53162\uFF1A<strong>\u5224\u65AD\u6709\u5E8F\u533A\u95F4</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (NSMutableArray *)bubbleSortOptimize2:(NSArray *)array {
    NSMutableArray *arr = [NSMutableArray arrayWithArray:array];
    NSInteger lastExchangeIndex = 0; // \u8BB0\u5F55\u6700\u540E\u4E00\u6B21\u4EA4\u6362\u7684\u4F4D\u7F6E
    NSInteger sortBorder = arr.count - 1; // \u65E0\u5E8F\u6570\u5217\u7684\u8FB9\u754C\uFF0C\u6BCF\u6B21\u6BD4\u8F83\u53EA\u9700\u8981\u6BD4\u5230\u8FD9\u91CC\u4E3A\u6B62
    for (int i = 0; i &lt; arr.count; i++) {
        BOOL isSorted = YES; // \u6807\u8BB0\u662F\u5426\u6709\u5E8F
        for (int j = 0; j &lt; sortBorder; j++) {
            if ([arr[j] intValue] &gt; [arr[j+1] intValue]) {
                [arr exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                // \u6709\u5143\u7D20\u4EA4\u6362\uFF0C\u6240\u4EE5\u4E0D\u662F\u6709\u5E8F\uFF0C\u6807\u8BB0\u53D8\u4E3ANO
                isSorted = NO;
                // \u628A\u65E0\u5E8F\u6570\u5217\u7684\u8FB9\u754C\u66F4\u65B0\u4E3A\u6700\u540E\u4E00\u6B21\u4EA4\u6362\u5143\u7D20\u7684\u4F4D\u7F6E
                lastExchangeIndex = j;
            }
        }
        sortBorder = lastExchangeIndex;
        if (isSorted) break;
    }
    return arr;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSMutableArray *array = [NSMutableArray arrayWithObjects:@3, @4, @2, @1, @5, @6, @7, @8, nil];
        
NSLog(@&quot;bubble sort = %@&quot;, [Sort bubbleSort:array]);
NSLog(@&quot;bubble sort optimize1 = %@&quot;, [Sort bubbleSortOptimize1:array]);
NSLog(@&quot;bubble sort optimize2 = %@&quot;, [Sort bubbleSortOptimize2:array]);
NSLog(@&quot;origin array = %@&quot;, array);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="\u5FEB\u901F\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u6392\u5E8F" aria-hidden="true">#</a> <a name="quick-sort"></a>\u5FEB\u901F\u6392\u5E8F</h3>`,10),x=n("strong",null,"\u53C2\u8003\uFF1A",-1),y=a(),f={href:"https://mp.weixin.qq.com/s/PQLC7qFjb74kt6PdExP8mw",target:"_blank",rel:"noopener noreferrer"},j=a("\u5FEB\u901F\u6392\u5E8F"),N={href:"https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F",target:"_blank",rel:"noopener noreferrer"},A=a("\u5FEB\u901F\u6392\u5E8F"),_=a("\u4F7F\u7528"),I=n("code",null,"\u5206\u6CBB\u6CD5",-1),v=a("\uFF08Divide and conquer\uFF09\u7B56\u7565\u6765\u628A\u4E00\u4E2A\u5E8F\u5217\uFF08list\uFF09\u5206\u4E3A\u4E24\u4E2A\u5B50\u5E8F\u5217\uFF08sub-lists\uFF09\u3002"),k=r(`<p><strong>\u6B65\u9AA4\u4E3A</strong>\uFF1A</p><ol><li>\u4ECE\u6570\u5217\u4E2D\u6311\u51FA\u4E00\u4E2A\u5143\u7D20\uFF0C\u79F0\u4E3A\u201C\u57FA\u51C6\u201D\uFF08pivot\uFF09\uFF0C</li><li>\u91CD\u65B0\u6392\u5E8F\u6570\u5217\uFF0C\u6240\u6709\u6BD4\u57FA\u51C6\u503C\u5C0F\u7684\u5143\u7D20\u6446\u653E\u5728\u57FA\u51C6\u524D\u9762\uFF0C\u6240\u6709\u6BD4\u57FA\u51C6\u503C\u5927\u7684\u5143\u7D20\u6446\u5728\u57FA\u51C6\u540E\u9762\uFF08\u76F8\u540C\u7684\u6570\u53EF\u4EE5\u5230\u4EFB\u4F55\u4E00\u8FB9\uFF09\u3002\u5728\u8FD9\u4E2A\u5206\u5272\u7ED3\u675F\u4E4B\u540E\uFF0C\u8BE5\u57FA\u51C6\u5C31\u5904\u4E8E\u6570\u5217\u7684\u4E2D\u95F4\u4F4D\u7F6E\u3002\u8FD9\u4E2A\u79F0\u4E3A\u5206\u5272\uFF08partition\uFF09\u64CD\u4F5C\u3002</li><li>\u9012\u5F52\u5730\uFF08recursively\uFF09\u628A\u5C0F\u4E8E\u57FA\u51C6\u503C\u5143\u7D20\u7684\u5B50\u6570\u5217\u548C\u5927\u4E8E\u57FA\u51C6\u503C\u5143\u7D20\u7684\u5B50\u6570\u5217\u6392\u5E8F\u3002</li></ol><p><strong>\u4EE3\u7801\u5B9E\u73B0\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (void)quickSort:(NSMutableArray *)array startIndex:(NSInteger)startIndex endIndex:(NSInteger)endIndex {
    if (startIndex &gt;= endIndex) {
        return;
    }
    NSInteger left = startIndex;
    NSInteger right = endIndex;
    // \u53D6\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u7684\u5143\u7D20\u4F5C\u4E3A\u57FA\u51C6\u5143\u7D20
    NSInteger pivot = [array[startIndex] integerValue];
    // \u5751\u7684\u4F4D\u7F6E\uFF0C\u521D\u59CB\u7B49\u4E8Epivot\u7684\u4F4D\u7F6E
    NSInteger index = startIndex;
    
    //\u5927\u5FAA\u73AF\u5728\u5DE6\u53F3\u6307\u9488\u91CD\u5408\u6216\u8005\u4EA4\u9519\u65F6\u7ED3\u675F
    while (right &gt;= left) {
        //right\u6307\u9488\u4ECE\u53F3\u5411\u5DE6\u8FDB\u884C\u6BD4\u8F83
        while (right &gt;= left) {
            if ([array[right] integerValue] &lt; pivot) {
                [array exchangeObjectAtIndex:left withObjectAtIndex:right];
                index = right;
                left++;
                break;
            }
            right--;
        }
        
        //left\u6307\u9488\u4ECE\u5DE6\u5411\u53F3\u8FDB\u884C\u6BD4\u8F83
        while (right &gt;= left) {
            if ([array[left] integerValue] &gt; pivot) {
                [array exchangeObjectAtIndex:right withObjectAtIndex:left];
                index = left;
                right--;
                break;
            }
            left++;
        }
    }
    array[index] = @(pivot);
    
    [self quickSort:array startIndex:startIndex endIndex:index - 1];
    [self quickSort:array startIndex:index + 1 endIndex:endIndex];
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSMutableArray *quickArray = [NSMutableArray arrayWithObjects:@4, @7, @6, @5, @9, @3, @2, @8, @1, nil];

NSLog(@&quot;before quick sort = %@&quot;, quickArray);
[Sort quickSort:quickArray startIndex:0 endIndex:quickArray.count - 1];
NSLog(@&quot;after quick sort = %@&quot;, quickArray);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u63D2\u5165\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u5165\u6392\u5E8F" aria-hidden="true">#</a> <a name="insert-sort"></a>\u63D2\u5165\u6392\u5E8F</h3>`,7),q=n("strong",null,"\u53C2\u8003\uFF1A",-1),O=a(),E={href:"https://blog.51cto.com/9217856/1563523",target:"_blank",rel:"noopener noreferrer"},M=a("\u63D2\u5165\u6392\u5E8F"),w={href:"https://zh.wikipedia.org/wiki/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F",target:"_blank",rel:"noopener noreferrer"},B=a("\u63D2\u5165\u6392\u5E8F"),L=a("\uFF08Insertion Sort\uFF09\u662F\u4E00\u79CD\u7B80\u5355\u76F4\u89C2\u7684\u6392\u5E8F\u7B97\u6CD5\u3002"),z=r('<p>\u5B83\u7684\u5DE5\u4F5C\u539F\u7406\u662F\u901A\u8FC7\u6784\u5EFA\u6709\u5E8F\u5E8F\u5217\uFF0C\u5BF9\u4E8E\u672A\u6392\u5E8F\u6570\u636E\uFF0C\u5728\u5DF2\u6392\u5E8F\u5E8F\u5217\u4E2D\u4ECE\u540E\u5411\u524D\u626B\u63CF\uFF0C\u627E\u5230\u76F8\u5E94\u4F4D\u7F6E\u5E76\u63D2\u5165\u3002</p><p>\u63D2\u5165\u6392\u5E8F\u5728\u5B9E\u73B0\u4E0A\uFF0C\u901A\u5E38\u91C7\u7528in-place\u6392\u5E8F\uFF08\u5373\u53EA\u9700\u7528\u5230<code>O(1)</code>\u7684\u989D\u5916\u7A7A\u95F4\u7684\u6392\u5E8F\uFF09\uFF0C\u56E0\u800C\u5728\u4ECE\u540E\u5411\u524D\u626B\u63CF\u8FC7\u7A0B\u4E2D\uFF0C\u9700\u8981\u53CD\u590D\u628A\u5DF2\u6392\u5E8F\u5143\u7D20\u9010\u6B65\u5411\u540E\u632A\u4F4D\uFF0C\u4E3A\u6700\u65B0\u5143\u7D20\u63D0\u4F9B\u63D2\u5165\u7A7A\u95F4\u3002</p><p><img src="'+c+`" alt="\u4F7F\u7528\u63D2\u5165\u6392\u5E8F\u4E3A\u4E00\u5217\u6570\u5B57\u8FDB\u884C\u6392\u5E8F\u7684\u8FC7\u7A0B"></p><p>\u5177\u4F53\u7B97\u6CD5\u63CF\u8FF0\u5982\u4E0B\uFF1A</p><ol><li>\u4ECE\u7B2C\u4E00\u4E2A\u5143\u7D20\u5F00\u59CB\uFF0C\u8BE5\u5143\u7D20\u53EF\u4EE5\u8BA4\u4E3A\u5DF2\u7ECF\u88AB\u6392\u5E8F</li><li>\u53D6\u51FA\u4E0B\u4E00\u4E2A\u5143\u7D20\uFF0C\u5728\u5DF2\u7ECF\u6392\u5E8F\u7684\u5143\u7D20\u5E8F\u5217\u4E2D\u4ECE\u540E\u5411\u524D\u626B\u63CF</li><li>\u5982\u679C\u8BE5\u5143\u7D20\uFF08<code>\u5DF2\u6392\u5E8F</code>\uFF09\u5927\u4E8E\u65B0\u5143\u7D20\uFF0C\u5C06\u8BE5\u5143\u7D20\u79FB\u5230\u4E0B\u4E00\u4F4D\u7F6E</li><li>\u91CD\u590D\u6B65\u9AA43\uFF0C\u76F4\u5230\u627E\u5230\u5DF2\u6392\u5E8F\u7684\u5143\u7D20\u5C0F\u4E8E\u6216\u8005\u7B49\u4E8E\u65B0\u5143\u7D20\u7684\u4F4D\u7F6E</li><li>\u5C06\u65B0\u5143\u7D20\u63D2\u5165\u5230\u8BE5\u4F4D\u7F6E\u540E</li><li>\u91CD\u590D\u6B65\u9AA42~5</li></ol><p>\u9002\u7528\u8303\u56F4\uFF1A\u9700\u8981\u6392\u5E8F\u7684\u6570\u636E\u91CF\u5F88\u5C0F\uFF1B\u6216\u8005\u82E5\u5DF2\u77E5\u8F93\u5165\u5143\u7D20\u5927\u81F4\u4E0A\u6309\u7167\u987A\u5E8F\u6392\u5217</p><p>\u4E0D\u9002\u7528\u8303\u56F4\uFF1A\u63D2\u5165\u6392\u5E8F\u4E0D\u9002\u5408\u5BF9\u4E8E\u6570\u636E\u91CF\u6BD4\u8F83\u5927\u7684\u6392\u5E8F\u5E94\u7528</p><p><strong>\u4EE3\u7801\u5B9E\u73B0\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (void)insertSort:(NSMutableArray *)array {
    
    for (int i = 1; i &lt; array.count; i++) {
        NSNumber *key = array[i];
        int j = i - 1;
        while (j &gt;= 0 &amp;&amp; [array[j] compare:key] == NSOrderedDescending) {
            [array exchangeObjectAtIndex:j + 1 withObjectAtIndex:j];
            j--;
        }
        array[j + 1] = key;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSMutableArray *insertArray = [NSMutableArray arrayWithObjects:@3, @2, @6, @9, @8, @5, @7, @1, @4, nil];
NSLog(@&quot;before insert sort = %@&quot;, insertArray);
[Sort insertSort:insertArray];
NSLog(@&quot;after insert sort = %@&quot;, insertArray);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="\u9E21\u5C3E\u9152\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u9E21\u5C3E\u9152\u6392\u5E8F" aria-hidden="true">#</a> <a name="cock-tail-sort"></a>\u9E21\u5C3E\u9152\u6392\u5E8F</h3>`,12),V=n("strong",null,"\u53C2\u8003",-1),T=a(),W={href:"https://mp.weixin.qq.com/s/CoVZrvis6BnxBQgQrdc5kA",target:"_blank",rel:"noopener noreferrer"},F=a("\u9E21\u5C3E\u9152\u6392\u5E8F"),Y=r(`<p><strong>\u4F18\u70B9\uFF1A</strong> \u5728\u7279\u5B9A\u6761\u4EF6\u4E0B\uFF0C\u51CF\u5C11\u6392\u5E8F\u7684\u56DE\u5408\u6570</p><p><strong>\u7F3A\u70B9\uFF1A</strong> \u4EE3\u7801\u91CF\u51E0\u4E4E\u6269\u5927\u4E86\u4E00\u500D</p><p><strong>\u5E94\u7528\u573A\u666F\uFF1A</strong> \u5927\u90E8\u5206\u5143\u7D20\u5DF2\u7ECF\u6709\u5E8F</p><p><strong>\u4EE3\u7801\u5B9E\u73B0\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (void)cockTailSort:(NSMutableArray *)array {
    
    for (NSInteger i = 0; i &lt; array.count/2; i++) {
        //\u6709\u5E8F\u6807\u8BB0\uFF0C\u6BCF\u4E00\u8F6E\u7684\u521D\u59CB\u662Ftrue
        BOOL isSorted = YES;
        //\u5947\u6570\u8F6E\uFF0C\u4ECE\u5DE6\u5411\u53F3\u6BD4\u8F83\u548C\u4EA4\u6362
        for (NSInteger j = i; j &lt; array.count - i - 1; j++) {
            if ([array[j] compare:array[j + 1]] == NSOrderedDescending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                isSorted = NO;
            }
        }
        if (isSorted) break;
        
        //\u5076\u6570\u8F6E\u4E4B\u524D\uFF0C\u91CD\u65B0\u6807\u8BB0\u4E3Atrue
        isSorted = YES;
        //\u5076\u6570\u8F6E\uFF0C\u4ECE\u53F3\u5411\u5DE6\u6BD4\u8F83\u548C\u4EA4\u6362
        for (NSInteger j = array.count - i - 1; j &gt; i; j--) {
            if ([array[j] compare:array[j - 1]] == NSOrderedAscending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j - 1];
                isSorted = NO;
            }
        }
        if (isSorted) break;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><strong>\u4EE3\u7801\u4F18\u5316</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (void)cockTailSortOptimize:(NSMutableArray *)array {
    //\u8BB0\u5F55\u53F3\u4FA7\u6700\u540E\u4E00\u6B21\u4EA4\u6362\u7684\u4F4D\u7F6E
    NSInteger lastRightExchangeIndex = 0;
    //\u8BB0\u5F55\u5DE6\u4FA7\u6700\u540E\u4E00\u6B21\u4EA4\u6362\u7684\u4F4D\u7F6E
    NSInteger lastLeftExchangeIndex = 0;
    //\u65E0\u5E8F\u6570\u5217\u7684\u53F3\u8FB9\u754C\uFF0C\u6BCF\u6B21\u6BD4\u8F83\u53EA\u9700\u8981\u6BD4\u5230\u8FD9\u91CC\u4E3A\u6B62
    NSInteger rightSortBorder = array.count - 1;
    //\u65E0\u5E8F\u6570\u5217\u7684\u5DE6\u8FB9\u754C\uFF0C\u6BCF\u6B21\u6BD4\u8F83\u53EA\u9700\u8981\u6BD4\u5230\u8FD9\u91CC\u4E3A\u6B62
    NSInteger leftSortBorder = 0;
    
    for (NSInteger i = 0; i &lt; array.count/2; i++) {
        
        //\u6709\u5E8F\u6807\u8BB0\uFF0C\u6BCF\u4E00\u8F6E\u7684\u521D\u59CB\u662FYES
        BOOL isSorted = YES;
        //\u5947\u6570\u8F6E\uFF0C\u4ECE\u5DE6\u5411\u53F3\u6BD4\u8F83\u548C\u4EA4\u6362
        for (NSInteger j = leftSortBorder; j &lt; rightSortBorder; j++) {
            if ([array[j] compare:array[j + 1]] == NSOrderedDescending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j + 1];
                isSorted = NO;
                lastRightExchangeIndex = j;
            }
        }
        rightSortBorder = lastRightExchangeIndex;
        if (isSorted) break;
        
        //\u5076\u6570\u8F6E\u4E4B\u524D\uFF0C\u91CD\u65B0\u6807\u8BB0\u4E3AYES
        isSorted = YES;
        //\u5076\u6570\u8F6E\uFF0C\u4ECE\u53F3\u5411\u5DE6\u6BD4\u8F83\u548C\u4EA4\u6362
        for (NSInteger j = rightSortBorder; j &gt; leftSortBorder; j--) {
            if ([array[j] compare:array[j - 1]] == NSOrderedAscending) {
                [array exchangeObjectAtIndex:j withObjectAtIndex:j - 1];
                isSorted = NO;
                lastLeftExchangeIndex = j;
            }
        }
        leftSortBorder = lastLeftExchangeIndex;
        if (isSorted) break;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSMutableArray *cockTailArray = [NSMutableArray arrayWithObjects:@2, @3, @4, @5, @6, @7, @8, @1, nil];
NSLog(@&quot;before cock tail array = %@&quot;, cockTailArray);
[Sort cockTailSort:cockTailArray];
NSLog(@&quot;after cock tail array = %@&quot;, cockTailArray);
        
NSMutableArray *cockTailArrayOptimize = [NSMutableArray arrayWithObjects:@2, @3, @4, @5, @6, @7, @8, @1, nil];
NSLog(@&quot;before cock tail array optimize = %@&quot;, cockTailArrayOptimize);
[Sort cockTailSortOptimize:cockTailArrayOptimize];
NSLog(@&quot;after cock tail array optimize = %@&quot;, cockTailArrayOptimize);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="\u9009\u62E9\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u9009\u62E9\u6392\u5E8F" aria-hidden="true">#</a> <a name="section-sort"></a>\u9009\u62E9\u6392\u5E8F</h3>`,10),D={href:"https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F",target:"_blank",rel:"noopener noreferrer"},Q=a("\u9009\u62E9\u6392\u5E8F"),P=a("\uFF08Selection sort\uFF09\u662F\u4E00\u79CD\u7B80\u5355\u76F4\u89C2\u7684\u6392\u5E8F\u7B97\u6CD5\u3002"),R=r(`<p>\u5B83\u7684\u5DE5\u4F5C\u539F\u7406\u5982\u4E0B:</p><p>\u9996\u5148\u5728\u672A\u6392\u5E8F\u5E8F\u5217\u4E2D\u627E\u5230\u6700\u5C0F\uFF08\u5927\uFF09\u5143\u7D20\uFF0C\u5B58\u653E\u5230\u6392\u5E8F\u5E8F\u5217\u7684\u8D77\u59CB\u4F4D\u7F6E\uFF0C\u7136\u540E\uFF0C\u518D\u4ECE\u5269\u4F59\u672A\u6392\u5E8F\u5143\u7D20\u4E2D\u7EE7\u7EED\u5BFB\u627E\u6700\u5C0F\uFF08\u5927\uFF09\u5143\u7D20\uFF0C\u7136\u540E\u653E\u5230\u5DF2\u6392\u5E8F\u5E8F\u5217\u7684\u672B\u5C3E\u3002\u4EE5\u6B64\u7C7B\u63A8\uFF0C\u76F4\u5230\u6240\u6709\u5143\u7D20\u5747\u6392\u5E8F\u5B8C\u6BD5\u3002</p><p>\u9009\u62E9\u6392\u5E8F\u7684\u4E3B\u8981\u4F18\u70B9\u4E0E<code>\u6570\u636E\u79FB\u52A8</code>\u6709\u5173\u3002\u5982\u679C\u67D0\u4E2A\u5143\u7D20\u4F4D\u4E8E\u6B63\u786E\u7684\u6700\u7EC8\u4F4D\u7F6E\u4E0A\uFF0C\u5219\u5B83\u4E0D\u4F1A\u88AB\u79FB\u52A8\u3002\u9009\u62E9\u6392\u5E8F\u6BCF\u6B21\u4EA4\u6362\u4E00\u5BF9\u5143\u7D20\uFF0C\u5B83\u4EEC\u5F53\u4E2D\u81F3\u5C11\u6709\u4E00\u4E2A\u5C06\u88AB\u79FB\u5230\u5176\u6700\u7EC8\u4F4D\u7F6E\u4E0A\uFF0C\u56E0\u6B64\u5BF9<code>n</code>\u4E2A\u5143\u7D20\u7684\u8868\u8FDB\u884C\u6392\u5E8F\u603B\u5171\u8FDB\u884C\u81F3\u591A<code>n-1</code>\u6B21\u4EA4\u6362\u3002\u5728\u6240\u6709\u7684\u5B8C\u5168\u4F9D\u9760\u4EA4\u6362\u53BB\u79FB\u52A8\u5143\u7D20\u7684\u6392\u5E8F\u65B9\u6CD5\u4E2D\uFF0C\u9009\u62E9\u6392\u5E8F\u5C5E\u4E8E\u975E\u5E38\u597D\u7684\u4E00\u79CD\u3002</p><p><strong>\u4EE3\u7801\u5B9E\u73B0</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Sort.m
+ (void)sectionSort:(NSMutableArray *)array {
    for (NSInteger i = 0; i &lt; array.count - 1; i++) {
        NSInteger min = i;
        for (NSInteger j = i + 1; j &lt; array.count; j++) {
            if ([array[j] compare:array[min]] == NSOrderedAscending) {
                min = j;
            }
        }
        [array exchangeObjectAtIndex:i withObjectAtIndex:min];
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>NSMutableArray *sectionArray = [NSMutableArray arrayWithObjects:@2, @3, @4, @5, @6, @7, @8, @1, nil];
NSLog(@&quot;before section array = %@&quot;, sectionArray);
[Sort sectionSort:sectionArray];
NSLog(@&quot;after section array = %@&quot;, sectionArray);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,7);function C(Z,K){const e=l("ExternalLinkIcon");return t(),i(p,null,[u,n("p",null,[d,m,n("a",g,[h,s(e)])]),S,n("p",null,[x,y,n("a",f,[j,s(e)])]),n("p",null,[n("a",N,[A,s(e)]),_,I,v]),k,n("p",null,[q,O,n("a",E,[M,s(e)])]),n("p",null,[n("a",w,[B,s(e)]),L]),z,n("p",null,[V,T,n("a",W,[F,s(e)])]),Y,n("p",null,[n("a",D,[Q,s(e)]),P]),R],64)}var J=b(o,[["render",C]]);export{J as default};
