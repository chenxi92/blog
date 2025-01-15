import{r as l,o as i,c,a as n,e as a,F as t,d as r,b as e}from"./app.01142347.js";import{_ as p}from"./plugin-vue_export-helper.21dcd24c.js";const d={},b=r(`<h3 id="\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF" aria-hidden="true">#</a> \u53D8\u91CF</h3><p align="right">2019-1-5</p><p>\u5728<code>JavaScript</code>\u4E2D\uFF0C\u4F7F\u7528<code>let</code>\uFF0C<code>const</code>\uFF0C<code>var</code>\u6765\u58F0\u660E\u53D8\u91CF\u3002<code>let</code>\u548C<code>var</code>\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u6BD4\u8F83\u76F8\u4F3C\uFF0C\u4F46\u662F\u4F7F\u7528<code>let</code>\u53EF\u4EE5\u907F\u514D\u4E00\u4E9B\u5E38\u89C1\u7684\u9677\u9631. <code>const</code> \u58F0\u660E\u7684\u53D8\u91CF\u65E0\u6CD5\u5BF9\u5176\u8FDB\u884C\u91CD\u65B0\u8D4B\u503C\u3002</p><p><code>TypeScript</code>\u4F5C\u4E3A<code>JavaScript</code>\u7684\u8D85\u96C6\uFF0C\u4E5F\u652F\u6301\u4E5F\u4E0A\u51E0\u79CD\u53D8\u91CF\u7684\u58F0\u660E\u65B9\u5F0F\u3002</p><h4 id="var\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#var\u58F0\u660E" aria-hidden="true">#</a> var\u58F0\u660E</h4><p>\u4F7F\u7528<code>var</code>\u5173\u952E\u5B57\u6765\u58F0\u660E\u53D8\u91CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>var a = 10;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u5728\u4E00\u4E2A\u51FD\u6570\u5185\u90E8\u58F0\u660E\u53D8\u91CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f() {
    var message = &quot;Hello, world!&quot;;

    return message;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u5728\u5176\u4ED6\u51FD\u6570\u4E2D\u65B9\u6CD5\u76F8\u540C\u7684\u53D8\u91CF.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

var g = f();
g(); // returns &#39;11&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\u51FD\u6570<code>g</code>\u6355\u83B7\u4E86\u58F0\u660E\u5728f\u51FD\u6570\u4E2D\u7684\u53D8\u91CF<code>a</code>\uFF0C \u5F53<code>g</code>\u51FD\u6570\u88AB\u8C03\u7528\u7684\u65F6\u5019\uFF0C\u5185\u90E8\u7684a\u7684\u503C\u4E0E\u5728f\u51FD\u6570\u4E2D\u7684\u53D8\u91CF<code>a</code>\u7684\u503C\u76F8\u5173\u8054\u3002 \u5C3D\u7BA1<code>g</code>\u8C03\u7528\u7684\u65F6\u5019\u51FD\u6570f\u5DF2\u7ECF\u6267\u884C\u5B8C\u4E86\uFF0C\u8FD8\u662F\u80FD\u591F\u5BF9\u53D8\u91CF<code>a</code>\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u3002</p><p>\u5982\u4E0B\u793A\u4F8B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

f(); // returns &#39;2&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h5 id="\u4F5C\u7528\u57DF\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u4F5C\u7528\u57DF\u89C4\u5219" aria-hidden="true">#</a> \u4F5C\u7528\u57DF\u89C4\u5219</h5><p>\u76F8\u5BF9\u4E8E\u5176\u4ED6\u8BED\u8A00\uFF0C<code>JavaScript</code>\u4E2D<code>var</code>\u58F0\u660E\u7684\u53D8\u91CF\u6709\u4E00\u4E9B\u5947\u602A\u7684\u4F5C\u7528\u57DF\u89C4\u5219\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns &#39;10&#39;
f(false); // returns &#39;undefined&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u53D8\u91CF<code>x</code>\u58F0\u660E\u5728<code>if</code>\u8BED\u53E5\u5185\uFF0C\u4F46\u662F\u6211\u4EEC\u80FD\u591F\u5728<code>if</code>\u8BED\u53E5\u4E4B\u5916\u8BBF\u95EE\u5B83\u3002\u8FD9\u662F\u56E0\u4E3A<code>var</code>\u58F0\u660E\u7684\u53D8\u91CF\u53EF\u4EE5\u5728\u5B83\u6240\u5728\u7684\u51FD\u6570\uFF0C\u6A21\u5757\uFF0C\u547D\u540D\u7A7A\u95F4\u6216\u5168\u5C40\u8303\u56F4\u5185\u7684\u4EFB\u4F55\u5730\u65B9\u8BBF\u95EE\u3002</p><p>\u8FD9\u79CD\u4F5C\u7528\u57DF\u89C4\u5219\u53EF\u80FD\u4F1A\u5BFC\u81F4\u591A\u79CD\u7C7B\u578B\u7684\u9519\u8BEF\uFF0C\u5176\u4E2D\u4E00\u4E2A\u95EE\u9898\u662F<strong>\u591A\u6B21\u58F0\u660E\u540C\u4E00\u4E2A\u53D8\u91CF\u5E76\u4E0D\u629B\u51FA\u9519\u8BEF\u63D0\u793A</strong>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i &lt; matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i &lt; currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u5F88\u5BB9\u6613\u53D1\u73B0\u9519\u8BEF\uFF0C \u5185\u90E8\u7684<code>for</code>\u5FAA\u73AF\u58F0\u660E\u7684\u53D8\u91CF<code>i</code>\u4F1A\u8986\u76D6\u5916\u90E8\u7684<code>for</code>\u5FAA\u73AF\u58F0\u660E\u7684\u53D8\u91CF<code>i</code>\uFF0C\u4ED6\u4EEC\u5F15\u7528\u4E86\u540C\u4E00\u4E2A\u53D8\u91CF\u3002</p><h5 id="\u53D8\u91CF\u6355\u83B7\u7684\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u6355\u83B7\u7684\u6A21\u5F0F" aria-hidden="true">#</a> \u53D8\u91CF\u6355\u83B7\u7684\u6A21\u5F0F</h5><p>\u770B\u4E00\u4E0B\u5982\u4E0B\u7684\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for (var i = 0; i &lt; 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i); // setTimeout \u5EF6\u65F6\u6267\u884C\u51FD\u6570
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5B9E\u9645\u8F93\u51FA\u7ED3\u679C\u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>10
10
10
10
10
10
10
10
10
10
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u8BB8\u591A<code>JavaScript</code>\u5F00\u53D1\u4EBA\u5458\u90FD\u975E\u5E38\u719F\u6089\u8FD9\u79CD\u884C\u4E3A, \u4F46\u662F\u5BF9\u5F88\u591A\u65B0\u624B\u6765\u4E66\uFF0C\u671F\u5F85\u7684\u8F93\u51FA\u5982\u4E0B:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>0
1
2
3
4
5
6
7
8
9
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u4EA7\u751F\u9519\u8BEF\u7684\u539F\u56E0\u662F\u6211\u4EEC\u4F20\u9012\u7ED9<code>setTimeout</code>\u51FD\u6570\u7684\u53C2\u6570\u5B9E\u9645\u4E0A\u5F15\u7528\u7684\u540C\u4E00\u4E2A\u503C. <code>setTimeout</code>\u51FD\u6570\u5C06\u4F1A\u5728\u5EF6\u8FDF\u4E00\u6BB5\u65F6\u95F4\u4E4B\u540E\u6267\u884C\uFF0C\u8FD9\u65F6\u5019<code>for</code>\u5FAA\u73AF\u5DF2\u7ECF\u6267\u884C\u5B8C\u6BD5\uFF0C<code>i</code>\u7684\u503C\u662F10\uFF0C\u6240\u4EE5\u6BCF\u6B21\u8F93\u51FA\u90FD\u662F10.</p><p>\u5E38\u89C1\u7684\u89E3\u51B3\u529E\u6CD5\u662F\uFF1A \u6BCF\u6B21\u5FAA\u73AF\u90FD\u6355\u83B7\u4E00\u4E0B\u53D8\u91CFi:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for (var i = 0; i &lt; 10; i++) {
    // capture the current state of &#39;i&#39;
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="let-\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#let-\u58F0\u660E" aria-hidden="true">#</a> let \u58F0\u660E</h4><p>\u9664\u4E86\u5173\u952E\u5B57\u4E4B\u5916\u4F7F\u7528<code>let</code>\u58F0\u660E\u53D8\u91CF\u8DDF\u4F7F\u7528<code>var</code>\u58F0\u660E\u53D8\u91CF\u7684\u65B9\u5F0F\u6CA1\u4EC0\u4E48\u4E0D\u540C\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let hello = &quot;Hello!&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="\u5757\u4F5C\u7528\u57DF" tabindex="-1"><a class="header-anchor" href="#\u5757\u4F5C\u7528\u57DF" aria-hidden="true">#</a> \u5757\u4F5C\u7528\u57DF</h5><p>\u4E0E\u4F7F\u7528<code>var</code>\u58F0\u660E\u7684\u53D8\u91CF\uFF08\u5176\u8303\u56F4\u6CC4\u6F0F\u5230\u5176\u5305\u542B\u7684\u51FD\u6570\uFF09\u4E0D\u540C\uFF0C\u4F7F\u7528<code>let</code>\u58F0\u660E\u7684\u53D8\u91CF\u5728\u5757\u4F5C\u7528\u57DF\u4E4B\u5916\u65E0\u6CD5\u8BBF\u95EE\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference &#39;a&#39;
        let b = a + 1;
        return b;
    }

    // Error: &#39;b&#39; doesn&#39;t exist here
    return b;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u6709\u4E24\u4E2A\u672C\u5730\u53D8\u91CF<code>a</code>\u548C<code>b</code>\uFF0C <code>a</code>\u7684\u4F5C\u7528\u8303\u56F4\u9650\u5236\u5728\u4E86\u51FD\u6570<code>f</code>\u5185\uFF0C <code>b</code>\u7684\u4F5C\u7528\u8303\u56F4\u9650\u5236\u5728\u4E86<code>if</code>\u8BED\u53E5\u5185\u3002</p><p>\u53D8\u91CF\u58F0\u660E\u5728catch\u8BED\u53E5\u4E2D\u6709\u540C\u6837\u7684\u4F5C\u7528\u57DF\u89C4\u5219\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>try {
    throw &quot;oh no!&quot;;
}
catch (e) {
    console.log(&quot;Oh well.&quot;);
}

// Error: &#39;e&#39; doesn&#39;t exist here
console.log(e);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>\u53D8\u91CF\u5728\u58F0\u660E\u4E4B\u524D\u7981\u6B62\u4F7F\u7528:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>a++; // illegal to use &#39;a&#39; before it&#39;s declared;
let a;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="\u91CD\u590D\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#\u91CD\u590D\u58F0\u660E" aria-hidden="true">#</a> \u91CD\u590D\u58F0\u660E</h5><p>\u4F7F\u7528<code>var</code>\u53EF\u4EE5\u58F0\u660E\u4E00\u4E2A\u53D8\u91CF\u591A\u6B21\uFF0C \u4F7F\u7528<code>let</code>\u7981\u6B62\u58F0\u660E\u540C\u4E00\u4E2A\u53D8\u91CF\u591A\u6B21\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let x = 10;
let x = 20; // error: can&#39;t re-declare &#39;x&#39; in the same scope
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="\u53D8\u91CF\u6355\u83B7" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u6355\u83B7" aria-hidden="true">#</a> \u53D8\u91CF\u6355\u83B7</h5><p>\u6BCF\u6B21\u5728\u4E00\u4E2A\u4F5C\u7528\u57DF\u8303\u56F4\u5185\u8FD0\u884C\u65F6\uFF0C\u5B83\u90FD\u4F1A\u521B\u5EFA\u4E00\u4E2A\u53D8\u91CF\u7684\u201C\u73AF\u5883\u201D\u3002 \u5373\u4F7F\u5728\u5176\u8303\u56F4\u5185\u7684\u6240\u6709\u5185\u5BB9\u90FD\u5DF2\u5B8C\u6210\u6267\u884C\u540E\uFF0C\u8BE5\u73AF\u5883\u53CA\u5176\u6355\u83B7\u7684\u53D8\u91CF\u4E5F\u53EF\u4EE5\u5B58\u5728\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = &quot;Seattle&quot;;
        getCity = function() {
            return city;
        }
    }

    return getCity();
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for (let i = 0; i &lt; 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>0
1
2
3
4
5
6
7
8
9
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="const-\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#const-\u58F0\u660E" aria-hidden="true">#</a> const \u58F0\u660E</h4><p>const\u58F0\u660E\u7684\u53D8\u91CF\u65E0\u6CD5\u5BF9\u5176\u91CD\u65B0\u8D4B\u503C\u3002</p><h4 id="\u89E3\u6784" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6784" aria-hidden="true">#</a> \u89E3\u6784</h4><p>ECMAScript 2015 \u7684\u4E00\u4E2A\u65B0\u7279\u6027\u4E4B\u4E00\u5C31\u662F\u89E3\u6784\u3002</p><h5 id="\u6570\u7EC4\u89E3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6570\u7EC4\u89E3\u6784" aria-hidden="true">#</a> \u6570\u7EC4\u89E3\u6784</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u521B\u5EFA\u4E86\u4E24\u4E2A\u65B0\u7684\u53D8\u91CFfirst\u548Cname\u5E76\u5BF9\u4ED6\u4EEC\u91CD\u65B0\u8D4B\u503C\uFF0C \u8FD9\u6BD4\u4F7F\u7528\u4E0B\u6807\u8D4B\u503C\u66F4\u52A0\u65B9\u4FBF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>first = input[0];
second = input[1];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u89E3\u6784\u5BF9\u4E8E\u5DF2\u7ECF\u58F0\u660E\u8FC7\u7684\u53D8\u91CF\u6765\u8BF4\u540C\u6837\u9002\u7528\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u53D8\u91CF\u4EA4\u6362
[first, second] = [second, first];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u5BF9\u4E8E\u6570\u7EC4\u4E2D\u5269\u4E0B\u7684\u5143\u7D20\u53EF\u4EE5\u4F7F\u7528<code>...</code>\u8BED\u6CD5\u6765\u8868\u793A:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u53EF\u4EE5\u5FFD\u7565\u4E0D\u5173\u5FC3\u7684\u5143\u7D20:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1

let [, second, , fourth] = [1, 2, 3, 4];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h5 id="object-\u89E3\u6784" tabindex="-1"><a class="header-anchor" href="#object-\u89E3\u6784" aria-hidden="true">#</a> Object \u89E3\u6784</h5><p>\u521B\u5EFA\u53D8\u91CFa\u3001b\uFF0C\u4F7F\u7528o.a \u548C o.b\u5206\u522B\u5BF9\u4ED6\u4EEC\u8FDB\u884C\u8D4B\u503C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let o = {
    a: &quot;foo&quot;,
    b: 12,
    c: &quot;bar&quot;
};
let { a, b } = o;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>\u5C5E\u6027\u91CD\u547D\u540D</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let { a: newName1, b: newName2 } = o;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u7B49\u4EF7\u4E8E:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let newName1 = o.a;
let newName2 = o.b;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>\u5206\u53F7\u5728\u8FD9\u91CC\u4E0D\u8981\u662F\u53D8\u91CF\u7C7B\u578B</strong></p><h4 id="spread-\u6269\u5C55" tabindex="-1"><a class="header-anchor" href="#spread-\u6269\u5C55" aria-hidden="true">#</a> Spread(\u6269\u5C55)</h4><p>\u8DDF\u89E3\u6784\u662F\u76F8\u53CD\u7684\u64CD\u4F5C\u3002\u5B83\u80FD\u591F\u5C06\u6570\u7EC4\u6269\u5C55\u5230\u53E6\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6216\u5C06\u5BF9\u8C61\u6269\u5C55\u5230\u53E6\u4E00\u4E2A\u5BF9\u8C61\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]; // [0, 1, 2, 3, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,76),u=n("strong",null,"\u6269\u5C55Object",-1),o=e(": (\u53EA\u80FD\u6269\u5C55"),m={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties",target:"_blank",rel:"noopener noreferrer"},g=e("\u81EA\u5DF1\u7684\u53EF\u679A\u4E3E\u5C5E\u6027"),v=e("\uFF0C\u65E0\u6CD5\u5BF9\u51FD\u6570\u8FDB\u884C\u6269\u5C55)"),h=r(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>let defaults = { food: &quot;spicy&quot;, price: &quot;$$&quot;, ambiance: &quot;noisy&quot; };
let search = { ...defaults, food: &quot;rich&quot; }; // { food: &quot;rich&quot;, price: &quot;$$&quot;, ambiance: &quot;noisy&quot; }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h4>`,2),x={href:"https://www.typescriptlang.org/docs/handbook/variable-declarations.html",target:"_blank",rel:"noopener noreferrer"},f=e("variable-declarations");function _(q,w){const s=l("ExternalLinkIcon");return i(),c(t,null,[b,n("p",null,[u,o,n("a",m,[g,a(s)]),v]),h,n("p",null,[n("a",x,[f,a(s)])])],64)}var k=p(d,[["render",_]]);export{k as default};
