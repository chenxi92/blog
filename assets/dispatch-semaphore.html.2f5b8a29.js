import{r,o as i,c as t,a,e as l,F as o,d as s,b as e}from"./app.01142347.js";import{_ as p}from"./plugin-vue_export-helper.21dcd24c.js";const c={},h=s('<h1 id="dispatch-semaphore" tabindex="-1"><a class="header-anchor" href="#dispatch-semaphore" aria-hidden="true">#</a> Dispatch Semaphore</h1><p align="right">2022-10-17</p><p><a href="#what-is-dispatch-semaphore">What is Dispatch Semaphore?</a></p><p><a href="#how-to-use-dispatch-semaphore">How to use Dispatch Semaphore?</a></p><p><a href="#examples">Examples</a></p><h2 id="what-is-dispatch-semaphore" tabindex="-1"><a class="header-anchor" href="#what-is-dispatch-semaphore" aria-hidden="true">#</a> What is Dispatch Semaphore?</h2>',6),d=e("The definition of "),u=a("code",null,"Dispatch Semaphore",-1),b=e(" of "),m={href:"https://developer.apple.com/documentation/dispatch/dispatch_semaphore?language=objc",target:"_blank",rel:"noopener noreferrer"},g=e("Apple"),_=e(" is:"),v=s(`<blockquote><p>An object that controls access to a resource across multiple execution contexts through use of a traditional counting semaphore.</p></blockquote><p>Semaphores give us the ability to control access to a shared resources by multiple threads.</p><p>A semaphore consists of a threads queue and a counter value (type int).</p><p><strong>The counter value</strong> is used by the semaphore to decide whether a thread should get access to a shared resource or not. The counter value changes when we call <code>dispatch_semaphore_wait</code> or <code>dispatch_semaphore_signal</code> method.</p><h2 id="how-to-use-dispatch-semaphore" tabindex="-1"><a class="header-anchor" href="#how-to-use-dispatch-semaphore" aria-hidden="true">#</a> How to use Dispatch Semaphore?</h2><h3 id="the-relative-api" tabindex="-1"><a class="header-anchor" href="#the-relative-api" aria-hidden="true">#</a> The relative API</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>/// Create a semaphore with an initial value.
dispatch_semaphore_t dispatch_semaphore_create(intptr_t value);

/// decrements a semaphore.
intptr_t dispatch_semaphore_wait(dispatch_semaphore_t dsema, dispatch_time_t timeout);

/// increments a semaphore.
intptr_t dispatch_semaphore_signal(dispatch_semaphore_t dsema);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="when-we-call-dispatch-semaphore-wait-or-dispatch-semaphore-signal" tabindex="-1"><a class="header-anchor" href="#when-we-call-dispatch-semaphore-wait-or-dispatch-semaphore-signal" aria-hidden="true">#</a> When we call <code>dispatch_semaphore_wait</code> or <code>dispatch_semaphore_signal</code></h3><ul><li><p>Call <code>dispatch_semaphore_wait</code> each time before we want using the shared resource. We are asking the semaphore whether the shared resource is available or not. If not, we will wait.</p></li><li><p>Call <code>dispatch_semaphore_signal</code> each time after we finished using the shared resource.</p></li></ul><h3 id="calling-dispatch-semaphore-wait-will-do-the-following" tabindex="-1"><a class="header-anchor" href="#calling-dispatch-semaphore-wait-will-do-the-following" aria-hidden="true">#</a> Calling <code>dispatch_semaphore_wait</code> will do the following:</h3><ul><li>Decrement semaphore counter by 1.</li><li>If the <strong>result value</strong> is less than zero, the thread is frozen.</li><li>If the <strong>result value</strong> is equal to or bigger than zero, the code will get executed without waiting.</li></ul><h3 id="calling-dispatch-semaphore-wait-will-do-the-following-1" tabindex="-1"><a class="header-anchor" href="#calling-dispatch-semaphore-wait-will-do-the-following-1" aria-hidden="true">#</a> Calling <code>dispatch_semaphore_wait</code> will do the following:</h3><ul><li>Increment semaphore counter by 1.</li><li>If the <strong>previous value</strong> was less than zero, this method wakes the oldest thread currently waiting in the thread queue.</li><li>If the <strong>previous value</strong> was euqal to or bigger than zero, it means the thread queue is empty, no one is waiting.</li></ul><h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3 id="use-semaphore-to-synchronize" tabindex="-1"><a class="header-anchor" href="#use-semaphore-to-synchronize" aria-hidden="true">#</a> Use semaphore to synchronize</h3><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)testSynchronize {
    NSURL *url = [NSURL URLWithString:@&quot;https://github.com/chenxi141017/blog&quot;];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    NSLog(@&quot;begin request. thread = %@&quot;, [NSThread currentThread]);
    [[session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSLog(@&quot;request success, thread = %@&quot;, [NSThread currentThread]);
        dispatch_semaphore_signal(semaphore);
    }] resume];
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    NSLog(@&quot;received response. thread = %@&quot;, [NSThread currentThread]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>The output:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>2019-05-19 08:55:38.260560+0800 testSem[61543:4914620] begin request. thread = &lt;NSThread: 0x60000105d3c0&gt;{number = 1, name = main}
2019-05-19 08:55:39.493776+0800 testSem[61543:4914676] request success, thread = &lt;NSThread: 0x600001028300&gt;{number = 5, name = (null)}
2019-05-19 08:55:39.494228+0800 testSem[61543:4914620] received response. thread = &lt;NSThread: 0x60000105d3c0&gt;{number = 1, name = main}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="use-semaphore-to-lock-unlock" tabindex="-1"><a class="header-anchor" href="#use-semaphore-to-lock-unlock" aria-hidden="true">#</a> Use semaphore to lock/unlock</h3><p>Declare the variables:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface ViewController ()
@property (nonatomic, strong) NSMutableArray *array;
@property (nonatomic, strong) dispatch_semaphore_t lock;
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="test-method-without-using-semaphore" tabindex="-1"><a class="header-anchor" href="#test-method-without-using-semaphore" aria-hidden="true">#</a> Test method without using semaphore:</h4><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)testLock {
    self.array = [NSMutableArray array];
    self.lock = dispatch_semaphore_create(1);
    for (NSInteger i = 0; i &lt; 5; i++) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            [self addContent:i];
        });
    }
}

- (void)addContent:(NSInteger)index {
    // dispatch_semaphore_wait(self.lock, DISPATCH_TIME_FOREVER);
    [self.array addObject:@(index)];
    NSLog(@&quot;array = %@&quot;, self.array);
    // dispatch_semaphore_signal(self.lock);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>The output:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>2019-05-19 08:57:47.899357+0800 testSem[61579:4916193] array = (
    0,
    1,
    2
)
2019-05-19 08:57:47.899362+0800 testSem[61579:4916194] array = (
    0,
    1,
    2
)
2019-05-19 08:57:47.899385+0800 testSem[61579:4916191] array = (
    0,
    1,
    2
)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="test-method-using-semaphore" tabindex="-1"><a class="header-anchor" href="#test-method-using-semaphore" aria-hidden="true">#</a> Test method using semaphore:</h4><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)testLock {
    self.array = [NSMutableArray array];
    self.lock = dispatch_semaphore_create(1);
    for (NSInteger i = 0; i &lt; 3; i++) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            [self addContent:i];
        });
    }
}

- (void)addContent:(NSInteger)index {
    dispatch_semaphore_wait(self.lock, DISPATCH_TIME_FOREVER);
    [self.array addObject:@(index)];
    NSLog(@&quot;array = %@&quot;, self.array);
    dispatch_semaphore_signal(self.lock);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>The output</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>2019-05-19 08:59:06.386425+0800 testSem[61606:4917387] array = (
    1
)
2019-05-19 08:59:06.386570+0800 testSem[61606:4917386] array = (
    1,
    0
)
2019-05-19 08:59:06.386696+0800 testSem[61606:4917388] array = (
    1,
    0,
    2
)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,29);function w(f,S){const n=r("ExternalLinkIcon");return i(),t(o,null,[h,a("p",null,[d,u,b,a("a",m,[g,l(n)]),_]),v],64)}var N=p(c,[["render",w]]);export{N as default};
