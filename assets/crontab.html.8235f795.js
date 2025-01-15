import{d as a}from"./app.01142347.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const n={},s=a(`<p align="right">2019-7-17</p><h4 id="crontab-\u6267\u884C\u5B9A\u65F6\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#crontab-\u6267\u884C\u5B9A\u65F6\u4EFB\u52A1" aria-hidden="true">#</a> crontab \u6267\u884C\u5B9A\u65F6\u4EFB\u52A1</h4><p>\u4F7F\u7528\u4E8EMac\u7535\u8111\u3002</p><h5 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token punctuation">[</span>-u user<span class="token punctuation">]</span> <span class="token function">file</span>
<span class="token function">crontab</span> <span class="token punctuation">[</span>-u user<span class="token punctuation">]</span> <span class="token punctuation">{</span> -l <span class="token operator">|</span> -r <span class="token operator">|</span> -e <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u53C2\u6570\u8BF4\u660E:</p><ul><li><code>-l</code> \u5217\u4E3E\u5F53\u524D\u7684\u5B9A\u65F6\u4EFB\u52A1</li><li><code>-r</code> \u5220\u9664\u5F53\u524D\u7684\u5B9A\u65F6\u4EFB\u52A1</li><li><code>-e</code> \u7F16\u8F91\u5B9A\u65F6\u4EFB\u52A1</li></ul><h5 id="crontab-\u6587\u4EF6\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#crontab-\u6587\u4EF6\u683C\u5F0F" aria-hidden="true">#</a> crontab \u6587\u4EF6\u683C\u5F0F</h5><ul><li>\u7B2C\u4E00\u5217\u5206\u949F 0 ~ 59</li><li>\u7B2C\u4E8C\u5217\u5C0F\u65F6 0 ~ 23 (0 \u8868\u793A\u5B50\u591C)</li><li>\u7B2C\u4E09\u5217\u65E5 1 ~ 31</li><li>\u7B2C\u56DB\u5217\u6708 1 ~ 12</li><li>\u7B2C\u4E94\u5217\u661F\u671F 0 ~ 7 (0\u548C7\u8868\u793A\u661F\u671F\u5929)</li><li>\u7B2C\u516D\u5217 \u9700\u8981\u6267\u884C\u7684\u547D\u4EE4</li></ul><h5 id="\u65F6\u95F4\u683C\u5F0F\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u65F6\u95F4\u683C\u5F0F\u8BF4\u660E" aria-hidden="true">#</a> \u65F6\u95F4\u683C\u5F0F\u8BF4\u660E</h5><ul><li><code>*</code> \u5728\u7B2C\u4E00\u5217\u8868\u793A\u6BCF\u5206\u949F\uFF0C \u5728\u7B2C\u4E8C\u5217\u8868\u793A\u6BCF\u5C0F\u65F6\uFF0C\u5176\u4ED6\u4F9D\u6B21\u7C7B\u63A8\uFF1B</li><li><code>a-b</code> \u5728\u7B2C\u4E00\u5217\u8868\u793A\u7B2Ca \u5230 b \u5206\u949F\uFF0C\u5728\u7B2C\u4E8C\u5217\u8868\u793A a \u5230 b \u5C0F\u65F6\uFF0C\u5176\u4ED6\u4F9D\u6B21\u7C7B\u63A8\uFF1B</li><li><code>*/n</code> \u5728\u7B2C\u4E00\u5217\u8868\u793A\u6BCFn\u5206\u949F\u6267\u884C\u4E00\u6B21\uFF0C \u5728\u7B2C\u4E8C\u5217\u8868\u793A\u6BCFn\u5C0F\u65F6\u6267\u884C\u4E00\u6B21\uFF0C\u5176\u4ED6\u4F9D\u6B21\u7C7B\u63A8\uFF1B</li><li><code>a, b, c</code> \u5728\u7B2C\u4E00\u5217\u65F6\uFF0C\u8868\u793A\u6BCF\u5728\u7B2C a\uFF0Cb\uFF0Cc\u5206\u949F\u6267\u884C\u4E00\u6B21\uFF0C\u5728\u7B2C\u4E8C\u5217\u8868\u793A\u6BCFa\uFF0C b\uFF0Cc\u5C0F\u65F6\u6267\u884C\u4E00\u6B21\uFF0C\u5176\u4ED6\u4F9D\u6B21\u7C7B\u63A8\uFF1B</li></ul><h5 id="\u4F7F\u7528\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u5B9E\u4F8B" aria-hidden="true">#</a> \u4F7F\u7528\u5B9E\u4F8B</h5><p>\u6BCF\u5206\u949F\u5B9A\u65F6\u6267\u884C <code>/User/peak/Desktop/test.sh</code> \u811A\u672C\u3002</p><ol><li><p><code>crontab -e</code> \u8FDB\u5165\u5B9A\u65F6\u4EFB\u52A1\u7F16\u8F91\u754C\u9762</p></li><li><p><code>* * * * * /bin/sh /User/peak/Desktop/test.sh</code></p></li></ol><h5 id="\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> \u6CE8\u610F\u4E8B\u9879</h5><ol><li>\u5F85\u6267\u884C\u7684\u811A\u672C\u5982\u679C\u9700\u8981\u5904\u7406\u8DEF\u5F84\u95EE\u9898\uFF0C\u9700\u8981\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u5224\u65AD\u5F53\u524D\u811A\u672C\u4F4D\u7F6E\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5982\u4E0B\u4EE3\u7801\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>dir=&quot;$(cd $(dirname \${BASH_SOURCE[0]});  pwd)&quot;
echo $dir
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u89E3\u91CA\u8BF4\u660E:</p><p><code>BASH_SOURCE[0]</code> \u7B49\u4EF7\u4E0E <code>BASH_SOURCE</code>, \u53D6\u5F97\u5F53\u524D\u6267\u884C\u7684 shell \u6587\u4EF6\u7684\u6587\u4EF6\u540D\u3002</p><p><code>dirname</code> \u53D6\u5F97\u5F53\u524D\u6267\u884C\u7684\u811A\u672C\u7684\u7236\u76EE\u5F55\u3002</p><p><code>cd $(dirname \${BASH_SOURCE[0]})</code> \u8FDB\u5165\u8FD9\u4E2A\u76EE\u5F55(\u5207\u6362\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55)\u3002</p><p><code>pwd</code> \u663E\u793A\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55( cd \u6267\u884C\u540E\u7684)</p><ol start="2"><li>\u6267\u884C\u540E\uFF0C\u7CFB\u7EDF\u4F1A\u5BC4\u4E00\u5C01\u4FE1\u7ED9\u4F60\uFF0C\u663E\u793A\u8BE5\u7A0B\u5E8F\u6267\u884C\u7684\u5185\u5BB9\u3002</li></ol>`,23);function c(i,o){return s}var r=e(n,[["render",c]]);export{r as default};
