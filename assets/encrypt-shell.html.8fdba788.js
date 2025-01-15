import{d as e}from"./app.01142347.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const s={},n=e(`<h1 id="how-to-encrypt-our-shell-script" tabindex="-1"><a class="header-anchor" href="#how-to-encrypt-our-shell-script" aria-hidden="true">#</a> How to encrypt our shell script?</h1><p>In order to avoid leak our sensitive data, we should always encrypted our shell script in product environment.</p><p>The following is the simplest way to achieve it!</p><h2 id="encrypt" tabindex="-1"><a class="header-anchor" href="#encrypt" aria-hidden="true">#</a> Encrypt</h2><p>First make sure the script is an executable file.</p><p>Ues the following command to make the script to be a executable file:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">chmod</span> +rx <span class="token operator">&lt;</span>shell-script-path<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Second levelage the <code>gzexe</code> command to compress the shell:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>gzexe <span class="token operator">&lt;</span>shell-script-path<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>There will be generate a <code>&lt;shell-name&gt;~</code> format file as a backup once execute <code>gzexe</code> success.</p><h2 id="decrypt" tabindex="-1"><a class="header-anchor" href="#decrypt" aria-hidden="true">#</a> Decrypt</h2><p>To get the original shell, use the following command:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>gzexe -d <span class="token operator">&lt;</span>shell-script-path<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,13);function r(t,o){return n}var p=a(s,[["render",r]]);export{p as default};
