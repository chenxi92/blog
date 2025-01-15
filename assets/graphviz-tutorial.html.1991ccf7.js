import{r,o as t,c as o,a as e,e as s,F as l,b as a,d as i}from"./app.01142347.js";import{_ as p}from"./plugin-vue_export-helper.21dcd24c.js";var d="/blog/assets/test1.9700df5c.png",c="/blog/assets/test2.24c581af.png",u="/blog/assets/test3.d8e5f28d.png";const b={},h=e("h1",{id:"graphviz",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#graphviz","aria-hidden":"true"},"#"),a(" Graphviz")],-1),g=e("p",null,"Graphviz is a open source graph visualization software. Graph visualization is a way of representing structural information as diagrams.",-1),m=e("h2",{id:"install",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#install","aria-hidden":"true"},"#"),a(" Install")],-1),f=e("p",null,"Install executable packages, use the following commands:",-1),_=e("blockquote",null,[e("p",null,"brew install graphviz")],-1),x=a("Install source code "),v={href:"https://graphviz.org/download/source/",target:"_blank",rel:"noopener noreferrer"},q=a("click here"),w=a("."),k=i(`<h2 id="basic-rules" tabindex="-1"><a class="header-anchor" href="#basic-rules" aria-hidden="true">#</a> Basic Rules</h2><p>Some basic rules about DOT Language:</p><ul><li><p>Literal characters are given in single quotes.</p></li><li><p>Parenthese <code>(</code> and <code>)</code> indicate grouping when needed.</p></li><li><p>Square brackets <code>[</code> and <code>]</code> enclose optional items.</p></li><li><p>Vertical bars <code>|</code> separate alternatives.</p></li><li><p><code>//</code> or <code>/***/</code> as comments.</p></li><li><p>Semicolons <code>;</code> and commas <code>,</code> aid readability but are not required.</p></li><li><p>Use attributes to customize the layout of <code>node</code> , <code>edge</code>, <code>graph</code>, etc.</p></li></ul><h2 id="keywords" tabindex="-1"><a class="header-anchor" href="#keywords" aria-hidden="true">#</a> Keywords</h2><h3 id="graph" tabindex="-1"><a class="header-anchor" href="#graph" aria-hidden="true">#</a> graph</h3><p>Generate undirected graphs and pecify an edge using the edge operator <code>-</code> .</p><h3 id="digraph" tabindex="-1"><a class="header-anchor" href="#digraph" aria-hidden="true">#</a> digraph</h3><p>Generate directed graphs and specify an edge using the edge operator <code>-&gt;</code> .</p><h3 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> node</h3><p>A node is a point that contains some infomation about a graph.</p><h3 id="edge" tabindex="-1"><a class="header-anchor" href="#edge" aria-hidden="true">#</a> edge</h3><p>A shape connecte multiple nodes.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><h3 id="digraph-example" tabindex="-1"><a class="header-anchor" href="#digraph-example" aria-hidden="true">#</a> Digraph example</h3><p>Create a file name it as <code>test1.dot</code> and paste the following code into it.</p><div class="language-visual ext-visual line-numbers-mode"><pre class="language-visual"><code>digraph test_node_id {
     a -&gt; b -&gt; c;
     a -&gt; {x y};
     
     // set attribute about node b
     b [shape=box]
     
     // set attribute about node c
     c [label=&quot;hello\\nworld&quot; color=blue fontsize=24,
          fontname=&quot;Palatino-Italic&quot;,fontcolor=red,style=filled];
     
     /** set edge attribute between node a and z*/
     a -&gt; z [label=&quot;Hi&quot;, weight=100];
     x -&gt; z [label=&quot;multi-line\\nlabel&quot;];
     
     // set edge attribute betwween node b and x
     edge [style=dashed,color=red, arrowtail=odot,dir=both];
     // override the edge attribute between node b and x
     b -&gt; x [color=cadetblue1];
     
     // set constraints between node b and x
     {rank=same; b x}
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>Run the following command to generate a png command:</p><blockquote><p>dot -Tpng test1.dot -o test1.png</p></blockquote><p>The output as the following:</p><p><img src="`+d+`" alt="test-1"></p><h3 id="graph-example" tabindex="-1"><a class="header-anchor" href="#graph-example" aria-hidden="true">#</a> Graph example</h3><p>Create a file name it as <code>test2.dot</code> and paste the following code into it.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>graph test123 {
     a -- b -- c;
     a -- {x y};
     x -- c [w=10.0];
     x -- y [w=5.0,len=3];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Run the following command to generate a png command:</p><blockquote><p>dot -Tpng test2.dot -o test2.png</p></blockquote><p>The output as the following:</p><p><img src="`+c+`" alt="test-2"></p><h3 id="subgraph-example" tabindex="-1"><a class="header-anchor" href="#subgraph-example" aria-hidden="true">#</a> Subgraph example</h3><p>Create a file name it as <code>test3.dot</code> and paste the following code into it.</p><div class="language-visual ext-visual line-numbers-mode"><pre class="language-visual"><code>digraph {
  bgcolor=&quot;lightblue&quot;
  label=&quot;Home&quot;
  subgraph cluster_ground_floor {
    bgcolor=&quot;lightgreen&quot;
    label=&quot;Ground Floor&quot;
    Lounge -&gt; Kitchen
    // Set the shape about the Kitchen node
    Kitchen [shape=signature]
  }
  subgraph cluster_top_floor {
    bgcolor=&quot;lightyellow&quot;
    label=&quot;Top Floor&quot;
    Bedroom
    Bathroom
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Run the following command to generate a png command:</p><blockquote><p>dot -Tpng test3.dot -o test3.png</p></blockquote><p>The output as the following:</p><p><img src="`+u+'" alt="test-3"></p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>',35),z={href:"https://graphviz.org/",target:"_blank",rel:"noopener noreferrer"},y=a("Graphviz");function T(G,B){const n=r("ExternalLinkIcon");return t(),o(l,null,[h,g,m,f,_,e("p",null,[x,e("a",v,[q,s(n)]),w]),k,e("p",null,[e("a",z,[y,s(n)])])],64)}var L=p(b,[["render",T]]);export{L as default};
