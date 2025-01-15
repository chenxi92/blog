import{d as n}from"./app.01142347.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h4 id="\u6846\u67B6\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6846\u67B6\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> \u6846\u67B6\u76EE\u5F55\u7ED3\u6784</h4><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>Masonry.h
	- \u5934\u6587\u4EF6

MasUtilities.h
	- \u5B8F\u5B9A\u4E49 \u4EE5\u53CA \u5185\u8054\u51FD\u6570

View+MASAdditions.h
	- UIView/NSView \u5206\u7C7B\uFF0C \u63D0\u4F9B mas_xx \u5C5E\u6027\u3001\u65B9\u6CD5\u505A\u7EA6\u675F

View+MASShorthandAdditions.h
	- UIView/NSView \u5206\u7C7B\uFF0C \u7B80\u5316 View+MASAdditions.h \u5C5E\u6027\u4EE5\u53CA\u65B9\u6CD5\u524D\u7F00

ViewController+MASAdditions.h
	- UIViewController \u5206\u7C7B\uFF0C \u63D0\u4F9B topLayoutGuide \u7B49\u7EA6\u675F

NSArray+MASAdditions.h
	- \u6570\u7EC4\u5206\u7C7B\uFF0C\u63D0\u4F9B\u7C7B\u4F3C\u6279\u5904\u7406\u529F\u80FD
	
NSArray+MASShorthandAdditions.h
	- \u6570\u7EC4\u5206\u7C7B\uFF0C\u63D0\u4F9B\u7C7B\u4F3C\u6279\u5904\u7406\u5DE5\u7A0B\uFF0C\u65B9\u6CD5\u540D\u79F0\u53BB\u6389 mas_ \u524D\u7F00
	
MASConstraint.h
	- \u7EA6\u675F\u7C7B\uFF0C\u5B9E\u73B0\u4E86\u94FE\u5F0F\u7F16\u7A0B\u7684\u8BED\u6CD5
MASContraint+Private.h
	- \u5B9A\u4E49\u7EA6\u675F\u7C7B\u7684\u62BD\u8C61\u63A5\u53E3\uFF0C \u5B9A\u4E49\u7EA6\u675F\u7C7B\u76F8\u5173\u7684\u534F\u8BAE

MASCompositeConstraint.h
	- \u8868\u793A\u4E00\u7EC4\u7EA6\u675F\u5BF9\u8C61\uFF0C\u7EE7\u627F\u81EA MASConstraint
	
MASConstraintMaker.h
	- \u8868\u793A\u5355\u4E2A\u7EA6\u675F\u5BF9\u8C61\uFF0C\u7EE7\u627F\u81EA MASConstraint

MASViewAttribute.h
	- \u5B58\u50A8\u7EA6\u675F\u5BF9\u8C61\u4EE5\u53CA\u8BE5\u5BF9\u8C61\u7684\u7EA6\u675F\u5C5E\u6027
	
MASConstraintMaker.h
	- \u5DE5\u5382\u65B9\u6CD5\uFF0C\u7528\u4E8E\u521B\u5EFA\u7EA6\u675F\u5BF9\u8C61
	
MASLayoutConstrain.h
	- \u7EE7\u627F\u81EA NSLayoutConstraint\uFF0C \u7528\u4E8EDebug

NSLayoutConstraint+MASDebugAdditions.h
	- NSLayoutConstraint \u5206\u7C7B\uFF0C \u7528\u4E8EDebug
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h4 id="\u6E90\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u6E90\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u6E90\u7801\u5B9E\u73B0</h4><p>\u6839\u636E\u4E0B\u9762\u4E00\u4E2A\u4F8B\u5B50\u6765\u770B\u6E90\u7801\u5B9E\u73B0\u3002</p><p>\u521B\u5EFA\u4E00\u4E2A\u5B50\u89C6\u56FE\uFF0C\u8DDD\u79BB\u7236\u89C6\u56FE\u7684\u8FB9\u7F1820\uFF0C \u4F7F\u7528 Masonry \u6DFB\u52A0\u7EA6\u675F\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>UIView *superview = self.view;

UIView *view = [[UIView alloc] init];
view1.backgroundColor = [UIColor greenColor];
[superview addSubview:view];

UIEdgeInsets padding = UIEdgeInsetsMake(20, 20, 20, 20);

[view mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(superview.mas_top).offset(padding.top); 
    make.left.equalTo(superview.mas_left).offset(padding.left);
    make.bottom.equalTo(superview.mas_bottom).offset(-padding.bottom);
    make.right.equalTo(superview.mas_right).offset(-padding.right);
}];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h5 id="mas-makeconstraints-\u65B9\u6CD5\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#mas-makeconstraints-\u65B9\u6CD5\u5B9E\u73B0" aria-hidden="true">#</a> <code>mas_makeConstraints:</code> \u65B9\u6CD5\u5B9E\u73B0\uFF1A</h5><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (NSArray *)mas_makeConstraints:(void(^)(MASConstraintMaker *))block {
    self.translatesAutoresizingMaskIntoConstraints = NO;
    MASConstraintMaker *constraintMaker = [[MASConstraintMaker alloc] initWithView:self];
    block(constraintMaker);
    return [constraintMaker install];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h6 id="_1-\u7981\u7528-translatesautoresizingmaskintoconstraints" tabindex="-1"><a class="header-anchor" href="#_1-\u7981\u7528-translatesautoresizingmaskintoconstraints" aria-hidden="true">#</a> 1. \u7981\u7528 <code>translatesAutoresizingMaskIntoConstraints</code> \uFF1B</h6><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B UIView \u4E0A\u7684 <code>autoresizing mask</code> \u4F1A\u4EA7\u751F\u7EA6\u675F\u6761\u4EF6\uFF0C\u4EE5\u5B8C\u5168\u786E\u5B9A\u89C6\u56FE\u7684\u4F4D\u7F6E, <code>AutoLayout</code> \u4F1A\u81EA\u52A8\u6839\u636E UIView \u7684 <code>frame</code> \u7B49\u6765\u786E\u5B9A\u89C6\u56FE\u7684\u4F4D\u7F6E\u3002 \u5F53\u9700\u8981\u81EA\u5B9A\u4E49\u7EA6\u675F\u65F6\uFF0C \u9700\u8981\u7981\u7528\u8BE5\u5C5E\u6027\u3002</p><h6 id="_2-\u6784\u9020-masconstraintmaker-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_2-\u6784\u9020-masconstraintmaker-\u5BF9\u8C61" aria-hidden="true">#</a> 2. \u6784\u9020 <code>MASConstraintMaker</code> \u5BF9\u8C61\uFF1B</h6><p><code>MASConstraintMaker</code> \u662F\u4E00\u4E2A\u5DE5\u5382\u7C7B\uFF0C \u5176\u6784\u9020\u65B9\u6CD5\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (id)initWithView:(MAS_VIEW *)view {
    self = [super init];
    if (!self) return nil;
    
    self.view = view;
    self.constraints = NSMutableArray.new;
    
    return self;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u5B58\u50A8\u5F53\u524D\u89C6\u56FE(\u5F31\u5F15\u7528)\uFF1B</p><p>\u521D\u59CB\u5316\u7EA6\u675F\u6570\u7EC4\uFF1B</p><h6 id="_3-\u6267\u884C-block" tabindex="-1"><a class="header-anchor" href="#_3-\u6267\u884C-block" aria-hidden="true">#</a> 3. \u6267\u884C <code>block</code> \uFF1B</h6><p><code>mas_makeConstraints:</code> \u65B9\u6CD5\u4F20\u5165\u4E86\u4E00\u4E2A block \u4F5C\u4E3A\u51FD\u6570\u53C2\u6570\uFF0C \u8BE5 block \u65E0\u8FD4\u56DE\u503C\uFF0C\u53C2\u6570\u662F\u4E00\u4E2A <code>MASConstraintMaker</code> \u5BF9\u8C61\u3002 \u6211\u4EEC\u6240\u6709\u7684\u7EA6\u675F\u90FD\u662F\u5728\u8FD9\u4E2Ablock \u91CC\u9762\u8BBE\u5B9A\u7684\u3002</p><p>\u6839\u636E\u4EE3\u7801\u770B\u770B\u7EA6\u675F\u5982\u4F55\u521B\u5EFA\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>make.top.equalTo(superview.mas_top).offset(padding.top); 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u9996\u5148 <code>make.top</code> \u662F\u8C03\u7528 <code>MASConstraintMaker</code> \u5BF9\u8C61\u7684 <code>top</code> \u5C5E\u6027\u7684 <code>get</code> \u65B9\u6CD5\uFF0C \u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A <code>MASConstraint</code> \u5BF9\u8C61\uFF1B</p><p>\u8BE5 <code>get</code> \u65B9\u6CD5\u6267\u884C\u6D41\u7A0B\u5982\u4E0B:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASConstraintMaker.m

- (MASConstraint *)top {
    return [self addConstraintWithLayoutAttribute:NSLayoutAttributeTop];
}

- (MASConstraint *)addConstraintWithLayoutAttribute:(NSLayoutAttribute)layoutAttribute {
    return [self constraint:nil addConstraintWithLayoutAttribute:layoutAttribute];
}

- (MASConstraint *)constraint:(MASConstraint *)constraint addConstraintWithLayoutAttribute:(NSLayoutAttribute)layoutAttribute {
  	// constraint \u4E3A nil
  	// layoutAttribute \u4E3A NSLayoutAttributeTop
  	
  	// \u6784\u9020\u7EA6\u675F\u89C6\u56FE\u7684\u4FE1\u606F
    MASViewAttribute *viewAttribute = [[MASViewAttribute alloc] initWithView:self.view layoutAttribute:layoutAttribute];
  	
  	// \u6839\u636E\u7EA6\u675F\u89C6\u56FE\u4FE1\u606F\uFF0C\u6784\u9020\u7EA6\u675F\u5BF9\u8C61
    MASViewConstraint *newConstraint = [[MASViewConstraint alloc] initWithFirstViewAttribute:viewAttribute];
  
    if ([constraint isKindOfClass:MASViewConstraint.class]) {
        //replace with composite constraint
        NSArray *children = @[constraint, newConstraint];
        MASCompositeConstraint *compositeConstraint = [[MASCompositeConstraint alloc] initWithChildren:children];
        compositeConstraint.delegate = self;
        [self constraint:constraint shouldBeReplacedWithConstraint:compositeConstraint];
        return compositeConstraint;
    }
  	// constrain \u4E3A\u7A7A\uFF0C\u4E3A\u65B0\u6784\u9020\u7684 constrain \u5BF9\u8C61\u8BBE\u7F6E\u4EE3\u7406
  	// \u5E76\u628A\u8BE5 constrain \u5BF9\u8C61\u5B58\u50A8\u5728\u7EA6\u675F\u6570\u7EC4\u5185\uFF0C\u4F9B\u540E\u7EED\u4F7F\u7528
    if (!constraint) {
        newConstraint.delegate = self;
        [self.constraints addObject:newConstraint];
    }
  	// \u8FD4\u56DE\u65B0\u521B\u5EFA\u7684\u7EA6\u675F\u5BF9\u8C61\uFF0C \u8BE5\u5BF9\u8C61\u7684\u5B9E\u9645\u7C7B\u578B\u662F MASViewConstraint
    return newConstraint;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>\u5176\u6B21 <code>.equalTo(superview.mas_top)</code> \u4F1A\u6839\u636E <code>make.top</code> \u8FD4\u56DE\u7684 <code>MASConstraint</code> \u5BF9\u8C61( \u8BE5\u5BF9\u8C61\u7684\u5B9E\u9645\u7C7B\u578B\u662F <strong>MASViewConstraint</strong>) \u53BB\u6267\u884C <code>equalTo</code> \u65B9\u6CD5\u8FD4\u56DE\u7684 block \uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASConstraint.m

- (MASConstraint * (^)(id))equalTo {
    return ^id(id attribute) {
        return self.equalToWithRelation(attribute, NSLayoutRelationEqual);
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>equalTo</code> \u65B9\u6CD5\u4F1A\u53BB\u8C03\u7528 <code>equalToWithRelation</code> \u65B9\u6CD5\uFF0C \u56E0\u4E3A <code>equalToWithRelation</code> \u65B9\u6CD5\u9700\u8981\u5728\u5B50\u7C7B\u5B9E\u73B0\uFF0C \u5B9E\u9645\u4F1A\u8C03\u7528\u5230 <code>MASViewConstraint</code> \u4E2D\uFF0C \u56E0\u4E3A <code>MASViewConstraint</code> \u91CD\u65B0\u5B9E\u73B0\u4E86 <code>equalToWithRelation</code> \u65B9\u6CD5 (\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E86\u4E00\u4E2A block\uFF0C \u8BE5 block \u7684\u8FD4\u56DE\u503C\u662F <code>MASConstraint</code> \u5BF9\u8C61\uFF0C\u6B64\u5904\u5B9E\u9645\u8FD4\u56DE\u7684\u5F53\u524D\u7684 <code>MASViewConstraint</code> \u5BF9\u8C61\uFF0C block \u67092\u4E2A\u53C2\u6570\uFF0C \u7B2C\u4E00\u4E2A\u53C2\u6570\u4E3A <code>superview.mas_top</code> \uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A <code>NSLayoutRelationEqual</code>)</p><p><code>superview.mas_top</code> \u6267\u884C\u6D41\u7A0B\u4E3A:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// View+MASAdditions.m

- (MASViewAttribute *)mas_top {
    return [[MASViewAttribute alloc] initWithView:self layoutAttribute:NSLayoutAttributeTop];
}

// MASViewAttribute.m
- (id)initWithView:(MAS_VIEW *)view layoutAttribute:(NSLayoutAttribute)layoutAttribute {
    self = [self initWithView:view item:view layoutAttribute:layoutAttribute];
    return self;
}

- (id)initWithView:(MAS_VIEW *)view item:(id)item layoutAttribute:(NSLayoutAttribute)layoutAttribute {
    self = [super init];
    if (!self) return nil;
    
    _view = view;
    _item = item;
    _layoutAttribute = layoutAttribute;
    
    return self;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>\u4E3B\u8981\u662F\u6784\u5EFA\u7EA6\u675F\u5BF9\u8C61\u3002</p><p><code>equalToWithRelation</code> \u6267\u884C\u6D41\u7A0B\u4E3A:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASViewConstraint.m

- (MASConstraint * (^)(id, NSLayoutRelation))equalToWithRelation {
    return ^id(id attribute, NSLayoutRelation relation) {
      	// attribute \u4E3A MASViewAttribute \u5BF9\u8C61
      	// relation  \u4E3A NSLayoutRelationEqual
        if ([attribute isKindOfClass:NSArray.class]) {
            NSAssert(!self.hasLayoutRelation, @&quot;Redefinition of constraint relation&quot;);
            NSMutableArray *children = NSMutableArray.new;
            for (id attr in attribute) {
                MASViewConstraint *viewConstraint = [self copy];
                viewConstraint.layoutRelation = relation;
                viewConstraint.secondViewAttribute = attr;
                [children addObject:viewConstraint];
            }
            MASCompositeConstraint *compositeConstraint = [[MASCompositeConstraint alloc] initWithChildren:children];
            compositeConstraint.delegate = self.delegate;
            [self.delegate constraint:self shouldBeReplacedWithConstraint:compositeConstraint];
            return compositeConstraint;
        } else {
            NSAssert(!self.hasLayoutRelation || self.layoutRelation == relation &amp;&amp; [attribute isKindOfClass:NSValue.class], @&quot;Redefinition of constraint relation&quot;);
            
          	// \u5B58\u50A8\u7EA6\u675F\u5BF9\u8C61\u95F4\u7684\u7EBF\u6027\u7B49\u5F0F\u5173\u7CFB\uFF0C\u6B64\u5904\u4E3A NSLayoutRelationEqual
          	self.layoutRelation = relation;
          	
          	// \u5B58\u50A8\u7B2C\u4E8C\u4E2A\u7EA6\u675F\u5BF9\u8C61\uFF0C \u6B64\u5904\u4E3B\u8981\u662F \u5B58\u50A8 superview \u7684 NSLayoutAttributeTop \u7EA6\u675F\u5C5E\u6027
            self.secondViewAttribute = attribute;
          
            return self;
        }
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p><code>make.top.equalTo(superview.mas_top)</code> \u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u8FD8\u662F\u4F1A\u8FD4\u56DE\u7531 <code>make.top</code> \u91CC\u9762\u521B\u5EFA\u7684 <code>MASViewConstraint</code> \u7EA6\u675F\u5BF9\u8C61\u3002</p><p><code>.offset(padding.top); </code> \u4F1A\u5B9E\u9645\u6267\u884C <code>MASViewConstraint</code> \u5185\u7684 <code>setOffset:</code> \u65B9\u6CD5\uFF0C \u6B64\u5904\u53C2\u6570\u4E3A 20\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASViewConstraint.m

- (void)setOffset:(CGFloat)offset {
  	// \u91CD\u5199\u4E86 setLayoutConstant: \u65B9\u6CD5\uFF0C \u6B64\u5904\u4F1A\u7ED9 _layoutConstant \u8D4B\u503C\u4E3A 20\u3002
    self.layoutConstant = offset;
}

- (void)setLayoutConstant:(CGFloat)layoutConstant {
    _layoutConstant = layoutConstant;

#if TARGET_OS_MAC &amp;&amp; !(TARGET_OS_IPHONE || TARGET_OS_TV)
    if (self.useAnimator) {
        [self.layoutConstraint.animator setConstant:layoutConstant];
    } else {
        self.layoutConstraint.constant = layoutConstant;
    }
#else
    self.layoutConstraint.constant = layoutConstant;
#endif
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u5230\u6B64\u4E00\u6761\u7EA6\u675F <code>make.top.equalTo(superview.mas_top).offset(padding.top); </code> \u6267\u884C\u5B8C\u6BD5\uFF0C \u5176\u5B83\u7EA6\u675F\u60C5\u51B5\u7C7B\u4F3C\u3002</p><h6 id="_4-\u6267\u884C-masconstraintmaker-\u5BF9\u8C61\u5185\u7684-install-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_4-\u6267\u884C-masconstraintmaker-\u5BF9\u8C61\u5185\u7684-install-\u65B9\u6CD5" aria-hidden="true">#</a> 4. \u6267\u884C <code>MASConstraintMaker</code> \u5BF9\u8C61\u5185\u7684 <code>install</code> \u65B9\u6CD5\uFF1B</h6><p>\u8BE5\u65B9\u6CD5\u4F1A\u4F9D\u6B21\u53BB\u6267\u884C\u6BCF\u4E2A\u7EA6\u675F\u5BF9\u8C61(<code>MASViewConstraint</code>) \u7684 install \u65B9\u6CD5:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASConstraintMaker.m
- (NSArray *)install {
    if (self.removeExisting) {
        NSArray *installedConstraints = [MASViewConstraint installedConstraintsForView:self.view];
        for (MASConstraint *constraint in installedConstraints) {
            [constraint uninstall];
        }
    }
  	// \u590D\u5236\u6240\u6709\u7684\u7EA6\u675F\u5BF9\u8C61
    NSArray *constraints = self.constraints.copy;
    for (MASConstraint *constraint in constraints) {
        constraint.updateExisting = self.updateExisting;
      	// \u6BCF\u4E2A\u7EA6\u675F\u5BF9\u8C61\u6267\u884C install \u65B9\u6CD5
        [constraint install];
    }
    [self.constraints removeAllObjects];
    return constraints;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// MASViewConstraint.m

- (void)install {
   if (self.hasBeenInstalled) {
       return;
   }
   
   if ([self supportsActiveProperty] &amp;&amp; self.layoutConstraint) {
       self.layoutConstraint.active = YES;
       [self.firstViewAttribute.view.mas_installedConstraints addObject:self];
       return;
   }
   // \u53D6\u51FA\u7B2C\u4E00\u4E2A\u548C\u7B2C\u4E8C\u4E2A\u7EA6\u675F\u89C6\u56FE\uFF0C\u4EE5\u53CA\u5404\u81EA\u7684\u7EA6\u675F\u5C5E\u6027
   MAS_VIEW *firstLayoutItem = self.firstViewAttribute.item;
   NSLayoutAttribute firstLayoutAttribute = self.firstViewAttribute.layoutAttribute;
   MAS_VIEW *secondLayoutItem = self.secondViewAttribute.item;
   NSLayoutAttribute secondLayoutAttribute = self.secondViewAttribute.layoutAttribute;

   // alignment attributes must have a secondViewAttribute
   // therefore we assume that is refering to superview
   // eg make.left.equalTo(@10)
   if (!self.firstViewAttribute.isSizeAttribute &amp;&amp; !self.secondViewAttribute) {
       secondLayoutItem = self.firstViewAttribute.view.superview;
       secondLayoutAttribute = firstLayoutAttribute;
   }
   
 	// \u6784\u9020 NSLayoutConstraint \u7EA6\u675F\u5BF9\u8C61
   MASLayoutConstraint *layoutConstraint
       = [MASLayoutConstraint constraintWithItem:firstLayoutItem
                                       attribute:firstLayoutAttribute
                                       relatedBy:self.layoutRelation
                                          toItem:secondLayoutItem
                                       attribute:secondLayoutAttribute
                                      multiplier:self.layoutMultiplier
                                        constant:self.layoutConstant];
   // \u8BBE\u7F6E\u4F18\u5148\u7EA7
   layoutConstraint.priority = self.layoutPriority;
 	// \u8BBE\u7F6E\u8C03\u8BD5\u7684 key \u503C
   layoutConstraint.mas_key = self.mas_key;
   
   if (self.secondViewAttribute.view) {
     	// \u82E5\u7B2C\u4E8C\u4E2A\u7EA6\u675F\u89C6\u56FE\u5B58\u5728\uFF0C \u5219\u7EA6\u675F\u6DFB\u52A0\u5728\u4E24\u4E2A\u7EA6\u675F\u89C6\u56FE\u6700\u8FD1\u7684\u7236\u89C6\u56FE\u4E0A
       MAS_VIEW *closestCommonSuperview = [self.firstViewAttribute.view mas_closestCommonSuperview:self.secondViewAttribute.view];
       NSAssert(closestCommonSuperview,
                @&quot;couldn&#39;t find a common superview for %@ and %@&quot;,
                self.firstViewAttribute.view, self.secondViewAttribute.view);
       self.installedView = closestCommonSuperview;
   } else if (self.firstViewAttribute.isSizeAttribute) {
     	// \u7EA6\u675F\u5BBD\u9AD8\uFF0C \u5219\u7EA6\u675F\u6DFB\u52A0\u5728\u7B2C\u4E00\u4E2A\u7EA6\u675F\u89C6\u56FE\u4E0A
       self.installedView = self.firstViewAttribute.view;
   } else {
     	// \u7EA6\u675F\u6DFB\u52A0\u5728\u7B2C\u4E00\u4E2A\u7EA6\u675F\u89C6\u56FE\u7684\u7236\u89C6\u56FE\u4E0A
       self.installedView = self.firstViewAttribute.view.superview;
   }


   MASLayoutConstraint *existingConstraint = nil;
   if (self.updateExisting) {
       existingConstraint = [self layoutConstraintSimilarTo:layoutConstraint];
   }
   if (existingConstraint) {
       // just update the constant
       existingConstraint.constant = layoutConstraint.constant;
       self.layoutConstraint = existingConstraint;
   } else {
     	// \u6DFB\u52A0\u7EA6\u675F
       [self.installedView addConstraint:layoutConstraint];
     	// \u5B58\u50A8\u7EA6\u675F(\u5F31\u5F15\u7528)
       self.layoutConstraint = layoutConstraint;
     	// \u5B58\u50A8\u7EA6\u675F\u5BF9\u8C61\uFF0C \u65B9\u4FBF\u4EE5\u540E\u597D\u5378\u8F7D\u8BE5\u7EA6\u675F
       [firstLayoutItem.mas_installedConstraints addObject:self];
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><h4 id="\u5B66\u4E60\u6536\u83B7" tabindex="-1"><a class="header-anchor" href="#\u5B66\u4E60\u6536\u83B7" aria-hidden="true">#</a> \u5B66\u4E60\u6536\u83B7</h4><h5 id="\u94FE\u5F0F\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#\u94FE\u5F0F\u8C03\u7528" aria-hidden="true">#</a> \u94FE\u5F0F\u8C03\u7528</h5><p>block \u901A\u5E38\u4F5C\u4E3A\u51FD\u6570\u7684\u53C2\u6570\u7528\u7684\u6BD4\u8F83\u591A\uFF0C \u4F46\u662Fblock\u4F5C\u4E3A\u8FD4\u56DE\u503C\uFF0C\u5219\u53EF\u4EE5\u5199\u51FA\u94FE\u5F0F\u8C03\u7528\u7684\u4F18\u96C5\u8BED\u6CD5:</p><p>\u5B9A\u4E49\u4E00\u4E2A\u8BA1\u7B97\u5668\u7C7B\uFF0C \u5B9E\u73B0\u52A0\u51CF\u4E58\u9664\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>interface Caculator : NSObject

@property (nonatomic, assign, readonly) CGFloat result;

- (Caculator * (^) (CGFloat number))addition;

- (Caculator * (^) (CGFloat number))substraction;

- (Caculator * (^) (CGFloat number))multiplication;

- (Caculator * (^) (CGFloat number))division;
@end

@implementation Caculator

- (Caculator * _Nonnull (^)(CGFloat))addition {
    return ^Caculator *(CGFloat number) {
        self -&gt; _result += number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))substraction {
    return ^Caculator *(CGFloat number) {
        self -&gt; _result -= number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))multiplication {
    return ^Caculator *(CGFloat number) {
        self -&gt; _result *= number;
        return self;
    };
}

- (Caculator * _Nonnull (^)(CGFloat))division {
    return ^Caculator *(CGFloat number) {
        self -&gt; _result /= number;
        return self;
    };
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>\u5B9A\u4E49\u4E00\u4E2A\u5206\u7C7B\uFF0C\u8D1F\u8D23\u8C03\u7528\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>@interface NSObject (Caculator)

- (CGFloat)caculate:(void (^)(Caculator *caculate))block;

@end

@implementation NSObject (Caculator)

- (CGFloat)caculate:(void (^)(Caculator * _Nonnull))block {
    Caculator *caculate = [[Caculator alloc] init];
    block(caculate);
    return caculate.result;
}
@end
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u6D4B\u8BD5\u5982\u4E0B\u4EE3\u7801\uFF0C \u7ED3\u679C\u8F93\u51FA\u4E3A 6 \u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>CGFloat result = [NSObject caculate:^(Caculator * _Nonnull caculate) {
  	// 0 + 10 = 10
  	// 10 - 2 = 8
  	// 8 / 4 = 2
  	// 2 * 3 = 6
    caculate.addition(10).substraction(2).division(4).multiplication(3);
}];

NSLog(@&quot;result : %.f&quot;, result);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,47);function r(t,i){return e}var p=s(a,[["render",r]]);export{p as default};
