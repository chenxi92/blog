import{d as e}from"./app.01142347.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const n={},s=e(`<h4 id="typescript\u548Clua\u6392\u5E8F\u7B97\u6CD5\u6BD4\u8F83" tabindex="-1"><a class="header-anchor" href="#typescript\u548Clua\u6392\u5E8F\u7B97\u6CD5\u6BD4\u8F83" aria-hidden="true">#</a> <strong>TypeScript</strong>\u548C<strong>Lua</strong>\u6392\u5E8F\u7B97\u6CD5\u6BD4\u8F83</h4><h6 id="_1-1-javascript-sort" tabindex="-1"><a class="header-anchor" href="#_1-1-javascript-sort" aria-hidden="true">#</a> 1.1 <code>javaScript sort</code></h6><p><strong>\u9ED8\u8BA4\u6309\u7167\u5B57\u7B26\u7F16\u7801\u7684\u987A\u5E8F\u8FDB\u884C\u6392\u5E8F</strong></p><p><strong>\u5347\u5E8F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
array.sort(function(a, b) {
    return a - b;
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>\u964D\u5E8F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>array.sort(function(a, b) {
    return b - a;
})
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h6 id="_1-2-lua-sort" tabindex="-1"><a class="header-anchor" href="#_1-2-lua-sort" aria-hidden="true">#</a> 1.2 <code>lua sort</code></h6><p><strong>\u9ED8\u8BA4\u4EE5\u5C0F\u4E8E\u8FDB\u884C\u6392\u5E8F</strong></p><p><strong>\u5347\u5E8F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>table.sort((a, b){
    return a &lt; b;
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>\u964D\u5E8F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>table.sort((a, b){
    return a &gt; b;
});
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,13);function r(t,i){return s}var d=a(n,[["render",r]]);export{d as default};
