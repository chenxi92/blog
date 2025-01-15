import{r as o,o as l,c as t,a as e,e as a,F as c,d as r,b as n}from"./app.01142347.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const d={},p=r('<h4 id="\u6D88\u606F\u8F6C\u53D1" tabindex="-1"><a class="header-anchor" href="#\u6D88\u606F\u8F6C\u53D1" aria-hidden="true">#</a> \u6D88\u606F\u8F6C\u53D1</h4><p align="right">2020-4-17</p><h5 id="objc-msgforward-\u548C-objc-msgforward-stret" tabindex="-1"><a class="header-anchor" href="#objc-msgforward-\u548C-objc-msgforward-stret" aria-hidden="true">#</a> <code>_objc_msgForward</code> \u548C <code>_objc_msgForward_stret</code></h5><p><code>_objc_msgForward</code> \u7528\u4E8E\u6D88\u606F\u8F6C\u53D1\uFF1A\u5411\u4E00\u4E2A\u5BF9\u8C61\u53D1\u9001\u6D88\u606F\uFF0C\u4F46\u662F\u5B83\u6CA1\u6709\u5B9E\u73B0\u7684\u65F6\u5019\uFF0C<code>_objc_msgForward</code> \u4F1A\u5C1D\u8BD5\u8D70\u6D88\u606F\u8F6C\u53D1\u3002</p>',4),b=e("code",null,"_objc_msgForward",-1),u=n(" \u548C "),m=e("code",null,"_objc_msgForward_stret",-1),h=n(" \u533A\u522B\uFF0C\u5F15\u7528\u81EA: "),_={href:"http://blog.cnbang.net/tech/2855/",target:"_blank",rel:"noopener noreferrer"},g=n("JSPatch \u5B9E\u73B0\u539F\u7406\u8BE6\u89E3"),S=n("\u5BF9\u4E8E\u67D0\u4E9B\u67B6\u6784\u67D0\u4E9B struct\uFF0C\u5FC5\u987B\u4F7F\u7528 _objc_msgForward_stret \u4EE3\u66FF _objc_msgForward\u3002\u4E3A\u4EC0\u4E48\u8981\u7528 _objc_msgForward_stret \u5462\uFF0C\u627E\u5230\u4E00\u7BC7\u8BF4\u660E objc_msgSend_stret \u548C objc_msgSend \u533A\u522B\u7684"),f={href:"http://sealiesoftware.com/blog/archive/2008/10/30/objc_explain_objc_msgSend_stret.html",target:"_blank",rel:"noopener noreferrer"},v=n("\u6587\u7AE0"),j=n("\uFF09\uFF0C\u8BF4\u5F97\u6BD4\u8F83\u6E05\u695A\uFF0C\u539F\u7406\u662F\u4E00\u6837\u7684\uFF0C\u662FC\u7684\u4E00\u4E9B\u5E95\u5C42\u673A\u5236\u7684\u539F\u56E0\uFF0C\u7B80\u5355\u590D\u8FF0\u4E00\u4E0B\uFF1A"),w=r(`<blockquote><p>\u5927\u591A\u6570 CPU \u5728\u6267\u884C C \u51FD\u6570\u65F6\u4F1A\u628A\u524D\u51E0\u4E2A\u53C2\u6570\u653E\u8FDB\u5BC4\u5B58\u5668\u91CC\uFF0C\u5BF9 <code>obj_msgSend</code> \u6765\u8BF4\u524D\u4E24\u4E2A\u53C2\u6570\u56FA\u5B9A\u662F <code>self</code> / <code>_cmd</code>\uFF0C\u5B83\u4EEC\u4F1A\u653E\u5728\u5BC4\u5B58\u5668\u4E0A\uFF0C\u5728\u6700\u540E\u6267\u884C\u5B8C\u540E\u8FD4\u56DE\u503C\u4E5F\u4F1A\u4FDD\u5B58\u5728\u5BC4\u5B58\u5668\u4E0A\uFF0C\u53D6\u8FD9\u4E2A\u5BC4\u5B58\u5668\u7684\u503C\u5C31\u662F\u8FD4\u56DE\u503C\u3002</p></blockquote><h5 id="\u6D88\u606F\u8F6C\u53D1\u7684\u4E09\u4E2A\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#\u6D88\u606F\u8F6C\u53D1\u7684\u4E09\u4E2A\u9636\u6BB5" aria-hidden="true">#</a> \u6D88\u606F\u8F6C\u53D1\u7684\u4E09\u4E2A\u9636\u6BB5</h5><h6 id="\u7B2C\u4E00\u9636\u6BB5-method-resolution" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u9636\u6BB5-method-resolution" aria-hidden="true">#</a> \u7B2C\u4E00\u9636\u6BB5: Method resolution</h6><p>\u8C03\u7528 <code>resolveInstanceMethod:</code>\u65B9\u6CD5 (\u6216 <code>resolveClassMethod:</code>)\u3002\u5141\u8BB8\u7528\u6237\u5728\u6B64\u65F6\u4E3A\u8BE5 Class \u52A8\u6001\u6DFB\u52A0\u5B9E\u73B0\u3002\u5982\u679C\u6709\u5B9E\u73B0\u4E86\uFF0C\u5219\u8C03\u7528\u5E76\u8FD4\u56DEYES\uFF0C\u90A3\u4E48\u91CD\u65B0\u5F00\u59CB <code>objc_msgSend</code> \u6D41\u7A0B\u3002\u5982\u679C\u4ECD\u6CA1\u5B9E\u73B0\uFF0C\u7EE7\u7EED\u8F6C\u53D1\u3002</p><p><strong>\u4EE3\u7801\u5B9E\u4F8B:</strong></p><p>\u4E3A <code>Test</code> \u52A8\u6001\u6DFB\u52A0\u7C7B\u65B9\u6CD5<code>class_print</code> \u548C \u5B9E\u4F8B\u65B9\u6CD5<code>instance_print</code></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>void instance_print(id self, SEL _cmd, NSString *text)
{
    NSLog(@&quot;replaced instance method %@&quot;, text);
}

void class_print(id self, SEL _cmd, NSString *text)
{
    NSLog(@&quot;replaced resolve class method %@&quot;, text);
}

@implementation Test

+ (BOOL)resolveClassMethod:(SEL)sel {
    if (sel == @selector(classPrint:)) {
        // \u7C7B\u65B9\u6CD5\u5217\u8868\u5728\u5143\u7C7B\u4E2D\u67E5\u627E
        class_addMethod(object_getClass(self), sel, (IMP)class_print, &quot;v@:@&quot;);
        return YES;
    }
    return [super resolveClassMethod:sel];
}

+ (BOOL)resolveInstanceMethod:(SEL)sel {
    if (sel == @selector(instancePrint:)) {
        class_addMethod([self class], sel, (IMP)instance_print, &quot;v@:@&quot;);
        return YES;
    }
    return [super resolveInstanceMethod:sel];
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h6 id="\u7B2C\u4E8C\u9636\u6BB5-fast-forwarding" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E8C\u9636\u6BB5-fast-forwarding" aria-hidden="true">#</a> \u7B2C\u4E8C\u9636\u6BB5: Fast forwarding</h6><p>\u8C03\u7528 <code>forwardingTargetForSelector:</code> \u65B9\u6CD5\uFF0C\u627E\u5230\u4E00\u4E2A\u80FD\u54CD\u5E94\u8BE5\u6D88\u606F\u7684\u5BF9\u8C61\u3002\u5982\u679C\u83B7\u53D6\u5230\uFF0C\u5219\u76F4\u63A5\u628A\u6D88\u606F\u8F6C\u53D1\u7ED9\u5B83\uFF0C\u5426\u5219\u8FD4\u56DE nil \uFF0C\u7EE7\u7EED\u8F6C\u53D1\u3002</p><p><strong>\u4EE3\u7801\u793A\u4F8B:</strong></p><p>\u628A<code>Test</code>\u7684\u5B9E\u4F8B\u65B9\u6CD5<code>run</code>\u8F6C\u53D1\u7ED9<code>Person</code>\u5BF9\u8C61\u53BB\u6267\u884C\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@implementation Test
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    if (aSelector == @selector(read)) {
        return [NSMethodSignature signatureWithObjCTypes:&quot;v@:&quot;];
    } else {
        return [super methodSignatureForSelector:aSelector];
    }
}
@end

@implementation Person
- (void)run {
    NSLog(@&quot;%@ run&quot;, [self class]);
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h6 id="\u7B2C\u4E09\u9636\u6BB5-normal-forwarding" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E09\u9636\u6BB5-normal-forwarding" aria-hidden="true">#</a> \u7B2C\u4E09\u9636\u6BB5: Normal forwarding</h6><ol><li>\u8C03\u7528 <code>methodSignatureForSelector:</code> \u65B9\u6CD5\uFF0C\u5C1D\u8BD5\u83B7\u5F97\u4E00\u4E2A\u65B9\u6CD5\u7B7E\u540D\u3002\u5982\u679C\u83B7\u53D6\u4E0D\u5230\uFF0C\u5219\u76F4\u63A5\u8C03\u7528 <code>doesNotRecognizeSelector</code> \u629B\u51FA\u5F02\u5E38\u3002\u5982\u679C\u80FD\u591F\u83B7\u53D6\uFF0C\u7EE7\u7EED\u8FDB\u884C\u7B2C2\u6B65:</li><li>\u8C03\u7528 <code>forwardInvocation:</code> \u65B9\u6CD5\uFF0C\u5C06\u7B2C 1 \u6B65\u83B7\u53D6\u5230\u7684\u65B9\u6CD5\u7B7E\u540D\u5305\u88C5\u6210<code>NSInvocation</code> \u5BF9\u8C61\u4F20\u5165\uFF0C\u5904\u7406\u6D88\u606F\u8F6C\u53D1\u3002</li></ol><p><strong>\u793A\u4F8B\u4EE3\u7801:</strong></p><p>\u628A<code>Test</code>\u7684\u5B9E\u4F8B\u65B9\u6CD5<code>read</code>\u8F6C\u53D1\u7ED9<code>Student</code>\u5BF9\u8C61\u53BB\u6267\u884C\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@implementation Test
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    if (aSelector == @selector(read)) {
        return [NSMethodSignature signatureWithObjCTypes:&quot;v@:&quot;];
    } else {
        return [super methodSignatureForSelector:aSelector];
    }
}

- (void)forwardInvocation:(NSInvocation *)anInvocation {
    if (anInvocation.selector == @selector(read)) {
        Student *s = [Student new];
        [anInvocation invokeWithTarget:s];
    } else {
        [super forwardInvocation:anInvocation];
    }
}
@end

@implementation Student
- (void)read {
    NSLog(@&quot;%@ read&quot;, [self class]);
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div>`,17),x={href:"https://github.com/chenxi141017/demo/blob/master/iOS/runtime/method_forward/method_forward/main.m",target:"_blank",rel:"noopener noreferrer"},q=n("\u6587\u4E2D\u4EE3\u7801\u4F4D\u7F6E");function F(N,I){const s=o("ExternalLinkIcon");return l(),t(c,null,[p,e("p",null,[b,u,m,h,e("a",_,[g,a(s)])]),e("blockquote",null,[e("p",null,[S,e("a",f,[v,a(s)]),j])]),w,e("p",null,[e("a",x,[q,a(s)])])],64)}var E=i(d,[["render",F]]);export{E as default};
