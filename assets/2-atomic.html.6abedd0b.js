import{r,o as t,c as l,a as e,e as s,F as o,d as c,b as a}from"./app.01142347.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";const i={},p=c(`<h4 id="\u539F\u5B50\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u539F\u5B50\u64CD\u4F5C" aria-hidden="true">#</a> \u539F\u5B50\u64CD\u4F5C</h4><p><code>atomic</code> \u4E0E <code>nonatomicd</code> \u7684\u4E3B\u8981\u533A\u522B\u5C31\u662F\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684 <code>getter</code> / <code>setter</code> \u65B9\u6CD5\u4E0D\u4E00\u6837</p><ul><li><code>atomic</code> \u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684 <code>getter</code> / <code>setter</code> \u65B9\u6CD5\u4F1A\u8FDB\u884C\u52A0\u9501\u64CD\u4F5C\uFF08<strong>\u81EA\u65CB\u9501</strong>\uFF09</li><li><code>nonatomic</code>\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684 <code>getter</code> / <code>setter</code> \u65B9\u6CD5\u4E0D\u4F1A\u8FDB\u884C\u52A0\u9501\u64CD\u4F5C</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@synthesize name = _name;
- (void)setName:(NSString *)name {
    @synchronized(self) {
    _name = [name copy];
    }
}

- (NSString *)name {
    @synchronized(self) {
        return _name;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u4E0A\u9762\u4EE3\u7801\u5B9E\u73B0\u4E86\u548C <code>atomic</code> \u76F8\u540C\u7684\u529F\u80FD\uFF0C\u4F46\u662F\u5E95\u5C42\u7684\u5DE5\u4F5C\u65B9\u5F0F\u8FD8\u662F\u6709\u533A\u522B\u7684\u3002\u6211\u4EEC\u5E38\u5E38\u7528 <code>@synchronized</code> \u6765\u52A0\u9501\uFF0C\u8FD9\u79CD\u9501\u662F<strong>\u4E92\u65A5\u9501</strong>\u3002\u800C <code>atomic</code> \u4FEE\u9970\u7684\u5C5E\u6027\u81EA\u5E26\u4E86\u4E00\u628A<strong>\u81EA\u65CB\u9501</strong>\u3002</p><p><strong>\u4E92\u65A5\u9501\u548C\u81EA\u65CB\u9501\u7684\u533A\u522B\uFF1A</strong></p><table><thead><tr><th>\u9501\u540D</th><th>\u4F5C\u7528</th></tr></thead><tbody><tr><td>\u4E92\u65A5\u9501</td><td>\u5F53\u67D0\u4E2A\u8D44\u6E90\u88AB\u5148\u8FDB\u5165\u7684\u7EBF\u7A0B\u4E0A\u4E86\u9501\u4EE5\u540E\uFF0C\u5176\u5B83\u540E\u9762\u8FDB\u5165\u7684\u7EBF\u7A0B\u4F1A\u8FDB\u5165<code>\u4F11\u7720\u72B6\u6001</code>\u3002<br>\u5F53\u9501\u91CA\u653E\u540E\uFF0C\u8FDB\u5165\u4F11\u7720\u72B6\u6001\u7684\u7EBF\u7A0B\u53D8\u4E3A<code>\u5524\u9192\u72B6\u6001</code>\u3002</td></tr><tr><td>\u81EA\u65CB\u9501</td><td>\u5F53\u67D0\u4E2A\u8D44\u6E90\u88AB\u5148\u8FDB\u5165\u7684\u7EBF\u7A0B\u4E0A\u4E86\u9501\u4EE5\u540E\uFF0C\u5176\u5B83\u540E\u8FDB\u5165\u7684\u7EBF\u7A0B\u4F1A\u5F00\u542F\u4E00\u4E2A<code>\u5FAA\u73AF</code>\uFF0C\u4E0D\u65AD\u68C0\u67E5\u9501\u6709\u6CA1\u6709\u91CA\u653E\uFF0C\u5F53\u9501\u91CA\u653E\u540E\uFF0C\u9000\u51FA\u5FAA\u73AF\u5F00\u59CB\u8BBF\u95EE\u8D44\u6E90\uFF0C\u6574\u4E2A\u8FC7\u7A0B\u4E2D\u540E\u8FDB\u5165\u7684\u7EBF\u7A0B\u4E00\u76F4\u4FDD\u6301<code>\u8FD0\u884C\u72B6\u6001</code>\u3002</td></tr></tbody></table><h4 id="\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528" aria-hidden="true">#</a> \u5E94\u7528</h4><p><code>atomic</code> \u53EA\u662F\u4FDD\u8BC1\u4E86 <code>getter</code> \u548C <code>setter</code> \u5B58\u53D6\u65B9\u6CD5\u7684\u7EBF\u7A0B\u5B89\u5168,\u5E76\u4E0D\u80FD\u4FDD\u8BC1\u6574\u4E2A\u5BF9\u8C61\u662F\u7EBF\u7A0B\u5B89\u5168\u7684,\u56E0\u6B64\u5728\u591A\u7EBF\u7A0B\u7F16\u7A0B\u65F6,\u7EBF\u7A0B\u5B89\u5168\u8FD8\u9700\u8981\u5F00\u53D1\u8005\u81EA\u5DF1\u6765\u5904\u7406.</p><p>\u4E0B\u9762\u770B\u4E00\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#import &quot;ViewController.h&quot;

@interface ViewController ()
@property (atomic, assign) NSInteger count;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.count = 0;
    
    NSThread *threadA = [[NSThread alloc] initWithTarget:self selector:@selector(doSomething) object:nil];
    [threadA start];
    
    NSThread *threadB = [[NSThread alloc] initWithTarget:self selector:@selector(doSomething) object:nil];
    [threadB start];
}

- (void)doSomething {
    for (NSInteger i = 0; i &lt; 10; i++) {
        [NSThread sleepForTimeInterval:1.0];
        self.count++;
        NSLog(@&quot;self.count = %@ %@&quot;, @(self.count), [NSThread currentThread]);
    }
}

@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>\u4E3A\u4E86\u8BA9\u5F02\u5E38\u60C5\u51B5\u51FA\u73B0\u7684\u6982\u7387\u63D0\u9AD8\uFF0C\u52A0\u5165\u4E00\u53E5 <code>[NSThread sleepForTimeInterval:1.0];</code>\u3002</p><p>\u8FD0\u884C\u4E0A\u9762\u7684\u4EE3\u7801\uFF0C\u4F1A\u53D1\u73B0\u6253\u5370\u7684\u7ED3\u679C\u4E2D\uFF0C\u6700\u540E\u4E00\u6761 <code>self.count</code> \u7684\u503C\u5F80\u5F80\u662F\u5C0F\u4E8E 20 \u7684\uFF0C\u5728\u4E2D\u95F4\u7684\u67D0\u4E9B\u6253\u5370\u65E5\u5FD7\u4E2D\uFF0C\u4F1A\u53D1\u73B0\u6709\u4E9B\u6570\u5B57\u88AB\u91CD\u590D\u6253\u5370\u7684\u4E24\u6B21\u3002</p><p>\u9519\u8BEF\u539F\u56E0\uFF1A \u7531\u4E8E atomic \u4EC5\u4EC5\u80FD\u4FDD\u8BC1\u8BFB\u5199\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF0C\u800C\u4E0D\u662F\u4FDD\u8BC1 <code>\u8BFB</code> -&gt; <code>+1</code> -&gt; <code>\u5199</code> \uFF0C\u8FD9\u4E2A\u6574\u4F53\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\u3002</p><p>\u7EBF\u7A0B\u5B89\u5168\u7684\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>- (void)doSomething {
    for (NSInteger i = 0; i &lt; 10; i++) {
        [NSThread sleepForTimeInterval:1.0];
        @synchronized (self) {
            self.count++;
        }
        NSLog(@&quot;self.count = %@ %@&quot;, @(self.count), [NSThread currentThread]);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><table><thead><tr><th>\u4FEE\u9970\u7B26</th><th>\u4F18\u52BF</th><th>\u52A3\u52BF</th></tr></thead><tbody><tr><td>nonatomic</td><td>\u6267\u884C\u6548\u7387\u9AD8\uFF0C\u6027\u80FD\u597D</td><td>\u4E0D\u662F\u7EBF\u7A0B\u5B89\u5168\u7684</td></tr><tr><td>atomic</td><td>\u7EBF\u7A0B\u5B89\u5168\uFF0C\u4F46\u662F\u4EC5\u80FD\u4FDD\u8BC1\u5199\u64CD\u4F5C\u7684\u7EBF\u7A0B\u5B89\u5168</td><td>\u5927\u5E45\u964D\u4F4E\u6267\u884C\u6548\u7387</td></tr></tbody></table><h4 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h4>`,18),b={href:"http://liuduo.me/2018/02/08/objective-c-atomic/",target:"_blank",rel:"noopener noreferrer"},m=a("Objective-C \u539F\u5B50\u5C5E\u6027"),u={href:"https://segmentfault.com/a/1190000008808143",target:"_blank",rel:"noopener noreferrer"},h=a("\u4ECE@property\u8BF4\u8D77\uFF08\u4E09\uFF09atomic\u4E0E\u591A\u7EBF\u7A0B\u9501"),g={href:"https://juejin.im/post/5a31dc76f265da430c11d3ab",target:"_blank",rel:"noopener noreferrer"},f=a("iOS\u4E2Datomic\u548Cnonatomic\u533A\u522B\u53CA\u5185\u90E8\u5B9E\u73B0");function _(v,S){const n=r("ExternalLinkIcon");return t(),l(o,null,[p,e("ol",null,[e("li",null,[e("p",null,[e("a",b,[m,s(n)])])]),e("li",null,[e("p",null,[e("a",u,[h,s(n)])])]),e("li",null,[e("p",null,[e("a",g,[f,s(n)])])])])],64)}var T=d(i,[["render",_]]);export{T as default};
