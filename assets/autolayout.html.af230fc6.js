import{r as e,o as r,c as i,a as n,e as t,F as l,b as a,d as o}from"./app.01142347.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";var u="/blog/assets/autolayout.2aecd62a.png",p="/blog/assets/autolayout-demo1.a589219d.png";const c={},m=n("h4",{id:"\u6765\u5386",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6765\u5386","aria-hidden":"true"},"#"),a(" \u6765\u5386")],-1),d=a("Auto Layout \u662F\u82F9\u679C\u7684\u5E03\u5C40\u5F15\u64CE\u3002 \u91C7\u7528\u4E86 "),h={href:"http://constraints.cs.washington.edu/solvers/uist97.html",target:"_blank",rel:"noopener noreferrer"},y=a("Cassowary constraint-solving"),w=a(" \u7B97\u6CD5\u6765\u7EA6\u675F\u754C\u9762\u7684\u5E03\u5C40\u3002"),S=o('<h4 id="\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u539F\u7406" aria-hidden="true">#</a> \u539F\u7406</h4><p><img src="'+u+`" alt="AutoLayout"></p><p>\u4E0A\u56FE\u8868\u793A\uFF1A</p><blockquote><p>\u7EA2\u8272View\u7684\u524D\u9762 = 1.0 * \u84DD\u8272View\u7684\u540E\u9762 + 8</p></blockquote><p>\u4E00\u4E2A\u7EA6\u675F\u7684\u4E00\u822C\u7684\u7EBF\u6027\u65B9\u7A0B\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>firstItem.firstAttribute {==,&lt;=,&gt;=} secondItem.secondAttribute * multiplier + constant
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>==,&lt;=,&gt;=</code> : \u8868\u793A\u7EA6\u675F\u5173\u7CFB, \u4E00\u822C\u76F8\u540C\u7C7B\u578B\u624D\u80FD\u505A\u7EA6\u675F</p><p><code>multiplier</code> : \u8868\u793A\u500D\u6570\u5173\u7CFB\uFF0C\u4E00\u822C\u7528\u4E8E\u5C3A\u5BF8</p><p><code>constant</code> : \u8868\u793A\u5E38\u6570</p><p><code>firstAttribute/secondAttribute</code> : \u4E3A\u89C6\u56FE\u7684\u5E03\u5C40\u5C5E\u6027</p><p>\u5E38\u89C1\u5E03\u5C40\u5C5E\u6027\u5B9A\u4E49\u5982\u4E0B:</p><table><thead><tr><th>\u5E03\u5C40\u5C5E\u6027</th><th>\u8868\u793A\u610F\u4E49</th></tr></thead><tbody><tr><td>NSLayoutAttributeWidth\u3001NSLayoutAttributeHeigh</td><td>\u8868\u793A\u89C6\u56FE\u7684\u5C3A\u5BF8\uFF1A\u5BBD\u3001\u9AD8</td></tr><tr><td>NSLayoutAttributeLeft\u3001NSLayoutAttributeRight</td><td>\u8868\u793A\u89C6\u56FE\u7684X\u8F74\u65B9\u5411\u7684\u4F4D\u7F6E\uFF1A\u5DE6\u3001\u53F3</td></tr><tr><td>NSLayoutAttributeLeading\u3001NSLayoutAttributeTrailing</td><td>\u8868\u793A\u89C6\u56FE\u7684X\u8F74\u65B9\u5411\u7684\u4F4D\u7F6E\uFF1A\u524D\u3001\u540E</td></tr><tr><td>NSLayoutAttributeTop\u3001 NSLayoutAttributeBottom</td><td>\u8868\u793A\u89C6\u56FEY\u8F74\u65B9\u5411\u7684\u4F4D\u7F6E\uFF1A\u9876\u3001\u5E95</td></tr><tr><td>NSLayoutAttributeBaseline</td><td>\u8868\u793A\u89C6\u56FEY\u8F74\u65B9\u5411\u7684\u4F4D\u7F6E\uFF1A\u5E95\u90E8\u57FA\u51C6\u7EBF</td></tr><tr><td>NSLayoutAttributeCenterX\u3001NSLayoutAttributeCenterY</td><td>\u8868\u793A\u89C6\u56FE\u7684\u4E2D\u5FC3\u70B9\uFF1A\u89C6\u56FE\u5728X\u8F74\u7684\u4E2D\u5FC3\u70B9\u3001\u89C6\u56FE\u5728Y\u8F74\u7684\u4E2D\u5FC3\u70B9</td></tr></tbody></table><h4 id="\u4EE3\u7801\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u793A\u4F8B" aria-hidden="true">#</a> \u4EE3\u7801\u793A\u4F8B</h4><h5 id="nslayoutconstraint" tabindex="-1"><a class="header-anchor" href="#nslayoutconstraint" aria-hidden="true">#</a> NSLayoutConstraint</h5><p>\u521B\u5EFA\u5982\u4E0B\u89C6\u56FE\u7684\u4EE3\u7801:</p><p><img src="`+p+`" alt="AutoLayout-demo1"></p><p>\u5176\u4E2D\u7EFF\u8272\u89C6\u56FE\u8DDD\u79BB\u8FB9\u8DDD20\uFF0C \u84DD\u8272\u548C\u7EA2\u8272\u65B9\u5757\u6C34\u5E73\u6392\u5217\uFF0C \u7EA2\u8272\u548C\u7D2B\u8272\u65B9\u5757\u5782\u76F4\u6392\u5217\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)configUI {
    UIView *superView = self.view;
    
    UIView *view1 = [[UIView alloc] init];
    view1.translatesAutoresizingMaskIntoConstraints = NO;
    view1.backgroundColor = [UIColor greenColor];
    [superView addSubview:view1];
    
    UIEdgeInsets padding = UIEdgeInsetsMake(20, 20, -20, -20);
    NSLayoutConstraint *top = [NSLayoutConstraint constraintWithItem:view1
                                                           attribute:NSLayoutAttributeTop
                                                           relatedBy:NSLayoutRelationEqual
                                                              toItem:superView
                                                           attribute:NSLayoutAttributeTop
                                                          multiplier:1.0
                                                            constant:padding.top];
    NSLayoutConstraint *left = [NSLayoutConstraint constraintWithItem:view1
                                                            attribute:NSLayoutAttributeLeft
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:superView
                                                            attribute:NSLayoutAttributeLeft
                                                           multiplier:1.0
                                                             constant:padding.left];
    NSLayoutConstraint *bottom = [NSLayoutConstraint constraintWithItem:view1
                                                              attribute:NSLayoutAttributeBottom
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:superView
                                                              attribute:NSLayoutAttributeBottom
                                                             multiplier:1.0
                                                               constant:padding.bottom];
    NSLayoutConstraint *right = [NSLayoutConstraint constraintWithItem:view1
                                                             attribute:NSLayoutAttributeRight
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:superView
                                                             attribute:NSLayoutAttributeRight
                                                            multiplier:1.0
                                                              constant:padding.right];
    [superView addConstraints:@[top, left, bottom, right]];
    
    // view2 is topleft in view1
    UIView *view2 = [[UIView alloc] init];
    view2.translatesAutoresizingMaskIntoConstraints = NO;
    view2.backgroundColor = [UIColor blueColor];
    [view1 addSubview:view2];
    
    NSLayoutConstraint *top2 = [NSLayoutConstraint constraintWithItem:view2
                                                            attribute:NSLayoutAttributeTop
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:view1
                                                            attribute:NSLayoutAttributeTop
                                                           multiplier:1.0 constant:20];
    NSLayoutConstraint *left2 = [NSLayoutConstraint constraintWithItem:view2
                                                             attribute:NSLayoutAttributeLeft
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view1
                                                             attribute:NSLayoutAttributeLeft
                                                            multiplier:1.0
                                                              constant:20];
    NSLayoutConstraint *width2 = [NSLayoutConstraint constraintWithItem:view2
                                                              attribute:NSLayoutAttributeWidth
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:nil
                                                              attribute:NSLayoutAttributeNotAnAttribute
                                                             multiplier:1.0
                                                               constant:100];
    NSLayoutConstraint *height2 = [NSLayoutConstraint constraintWithItem:view2
                                                               attribute:NSLayoutAttributeHeight
                                                               relatedBy:NSLayoutRelationEqual
                                                                  toItem:nil
                                                               attribute:NSLayoutAttributeNotAnAttribute
                                                              multiplier:1.0
                                                                constant:100];
    [view1 addConstraints:@[top2, left2, width2, height2]];
    
    
    // view3 is horizontal with view2
    UIView *view3 = [[UIView alloc] init];
    view3.translatesAutoresizingMaskIntoConstraints = NO;
    view3.backgroundColor = [UIColor redColor];
    [view1 addSubview:view3];
    
    NSLayoutConstraint *right3 = [NSLayoutConstraint constraintWithItem:view3
                                                              attribute:NSLayoutAttributeRight
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view1
                                                              attribute:NSLayoutAttributeRight
                                                             multiplier:1.0
                                                               constant:-20];
    NSLayoutConstraint *top3 = [NSLayoutConstraint constraintWithItem:view3
                                                            attribute:NSLayoutAttributeTop
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:view2
                                                            attribute:NSLayoutAttributeTop
                                                           multiplier:1.0
                                                             constant:0];
    NSLayoutConstraint *width3 = [NSLayoutConstraint constraintWithItem:view3
                                                              attribute:NSLayoutAttributeWidth
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view2
                                                              attribute:NSLayoutAttributeWidth
                                                             multiplier:1.0
                                                               constant:0];
    NSLayoutConstraint *heigh3 = [NSLayoutConstraint constraintWithItem:view3
                                                              attribute:NSLayoutAttributeHeight
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view2
                                                              attribute:NSLayoutAttributeHeight
                                                             multiplier:1.0
                                                               constant:0];
    [view1 addConstraints:@[right3, top3, width3, heigh3]];
    
    
    // view4 is horizontal with view3
    UIView *view4 = [[UIView alloc] init];
    view4.translatesAutoresizingMaskIntoConstraints = NO;
    view4.backgroundColor = [UIColor purpleColor];
    [view1 addSubview:view4];
    
    NSLayoutConstraint *right4 = [NSLayoutConstraint constraintWithItem:view4
                                                              attribute:NSLayoutAttributeRight
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view3
                                                              attribute:NSLayoutAttributeRight
                                                             multiplier:1.0
                                                               constant:0];
    NSLayoutConstraint *top4 = [NSLayoutConstraint constraintWithItem:view4
                                                            attribute:NSLayoutAttributeTop
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:view3
                                                            attribute:NSLayoutAttributeBottom
                                                           multiplier:1.0
                                                             constant:30];
    NSLayoutConstraint *width4 = [NSLayoutConstraint constraintWithItem:view4
                                                              attribute:NSLayoutAttributeWidth
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view3
                                                              attribute:NSLayoutAttributeWidth
                                                             multiplier:1.0
                                                               constant:0];
    NSLayoutConstraint *heigh4 = [NSLayoutConstraint constraintWithItem:view4
                                                              attribute:NSLayoutAttributeHeight
                                                              relatedBy:NSLayoutRelationEqual
                                                                 toItem:view3
                                                              attribute:NSLayoutAttributeHeight
                                                             multiplier:1.0
                                                               constant:0];
    [view1 addConstraints:@[right4, top4, width4, heigh4]];
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br></div></div><h5 id="nslayoutanchor" tabindex="-1"><a class="header-anchor" href="#nslayoutanchor" aria-hidden="true">#</a> NSLayoutAnchor</h5><p>iOS 9.0 \u4E4B\u540E\uFF0C \u51FA\u73B0\u4E86\u4E00\u79CD NSLayoutAnchor \u7EA6\u675F\uFF0C \u80FD\u5927\u5927\u7B80\u5316\u5E03\u5C40\u4EE3\u7801\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)configUI {
    UIView *yellow = [[UIView alloc] init];
    yellow.translatesAutoresizingMaskIntoConstraints = NO;
    yellow.backgroundColor = UIColor.yellowColor;
    [self.view addSubview:yellow];
    
    UIView *green = [[UIView alloc] init];
    green.translatesAutoresizingMaskIntoConstraints = NO;
    green.backgroundColor = UIColor.greenColor;
    [yellow addSubview:green];
    
    UIView *red = [[UIView alloc] init];
    red.translatesAutoresizingMaskIntoConstraints = NO;
    red.backgroundColor = UIColor.redColor;
    [yellow addSubview:red];
    
    CGFloat margin = 20;
    [yellow.leadingAnchor  constraintEqualToAnchor:self.view.leadingAnchor constant:margin].active = YES;
    [yellow.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor constant:-margin].active = YES;
    [yellow.topAnchor      constraintEqualToAnchor:self.view.topAnchor constant:100].active = YES;
    [yellow.bottomAnchor   constraintEqualToAnchor:self.view.bottomAnchor constant:-margin].active = YES;
    
    [green.leadingAnchor   constraintEqualToAnchor:yellow.leadingAnchor constant:margin].active = YES;
    [green.trailingAnchor  constraintEqualToAnchor:yellow.trailingAnchor constant:-margin].active = YES;
    [green.topAnchor       constraintEqualToAnchor:yellow.topAnchor constant:margin].active = YES;
    [green.bottomAnchor    constraintEqualToAnchor:red.topAnchor constant:-margin].active = YES;
    
    [red.leadingAnchor     constraintEqualToAnchor:green.leadingAnchor].active = YES;
    [red.trailingAnchor    constraintEqualToAnchor:green.trailingAnchor].active = YES;
    [red.bottomAnchor      constraintEqualToAnchor:yellow.bottomAnchor constant:-margin].active = YES;
    [red.heightAnchor      constraintEqualToAnchor:green.heightAnchor multiplier:1.5].active = YES;
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>`,21),g={href:"https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html",target:"_blank",rel:"noopener noreferrer"},v=a("Unterstanding Auto Layout"),L={href:"https://www.jianshu.com/p/3a872a0bfe11",target:"_blank",rel:"noopener noreferrer"},N=a("\u81EA\u52A8\u5E03\u5C40Auto Layout(\u539F\u7406\u7BC7)");function A(C,I){const s=e("ExternalLinkIcon");return r(),i(l,null,[m,n("p",null,[d,n("a",h,[y,t(s)]),w]),S,n("p",null,[n("a",g,[v,t(s)])]),n("p",null,[n("a",L,[N,t(s)])])],64)}var _=b(c,[["render",A]]);export{_ as default};
