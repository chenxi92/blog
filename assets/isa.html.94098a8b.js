import{r,o as l,c as i,a as s,e as a,F as c,d as t,b as n}from"./app.01142347.js";import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";var p="/blog/assets/class_diagram.60f84b2f.png";const b={},u=t('<h4 id="\u7406\u89E3-isa\u6307\u9488\u3001\u7C7B\u548C\u5143\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3-isa\u6307\u9488\u3001\u7C7B\u548C\u5143\u7C7B" aria-hidden="true">#</a> <p align="center">\u7406\u89E3: ISA\u6307\u9488\u3001\u7C7B\u548C\u5143\u7C7B</p></h4><p align="right">2020-4-18</p><h5 id="isa\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#isa\u6307\u9488" aria-hidden="true">#</a> isa\u6307\u9488</h5><blockquote><p>\u6BCF\u4E00\u4E2A\u5BF9\u8C61\u90FD\u662F\u4E00\u4E2A\u7C7B\u7684\u5B9E\u4F8B\u3002\u5728 Objective-C \u8BED\u8A00\u7684\u5185\u90E8\uFF0C\u6BCF\u4E00\u4E2A\u5BF9\u8C61\u90FD\u6709\u4E00\u4E2A\u540D\u4E3A isa \u7684\u6307\u9488\uFF0C\u6307\u5411\u8BE5\u5BF9\u8C61\u7684\u7C7B\u3002</p></blockquote><h5 id="\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u7C7B" aria-hidden="true">#</a> \u7C7B</h5><blockquote><p>\u6BCF\u4E00\u4E2A\u7C7B\u63CF\u8FF0\u4E86\u4E00\u7CFB\u5217\u5B83\u7684\u5B9E\u4F8B\u7684\u7279\u70B9\uFF0C\u5305\u62EC\u6210\u5458\u53D8\u91CF\u7684\u5217\u8868\uFF0C\u6210\u5458\u51FD\u6570\u7684\u5217\u8868\u7B49\u3002\u6BCF\u4E00\u4E2A\u5BF9\u8C61\u90FD\u53EF\u4EE5\u63A5\u53D7\u6D88\u606F\uFF0C\u800C\u5BF9\u8C61\u80FD\u591F\u63A5\u6536\u7684\u6D88\u606F\u5217\u8868\u662F\u4FDD\u5B58\u5728\u5B83\u6240\u5BF9\u5E94\u7684\u7C7B\u4E2D\u3002</p></blockquote><h5 id="\u5143\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5143\u7C7B" aria-hidden="true">#</a> \u5143\u7C7B:</h5><blockquote><p>\u5143\u7C7B\u662F\u7C7B\u5BF9\u8C61\u7684\u7C7B\u3002\u7C7B\u5BF9\u8C61\u7684 <code>isa</code> \u6307\u9488\u6307\u5411\u5143\u7C7B\u3002\u5143\u7C7B\u7684isa\u6307\u9488\u6307\u5411\u6839\u5143\u7C7B\uFF0C \u6839\u5143\u7C7B\u7684 <code>isa</code> \u6307\u9488\u6307\u5411\u81EA\u5DF1\u3002\u5143\u7C7B\u4FDD\u5B58\u4E86\u7C7B\u65B9\u6CD5\u7684\u5217\u8868\u3002\u7C7B\u65B9\u6CD5\u8C03\u7528\u65F6\uFF0C\u901A\u8FC7\u7C7B\u7684 <code>isa</code> \u6307\u9488\u5728\u5143\u7C7B\u4E2D\u83B7\u53D6\u65B9\u6CD5\u7684\u5B9E\u73B0\uFF0C\u5982\u679C\u6CA1\u6709\uFF0C\u5219\u8BE5\u5143\u7C7B\u4F1A\u5411\u5B83\u7684\u7236\u7C7B\u67E5\u627E\u8BE5\u65B9\u6CD5\uFF0C\u76F4\u5230\u4E00\u76F4\u627E\u5230\u7EE7\u627F\u94FE\u7684\u5934\u3002</p></blockquote><p>\u63CF\u8FF0\u7EE7\u627F\u5173\u7CFB\u7684\u5982\u4E0B\u6240\u793A:</p><p><img src="'+p+`" alt="\u56FE\u7247"></p><p>\u5728\u5B9E\u73B0\u4E2D\uFF0CRoot Class \u662F\u6307 NSObject\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4ECE\u56FE\u4E2D\u770B\u51FA\uFF1A</p><ul><li><p>NSObject \u7684\u5143\u7C7B\u7EE7\u627F\u81EA NSObject \u7C7B\u3002</p></li><li><p>\u5143\u7C7B\u7684 isa \u6307\u9488\u6307\u5411\u6839\u5143\u7C7B\u3002</p></li></ul><h5 id="\u4EE3\u7801\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u8BF4\u660E" aria-hidden="true">#</a> \u4EE3\u7801\u8BF4\u660E</h5><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>#import &lt;objc/runtime.h&gt;

void ReportFunction(id self, SEL _cmd)
{
    NSLog(@&quot;This object is %p.&quot;, self);
    NSLog(@&quot;Class is %@, and super is %@.&quot;, [self class], [self superclass]);
    
    Class currentClass = [self class];
    for (int i = 1; i &lt; 6; i++)
    {
        NSLog(@&quot;Following the isa pointer %d times gives %p, is meta class [%@]&quot;,
              i,
              currentClass,
              class_isMetaClass(currentClass) ? @&quot;true&quot; : @&quot;false&quot;);
        currentClass = object_getClass(currentClass);
    }
    NSLog(@&quot;NSObject&#39;s class is %p&quot;, [NSObject class]);
    NSLog(@&quot;NSObject&#39;s meta class is %p&quot;, object_getClass([NSObject class]));
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
      	// \u52A8\u6001\u521B\u5EFA\u4E00\u4E2A\u5B50\u7C7B
        Class newClass = objc_allocateClassPair([NSError class], &quot;RuntimeErrorSubclass&quot;, 0);
      	// \u6DFB\u52A0\u4E00\u4E2A\u65B9\u6CD5
        SEL sel = NSSelectorFromString(@&quot;report&quot;);
        class_addMethod(newClass, sel, (IMP)ReportFunction, &quot;v@:&quot;);
        // \u6CE8\u518C\u8BE5\u7C7B\uFF0C\u65B9\u4FBF\u540E\u7EED\u4F7F\u7528
        objc_registerClassPair(newClass);
            
         id instanceOfNewClass = [[newClass alloc] initWithDomain:@&quot;someDomain&quot; code:0 userInfo:nil];
#pragma clang diagnostic push
#pragma clang diagnostic ignored   &quot;-Warc-performSelector-leaks&quot;
           [instanceOfNewClass performSelector:sel];
#pragma clang diagnostic pop
    }
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>\u8F93\u51FA\u7ED3\u679C\u5982\u4E0B:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>This object is 0x10064f160.
Class is RuntimeErrorSubclass, and super is NSError.
Following the isa pointer 1 times gives 0x10064ea80,    is meta class [false]
Following the isa pointer 2 times gives 0x10064eab0,    is meta class [true]
Following the isa pointer 3 times gives 0x7fff9510e0f0, is meta class [true]
Following the isa pointer 4 times gives 0x7fff9510e0f0, is meta class [true]
Following the isa pointer 5 times gives 0x7fff9510e0f0, is meta class [true]
NSObject&#39;s class is 0x7fff9510e118
NSObject&#39;s meta class is 0x7fff9510e0f0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u8F93\u51FA\u7ED3\u679C\u8BF4\u660E:</p><blockquote><p>\u5143\u7C7B\u7684isa\u6307\u9488\u6307\u5411\u6839\u5143\u7C7B</p><p>\u6839\u5143\u7C7B\u7684isa\u6307\u9488\u6307\u5411\u81EA\u5DF1</p><p>NSObject\u7684\u5143\u7C7B\u5C31\u662F\u6839\u5143\u7C7B</p></blockquote><h5 id="api-\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#api-\u8BF4\u660E" aria-hidden="true">#</a> API \u8BF4\u660E:</h5><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>Class objc_getClass(const char * name);
// \u8FD4\u56DE\u7C7B\u5BF9\u8C61
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>Class object_getClass(id obj);
// \u8FD4\u56DEisa\u6307\u9488
// 1. obj \u662F\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u8FD4\u56DE\u7C7B\u5BF9\u8C61\u7684isa\u6307\u9488
// 2. obj \u662F\u7C7B\u5BF9\u8C61\uFF0C\u8FD4\u56DE(meta-class)\u5143\u7C7B\u7684isa\u6307\u9488
// 3. obj \u662F\u5143\u7C7B\uFF0C\u8FD4\u56DE\u6839\u5143\u7C7B\u7684isa\u6307\u9488
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>+ (Class)class;
// \u8FD4\u56DE\u7C7B\u5BF9\u8C61

- (Class)class;
// \u8FD4\u56DE\u7C7B\u5BF9\u8C61
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h5>`,23),m={href:"http://www.cocoawithlove.com/2010/01/what-is-meta-class-in-objective-c.html",target:"_blank",rel:"noopener noreferrer"},d=n("What is a meta-class in Objective-C"),h={href:"https://blog.devtang.com/2013/10/15/objective-c-object-model/",target:"_blank",rel:"noopener noreferrer"},g=n("Objective-C\u5BF9\u8C61\u6A21\u578B\u53CA\u5E94\u7528");function v(f,j){const e=r("ExternalLinkIcon");return l(),i(c,null,[u,s("p",null,[s("a",m,[d,a(e)])]),s("p",null,[s("a",h,[g,a(e)])])],64)}var C=o(b,[["render",v]]);export{C as default};
