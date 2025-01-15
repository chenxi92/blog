import{r as l,o,c,a as e,e as a,F as t,d as r,b as s}from"./app.01142347.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const p={},b=r(`<h3 id="aspects-\u6E90\u7801\u9605\u8BFB" tabindex="-1"><a class="header-anchor" href="#aspects-\u6E90\u7801\u9605\u8BFB" aria-hidden="true">#</a> Aspects \u6E90\u7801\u9605\u8BFB</h3><p align="right">Update: 2020-4-15</p><p>SDK \u7248\u672C 1.4.2</p><h4 id="\u6587\u4EF6\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u7ED3\u6784" aria-hidden="true">#</a> \u6587\u4EF6\u7ED3\u6784</h4><h5 id="aspecttoken" tabindex="-1"><a class="header-anchor" href="#aspecttoken" aria-hidden="true">#</a> AspectToken</h5><p>\u7528\u4E8E\u64A4\u56DE\u88ABhook\u7684\u65B9\u6CD5\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@protocol AspectToken &lt;NSObject&gt;
- (BOOL)remove;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="aspectinfo" tabindex="-1"><a class="header-anchor" href="#aspectinfo" aria-hidden="true">#</a> AspectInfo</h5><p>\u7528\u4F5Cblock\u56DE\u8C03\u91CC\u9762\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@protocol AspectInfo &lt;NSObject&gt;
- (id)instance;
- (NSInvocation *)originalInvocation;
- (NSArray *)arguments;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="aspects\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#aspects\u5206\u7C7B" aria-hidden="true">#</a> Aspects\u5206\u7C7B</h5><p>\u8DDFNSObject\u65B0\u5EFA\u4E00\u4E2A\u5206\u7C7B\uFF0C \u5206\u522B\u7528\u6237hook\u7C7B\u65B9\u6CD5\u548C\u5B9E\u4F8B\u65B9\u6CD5\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface NSObject (Aspects)

/// hook \u7C7B\u65B9\u6CD5
+ (id&lt;AspectToken&gt;)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;

/// hook \u5B9E\u4F8B\u65B9\u6CD5
- (id&lt;AspectToken&gt;)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;

@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h5 id="aspectidentifier" tabindex="-1"><a class="header-anchor" href="#aspectidentifier" aria-hidden="true">#</a> AspectIdentifier</h5><p>\u4FDD\u5B58\u5355\u4E2A\u9700\u8981hook\u7684\u4FE1\u606F\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface AspectIdentifier : NSObject
+ (instancetype)identifierWithSelector:(SEL)selector object:(id)object options:(AspectOptions)options block:(id)block error:(NSError **)error;
- (BOOL)invokeWithInfo:(id&lt;AspectInfo&gt;)info;
@property (nonatomic, assign) SEL selector;
@property (nonatomic, strong) id block;
@property (nonatomic, strong) NSMethodSignature *blockSignature;
@property (nonatomic, weak) id object;
@property (nonatomic, assign) AspectOptions options;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="aspectscontainer" tabindex="-1"><a class="header-anchor" href="#aspectscontainer" aria-hidden="true">#</a> AspectsContainer</h5><p>\u5BB9\u5668\u5BF9\u8C61\uFF0C\u4FDD\u5B58\u6240\u6709\u7684 <code>AspectIdentifier </code> \u4FE1\u606F</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface AspectsContainer : NSObject
- (void)addAspect:(AspectIdentifier *)aspect withOptions:(AspectOptions)injectPosition;
- (BOOL)removeAspect:(id)aspect;
- (BOOL)hasAspects;
@property (atomic, copy) NSArray *beforeAspects;
@property (atomic, copy) NSArray *insteadAspects;
@property (atomic, copy) NSArray *afterAspects;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h5 id="aspecttracker" tabindex="-1"><a class="header-anchor" href="#aspecttracker" aria-hidden="true">#</a> AspectTracker</h5><p>\u6700\u7EC8\u88ABhook\u7684\u7C7B\u4EE5\u53CA\u5B50\u7C7B\u7684\u4FE1\u606F\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface AspectTracker : NSObject
- (id)initWithTrackedClass:(Class)trackedClass;
@property (nonatomic, strong) Class trackedClass;
@property (nonatomic, readonly) NSString *trackedClassName;
@property (nonatomic, strong) NSMutableSet *selectorNames;
@property (nonatomic, strong) NSMutableDictionary *selectorNamesToSubclassTrackers;
- (void)addSubclassTracker:(AspectTracker *)subclassTracker hookingSelectorName:(NSString *)selectorName;
- (void)removeSubclassTracker:(AspectTracker *)subclassTracker hookingSelectorName:(NSString *)selectorName;
- (BOOL)subclassHasHookedSelectorName:(NSString *)selectorName;
- (NSSet *)subclassTrackersHookingSelectorName:(NSString *)selectorName;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="hook\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#hook\u6D41\u7A0B" aria-hidden="true">#</a> hook\u6D41\u7A0B</h4><p>\u5165\u53E3\u51FD\u6570:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>static id aspect_add(id self, SEL selector, AspectOptions options, id block, NSError **error) {
    NSCParameterAssert(self);
    NSCParameterAssert(selector);
    NSCParameterAssert(block);

    __block AspectIdentifier *identifier = nil;
  	// 1. \u4F7F\u7528\u81EA\u65CB\u9501\u6765\u6267\u884Cblock\uFF0C\u4FDD\u8BC1\u7EBF\u7A0B\u5B89\u5168
    aspect_performLocked(^{
        // 2. \u68C0\u67E5selector\u662F\u5426\u80FD\u88ABhook
        if (aspect_isSelectorAllowedAndTrack(self, selector, options, error)) {
            // 3. \u83B7\u53D6\u5BB9\u5668\u5BF9\u8C61
            AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector); 
           // 4. \u751F\u6210 AspectIdentifier \u5BF9\u8C61\uFF0C\u4FDD\u5B58hook\u4FE1\u606F
            identifier = [AspectIdentifier identifierWithSelector:selector object:self options:options block:block error:error];
            if (identifier) {
                // 5. \u6DFB\u52A0\u5230\u5BB9\u5668
                [aspectContainer addAspect:identifier withOptions:options];

                // 6. \u5F00\u59CB\u65B9\u6CD5\u62E6\u622A
                aspect_prepareClassAndHookSelector(self, selector, error);
            }
        }
    });
    return identifier;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h5 id="_1-aspect-performlocked-\u81EA\u65CB\u9501\u6267\u884Cblock" tabindex="-1"><a class="header-anchor" href="#_1-aspect-performlocked-\u81EA\u65CB\u9501\u6267\u884Cblock" aria-hidden="true">#</a> 1. <code>aspect_performLocked</code> \u81EA\u65CB\u9501\u6267\u884Cblock</h5>`,26),d=s("\u81EA\u65CB\u9501\u662F\u6548\u7387\u6BD4\u8F83\u9AD8\u7684\u4E00\u79CD\u9501\uFF0C\u76F8\u6BD4@synchronized\u6765\u8BF4\u6548\u7387\u9AD8\u5F97\u591A\u3002\u4F46\u662F\u4E5F\u53EF\u80FD\u51FA\u73B0\u95EE\u9898:"),u={href:"https://blog.ibireme.com/2016/01/16/spinlock_is_unsafe_in_ios/",target:"_blank",rel:"noopener noreferrer"},m=s("\u4E0D\u518D\u5B89\u5168\u7684 OSSpinLock"),h=s(" : \u5982\u679C\u4E00\u4E2A\u4F4E\u4F18\u5148\u7EA7\u7684\u7EBF\u7A0B\u83B7\u5F97\u9501\u5E76\u8BBF\u95EE\u5171\u4EAB\u8D44\u6E90\uFF0C\u8FD9\u65F6\u4E00\u4E2A\u9AD8\u4F18\u5148\u7EA7\u7684\u7EBF\u7A0B\u4E5F\u5C1D\u8BD5\u83B7\u5F97\u8FD9\u4E2A\u9501\uFF0C\u5B83\u4F1A\u5904\u4E8E spin lock \u7684\u5FD9\u7B49\u72B6\u6001\u4ECE\u800C\u5360\u7528\u5927\u91CF CPU\u3002\u6B64\u65F6\u4F4E\u4F18\u5148\u7EA7\u7EBF\u7A0B\u65E0\u6CD5\u4E0E\u9AD8\u4F18\u5148\u7EA7\u7EBF\u7A0B\u4E89\u593A CPU \u65F6\u95F4\uFF0C\u4ECE\u800C\u5BFC\u81F4\u4EFB\u52A1\u8FDF\u8FDF\u5B8C\u4E0D\u6210\u3001\u65E0\u6CD5\u91CA\u653E lock\u3002"),_=r('<h5 id="_2-\u68C0\u67E5selector\u662F\u5426\u80FD\u88ABhook" tabindex="-1"><a class="header-anchor" href="#_2-\u68C0\u67E5selector\u662F\u5426\u80FD\u88ABhook" aria-hidden="true">#</a> 2. \u68C0\u67E5selector\u662F\u5426\u80FD\u88ABhook</h5><p>\u8FD9\u4E9B\u65B9\u6CD5 <code>retain</code>, <code>release</code>, <code>autorelease</code>, <code>forwardInvocation:</code> \u4E0D\u80FD\u88ABhook;</p><p>hook <code>dealloc</code> \u65B9\u6CD5\u65F6\u53EA\u80FD\u4F7F\u7528 <code>AspectPositionBefore</code> \u8FD9\u4E2A\u679A\u4E3E\u503C;</p><p>\u672A\u88AB\u5B9E\u73B0\u7684\u65B9\u6CD5\u4E0D\u80FDhook\uFF1B</p><p>\u5143\u7C7B\u65F6\uFF0C\u4E00\u4E2A\u65B9\u6CD5\u53EA\u80FD\u5728\u4E00\u4E2A\u7C7B\u7684\u5C42\u7EA7\u7ED3\u6784\u91CC\u9762\u88ABhook\u4E00\u6B21\uFF1B</p><h5 id="_3-\u83B7\u53D6\u5BB9\u5668\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_3-\u83B7\u53D6\u5BB9\u5668\u5BF9\u8C61" aria-hidden="true">#</a> 3. \u83B7\u53D6\u5BB9\u5668\u5BF9\u8C61</h5><p>\u52A8\u6001\u4E3A\u5F53\u524D\u5BF9\u8C61\u5173\u8054\u4E00\u4E2A <code>AspectsContainer</code> \u5C5E\u6027\uFF0C \u4FDD\u5B58\u8BE5\u5BF9\u8C61\u6240\u6709\u9700\u8981hook\u7684\u4FE1\u606F\u3002</p><h5 id="_4-\u751F\u6210-aspectidentifier-\u5BF9\u8C61-\u4FDD\u5B58hook\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#_4-\u751F\u6210-aspectidentifier-\u5BF9\u8C61-\u4FDD\u5B58hook\u4FE1\u606F" aria-hidden="true">#</a> 4. \u751F\u6210 AspectIdentifier \u5BF9\u8C61\uFF0C\u4FDD\u5B58hook\u4FE1\u606F</h5><p>\u4FDD\u5B58\u9700\u8981hook\u7684\u4FE1\u606F\uFF0C\u540C\u65F6\u4E3A\u4F20\u5165\u7684block\u751F\u6210\u4E00\u4E2A\u7B7E\u540D\u4FE1\u606F\u3002</p>',9),g=s("\u4F5C\u8005\u4EFF\u7167 "),k={href:"http://clang.llvm.org/docs/Block-ABI-Apple.html#high-level",target:"_blank",rel:"noopener noreferrer"},f=s("\u539F\u751Fblock\u7684\u7ED3\u6784"),S=s(" \uFF0C\u58F0\u660E\u4E86\u4E00\u4E2A\u7C7B\u4F3C\u7684\u7ED3\u6784\u4F53 "),v=e("code",null,"AspectBlockRef",-1),A=s(" , \u901A\u8FC7\u5982\u4E0B\u65B9\u6CD5\u628Ablock\u8F6C\u6210\u7ED3\u6784\u4F53:"),C=r(`<div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>static NSMethodSignature *aspect_blockMethodSignature(id block, NSError **error) {
    //// \u5C06block\u8F6C\u6362\u4E3A\u81EA\u5B9A\u4E49\u7684block\u5F62\u5F0F
    AspectBlockRef layout = (__bridge void *)block;
    if (!(layout-&gt;flags &amp; AspectBlockFlagsHasSignature)) {// \u6BD4\u5BF9layout\u7684\u7B2C8\u5B57\u8282\u523011\u5B57\u8282\u7684\u7B2C\u4E09\u5341\u4F4D \u662F\u4E0D\u662F1\uFF081\u5C31\u662F\u6709\u7B7E\u540D\uFF09
        NSString *description = [NSString stringWithFormat:@&quot;The block %@ doesn&#39;t contain a type signature.&quot;, block];
        AspectError(AspectErrorMissingBlockSignature, description);
        return nil;
    }
    void *desc = layout-&gt;descriptor;
    desc += 2 * sizeof(unsigned long int); //desc \u5730\u5740\u52A0\u4E0A16\u5B57\u8282
    if (layout-&gt;flags &amp; AspectBlockFlagsHasCopyDisposeHelpers) {//\u6BD4\u5BF9layout\u7684\u7B2C8\u5B57\u8282\u523011\u5B57\u8282\u7684\u7B2C25\u4F4D \u662F\u4E0D\u662F1\uFF081\u5C31\u662F\u6709COPY_DISPOSE\uFF09
        desc += 2 * sizeof(void *); //desc \u518D\u52A0 8 \u5B57\u8282\uFF0C\u8FD9\u65F6\u5019\u7684\u5730\u5740\u624D\u662F\u771F\u6B63signature\u7684\u5730\u5740
    }
    if (!desc) {
        NSString *description = [NSString stringWithFormat:@&quot;The block %@ doesn&#39;t has a type signature.&quot;, block];
        AspectError(AspectErrorMissingBlockSignature, description);
        return nil;
    }
    // \u8F6C\u5316\u6210NSMethodSignature \u5BF9\u8C61\u8F93\u51FA\u7B7E\u540D
    const char *signature = (*(const char **)desc);
    //\u6839\u636E\u7C7B\u578B\u7F16\u7801\u8FD4\u56DE\u771F\u6B63\u65B9\u6CD5\u7B7E\u540D
    return [NSMethodSignature signatureWithObjCTypes:signature];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div>`,1),j=s("\u5177\u4F53\u89E3\u91CA\u53C2\u8003: ["),N={href:"https://www.cnblogs.com/DafaRan/p/8192069.html",target:"_blank",rel:"noopener noreferrer"},I=s("Aspects \u6E90\u7801\u5B66\u4E60"),x=s("]"),y=r(`<h5 id="_5-\u628A\u9700\u8981hook\u7684\u4FE1\u606F\u4FDD\u5B58\u8FDB\u5165\u8FDB\u5165\u5BB9\u5668-aspectscontainer-\u4E2D-\u65B9\u4FBF\u540E\u7EED\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_5-\u628A\u9700\u8981hook\u7684\u4FE1\u606F\u4FDD\u5B58\u8FDB\u5165\u8FDB\u5165\u5BB9\u5668-aspectscontainer-\u4E2D-\u65B9\u4FBF\u540E\u7EED\u4F7F\u7528" aria-hidden="true">#</a> 5. \u628A\u9700\u8981hook\u7684\u4FE1\u606F\u4FDD\u5B58\u8FDB\u5165\u8FDB\u5165\u5BB9\u5668 <code>AspectsContainer</code> \u4E2D, \u65B9\u4FBF\u540E\u7EED\u4F7F\u7528</h5><h5 id="_6-\u5F00\u59CB\u62E6\u622A\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_6-\u5F00\u59CB\u62E6\u622A\u65B9\u6CD5" aria-hidden="true">#</a> 6. \u5F00\u59CB\u62E6\u622A\u65B9\u6CD5</h5><p>\u5177\u4F53\u4EE3\u7801\u5B9E\u73B0\u4E3A:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>static void aspect_prepareClassAndHookSelector(NSObject *self, SEL selector, NSError **error) {
    NSCParameterAssert(selector);
  	// 1. hook class
    Class klass = aspect_hookClass(self, error);
  	// 2. hook selector
    Method targetMethod = class_getInstanceMethod(klass, selector);
    IMP targetMethodIMP = method_getImplementation(targetMethod);
    if (!aspect_isMsgForwardIMP(targetMethodIMP)) {
        // Make a method alias for the existing method implementation, it not already copied.
        const char *typeEncoding = method_getTypeEncoding(targetMethod);
        SEL aliasSelector = aspect_aliasForSelector(selector);
        if (![klass instancesRespondToSelector:aliasSelector]) {
           // \u7ED9\u5B50\u7C7B\u751F\u6210\u4E00\u4E2A\u8F85\u52A9\u65B9\u6CD5\uFF0C\u65B9\u6CD5\u5B9E\u73B0\u6307\u5411\u88ABhook\u7684\u65B9\u6CD5\u7684\u5B9E\u73B0
            __unused BOOL addedAlias = class_addMethod(klass, aliasSelector, method_getImplementation(targetMethod), typeEncoding);
            NSCAssert(addedAlias, @&quot;Original implementation for %@ is already copied to %@ on %@&quot;, NSStringFromSelector(selector), NSStringFromSelector(aliasSelector), klass);
        }
				
      	// \u5F3A\u5236\u8BA9\u88ABhook\u7684\u65B9\u6CD5\uFF0C\u8D70\u6D88\u606F\u8F6C\u53D1\u6D41\u7A0B
        // We use forwardInvocation to hook in.
        class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);
        AspectLog(@&quot;Aspects: Installed hook for -[%@ %@].&quot;, klass, NSStringFromSelector(selector));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h6 id="_6-1-hook-class" tabindex="-1"><a class="header-anchor" href="#_6-1-hook-class" aria-hidden="true">#</a> 6.1 hook class</h6><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>static Class aspect_hookClass(NSObject *self, NSError **error) {
    NSCParameterAssert(self);
	Class statedClass = self.class; // \u7C7B\u5BF9\u8C61
	Class baseClass = object_getClass(self); // \u83B7\u53D6\u5F53\u524D\u5BF9\u8C61\u7684isa\u6307\u9488
	NSString *className = NSStringFromClass(baseClass);

    // Already subclassed
	if ([className hasSuffix:AspectsSubclassSuffix]) {
		return baseClass;

        // We swizzle a class object, not a single object.
	}else if (class_isMetaClass(baseClass)) {
        return aspect_swizzleClassInPlace((Class)self);
        // Probably a KVO&#39;ed class. Swizzle in place. Also swizzle meta classes in place.
    }else if (statedClass != baseClass) {
        return aspect_swizzleClassInPlace(baseClass);
    }

    // Default case. Create dynamic subclass.
	const char *subclassName = [className stringByAppendingString:AspectsSubclassSuffix].UTF8String;
	Class subclass = objc_getClass(subclassName);

	if (subclass == nil) {
    // \u521B\u5EFA\u5B50\u7C7B
		subclass = objc_allocateClassPair(baseClass, subclassName, 0);
		if (subclass == nil) {
            NSString *errrorDesc = [NSString stringWithFormat:@&quot;objc_allocateClassPair failed to allocate class %s.&quot;, subclassName];
            AspectError(AspectErrorFailedToAllocateClassPair, errrorDesc);
            return nil;
    }
	  // \u5B50\u7C7B\u7684\`forwardInvocation:\`\u65B9\u6CD5\uFF0C\u6307\u5411\`__aspects_forwardInvocation:\`
		aspect_swizzleForwardInvocation(subclass); 
    // \u5B50\u7C7B\u7684isa\u6307\u9488\u6307\u5411statedClass
		aspect_hookedGetClass(subclass, statedClass);
    // \u5B50\u7C7B\u7684\u5143\u7C7B\u7684isa\u6307\u9488\u6307\u5411statedClass
		aspect_hookedGetClass(object_getClass(subclass), statedClass);
    // \u6CE8\u518C\u5B50\u7C7B
		objc_registerClassPair(subclass);
	}
	// \u628A\u5F53\u524D\u5BF9\u8C61\u7684isa\u6307\u9488\u6307\u5411\u5B50\u7C7B
	object_setClass(self, subclass);
	return subclass;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>\u5176\u4E2D <code>Class object_getClass(id obj);</code></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// \u5747\u8FD4\u56DEisa\u6307\u9488
// 1. obj \u662F\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u8FD4\u56DE\u7C7B\u5BF9\u8C61
// 2. obj \u662F\u7C7B\u5BF9\u8C61\uFF0C\u8FD4\u56DE(meta-class)\u5143\u7C7B
// 3. obj \u662F\u5143\u7C7B\uFF0C\u8FD4\u56DE\u6839\u7C7B\u7684\u5143\u7C7B
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5148\u5224\u65AD\u662F\u5426\u5DF2\u7ECF\u88ABhook\uFF0C\u7136\u540E\u5224\u65AD\u662F\u5426\u662F\u7C7B\u5BF9\u8C61\uFF0C\u4E4B\u540E\u5224\u65AD\u662F\u5426\u88ABkvc\uFF0C \u6700\u540E\u52A8\u6001\u521B\u5EFA\u4E86\u4E00\u4E2A\u5B50\u7C7B\u3002</p><p>\u6838\u5FC3\u601D\u60F3\u662F:</p>`,10),O=s("\u521B\u5EFA\u5B8C\u5B50\u7C7B\u540E\uFF0C\u66FF\u6362\u5B50\u7C7B\u7684 "),E=e("code",null,"forwardInvocation:",-1),T=s("\u65B9\u6CD5\uFF0C \u5E76\u4E14\u628A\u5B50\u7C7B\u548C\u5F53\u524D\u5BF9\u8C61\u5173\u8054\u3002\u8FD9\u4E48\u505A\u7684\u597D\u5904\u662F\u8C03\u7528\u5F53\u524D\u5BF9\u8C61\u7684\u65B9\u6CD5(\u5F53\u524D\u5BF9\u8C61\u7684isa\u6307\u9488\u6307\u5411\u4E86\u5B50\u7C7B)\uFF0C\u5982\u679C\u627E\u4E0D\u5230\u5B9E\u73B0\uFF0C\u8D70\u81EA\u52A8\u8F6C\u53D1\u6D41\u7A0B\u7684\u65F6\u5019\uFF0C\u4F1A\u8C03\u7528\u5230\u5B50\u7C7B\u7684 "),w=e("code",null,"forwardInvocation:",-1),L=s(" \u65B9\u6CD5\u91CC\u9762\uFF0C\u5B50\u7C7B\u7684 "),M=e("code",null,"forwardInvocation:",-1),P=s(" \u5B9E\u73B0\u88AB\u6307\u5411\u4E86\u81EA\u5B9A\u4E49\u7684\u65B9\u6CD5\uFF0C\u4ECE\u800C\u5B9E\u73B0\u4E86 hook \u8FC7\u7A0B\u3002\u8FD9\u91CC\u7684 "),F={href:"https://github.com/chenxi92/demos/blob/main/iOS/runtime/aspects/aspects/main.m",target:"_blank",rel:"noopener noreferrer"},B=s("demo"),z=s(" \u6A21\u62DF\u4E86 "),R=e("code",null,"Aspects",-1),W=s(" \u7684 hook \u6D41\u7A0B\u3002"),q=e("h6",{id:"_6-2-hook-selector",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_6-2-hook-selector","aria-hidden":"true"},"#"),s(" 6.2 hook selector")],-1),D=e("p",null,[s("\u5148\u7ED9\u5B50\u7C7B\u751F\u6210\u4E00\u4E2A "),e("code",null,"aliasSelector"),s(" \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u5B9E\u73B0\u6307\u5411\u88ABhook\u7684\u65B9\u6CD5\u5B9E\u73B0\uFF0C\u7136\u540E\u5F3A\u5236\u8BA9\u88ABhook\u7684\u65B9\u6CD5\uFF0C\u8D70\u6D88\u606F\u8F6C\u53D1\u6D41\u7A0B\u3002")],-1),H=s("\u5176\u4E2D\u5173\u4E8E"),V=e("code",null,"_objc_msgForward",-1),U=s(" \u548C "),G=e("code",null,"_objc_msgForward_stret",-1),K=s(" \u77E5\u8BC6\u53EF\u4EE5\u53C2\u8003: "),Y={href:"http://blog.cnbang.net/tech/2855/",target:"_blank",rel:"noopener noreferrer"},J=s("JSPatch\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3<\u4E8C>"),Q=s(" \u548C "),X={href:"http://sealiesoftware.com/blog/archive/2008/10/30/objc_explain_objc_msgSend_stret.html",target:"_blank",rel:"noopener noreferrer"},Z=s("objc_explain_objc_msgSend_stret"),$=s(" \u8FD9\u4E24\u7BC7\u6587\u7AE0\u3002"),ss=r(`<h6 id="_7-\u6D88\u606F\u8F6C\u53D1" tabindex="-1"><a class="header-anchor" href="#_7-\u6D88\u606F\u8F6C\u53D1" aria-hidden="true">#</a> 7. \u6D88\u606F\u8F6C\u53D1</h6><p>\u5F53\u88ABhook\u7684\u65B9\u6CD5\u88AB\u5916\u90E8\u8C03\u7528\u65F6\uFF0C\u4F1A\u81EA\u52A8\u8D70\u6D88\u606F\u8F6C\u53D1\u6D41\u7A0B\uFF0C\u800C\u6D88\u606F\u8F6C\u53D1\u7684\u5B9E\u73B0\u88AB <code>Aspects</code> hook\u4F4F\u4E86\uFF0C \u5177\u4F53\u4EE3\u7801\u5982\u4E0B:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// This is a macro so we get a cleaner stack trace.
#define aspect_invoke(aspects, info) \\
for (AspectIdentifier *aspect in aspects) {\\
    [aspect invokeWithInfo:info];\\
    if (aspect.options &amp; AspectOptionAutomaticRemoval) { \\
        aspectsToRemove = [aspectsToRemove?:@[] arrayByAddingObject:aspect]; \\
    } \\
}

// This is the swizzled forwardInvocation: method.
static void __ASPECTS_ARE_BEING_CALLED__(__unsafe_unretained NSObject *self, SEL selector, NSInvocation *invocation) {
    NSCParameterAssert(self);
    NSCParameterAssert(invocation);
    SEL originalSelector = invocation.selector;
  	// \u83B7\u53D6\u8F85\u52A9\u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u7684\u5B9E\u73B0\u6307\u5411\u539F\u6765\u88ABhook\u7684\u65B9\u6CD5
	  SEL aliasSelector = aspect_aliasForSelector(invocation.selector);
    invocation.selector = aliasSelector;
  	// \u83B7\u53D6\u5B9E\u4F8B\u5BF9\u8C61\u7684\u5BB9\u5668objectContainer
    AspectsContainer *objectContainer = objc_getAssociatedObject(self, aliasSelector);
    // \u83B7\u53D6\u83B7\u5F97\u7C7B\u5BF9\u8C61\u5BB9\u5668classContainer
  	AspectsContainer *classContainer = aspect_getContainerForClass(object_getClass(self), aliasSelector);
    AspectInfo *info = [[AspectInfo alloc] initWithInstance:self invocation:invocation];
    NSArray *aspectsToRemove = nil;

    // Before hooks.
    aspect_invoke(classContainer.beforeAspects, info);
    aspect_invoke(objectContainer.beforeAspects, info);

    // Instead hooks.
    BOOL respondsToAlias = YES;
    if (objectContainer.insteadAspects.count || classContainer.insteadAspects.count) {
        aspect_invoke(classContainer.insteadAspects, info);
        aspect_invoke(objectContainer.insteadAspects, info);
    }else {
        Class klass = object_getClass(invocation.target);
        do {
            if ((respondsToAlias = [klass instancesRespondToSelector:aliasSelector])) 						{
                [invocation invoke];
                break;
            }
        }while (!respondsToAlias &amp;&amp; (klass = class_getSuperclass(klass)));
    }

    // After hooks.
    aspect_invoke(classContainer.afterAspects, info);
    aspect_invoke(objectContainer.afterAspects, info);

    // If no hooks are installed, call original implementation (usually to throw an exception)
    if (!respondsToAlias) {
        invocation.selector = originalSelector;
        SEL originalForwardInvocationSEL = NSSelectorFromString(AspectsForwardInvocationSelectorName);
        if ([self respondsToSelector:originalForwardInvocationSEL]) {
            ((void( *)(id, SEL, NSInvocation *))objc_msgSend)(self, originalForwardInvocationSEL, invocation);
        }else {
            [self doesNotRecognizeSelector:invocation.selector];
        }
    }

    // Remove any hooks that are queued for deregistration.
    [aspectsToRemove makeObjectsPerformSelector:@selector(remove)];
}
#undef aspect_invoke

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><p>\u4E00. \u6D88\u606F\u8F6C\u53D1\u524D\u7684\u51C6\u5907\u5DE5\u4F5C\uFF1A</p><ol><li>\u83B7\u53D6\u539F\u59CB\u7684selector</li><li>\u83B7\u53D6\u5E26\u6709aspects_xxxx\u524D\u7F00\u7684\u65B9\u6CD5</li><li>\u66FF\u6362selector</li><li>\u83B7\u53D6\u5B9E\u4F8B\u5BF9\u8C61\u7684\u5BB9\u5668objectContainer</li><li>\u83B7\u53D6\u83B7\u5F97\u7C7B\u5BF9\u8C61\u5BB9\u5668classContainer</li><li>\u521D\u59CB\u5316AspectInfo\uFF0C\u4F20\u5165self\u3001invocation\u53C2\u6570</li></ol><p>\u4E8C. \u5206\u522B\u5728 \u51FD\u6570\u8C03\u7528\u4E4B\u524D\uFF0C\u66FF\u6362\u51FD\u6570\uFF0C\u51FD\u6570\u8C03\u7528\u4E4B\u540E\uFF0C\u6267\u884Cblock\uFF1B</p><p>\u4E3B\u8981\u8C03\u7528 <code>aspect_invoke</code> \u5B8F\u5B9A\u4E49\u6267\u884Chook\u529F\u80FD, \u8BE5\u5B8F\u5B9A\u4E49\u67092\u4E2A\u4F5C\u7528\uFF1A</p><ol><li>\u8C03\u7528 <code>invokeWithInfo:</code> \u65B9\u6CD5\u6267\u884Cblock\uFF0C\u628A\u88ABhook\u65B9\u6CD5\u91CC\u9762\u7684\u53C2\u6570\u4F9D\u6B21\u62F7\u8D1D\u5230block\u91CC\u9762\uFF0C\u7136\u540E\u6267\u884Cblock\uFF1B</li><li>\u8BB0\u5F55\u9700\u8981\u79FB\u9664\u7684 <code>AspectInfo</code> \u4FE1\u606F\uFF0C \u65B9\u4FBF\u540E\u7EED\u79FB\u9664</li></ol><p>\u4E09. \u79FB\u9664hook\u7684\u4FE1\u606F\u3002</p>`,9);function es(ns,as){const n=l("ExternalLinkIcon");return o(),c(t,null,[b,e("p",null,[d,e("a",u,[m,a(n)]),h]),_,e("p",null,[g,e("a",k,[f,a(n)]),S,v,A]),C,e("p",null,[j,e("a",N,[I,a(n)]),x]),y,e("p",null,[O,E,T,w,L,M,P,e("a",F,[B,a(n)]),z,R,W]),q,D,e("p",null,[H,V,U,G,K,e("a",Y,[J,a(n)]),Q,e("a",X,[Z,a(n)]),$]),ss],64)}var os=i(p,[["render",es]]);export{os as default};
