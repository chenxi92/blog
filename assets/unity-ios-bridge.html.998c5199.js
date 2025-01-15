import{r as a,o as e,c as t,a as n,e as p,F as i,d as o,b as c}from"./app.01142347.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const r={},u=o(`<h3 id="ios-\u548C-unity-\u76F8\u4E92\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#ios-\u548C-unity-\u76F8\u4E92\u8C03\u7528" aria-hidden="true">#</a> iOS \u548C Unity \u76F8\u4E92\u8C03\u7528</h3><h4 id="unity-\u8C03\u7528-ios" tabindex="-1"><a class="header-anchor" href="#unity-\u8C03\u7528-ios" aria-hidden="true">#</a> Unity \u8C03\u7528 iOS</h4><ol><li>\u5728 <code>.cs</code> \u6587\u4EF6\u5185\u5B9A\u4E49\u5982\u4E0B\u51FD\u6570</li></ol><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token punctuation">[</span><span class="token function">DllImport</span> <span class="token punctuation">(</span><span class="token string">&quot;__Internal&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
private <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token keyword">float</span> <span class="token function">FooPluginFunction</span><span class="token punctuation">(</span>string name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u53C2\u6570\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u8FD4\u56DE\u503C float \u7C7B\u578B</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2"><li>\u5728 <code>.cpp.</code> \u6216\u8005 <code>.mm</code> \u6587\u4EF6\u5185\u5B9E\u73B0\u5982\u4E0B\u51FD\u6570</li></ol><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">{</span>
  <span class="token keyword">float</span> <span class="token function">FooPluginFunction</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> name<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token comment">// Unity \u7AEF\u8C03\u7528\u5230 iOS \u7AEF</span>
    	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;name is = %s&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="ios-\u8C03\u7528-unity" tabindex="-1"><a class="header-anchor" href="#ios-\u8C03\u7528-unity" aria-hidden="true">#</a> iOS \u8C03\u7528 Unity</h4><ol><li>\u5728 <code>.cpp</code>\u6216 <code>.mm</code> \u6587\u4EF6\u5185\uFF0C\u8C03\u7528\u5982\u4E0B\u65B9\u6CD5</li></ol><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">// \u7B2C\u4E00\u4E2A\u53C2\u6570: \u811A\u672C\u6302\u8F7D\u7684 Object \u7684\u540D\u79F0</span>
<span class="token comment">// \u7B2C\u4E8C\u4E2A\u53C2\u6570: \u5728 CS \u6587\u4EF6\u4E0A\u5B9A\u4E49\u7684\u65B9\u6CD5\u540D\u79F0</span>
<span class="token comment">// \u7B2C\u4E09\u4E2A\u53C2\u6570: \u4F20\u9012\u7684\u53C2\u6570\uFF08\u53EA\u652F\u6301\u4F20\u9012 string \u7C7B\u578B\u7684\u5185\u5BB9\uFF09</span>
<span class="token function">UnitySendMessage</span><span class="token punctuation">(</span><span class="token string">&quot;GameObjectName1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;iosToUnity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Message to send&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>\u5728 <code>.cs</code> \u6587\u4EF6\u5185\u5B9E\u73B0\uFF0C\u5982\u4E0B\u65B9\u6CD5</li></ol><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code>public <span class="token keyword">void</span> <span class="token function">iosToUnity</span><span class="token punctuation">(</span>string msg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// iOS \u7AEF\u8C03\u7528\u5230 Unity \u7AEF</span>
  	Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">&quot;iOS to Unity, msg = &quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="ios-\u4E2D\u95F4\u5C42\u5199\u6CD5" tabindex="-1"><a class="header-anchor" href="#ios-\u4E2D\u95F4\u5C42\u5199\u6CD5" aria-hidden="true">#</a> iOS \u4E2D\u95F4\u5C42\u5199\u6CD5</h4><ol><li>\u65B0\u5EFA <code>Unity_iOS_Bridge.h</code> \u548C <code>Unity_iOS_Bridge.mm</code> \u6587\u4EF6, \u6587\u4EF6\u653E\u5728 Unity \u5DE5\u7A0B\u7684 <code>Assets/Plugins/iOS/ </code> \u6587\u4EF6\u5939\u4E0B</li><li><code>Unity_iOS_Bridge.h</code> \u6587\u4EF6\u5199\u6CD5\uFF1A</li></ol><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>#import &lt;Foundation/Foundation.h&gt;
#import &quot;UnityAppController.h&quot;
// \u96C6\u6210\u81EA UnityAppController
@interface Unity_iOS_Bridge : UnityAppController

@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="3"><li><code>Unity_iOS_Bridge.mm</code> \u6587\u4EF6\u5199\u6CD5\uFF1A</li></ol><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// Unity_iOS_Bridge \u6DFB\u52A0\u5206\u7C7B
IMPL_APP_CONTROLLER_SUBCLASS(Unity_iOS_Bridge)

@implementation Unity_iOS_Bridge

#pragma mark - \u751F\u547D\u5468\u671F

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
		// \u5148\u6267\u884C\u7236\u7C7B\u7684\u751F\u547D\u5468\u671F\u65B9\u6CD5  
  	[super application:application didFinishLaunchingWithOptions:launchOptions];
    
    // \u6267\u884C\u81EA\u5B9A\u4E49\u64CD\u4F5C
    
    return YES;
}

@end

extern &quot;C&quot; {
  float FooPluginFunction()
  {
      // Unity \u7AEF\u8C03\u7528\u5230iOS\u7AEF
      return 1.0
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h3>`,17),d={href:"https://docs.unity3d.com/Manual/PluginsForIOS.html",target:"_blank",rel:"noopener noreferrer"},b=c("plugins for iOS");function m(k,g){const s=a("ExternalLinkIcon");return e(),t(i,null,[u,n("p",null,[n("a",d,[b,p(s)])])],64)}var _=l(r,[["render",m]]);export{_ as default};
