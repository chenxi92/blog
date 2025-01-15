import{r as t,o as r,c as o,a as n,e,F as l,d as c,b as a}from"./app.01142347.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const p={},b=c(`<h4 id="\u5173\u8054\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u5173\u8054\u5BF9\u8C61" aria-hidden="true">#</a> \u5173\u8054\u5BF9\u8C61</h4><p>\u4E3A\u4EC0\u4E48\u4F7F\u7528\u5173\u8054\u5BF9\u8C61\uFF1F</p><p>\u5728\u5206\u7C7B\u4E2D <code>@property</code> \u5E76\u4E0D\u4F1A\u81EA\u52A8\u751F\u6210\u5B9E\u4F8B\u53D8\u91CF\u4EE5\u53CA\u5B58\u53D6\u65B9\u6CD5\uFF0C \u6240\u4EE5 <strong>\u4E00\u822C\u4F7F\u7528\u5173\u8054\u5BF9\u8C61\u4E3A\u5DF2\u7ECF\u5B58\u5728\u7684\u7C7B\u6DFB\u52A0\u300C\u5C5E\u6027\u300D</strong>\u3002</p><p>\u65B9\u6CD5\u539F\u578B</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>id <span class="token function">objc_getAssociatedObject</span><span class="token punctuation">(</span>id object<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">objc_setAssociatedObject</span><span class="token punctuation">(</span>id object<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">,</span> id value<span class="token punctuation">,</span> objc_AssociationPolicy policy<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>objc_AssociationPolicy</code> \u4E0E\u4FEE\u9970\u7B26</p><table><thead><tr><th>objc_AssociationPolicy</th><th>Modifier</th></tr></thead><tbody><tr><td>OBJC_ASSOCIATION_ASSIGN</td><td>assign</td></tr><tr><td>OBJC_ASSOCIATION_RETAIN_NONATOMIC</td><td>nonatomic, strong</td></tr><tr><td>OBJC_ASSOCIATION_COPY_NONATOMIC</td><td>nonatomic, copy</td></tr><tr><td>OBJC_ASSOCIATION_RETAIN</td><td>atomic, strong</td></tr><tr><td>OBJC_ASSOCIATION_COPY</td><td>atomic, copy</td></tr></tbody></table><h4 id="\u4F7F\u7528\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u5B9E\u4F8B" aria-hidden="true">#</a> \u4F7F\u7528\u5B9E\u4F8B</h4><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>#import &lt;objc/runtime.h&gt; 
     
static void *EOCMyAlertViewKey = &quot;EOCMyAlertViewKey&quot;;  
 
- (void)askUserAQuestion {  
    UIAlertView *alert = [[UIAlertViewalloc]  
                             initWithTitle:@&quot;Question&quot;  
                               message:@&quot;What do you want to do?&quot;  
                                  delegate:self  
                        cancelButtonTitle:@&quot;Cancel&quot;  
                        otherButtonTitles:@&quot;Continue&quot;, nil];  
 
        void (^block)(NSInteger) = ^(NSInteger buttonIndex){  
          if (buttonIndex == 0) {  
              [self doCancel];  
        } else {  
            [self doContinue];  
        }  
    };  
 
      objc_setAssociatedObject(alert,  
                               EOCMyAlertViewKey,  
                               block,  
O                              BJC_ASSOCIATION_COPY);  
 
      [alert show];  
}  
 
// UIAlertViewDelegate protocol method  
- (void)alertView:(UIAlertView*)alertView  
        clickedButtonAtIndex:(NSInteger)buttonIndex  
{  
    void (^block)(NSInteger) =  
        objc_getAssociatedObject(alertView, EOCMyAlertViewKey);  
    block(buttonIndex);  
} 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h4 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h4>`,10),d={href:"https://juejin.im/post/5af86b276fb9a07aa34a59e6",target:"_blank",rel:"noopener noreferrer"},u=a("iOS\u5E95\u5C42\u539F\u7406\u603B\u7ED3 - \u5173\u8054\u5BF9\u8C61\u5B9E\u73B0\u539F\u7406"),m={href:"https://www.jianshu.com/p/bf51e9d52188",target:"_blank",rel:"noopener noreferrer"},_=a("\u5173\u8054\u5BF9\u8C61\u8BE6\u89E3"),h={href:"https://draveness.me/ao",target:"_blank",rel:"noopener noreferrer"},k=a("\u5173\u8054\u5BF9\u8C61 AssociatedObject \u5B8C\u5168\u89E3\u6790");function A(O,I){const s=t("ExternalLinkIcon");return r(),o(l,null,[b,n("ol",null,[n("li",null,[n("a",d,[u,e(s)])]),n("li",null,[n("a",m,[_,e(s)])]),n("li",null,[n("a",h,[k,e(s)])])])],64)}var C=i(p,[["render",A]]);export{C as default};
