import{d as e}from"./app.01142347.js";import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";var o="/blog/assets/1.c2a1da0e.png",s="/blog/assets/2.4eda82e4.png",i="/blog/assets/3.ff98bf9c.png";const r={},a=e('<h1 id="how-to-test-static-framework-in-ios" tabindex="-1"><a class="header-anchor" href="#how-to-test-static-framework-in-ios" aria-hidden="true">#</a> How to test static framework in iOS?</h1><p>My <strong>static framework</strong> provide a function which will access key chain inside the method, when I write a unit test method, it return <code>errSecMissingEntitlement</code> error code.</p><p><img src="'+o+`" alt="1"></p><p>The definition of <code>errSecMissingEntitlement</code> was in the <code>&lt;Security/SecBase.h&gt;</code> framework as following:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>errSecMissingEntitlement                 = -34018,    /* A required entitlement isn&#39;t present. */
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="how-to-solve-this-peoplem" tabindex="-1"><a class="header-anchor" href="#how-to-solve-this-peoplem" aria-hidden="true">#</a> How to solve this peoplem?</h2><ol><li>In your framework project add a new target (select <code>App</code> template) as the host app.</li></ol><p><img src="`+s+'" alt="2"></p><ol start="2"><li>In you unit test target, <code>General</code> -&gt; <code>Testing</code> select the host app.</li></ol><p><img src="'+i+'" alt="3"></p>',10);function n(c,d){return a}var h=t(r,[["render",n]]);export{h as default};
