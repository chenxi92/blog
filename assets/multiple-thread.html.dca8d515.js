import{r as i,o as l,c as t,a as n,e as s,F as p,d as r,b as e}from"./app.01142347.js";import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";const c={},u=r(`<h1 id="ios-thread-notes" tabindex="-1"><a class="header-anchor" href="#ios-thread-notes" aria-hidden="true">#</a> iOS Thread Notes</h1><p>Threading Terminology</p><ul><li>The term <strong>thread</strong> is used to refer to a separate path of execution for code.</li><li>The term <strong>process</strong> is used to refer to a running executable, which can encompass multiple threads.</li><li>The term <strong>task</strong> is used to refer to the abstract concept of work that needs to be performed.</li></ul><p>The contents about the notes:</p><p><a href="#pthread">pthread</a></p><p><a href="#nsthread">NSThread</a></p><p><a href="#gcd">GCD</a></p><p><a href="#nsoperation">NSOperation</a></p><p><a href="#using-locks">Using Locks</a></p><p><a href="#interview-questions">Interview Question</a></p><p><a href="#reference">Reference</a></p><h2 id="pthread" tabindex="-1"><a class="header-anchor" href="#pthread" aria-hidden="true">#</a> pthread</h2><p><strong>\u7279\u70B9</strong></p><p>\u7A0B\u5E8F\u5458\u81EA\u5DF1\u7BA1\u7406\u7EBF\u7A0B\u7684\u751F\u547D\u5468\u671F</p><p><strong>\u5B9A\u4E49</strong></p><blockquote><p>\u7EBF\u7A0B\u5E93\u5B9E\u884C\u4E86 POSIX \u7EBF\u7A0B\u6807\u51C6\u901A\u5E38\u79F0\u4E3A pthreads\u3002</p><p>POSIX \u7EBF\u7A0B\u5177\u6709\u5F88\u597D\u7684\u53EF\u79FB\u690D\u6027\uFF0C\u4F7F\u7528 pthreads \u7F16\u5199\u7684\u4EE3\u7801\u53EF\u8FD0\u884C\u4E8E Solaris\u3001FreeBSD\u3001Linux \u7B49\u5E73\u53F0\uFF0CWindows \u5E73\u53F0\u4EA6\u6709pthreads-win32 \u53EF\u4F9B\u4F7F\u7528 \u3002 pthreads \u5B9A\u4E49\u4E86\u4E00\u5957C\u8BED\u8A00\u7684\u7C7B\u578B\u3001\u51FD\u6570\u4E0E\u5E38\u91CF\uFF0C\u5B83\u4EE5 pthread.h \u5934\u6587\u4EF6\u548C\u4E00\u4E2A\u7EBF\u7A0B\u5E93\u5B9E\u73B0\u3002</p></blockquote><p><strong>\u521B\u5EFA\u7EBF\u7A0B</strong></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>#import &lt;pthread.h&gt;

- (void)demo {
    //1.\u521B\u5EFA\u7EBF\u7A0B\u5BF9\u8C61
    pthread_t thread;
    
    /**2.\u521B\u5EFA\u7EBF\u7A0B
    \u53C2\u6570\uFF1A
     1.\u6307\u5411\u7EBF\u7A0B\u6807\u8BC6\u7B26\u7684\u6307\u9488\uFF0CC \u8BED\u8A00\u4E2D\u7C7B\u578B\u7684\u7ED3\u5C3E\u901A\u5E38 _t/Ref\uFF0C\u800C\u4E14\u4E0D\u9700\u8981\u4F7F\u7528 *;
     2.\u7528\u6765\u8BBE\u7F6E\u7EBF\u7A0B\u5C5E\u6027;
     3.\u6307\u5411\u51FD\u6570\u7684\u6307\u9488,\u4F20\u5165\u51FD\u6570\u540D(\u51FD\u6570\u7684\u5730\u5740)\uFF0C\u7EBF\u7A0B\u8981\u6267\u884C\u7684\u51FD\u6570/\u4EFB\u52A1;
     4.\u8FD0\u884C\u51FD\u6570\u7684\u53C2\u6570;
     */
    NSString *param = @&quot;\u53C2\u6570&quot;;
    int result = pthread_create(&amp;thread, NULL, func, (__bridge void *)(param));
    if (result == 0) {
    	NSLog(@&quot;success&quot;)
    } else {
    	NSLog(@&quot;failure&quot;);
    	return;
    }
    
    //3.\u8BBE\u7F6E\u5B50\u7EBF\u7A0B\u7684\u72B6\u6001\u8BBE\u7F6E\u4E3Adetached,\u5219\u8BE5\u7EBF\u7A0B\u8FD0\u884C\u7ED3\u675F\u540E\u4F1A\u81EA\u52A8\u91CA\u653E\u6240\u6709\u8D44\u6E90\uFF0C\u6216\u8005\u5728\u5B50\u7EBF\u7A0B\u4E2D\u6DFB\u52A0 pthread_detach(pthread_self()),\u5176\u4E2Dpthread_self()\u662F\u83B7\u5F97\u7EBF\u7A0B\u81EA\u8EAB\u7684id
    pthread_detach(thread);
 }
 
 void *func(void *param) {
	//\u5728\u6B64\u505A\u8017\u65F6\u64CD\u4F5C
    NSLog(@&quot;new thread : %@  \u53C2\u6570\u662F: %@&quot;,[NSThread currentThread],(__bridge NSString *)(param));
    
    return NULL;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p><strong>\u5176\u4ED6\u51FD\u6570</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>pthread_t\uFF1A\u7EBF\u7A0BID
pthread_attr_t\uFF1A\u7EBF\u7A0B\u5C5E\u6027
pthread_create()\uFF1A\u521B\u5EFA\u4E00\u4E2A\u7EBF\u7A0B
pthread_exit()\uFF1A\u7EC8\u6B62\u5F53\u524D\u7EBF\u7A0B
pthread_cancel()\uFF1A\u4E2D\u65AD\u53E6\u5916\u4E00\u4E2A\u7EBF\u7A0B\u7684\u8FD0\u884C
pthread_join()\uFF1A\u963B\u585E\u5F53\u524D\u7684\u7EBF\u7A0B\uFF0C\u76F4\u5230\u53E6\u5916\u4E00\u4E2A\u7EBF\u7A0B\u8FD0\u884C\u7ED3\u675F
pthread_attr_init()\uFF1A\u521D\u59CB\u5316\u7EBF\u7A0B\u7684\u5C5E\u6027
pthread_attr_setdetachstate()\uFF1A\u8BBE\u7F6E\u8131\u79BB\u72B6\u6001\u7684\u5C5E\u6027\uFF08\u51B3\u5B9A\u8FD9\u4E2A\u7EBF\u7A0B\u5728\u7EC8\u6B62\u65F6\u662F\u5426\u53EF\u4EE5\u88AB\u7ED3\u5408\uFF09
pthread_attr_getdetachstate()\uFF1A\u83B7\u53D6\u8131\u79BB\u72B6\u6001\u7684\u5C5E\u6027
pthread_attr_destroy()\uFF1A\u5220\u9664\u7EBF\u7A0B\u7684\u5C5E\u6027
pthread_kill()\uFF1A\u5411\u7EBF\u7A0B\u53D1\u9001\u4E00\u4E2A\u4FE1\u53F7
pthread_equal(): \u5BF9\u4E24\u4E2A\u7EBF\u7A0B\u7684\u7EBF\u7A0B\u6807\u8BC6\u53F7\u8FDB\u884C\u6BD4\u8F83
pthread_detach(): \u5206\u79BB\u7EBF\u7A0B
pthread_self(): \u67E5\u8BE2\u7EBF\u7A0B\u81EA\u8EAB\u7EBF\u7A0B\u6807\u8BC6\u53F7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="nsthread" tabindex="-1"><a class="header-anchor" href="#nsthread" aria-hidden="true">#</a> NSThread</h2><p><strong>\u7279\u70B9</strong></p><p>\u7A0B\u5E8F\u5458\u7BA1\u7406\u7EBF\u7A0B\u7684\u751F\u547D\u5468\u671F\uFF1B</p><p>\u4F7F\u7528OC\u5BF9\u8C61\uFF0C \u7B80\u5355\u6613\u7528\uFF0C\u53EF\u76F4\u63A5\u64CD\u4F5C\u7EBF\u7A0B\u5BF9\u8C61</p><p><strong>\u521B\u5EFA\u65B9\u5F0F</strong></p><p><strong>1. \u5B9E\u4F8B\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B</strong></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)useInstanceMehotd:(id)sender {
    NSLog(@&quot;===== begin %@&quot;, [NSThread currentThread]);
    // \u521B\u5EFANSThread \u5BF9\u8C61
    NSThread *thread = [[NSThread alloc] initWithTarget:self selector:@selector(myOperation:) object:@&quot;instance method&quot;];
    // \u542F\u52A8\u7EBF\u7A0B -&gt; \u5F00\u8F9F\u5B50\u7EBF\u7A0B\u6267\u884C\u65B9\u6CD5
    [thread start];
    NSLog(@&quot;===== end %@&quot;, [NSThread currentThread]);
}

- (void)myOperation:(id)param {
    NSLog(@&quot;begin %@&quot;, [NSThread currentThread]);
    NSLog(@&quot;param = %@&quot;, param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@&quot;end %@&quot;, [NSThread currentThread]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>2. \u7C7B\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B</strong></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)useClassMethod:(id)sender {
    NSLog(@&quot;===== begin %@&quot;, [NSThread currentThread]);
    // \u81EA\u52A8\u521B\u5EFA\u7EBF\u7A0B\uFF0C\u5E76\u6267\u884C\u65B9\u6CD5
    [NSThread detachNewThreadSelector:@selector(myOperation:) toTarget:self withObject:@&quot;class method&quot;];
    NSLog(@&quot;===== end %@&quot;, [NSThread currentThread]);

}

- (void)myOperation:(id)param {
    NSLog(@&quot;begin %@&quot;, [NSThread currentThread]);
    NSLog(@&quot;param = %@&quot;, param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@&quot;end %@&quot;, [NSThread currentThread]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>3. NSObject\u5206\u7C7B\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B</strong></p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)useCatgoryMethod:(id)sender {
    NSLog(@&quot;===== begin %@&quot;, [NSThread currentThread]);
    // \u662FNSObject\u5206\u7C7B\u65B9\u6CD5
    // \u81EA\u52A8\u5728\u540E\u53F0\u7EBF\u7A0B\u6267\u884C
    [self performSelectorInBackground:@selector(myOperation:) withObject:@&quot;category method&quot;];
    NSLog(@&quot;===== end %@&quot;, [NSThread currentThread]);
}

- (void)myOperation:(id)param {
    NSLog(@&quot;begin %@&quot;, [NSThread currentThread]);
    NSLog(@&quot;param = %@&quot;, param);
    [NSThread sleepForTimeInterval:3];
    NSLog(@&quot;end %@&quot;, [NSThread currentThread]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="gcd" tabindex="-1"><a class="header-anchor" href="#gcd" aria-hidden="true">#</a> GCD</h2><p><strong>\u7279\u70B9</strong></p><p>\u4E0D\u7528\u5173\u5FC3\u7EBF\u7A0B\u7684\u751F\u547D\u5468\u671F</p><p><strong>\u6267\u884C\u4EFB\u52A1\u65B9\u5F0F</strong></p><ol><li>\u540C\u6B65\u7684\u65B9\u5F0F\u6267\u884C\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>dispatch_sync(dispatch_queue_t queue, dispatch_block_t block);
queue: \u961F\u5217
block: \u4EFB\u52A1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2"><li>\u5F02\u6B65\u7684\u65B9\u5F0F\u6267\u884C</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>dispatch_async(dispatch_queue_t queue, dispatch_block_t block);
queue: \u961F\u5217
block: \u4EFB\u52A1

\u540C\u6B65\uFF1A
\u53EA\u80FD\u5728\u5F53\u524D\u7EBF\u7A0B\u4E2D\u6267\u884C\u4EFB\u52A1\uFF0C \u4E0D\u5177\u5907\u5F00\u542F\u7EBF\u7A0B\u80FD\u529B
\u5FC5\u987B\u7B49\u5F85\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\uFF0C\u624D\u4F1A\u6267\u884C\u4E0B\u4E00\u6761\u8BED\u53E5

\u5F02\u6B65\uFF1A
\u53EF\u4EE5\u5728\u65B0\u7684\u7EBF\u7A0B\u4E2D\u6267\u884C\uFF0C \u5177\u5907\u5F00\u542F\u65B0\u7EBF\u7A0B\u80FD\u529B
\u4E0D\u7528\u7B49\u5F85\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\uFF0C \u5C31\u53EF\u4EE5\u6267\u884C\u4E0B\u4E00\u6761\u8BED\u53E5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>\u961F\u5217\u7C7B\u578B</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1. \u5E76\u53D1\u961F\u5217(Concurrent Dispatch Queue)
   * \u5141\u8BB8\u591A\u4E2A\u4EFB\u52A1\u5E76\u53D1\uFF08\u540C\u65F6\uFF09\u6267\u884C
   * \u5E76\u53D1\u529F\u80FD\u53EA\u6709\u5728\u5F02\u6B65\u51FD\u6570\u4E0B\u624D\u6709\u6548
2. \u4E32\u884C\u961F\u5217\uFF08Serial Dispatch Queue)
   * \u8BA9\u4EFB\u52A1\u4E00\u4E2A\u63A5\u7740\u4E00\u4E2A\u7684\u6267\u884C

\u5168\u5C40\u961F\u5217\uFF08dispatch_get_global_queue): \u662F\u4E00\u4E2A\u5E76\u53D1\u961F\u5217
\u4E3B\u961F\u5217\uFF08dispatch_get_main_queue): \u4E3B\u961F\u5217\u4E13\u95E8\u7528\u4E8E\u5728\u4E3B\u7EBF\u7A0B\u4E0A\u6267\u884C\u4EFB\u52A1\uFF0C \u662F\u4E00\u4E2A\u4E32\u884C\u961F\u5217
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>\u961F\u5217\u6267\u884C\u6548\u679C</strong></p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">\u5E76\u53D1\u961F\u5217</th><th style="text-align:left;">\u4E32\u884C\u961F\u5217</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>\u540C\u6B65</strong></td><td style="text-align:left;">1.\u6CA1\u6709\u5F00\u542F\u65B0\u7EBF\u7A0B<br>2.\u4E32\u884C\u6267\u884C\u4EFB\u52A1</td><td style="text-align:left;">1. \u6CA1\u6709\u5F00\u542F\u65B0\u7EBF\u7A0B<br>2. \u4E32\u884C\u6267\u884C\u4EFB\u52A1</td></tr><tr><td style="text-align:center;"><strong>\u5F02\u6B65</strong></td><td style="text-align:left;">1. \u5F00\u542F\u65B0\u7EBF\u7A0B<br>2. \u5E76\u53D1\u6267\u884C\u4EFB\u52A1</td><td style="text-align:left;">1. \u5F00\u542F\u65B0\u7EBF\u7A0B<br>2. \u4E32\u884C\u6267\u884C\u4EFB\u52A1</td></tr></tbody></table><h3 id="dispatch-barrier" tabindex="-1"><a class="header-anchor" href="#dispatch-barrier" aria-hidden="true">#</a> Dispatch barrier</h3><blockquote><p>\u8BE5\u51FD\u6570\u4F1A\u7B49\u5F85dispatch_barrier_async \u524D\u9762\u6240\u6709\u4EFB\u52A1\u5B8C\u6210</p></blockquote><blockquote><p>\u7136\u540E\u5728\u6267\u884C dispatch_barrier_async \u7684\u4EFB\u52A1</p></blockquote><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)test_barrier_async:(id)sender {
    dispatch_queue_t queue = dispatch_queue_create(&quot;com.chenxi.learn.thread&quot;, DISPATCH_QUEUE_CONCURRENT);
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@&quot;task1 complete, %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@&quot;task2 complete, %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        int time = arc4random() % 5;
        [NSThread sleepForTimeInterval:time];
        NSLog(@&quot;task3 complete, %@&quot;, [NSThread currentThread]);
    });
    
    // \u963B\u585E
    dispatch_barrier_async(queue, ^{
        NSLog(@&quot;barrier asycn task ..., %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@&quot;another task1 complete, %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_async(queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@&quot;another task2 complete, %@&quot;, [NSThread currentThread]);
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4><h3 id="dispatch-group" tabindex="-1"><a class="header-anchor" href="#dispatch-group" aria-hidden="true">#</a> Dispatch group</h3><blockquote><p>\u4F7F\u7528 dispatch_group_async \u548C dispatch_group_notify \u51FD\u6570\u6765\u5B8C\u6210\u8C03\u5EA6\u7EC4\u7684\u5DE5\u4F5C</p></blockquote><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)demo {
    
    // 1. \u8C03\u5EA6\u7EC4
    dispatch_group_t group = dispatch_group_create();
    
    // 2. \u5E76\u53D1\u961F\u5217
    dispatch_queue_t queue = dispatch_queue_create(&quot;com.chenxi.learn.thread&quot;, DISPATCH_QUEUE_CONCURRENT);
    
    // 3. \u4EFB\u52A1\u6DFB\u52A0\u5230\u8C03\u5EA6\u7EC4
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@&quot;task1 comolete, %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@&quot;task2 comolete, %@&quot;, [NSThread currentThread]);
    });
    
    dispatch_group_async(group, queue, ^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@&quot;task3 comolete, %@&quot;, [NSThread currentThread]);
    });
    
    // \u7B49\u5F85\u6240\u6709\u4EFB\u52A1\u79BB\u5F00\u8C03\u5EA6\u7EC4\uFF0C \u8C03\u7528\u8BE5\u51FD\u6570
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        NSLog(@&quot;all task completed, %@&quot;, [NSThread currentThread]);
    });
    
    NSLog(@&quot;other things ...&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="nsoperation" tabindex="-1"><a class="header-anchor" href="#nsoperation" aria-hidden="true">#</a> NSOperation</h2><p><strong>\u7279\u70B9</strong></p><blockquote><p>\u662F\u4F7F\u7528OC\u8BED\u8A00\u5BF9GCD\u7684\u5C01\u88C5</p></blockquote><blockquote><p>\u5B8C\u5168\u9762\u5411\u5BF9\u8C61\uFF0C\u4E0D\u9700\u8981\u7BA1\u7406\u7EBF\u7A0B\u7684\u751F\u547D\u5468\u671F</p></blockquote><p>NSOperation \u53EA\u662F\u4E00\u4E2A\u62BD\u8C61\u7C7B\uFF0C \u9700\u8981\u4F7F\u7528\u5B50\u7C7B\u6765\u6267\u884C\u4EFB\u52A1\u3002 \u82F9\u679C\u63D0\u4F9B\u4E86\u4E24\u4E2A\u5B50\u7C7B\uFF1A NSInvocationOperation \u548C NSBlockOperation\u3002</p><p><strong>\u6838\u5FC3</strong></p><blockquote><p>\u64CD\u4F5C(NSoperation)\uFF1A \u8981\u505A\u7684\u4E8B\u60C5</p></blockquote><blockquote><p>\u961F\u5217(NSOperationQueue): \u5B58\u653E\u64CD\u4F5C</p></blockquote><p><strong>\u4F7F\u7528\u6B65\u9AA4</strong></p><blockquote><p>\u521B\u5EFA\u64CD\u4F5C</p></blockquote><blockquote><p>\u521B\u5EFA\u961F\u5217</p></blockquote><blockquote><p>\u5C06\u64CD\u4F5C\u653E\u5165\u961F\u5217</p></blockquote><h3 id="nsinvocationoperation" tabindex="-1"><a class="header-anchor" href="#nsinvocationoperation" aria-hidden="true">#</a> NSInvocationOperation</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)tes_invocation:(id)sender {
    
    NSInvocationOperation *invocationOperation = [[NSInvocationOperation alloc] initWithTarget:self selector:@selector(demo:) object:@{@&quot;name&quot;:@&quot;invocationOperation&quot;, @&quot;param&quot;: @&quot;hello world&quot;}];
    
    // \u64CD\u4F5C\u5B8C\u6210\u56DE\u8C03
    [invocationOperation setCompletionBlock:^{
        NSLog(@&quot;end invocation thread = %@&quot;, [NSThread currentThread]);
    }];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:invocationOperation];
}

- (void)demo:(id)obj {
    [NSThread sleepForTimeInterval:arc4random()%4];
    NSLog(@&quot;thread = %@, msg = %@&quot;, [NSThread currentThread], obj);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="nsblockoperation" tabindex="-1"><a class="header-anchor" href="#nsblockoperation" aria-hidden="true">#</a> NSBlockOperation</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)test_block:(id)sender {
    
    NSBlockOperation *blockOperation = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@&quot;block operation 1, thread = %@&quot;, [NSThread currentThread]);
    }];
    
    // \u53EF\u4EE5\u6DFB\u52A0\u591A\u4E2A\u4EFB\u52A1
    [blockOperation addExecutionBlock:^{
        [NSThread sleepForTimeInterval:1];
        NSLog(@&quot;block operation 2, thread = %@&quot;, [NSThread currentThread]);
    }];
    
    [blockOperation addExecutionBlock:^{
        [NSThread sleepForTimeInterval:1.5];
        NSLog(@&quot;block operation 3, thread = %@&quot;, [NSThread currentThread]);
    }];
    
    [blockOperation setCompletionBlock:^{
        NSLog(@&quot;end block operation, thread = %@&quot;, [NSThread currentThread]);
    }];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:blockOperation];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="\u64CD\u4F5C\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C\u4F9D\u8D56" aria-hidden="true">#</a> \u64CD\u4F5C\u4F9D\u8D56</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (IBAction)test_dependency:(id)sender {
    
    _queue = [[NSOperationQueue alloc] init];
    
    NSBlockOperation *op1 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:3];
        NSLog(@&quot;op1 , thread = %@&quot;, [NSThread currentThread]);
    }];
    
    NSBlockOperation *op2 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:2];
        NSLog(@&quot;op2 , thread = %@&quot;, [NSThread currentThread]);
    }];
    
    NSBlockOperation *op3 = [NSBlockOperation blockOperationWithBlock:^{
        [NSThread sleepForTimeInterval:0.5];
        NSLog(@&quot;op3 , thread = %@&quot;, [NSThread currentThread]);
    }];
    
    // op1 \u5B8C\u6210\u4E4B\u540E\uFF0C\u5F00\u59CBop2 / op3 \u4EFB\u52A1
    [op2 addDependency:op1];
    [op3 addDependency:op1];
    
    [_queue addOperation:op1];
    [_queue addOperation:op2];
    [_queue addOperation:op3];
    
    NSLog(@&quot;test dependency , thread = %@&quot;, [NSThread currentThread]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div>`,69),b={id:"defining-a-custom-operation-object",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#defining-a-custom-operation-object","aria-hidden":"true"},"#",-1),m=e(),h={href:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ConcurrencyProgrammingGuide/OperationObjects/OperationObjects.html#//apple_ref/doc/uid/TP40008091-CH101-SW16",target:"_blank",rel:"noopener noreferrer"},g=e("Defining a Custom Operation Object"),_=r(`<blockquote><p>\u81EA\u5B9A\u4E49 Operation \u9700\u8981\u7EE7\u627F NSOperation \u7C7B\uFF0C\u5E76\u5B9E\u73B0\u5176 main() \u65B9\u6CD5\uFF0C\u56E0\u4E3A\u5728\u8C03\u7528 start() \u65B9\u6CD5\u7684\u65F6\u5019\uFF0C\u5185\u90E8\u4F1A\u8C03\u7528 main() \u65B9\u6CD5\u5B8C\u6210\u76F8\u5173\u903B\u8F91\u3002</p></blockquote><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// \u521B\u5EFA CustomOperation \u7C7B\uFF0C \u7EE7\u627F\u81EA NSOperation
@interface CustomOperation : NSOperation
@end

@implementation CustomOperation

- (void)main
{
    NSTimeInterval time = arc4random() % 6;
    [NSThread sleepForTimeInterval:time];
    NSLog(@&quot;thread %@&quot;, [NSThread currentThread]);
}

@end

// ======= \u5728\u5176\u4ED6\u6587\u4EF6\u8C03\u7528

- (IBAction)test_custom_operation:(id)sender {
    
    CustomOperation *operation1 = [[CustomOperation alloc] init];
    CustomOperation *operation2 = [[CustomOperation alloc] init];
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    
    [queue addOperation:operation1];
    [queue addOperation:operation2];
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="\u961F\u5217\u5176\u4ED6\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u961F\u5217\u5176\u4ED6\u65B9\u6CD5" aria-hidden="true">#</a> \u961F\u5217\u5176\u4ED6\u65B9\u6CD5</h3><blockquote><p>maxConcurrentOperationCount \u8FD9\u662F\u6700\u5927\u5E76\u53D1\u6570</p></blockquote><blockquote><p>suspended \u961F\u5217\u6682\u505C/\u7EE7\u7EED</p></blockquote><blockquote><p>cancelAllOperations \u53D6\u6D88\u6240\u6709\u64CD\u4F5C</p></blockquote><h2 id="using-locks" tabindex="-1"><a class="header-anchor" href="#using-locks" aria-hidden="true">#</a> Using locks</h2><h3 id="using-a-posix-mutex-lock" tabindex="-1"><a class="header-anchor" href="#using-a-posix-mutex-lock" aria-hidden="true">#</a> Using a POSIX Mutex Lock</h3><p>To create the mutex lock, you declare and initialize a <code>pthread_mutex_t</code> structure.</p><p>To lock and unlock the mutex lock, you use the <code>pthread_mutex_lock</code> and <code>pthread_mutex_unlock</code> functions.</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>pthread_mutex_t mutex;
void MyInitFunction()
{
    pthread_mutex_init(&amp;mutex, NULL);
}
 
void MyLockingFunction()
{
    pthread_mutex_lock(&amp;mutex);
    // Do work.
    pthread_mutex_unlock(&amp;mutex);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="using-the-nslock-class" tabindex="-1"><a class="header-anchor" href="#using-the-nslock-class" aria-hidden="true">#</a> Using the NSLock Class</h3>`,12),v=e("An "),q={href:"https://developer.apple.com/library/archive/documentation/LegacyTechnologies/WebObjects/WebObjects_3.5/Reference/Frameworks/ObjC/Foundation/Classes/NSLock/Description.html#//apple_ref/occ/cl/NSLock",target:"_blank",rel:"noopener noreferrer"},k=e("NSLock"),S=e(" object implements a basic mutex for Cocoa applications."),N=r(`<div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>BOOL moreToDo = YES;
NSLock *theLock = [[NSLock alloc] init];
...
while (moreToDo) {
    /* Do another increment of calculation */
    /* until there\u2019s no more to do. */
    if ([theLock tryLock]) {
        /* Update display used by all threads. */
        [theLock unlock];
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="using-the-synchronized-directive" tabindex="-1"><a class="header-anchor" href="#using-the-synchronized-directive" aria-hidden="true">#</a> Using the @synchronized Directive</h3><p>The <code>@synchronized</code> directive is a convenient way to create mutex locks on the fly in Objective-C code.</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)myMethod:(id)anObj
{
    @synchronized(anObj)
    {
        // Everything between the braces is protected by the @synchronized directive.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>As a precautionary measure, the <code>@synchronized</code> block implicitly adds an exception handler to the protected code.</p><p>This handler automatically releases the mutex in the event that an exception is thrown.</p><h3 id="using-an-nsrecursivelock-object" tabindex="-1"><a class="header-anchor" href="#using-an-nsrecursivelock-object" aria-hidden="true">#</a> Using an NSRecursiveLock Object</h3>`,7),T=e("The "),f={href:"https://developer.apple.com/library/archive/documentation/LegacyTechnologies/WebObjects/WebObjects_3.5/Reference/Frameworks/ObjC/Foundation/Classes/NSRecursiveLock/Description.html#//apple_ref/occ/cl/NSRecursiveLock",target:"_blank",rel:"noopener noreferrer"},x=e("NSRecursiveLock"),O=e(" class defines a lock that can be acquired multiple times by the same thread without causing the thread to deadlock."),L=r(`<div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>NSRecursiveLock *theLock = [[NSRecursiveLock alloc] init];
 
void MyRecursiveFunction(int value)
{
    [theLock lock];
    if (value != 0)
    {
        --value;
        MyRecursiveFunction(value);
    }
    [theLock unlock];
}
 
MyRecursiveFunction(5);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="using-an-nsconditionlock-object" tabindex="-1"><a class="header-anchor" href="#using-an-nsconditionlock-object" aria-hidden="true">#</a> Using an NSConditionLock Object</h3>`,2),y=e("An "),j={href:"https://developer.apple.com/library/archive/documentation/LegacyTechnologies/WebObjects/WebObjects_3.5/Reference/Frameworks/ObjC/Foundation/Classes/NSConditionLock/Description.html#//apple_ref/occ/cl/NSConditionLock",target:"_blank",rel:"noopener noreferrer"},C=e("NSConditionLock"),I=e(" object defines a mutex lock that can be locked and unlocked with specific values."),w=r(`<p>Typically, you use an <code>NSConditionLock</code> object when threads need to perform tasks in a specific order, such as when one thread produces data that another consumes. While the producer is executing, the consumer acquires the lock using a condition that is specific to your program. (The condition itself is just an integer value that you define.) When the producer finishes, it unlocks the lock and sets the lock condition to the appropriate integer value to wake the consumer thread, which then proceeds to process the data.</p><p>The following example shows how the producer-consumer problem might be handled using condition locks.</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>id condLock = [[NSConditionLock alloc] initWithCondition:NO_DATA];
 
while(true)
{
    [condLock lock];
    /* Add data to the queue. */
    [condLock unlockWithCondition:HAS_DATA];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>The following example shows the basic structure of the consumer thread\u2019s processing loop.</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>while (true)
{
    [condLock lockWhenCondition:HAS_DATA];
    /* Remove data from the queue. */
    [condLock unlockWithCondition:(isEmpty ? NO_DATA : HAS_DATA)];
 
    // Process the data locally.
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="interview-questions" tabindex="-1"><a class="header-anchor" href="#interview-questions" aria-hidden="true">#</a> Interview Questions</h2><h3 id="_1-\u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#_1-\u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48" aria-hidden="true">#</a> 1. \u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48?</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)viewDidLoad {
	[super viewDidLoad];
	NSLog(@&quot;1&quot;);
   	dispatch_sync(dispatch_get_main_queue(), ^{
        NSLog(@&quot;2&quot;);
    });
    NSLog(@&quot;3&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u7B54\u6848:</p><blockquote><p>\u8F93\u51FA: 1\uFF0C \u7136\u540E\u5D29\u6E83</p></blockquote><p>\u539F\u56E0:</p><blockquote><p>\u7CFB\u7EDF\u7EF4\u62A4\u7684 <code>dispatch_get_main_queue()</code> \u8FD9\u4E2A\u961F\u5217\u91CC\u9762\u5728\u6267\u884C <code>viewDidLoad</code>\u65B9\u6CD5\uFF0C\u5728 <code>viewDidLoad</code> \u4E2D\u53C8\u518D\u6B21\u5728 <code>dispatch_get_main_queue()</code> \u8FD9\u4E2A\u76F8\u540C\u7684\u961F\u5217\u91CC\u9762\u6267\u884C<code>block</code>\u65B9\u6CD5\u3002</p><p>\u7531\u4E8E\u4E32\u884C\u961F\u5217 <code>FIFO</code> \u539F\u5219\uFF0C\u7CFB\u7EDF\u7EF4\u62A4\u7684<code>dispatch_get_main_queue()</code>\u5148\u8FDB\u6808\uFF0C\u6240\u4EE5\u8981\u5148\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u518D\u6267\u884C\u540E\u8FDB\u6808\u7684\u961F\u5217\u4EFB\u52A1\u3002</p><p>\u7CFB\u7EDF\u7EF4\u62A4\u7684 <code>dispatch_get_main_queue()</code> \u6267\u884C\u5B8C\u7684\u6761\u4EF6\u65F6 <code>viewDidLoad</code> \u65B9\u6CD5\u6267\u884C\u5B8C\u6BD5\uFF0C\u6240\u4EE5\u7CFB\u7EDF\u7EF4\u62A4\u7684 <code>dispatch_get_main_queue()</code> \u4F1A\u7B49\u5F85 <code>dispatch_sync</code> \u8C03\u7528\u7684<code>dispatch_get_main_queue()</code> \u6267\u884C\u5B8C\u6BD5\u3002</p><p><code>dispatch_sync</code> \u8C03\u7528\u7684 <code>dispatch_get_main_queue()</code>\u53C8\u5728\u7B49\u5F85\u5148\u8FDB\u6808\u7684\u7CFB\u7EDF\u7EF4\u62A4\u7684 <code>dispatch_get_main_queue()</code>\u6267\u884C\u5B8C\u6BD5\uFF0C\u8FD9\u6837\u5C31\u9677\u5165\u6B7B\u5FAA\u73AF\u3002</p></blockquote><h3 id="_2-\u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#_2-\u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48" aria-hidden="true">#</a> 2. \u4E0B\u9762\u4EE3\u7801\u4F1A\u8F93\u51FA\u4EC0\u4E48?</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>dispatch_queue_t queue = dispatch_queue_create(NULL, DISPATCH_QUEUE_SERIAL);
dispatch_async(queue, ^{
    NSLog(@&quot;1&quot;);
    dispatch_sync(queue, ^{
        NSLog(@&quot;2&quot;);
    });
    NSLog(@&quot;3&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u7B54\u6848:</p><blockquote><p>\u8F93\u51FA1\uFF0C\u7136\u540E\u5D29\u6E83</p></blockquote><p>\u539F\u56E0:</p><blockquote><p>\u540C\u4E0A</p></blockquote><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,19),F={href:"https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/Introduction/Introduction.html#//apple_ref/doc/uid/10000057i-CH1-SW1",target:"_blank",rel:"noopener noreferrer"},D=e("Threading Programming Guide"),B={href:"https://developer.apple.com/library/archive/documentation/General/Conceptual/ConcurrencyProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008091-CH1-SW1",target:"_blank",rel:"noopener noreferrer"},A=e("Concurrency Programming Guide"),W={href:"https://www.jianshu.com/p/0b0d9b1f1f19",target:"_blank",rel:"noopener noreferrer"},R=e("\u5173\u4E8EiOS\u591A\u7EBF\u7A0B\uFF0C\u4F60\u770B\u6211\u5C31\u591F\u4E86");function U(E,Q){const a=i("ExternalLinkIcon");return l(),t(p,null,[u,n("h3",b,[d,m,n("a",h,[g,s(a)])]),_,n("p",null,[v,n("a",q,[k,s(a)]),S]),N,n("p",null,[T,n("a",f,[x,s(a)]),O]),L,n("p",null,[y,n("a",j,[C,s(a)]),I]),w,n("ul",null,[n("li",null,[n("a",F,[D,s(a)])]),n("li",null,[n("a",B,[A,s(a)])]),n("li",null,[n("a",W,[R,s(a)])])])],64)}var G=o(c,[["render",U]]);export{G as default};
