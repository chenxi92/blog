import{r as n,o as s,c as t,a as e,e as r,F as c,d as l,b as i}from"./app.01142347.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";const u={},o=l(`<h4 id="cut-\u547D\u4EE4\u4F7F\u7528\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#cut-\u547D\u4EE4\u4F7F\u7528\u603B\u7ED3" aria-hidden="true">#</a> <code>cut</code> \u547D\u4EE4\u4F7F\u7528\u603B\u7ED3</h4><p align="right">Update: 2019-5-15</p><blockquote><p>cut out selected portions of each line of a file.</p></blockquote><blockquote><p>\u663E\u793A\u6587\u4EF6\u6BCF\u4E00\u884C\u7684\u6307\u5B9A\u90E8\u5206\u5185\u5BB9\u3002</p></blockquote><h5 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>cut -b list [-n] [file ...]
cut -c list [file ...]
cut -f list [-d delim] [-s] [file ...]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570" aria-hidden="true">#</a> \u53C2\u6570</h5><blockquote><p><mark>-b</mark> \u663E\u793A\u6307\u5B9A\u7684\u5B57\u8282</p></blockquote><blockquote><p><mark>-c</mark> \u663E\u793A\u6307\u5B9A\u7684\u5B57\u7B26</p></blockquote><blockquote><p><mark>-d</mark> \u6307\u5B9A\u5206\u9694\u7B26(\u9ED8\u8BA4\u5206\u5272\u7B26\u662F <code>tab</code>)</p></blockquote><blockquote><p><mark>-f</mark> \u663E\u793A\u6307\u5B9A\u5B57\u6BB5</p></blockquote><blockquote><p><mark>-s</mark> \u53EA\u663E\u793A\u6709\u6307\u5B9A\u5206\u9694\u7B26\u7684\u90A3\u4E00\u884C</p></blockquote><h5 id="\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u7528\u6CD5" aria-hidden="true">#</a> \u7528\u6CD5</h5><p>\u521B\u5EFA <code>test.txt</code> \u6587\u4EF6\uFF0C\u5185\u5BB9\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>No      Name    Mark    Percent
01      tom     69      91
02      jack    71      87
03      alex    68      98
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h6 id="\u63D0\u53D6\u7B2C1\u9879\u5B57\u6BB5-\u9ED8\u8BA4\u4EE5-tab-\u4F5C\u4E3A\u5206\u9694\u7B26" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6\u7B2C1\u9879\u5B57\u6BB5-\u9ED8\u8BA4\u4EE5-tab-\u4F5C\u4E3A\u5206\u9694\u7B26" aria-hidden="true">#</a> \u63D0\u53D6\u7B2C1\u9879\u5B57\u6BB5(\u9ED8\u8BA4\u4EE5 <code>tab</code> \u4F5C\u4E3A\u5206\u9694\u7B26)</h6><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -f 1 test.txt 
No
01
02
03
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="\u63D0\u53D6\u7B2C2\u548C\u7B2C3\u9879\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6\u7B2C2\u548C\u7B2C3\u9879\u5185\u5BB9" aria-hidden="true">#</a> \u63D0\u53D6\u7B2C2\u548C\u7B2C3\u9879\u5185\u5BB9</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -f 2-3 test.txt 
Name	Mark
tom	69
jack	71
alex	68
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="\u63D0\u53D6\u524D\u4E24\u4E2A\u5B57\u7B26" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6\u524D\u4E24\u4E2A\u5B57\u7B26" aria-hidden="true">#</a> \u63D0\u53D6\u524D\u4E24\u4E2A\u5B57\u7B26</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -c 1-2 test.txt 
No
01
02
03
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h6 id="\u63D0\u53D6\u7B2C4\u4E2A\u5B57\u7B26\u4EE5\u53CA\u4E4B\u540E\u6240\u6709\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6\u7B2C4\u4E2A\u5B57\u7B26\u4EE5\u53CA\u4E4B\u540E\u6240\u6709\u5185\u5BB9" aria-hidden="true">#</a> \u63D0\u53D6\u7B2C4\u4E2A\u5B57\u7B26\u4EE5\u53CA\u4E4B\u540E\u6240\u6709\u5185\u5BB9</h6><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -c 4- test.txt 
Name	Mark	Percent
tom	69	91
jack	71	87
alex	68	98
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u4FEE\u6539 <code>test.txt</code> \u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>No	Name	Mark	Percent
01;tom;69;91
02;jack;71;87
03	alex	68	98
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h6 id="\u4EE5-\u5206\u5272-\u63D0\u53D6\u7B2C-2-\u9879\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#\u4EE5-\u5206\u5272-\u63D0\u53D6\u7B2C-2-\u9879\u5185\u5BB9" aria-hidden="true">#</a> \u4EE5 <code>;</code> \u5206\u5272\uFF0C\u63D0\u53D6\u7B2C 2 \u9879\u5185\u5BB9</h6><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -f 2 -d &quot;;&quot;  test.txt 
No	Name	Mark	Percent
tom
jack
03	alex	68	98
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h6 id="\u4EE5-\u5206\u5272-\u63D0\u53D6\u7B2C-2-\u9879\u5185\u5BB9-\u6392\u9664\u6CA1\u6709-\u5206\u5272\u7B26\u7684\u884C" tabindex="-1"><a class="header-anchor" href="#\u4EE5-\u5206\u5272-\u63D0\u53D6\u7B2C-2-\u9879\u5185\u5BB9-\u6392\u9664\u6CA1\u6709-\u5206\u5272\u7B26\u7684\u884C" aria-hidden="true">#</a> \u4EE5 <code>;</code> \u5206\u5272\uFF0C\u63D0\u53D6\u7B2C 2 \u9879\u5185\u5BB9\uFF08\u6392\u9664\u6CA1\u6709 <code>;</code> \u5206\u5272\u7B26\u7684\u884C\uFF09</h6><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chenxi$ cut -f 2 -d &quot;;&quot;  -s test.txt 
tom
jack
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h5>`,30),b={href:"http://man.linuxde.net/cut",target:"_blank",rel:"noopener noreferrer"},p=i("cut\u547D\u4EE4");function m(h,x){const a=n("ExternalLinkIcon");return s(),t(c,null,[o,e("p",null,[e("a",b,[p,r(a)])])],64)}var v=d(u,[["render",m]]);export{v as default};
