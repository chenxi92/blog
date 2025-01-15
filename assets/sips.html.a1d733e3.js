import{d as e}from"./app.01142347.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const s={},a=e(`<ol><li>\u83B7\u53D6\u6240\u6709\u56FE\u7247\u4FE1\u606F</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sips -g all &lt;image-path&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u4F8B\u5982</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u279C  sips sips -g all icon-1024.png
/Users/chenxi/Desktop/sips/icon-1024.png
  pixelWidth: 1024
  pixelHeight: 1024
  typeIdentifier: public.png
  format: png
  formatOptions: default
  dpiWidth: 72.000
  dpiHeight: 72.000
  samplesPerPixel: 3
  bitsPerSample: 8
  hasAlpha: no
  space: RGB
  profile: sRGB IEC61966-2.1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="2"><li>\u65CB\u8F6C\u56FE\u7247</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sips --out output.png -r 90 icon-1024.png 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>icon-1024.png</code> \u987A\u65F6\u9488\u65CB\u8F6C90, \u56FE\u7247\u8F93\u51FA\u4E3A <code>output.png</code> \uFF0C \u9ED8\u8BA4\u60C5\u51B5\u4E0B <code>sips</code> \u5728\u539F\u56FE\u4E0A\u64CD\u4F5C\u3002</p><ol start="3"><li>\u6307\u5B9A\u5BBD\u9AD8</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sips -out output.png -z 512 512 icon-1024.png
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>icon-1024.png</code> \u56FE\u7247\u7684\u5BBD\u9AD8\u6307\u5B9A\u4E3A 512 .</p>`,10);function i(l,p){return a}var c=n(s,[["render",i]]);export{c as default};
