import{r as l,o as i,c as p,a as e,e as a,F as b,d as r,b as n}from"./app.01142347.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const o={},t=r(`<h3 id="afnetworking-\u6E90\u7801\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#afnetworking-\u6E90\u7801\u5206\u6790" aria-hidden="true">#</a> AFNetworking \u6E90\u7801\u5206\u6790</h3><p align="right">Update: 2022-3-24</p><p>Version: <strong>4.0</strong></p><h4 id="\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u76EE\u5F55" aria-hidden="true">#</a> \u76EE\u5F55</h4><ul><li><a href="#architect-flow">\u67B6\u6784\u56FE</a></li><li><a href="#request-flow">\u7F51\u7EDC\u8BF7\u6C42\u6D41\u7A0B</a></li><li><a href="#response-flow">\u7F51\u7EDC\u54CD\u5E94\u6D41\u7A0B</a></li><li><a href="#cache">\u7F13\u5B58</a></li><li><a href="#image-download">\u56FE\u7247\u4E0B\u8F7D</a></li><li><a href="#others">\u5176\u4ED6\u77E5\u8BC6</a></li><li><a href="#reference">\u53C2\u8003</a></li></ul><h4 id="\u67B6\u6784\u56FE" tabindex="-1"><a class="header-anchor" href="#\u67B6\u6784\u56FE" aria-hidden="true">#</a> <a name="architect-flow"></a>\u67B6\u6784\u56FE</h4><ul><li><p>\u7F51\u7EDC\u901A\u4FE1</p><ul><li><code>AFURLSessionManager</code> \u57FA\u4E8E <code>NSURLSession</code> \u505A\u4E86\u4E00\u7CFB\u5217\u7684\u5C01\u88C5\uFF0C\u8D1F\u8D23\u771F\u6B63\u7684\u7F51\u7EDC\u8BF7\u6C42\u3002 <ul><li><code>AFURLSessionManagerTaskDelegate</code> \u5904\u7406\u5355\u4E2A\u7F51\u7EDC\u8BF7\u6C42\u7684\u56DE\u8C03\u3002</li></ul></li><li><code>AFHTTPSessionManager</code> \u7EE7\u627F\u81EA <code>AFURLSessionManager</code> \uFF0C \u5177\u4F53\u8BF7\u6C42\u903B\u8F91\u4EA4\u7ED9\u7236\u7C7B\u6765\u5B8C\u6210\uFF0C\u4E00\u822C\u4F7F\u7528\u8BE5\u7C7B\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42\u3002</li></ul></li><li><p>\u7F51\u7EDC\u72B6\u6001\u76D1\u63A7</p><ul><li><code>AFNetworkReachabilityManager</code> \u8D1F\u8D23\u76D1\u63A7\u7F51\u7EDC\u72B6\u6001\u3002</li></ul></li><li><p>\u5E8F\u5217\u5316/\u53CD\u5E8F\u5217\u5316 \u534F\u8BAE</p><ul><li><p><code>AFURLRequestSerialization</code> \u8D1F\u8D23\u6784\u9020 <code>NSURLRequest</code> \u3002</p><ul><li><p><code>AFHTTPRequestSerializer</code> \u5B9E\u73B0 <code>AFURLRequestSerialization</code> \u7684\u57FA\u7C7B\u3002</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>offering a concrete base implementation of query string / URL form-encoded parameter serialization and default request headers, as well as response status code and content type validation.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><code>AFJSONRequestSerializer</code> JSON \u7C7B\u578B\u7684\u7F16\u7801\u5B9E\u73B0\u3002</p></li><li><p><code>AFPropertyListRequestSerializer</code> PropertyList \u7C7B\u578B\u7684\u7F16\u7801\u5B9E\u73B0\u3002</p></li></ul></li><li><p><code>AFURLResponseSerrialization</code> \u8D1F\u8D23\u89E3\u6790 <code>NSURLResponse</code> \u3002</p><ul><li><p><code>AFHTTPResponseSerializer</code> \u5B9E\u73B0<code>AFURLResponseSerrialization</code> \u534F\u8BAE\u7684\u57FA\u7C7B\u3002</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>offering a concrete base implementation of query string / URL form-encoded parameter serialization and default request headers, as well as response status code and content type validation.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><code>AFJSONResponseSerializer</code> \u89E3\u6790 response \u6570\u636E\u4E3A JSON \u5BF9\u8C61\u3002</p></li><li><p><code>AFXMLParserResponseSerializer</code> \u89E3\u6790 response \u6570\u636E\u4E3A XML \u5BF9\u8C61\u3002</p></li><li><p><code>AFXMLDocumentResponseSerializer</code> \u89E3\u6790 response \u6570\u636E\u4E3A XML \u5BF9\u8C61\uFF08\u4F7F\u7528\u4E8E Mac \u5E73\u53F0\uFF09\u3002</p></li><li><p><code>AFPropertyListResponseSerializer</code> \u89E3\u6790 response \u6570\u636E\u4E3A plist \u5BF9\u8C61\u3002</p></li><li><p><code>AFImageResponseSerializer</code> \u89E3\u6790 response \u6570\u636E\u4E3A image \u5BF9\u8C61\u3002</p></li></ul></li></ul></li><li><p>\u5B89\u5168\u7B56\u7565</p><ul><li><code>AFSecurityPolicy</code> \u8D1F\u8D23\u9A8C\u8BC1\u8BC1\u4E66\u6709\u6548\u6027\u3002</li></ul></li><li><p>\u7F51\u7EDC\u72B6\u6001\u76D1\u542C</p><ul><li><code>AFNetworkReachabilityManager</code></li></ul></li><li><p>UIKit\u6269\u5C55</p><ul><li><code>UIImageView+AFNetworking</code> <code>UIImageView</code> \u7684\u6269\u5C55\uFF0C\u8D1F\u8D23\u56FE\u7247\u7684\u4E0B\u8F7D\u4EE5\u53CA\u7F13\u5B58\u3002</li><li><code>AFAutoPurgingImageCache</code> \u8D1F\u8D23\u56FE\u7247\u7F13\u5B58</li><li><code>AFImageDownloader</code> \u8D1F\u8D23\u56FE\u7247\u4E0B\u8F7D\uFF0C\u57FA\u4E8E <code>AFHTTPSessionManager</code> \u7684\u5C01\u88C5\u3002</li></ul></li></ul><h4 id="\u7F51\u7EDC\u8BF7\u6C42\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u7F51\u7EDC\u8BF7\u6C42\u6D41\u7A0B" aria-hidden="true">#</a> <a name="request-flow"></a>\u7F51\u7EDC\u8BF7\u6C42\u6D41\u7A0B</h4><p>\u4EE5\u53D1\u8D77 <code>POST</code> \u8BF7\u6C42\u4E3A\u4F8B\uFF0C</p><ol><li>\u8C03\u7528\u5982\u4E0B\u63A5\u53E3\u521D\u59CB\u5316 <code>AFHTTPSessionManager</code> \u5BF9\u8C61</li></ol><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (instancetype)initWithBaseURL:(nullable NSURL *)url
           sessionConfiguration:(nullable NSURLSessionConfiguration *)configuration NS_DESIGNATED_INITIALIZER;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u521D\u59CB\u5316\u505A\u4E86\u5982\u4E0B\u64CD\u4F5C</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (instancetype)initWithBaseURL:(NSURL *)url
           sessionConfiguration:(NSURLSessionConfiguration *)configuration
{
    // \u8C03\u7528\u7236\u7C7B\u63A5\u53E3\uFF0C\u521D\u59CB\u5316\u7236\u7C7B
    // #1 \u521D\u59CB\u5316\u9ED8\u8BA4\u914D\u7F6E
    // AFJSONResponseSerializer\u3001AFSecurityPolicy\u3001AFNetworkReachabilityManager\u3001NSURLSession\uFF08\u540C\u65F6\u6307\u5B9A session \u7684\u4EE3\u7406\u4E3A\u81EA\u5DF1)
    // #2 \u521D\u59CB\u5316\u5404\u79CD\u5BB9\u5668\u3001\u9501\u3001\u53D8\u91CF\u7B49
    self = [super initWithSessionConfiguration:configuration];
    if (!self) {
        return nil;
    }
    
    // \u5904\u7406 baseURL
    // Ensure terminal slash for baseURL path, so that NSURL +URLWithString:relativeToURL: works as expected
    if ([[url path] length] &gt; 0 &amp;&amp; ![[url absoluteString] hasSuffix:@&quot;/&quot;]) {
        url = [url URLByAppendingPathComponent:@&quot;&quot;];
    }

    self.baseURL = url;
    
    // \u521D\u59CB\u5316 \u8BF7\u6C42\u548C\u54CD\u5E94 \u7684\u5E8F\u5217\u5316\u5BF9\u8C61
    self.requestSerializer = [AFHTTPRequestSerializer serializer];
    self.responseSerializer = [AFJSONResponseSerializer serializer];

    return self;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><ol start="2"><li>\u53D1\u8D77 <code>POST</code> \u8BF7\u6C42</li></ol><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary &lt;NSString *, NSString *&gt; *)headers
                               progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u8BE5 <code>POST</code> \u8BF7\u6C42\u6700\u7EC8\u8C03\u7528\u5230:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary &lt;NSString *, NSString *&gt; *)headers
                               progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure
{
    // \u6784\u9020dataTask\u5BF9\u8C61
    NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@&quot;POST&quot; URLString:URLString parameters:parameters headers:headers uploadProgress:uploadProgress downloadProgress:nil success:success failure:failure];
    
    // \u6267\u884C\u8BF7\u6C42
    [dataTask resume];
    
    return dataTask;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u6784\u9020 <code>NSURLSessionDataTask</code> \u5BF9\u8C61\u505A\u4E86\u5982\u4E0B\u64CD\u4F5C</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (NSURLSessionDataTask *)dataTaskWithHTTPMethod:(NSString *)method
                                       URLString:(NSString *)URLString
                                      parameters:(nullable id)parameters
                                         headers:(nullable NSDictionary &lt;NSString *, NSString *&gt; *)headers
                                  uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgress
                                downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgress
                                         success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                         failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure
{
    NSError *serializationError = nil;
    // \u6784\u9020 Request \u5BF9\u8C61
    NSMutableURLRequest *request = [self.requestSerializer requestWithMethod:method URLString:[[NSURL URLWithString:URLString relativeToURL:self.baseURL] absoluteString] parameters:parameters error:&amp;serializationError];
    for (NSString *headerField in headers.keyEnumerator) {
        [request setValue:headers[headerField] forHTTPHeaderField:headerField];
    }
    if (serializationError) {
        if (failure) {
            dispatch_async(self.completionQueue ?: dispatch_get_main_queue(), ^{
                failure(nil, serializationError);
            });
        }

        return nil;
    }
                                           
		// \u7236\u7C7B\u6784\u9020 DataTask \u5BF9\u8C61
    __block NSURLSessionDataTask *dataTask = nil;
    dataTask = [self dataTaskWithRequest:request
                          uploadProgress:uploadProgress
                        downloadProgress:downloadProgress
                       completionHandler:^(NSURLResponse * __unused response, id responseObject, NSError *error) {
        if (error) {
            if (failure) {
                failure(dataTask, error);
            }
        } else {
            if (success) {
                success(dataTask, responseObject);
            }
        }
    }];

    return dataTask;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><p>\u7236\u7C7B\u7684\u6784\u9020 <code>dataTask</code> \u505A\u4E86\u5982\u4E0B\u64CD\u4F5C</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (NSURLSessionDataTask *)dataTaskWithRequest:(NSURLRequest *)request
                               uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgressBlock
                             downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgressBlock
                            completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject,  NSError * _Nullable error))completionHandler {

    NSURLSessionDataTask *dataTask = [self.session dataTaskWithRequest:request];

    [self addDelegateForDataTask:dataTask uploadProgress:uploadProgressBlock downloadProgress:downloadProgressBlock completionHandler:completionHandler];

    return dataTask;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u6DFB\u52A0\u4EE3\u7406\u4E3B\u8981\u4F5C\u7528\u662F\u628A\u8BE5 <code>dataTask</code> \u548C\u5B83\u5BF9\u5E94\u7684\u56DE\u8C03\u4FE1\u606F\u4FDD\u5B58\u8D77\u6765</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)addDelegateForDataTask:(NSURLSessionDataTask *)dataTask
                uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgressBlock
              downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgressBlock
             completionHandler:(void (^)(NSURLResponse *response, id responseObject, NSError *error))completionHandler
{
    // \u751F\u6210 AFURLSessionManagerTaskDelegate \u5BF9\u8C61
    AFURLSessionManagerTaskDelegate *delegate = [[AFURLSessionManagerTaskDelegate alloc] initWithTask:dataTask];
    delegate.manager = self;
    // \u4FDD\u5B58\u8BF7\u6C42\u7684\u56DE\u8C03\u5230dataTask\u7684\u4EE3\u7406\u5BF9\u8C61\u4E0A
    delegate.completionHandler = completionHandler;

    // \u628A\u8BE5dataTask\u4EE3\u7406\u5BF9\u8C61\u4FDD\u5B58\u8D77\u6765
    dataTask.taskDescription = self.taskDescriptionForSessionTasks;
    [self setDelegate:delegate forTask:dataTask];

    delegate.uploadProgressBlock = uploadProgressBlock;
    delegate.downloadProgressBlock = downloadProgressBlock;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>\u5B9E\u9645\u5B58\u5165\u662F\u6839\u636E\u8BE5 <code>dataTask</code> \u7684 <code>taskIdentifier</code> \u5C5E\u6027\u503C\u4F5C\u4E3Akey\u503C\uFF0C\u4FDD\u5B58\u5728\u5B57\u5178\u4E2D\u3002</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)setDelegate:(AFURLSessionManagerTaskDelegate *)delegate
            forTask:(NSURLSessionTask *)task
{
    NSParameterAssert(task);
    NSParameterAssert(delegate);

    [self.lock lock];
    self.mutableTaskDelegatesKeyedByTaskIdentifier[@(task.taskIdentifier)] = delegate;
    [self addNotificationObserverForTask:task];
    [self.lock unlock];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="\u7F51\u7EDC\u54CD\u5E94\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u7F51\u7EDC\u54CD\u5E94\u6D41\u7A0B" aria-hidden="true">#</a> <a name="response-flow"></a>\u7F51\u7EDC\u54CD\u5E94\u6D41\u7A0B</h4><p><code>AFURLSessionManager</code> \u5B9E\u73B0\u4E86 <code>NSURLSessionDelegate</code>, <code>NSURLSessionTaskDelegate</code>, <code>NSURLSessionDataDelegate</code>, <code>NSURLSessionDownloadDelegate</code> \u7B49\u7F51\u7EDC\u534F\u8BAE\u3002</p><p>\u63A5\u53D7\u6570\u636E\u5904\u7406\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)URLSession:(NSURLSession *)session
          dataTask:(NSURLSessionDataTask *)dataTask
    didReceiveData:(NSData *)data
{
    // \u83B7\u53D6task\u7684\u4EE3\u7406\u5BF9\u8C61\uFF0C\u5E76\u7531\u8BE5\u4EE3\u7406\u5BF9\u8C61\u53BB\u5904\u7406\u76F8\u5173\u6570\u636E
    AFURLSessionManagerTaskDelegate *delegate = [self delegateForTask:dataTask];
    [delegate URLSession:session dataTask:dataTask didReceiveData:data];
    
    // block\u5982\u679C\u5B58\u5728\uFF0C\u6267\u884Cblock\u5904\u7406\u6570\u636E
    if (self.dataTaskDidReceiveData) {
        self.dataTaskDidReceiveData(session, dataTask, data);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>\u83B7\u53D6 <code>task</code> \u7684\u4EE3\u7406\u5BF9\u8C61</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (AFURLSessionManagerTaskDelegate *)delegateForTask:(NSURLSessionTask *)task {
    NSParameterAssert(task);

    AFURLSessionManagerTaskDelegate *delegate = nil;
    [self.lock lock]; // \u52A0\u9501
    // \u6839\u636E\u6BCF\u4E00\u4E2A task \u7684 taskIdentifier \u7684\u5C5E\u6027\u503C\u6765\u83B7\u53D6\u4EE3\u7406\u5BF9\u8C61
    delegate = self.mutableTaskDelegatesKeyedByTaskIdentifier[@(task.taskIdentifier)];
    [self.lock unlock];

    return delegate;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><code>task</code> \u7684\u4EE3\u7406\u5BF9\u8C61 <code>AFURLSessionManagerTaskDelegate</code> \uFF0C\u5B9E\u73B0\u4E86 <code>NSURLSessionTaskDelegate</code>, <code>NSURLSessionDataDelegate</code>, <code>NSURLSessionDownloadDelegate</code> \u534F\u8BAE\u3002</p><p>\u63A5\u6536\u7684\u6570\u636E\u5177\u4F53\u7531 <code>AFURLSessionManagerTaskDelegate</code> \u7C7B\u6765\u5904\u7406</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)URLSession:(__unused NSURLSession *)session
          dataTask:(__unused NSURLSessionDataTask *)dataTask
    didReceiveData:(NSData *)data
{
    // \u66F4\u65B0\u4E0B\u8F7D\u8FDB\u5EA6
    self.downloadProgress.totalUnitCount = dataTask.countOfBytesExpectedToReceive;
    self.downloadProgress.completedUnitCount = dataTask.countOfBytesReceived;
		// \u4FDD\u5B58\u6570\u636E
    [self.mutableData appendData:data];
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u4E0B\u8F7D\u5B8C\u6210\u5904\u7406\u6D41\u7A0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error
{
    // \u83B7\u53D6\u4EE3\u7406
    AFURLSessionManagerTaskDelegate *delegate = [self delegateForTask:task];

    // delegate may be nil when completing a task in the background
    if (delegate) {
      	// \u4EE3\u7406\u6765\u5904\u7406\u6570\u636E
        [delegate URLSession:session task:task didCompleteWithError:error];
        // \u79FB\u9664\u4EE3\u7406\u5BF9\u8C61
        [self removeDelegateForTask:task];
    }
		// block \u5904\u7406\u4E0B\u8F7D\u5B8C\u6210\u7684\u60C5\u51B5
    if (self.taskDidComplete) {
        self.taskDidComplete(session, task, error);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u4EE3\u7406\u5177\u4F53\u5904\u7406\u6570\u636E\u4E3A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)URLSession:(__unused NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error
{
    __strong AFURLSessionManager *manager = self.manager;

    __block id responseObject = nil;

    __block NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    userInfo[AFNetworkingTaskDidCompleteResponseSerializerKey] = manager.responseSerializer;
    
    // \u63D0\u5347\u6027\u80FD\uFF0C\u4E0D\u518D\u9700\u8981\u7684\u6570\u636E\uFF0C\u53CA\u65F6\u91CA\u653E
    //Performance Improvement from #2672
    NSData *data = nil;
    if (self.mutableData) {
        data = [self.mutableData copy];
        //We no longer need the reference, so nil it out to gain back some memory.
        self.mutableData = nil;
    }

#if AF_CAN_USE_AT_AVAILABLE &amp;&amp; AF_CAN_INCLUDE_SESSION_TASK_METRICS
    if (@available(iOS 10, macOS 10.12, watchOS 3, tvOS 10, *)) {
        if (self.sessionTaskMetrics) {
            userInfo[AFNetworkingTaskDidCompleteSessionTaskMetrics] = self.sessionTaskMetrics;
        }
    }
#endif

    if (self.downloadFileURL) {
        userInfo[AFNetworkingTaskDidCompleteAssetPathKey] = self.downloadFileURL;
    } else if (data) {
        userInfo[AFNetworkingTaskDidCompleteResponseDataKey] = data;
    }

    if (error) {
        userInfo[AFNetworkingTaskDidCompleteErrorKey] = error;

        dispatch_group_async(manager.completionGroup ?: url_session_manager_completion_group(), manager.completionQueue ?: dispatch_get_main_queue(), ^{
           // \u6267\u884C\u4EE3\u7406\u5BF9\u8C61\u7684 completionHandler 
            if (self.completionHandler) {
                self.completionHandler(task.response, responseObject, error);
            }
						// \u53D1\u9001\u901A\u77E5 \u4E0B\u8F7D\u5B8C\u6210
            dispatch_async(dispatch_get_main_queue(), ^{
                [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
            });
        });
    } else {
        dispatch_async(url_session_manager_processing_queue(), ^{
          	// \u5904\u7406\u8FD4\u56DE\u7684\u6570\u636E
          	// \u5904\u7406\u8FD4\u56DE\u7684\u9519\u8BEF\u7801\u662F\u5426\u6709\u6548
          	// \u8F6C\u6210json\u6570\u636E
            NSError *serializationError = nil;
            responseObject = [manager.responseSerializer responseObjectForResponse:task.response data:data error:&amp;serializationError];

            if (self.downloadFileURL) {
                responseObject = self.downloadFileURL;
            }

            if (responseObject) {
                userInfo[AFNetworkingTaskDidCompleteSerializedResponseKey] = responseObject;
            }

            if (serializationError) {
                userInfo[AFNetworkingTaskDidCompleteErrorKey] = serializationError;
            }

            dispatch_group_async(manager.completionGroup ?: url_session_manager_completion_group(), manager.completionQueue ?: dispatch_get_main_queue(), ^{
              	// \u6267\u884C\u4EE3\u7406\u5BF9\u8C61\u7684 completionHandler 
                if (self.completionHandler) {
                    self.completionHandler(task.response, responseObject, serializationError);
                }
 								// \u53D1\u9001\u901A\u77E5 \u4E0B\u8F7D\u5B8C\u6210
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
                });
            });
        });
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br></div></div><h4 id="\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#\u7F13\u5B58" aria-hidden="true">#</a> <a name="cache"></a>\u7F13\u5B58</h4><p>UIKit \u7684\u6269\u5C55\u5E93\u4E2D\uFF0C\u4E0B\u8F7D\u56FE\u7247\u7684\u65F6\u5019\uFF0C\u4F7F\u7528\u4E86\u5185\u5B58\u7F13\u5B58\u7C7B <code>AFAutoPurgingImageCache</code>\u3002\u8BE5\u7C7B\u5B9E\u73B0\u4E86 <code>AFImageRequestCache</code> \u5185\u5B58\u7F13\u5B58\u534F\u8BAE\u3002</p><p>\u8BA1\u7B97\u56FE\u7247\u5185\u5B58\u5927\u5C0F\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (instancetype)initWithImage:(UIImage *)image identifier:(NSString *)identifier {
    if (self = [self init]) {
        self.image = image;
        self.identifier = identifier;

        CGSize imageSize = CGSizeMake(image.size.width * image.scale, image.size.height * image.scale);
        // \u6BCF\u4E2A\u50CF\u7D20\u53604\u4E2A\u5B57\u8282\uFF0C 32\u4E2Abit
        CGFloat bytesPerPixel = 4.0;
        CGFloat bytesPerSize = imageSize.width * imageSize.height;
        self.totalBytes = (UInt64)bytesPerPixel * (UInt64)bytesPerSize;
        self.lastAccessDate = [NSDate date];
    }
    return self;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u7F13\u5B58\u56FE\u7247\uFF0C\u5B9E\u73B0\u4E86 <code>AFImageRequestCache</code> \u534F\u8BAE\u7684\u5982\u4E0B\u65B9\u6CD5</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 Adds the image to the cache with the given identifier.

 @param image The image to cache.
 @param identifier The unique identifier for the image in the cache.
 */
- (void)addImage:(UIImage *)image withIdentifier:(NSString *)identifier;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5177\u4F53\u5B9E\u73B0\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)addImage:(UIImage *)image withIdentifier:(NSString *)identifier {
  	//  \`dispatch_barrier_async\` \u4FDD\u8BC1\u5E76\u884C\u961F\u5217 \`self.synchronizationQueue\` \u91CC\u9762\u7684\u5176\u4ED6\u64CD\u4F5C\u90FD\u5B8C\u6210\u4E4B\u540E\uFF0C\u5728\u6267\u884C\u6DFB\u52A0\u7F13\u5B58\u64CD\u4F5C
  	dispatch_barrier_async(self.synchronizationQueue, ^{
        AFCachedImage *cacheImage = [[AFCachedImage alloc] initWithImage:image identifier:identifier];
				// \u5224\u65AD\u56FE\u7247\u662F\u5426\u5DF2\u7ECF\u7F13\u5B58\u8FC7
        AFCachedImage *previousCachedImage = self.cachedImages[identifier];
        if (previousCachedImage != nil) {
            self.currentMemoryUsage -= previousCachedImage.totalBytes;
        }

        self.cachedImages[identifier] = cacheImage;
        self.currentMemoryUsage += cacheImage.totalBytes;
    });
		
  	// \u6DFB\u52A0\u7F13\u5B58\u4E4B\u540E\uFF0C\u68C0\u67E5\u7F13\u5B58\u662F\u5426\u5DF2\u7ECF\u8D85\u8FC7\u8BBE\u5B9A\u7684\u9608\u503C
    dispatch_barrier_async(self.synchronizationQueue, ^{
        if (self.currentMemoryUsage &gt; self.memoryCapacity) {
            UInt64 bytesToPurge = self.currentMemoryUsage - self.preferredMemoryUsageAfterPurge;
            NSMutableArray &lt;AFCachedImage*&gt; *sortedImages = [NSMutableArray arrayWithArray:self.cachedImages.allValues];
            NSSortDescriptor *sortDescriptor = [[NSSortDescriptor alloc] initWithKey:@&quot;lastAccessDate&quot;
                                                                           ascending:YES];
          	// \u6839\u636E\u6700\u540E\u5B58\u53D6\u65F6\u95F4\uFF0C\u6765\u5347\u5E8F\u6392\u5E8F
            [sortedImages sortUsingDescriptors:@[sortDescriptor]];

            UInt64 bytesPurged = 0;
						// \u79FB\u9664\u65F6\u95F4\u6700\u65E9\u7684\u56FE\u7247
            for (AFCachedImage *cachedImage in sortedImages) {
                [self.cachedImages removeObjectForKey:cachedImage.identifier];
                bytesPurged += cachedImage.totalBytes;
                if (bytesPurged &gt;= bytesToPurge) {
                    break ;
                }
            }
            self.currentMemoryUsage -= bytesPurged;
        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div>`,46),u=n("\u4F7F\u7528\u4E86 "),d=e("code",null,"NSSortDescriptor",-1),m=n(" \u6765\u6839\u636E\u6700\u540E\u8BBF\u95EE\u65F6\u95F4\u6765\u6392\u5E8F\uFF0C \u5177\u4F53\u7528\u6CD5\u53C2\u8003\u4F5C\u8005\u535A\u5BA2 "),g={href:"https://nshipster.com/nssortdescriptor/",target:"_blank",rel:"noopener noreferrer"},f=n("NSSortDescriptor"),S=n("\u3002"),h=r(`<p>\u79FB\u9664\u56FE\u7247\u5177\u4F53\u5B9E\u73B0\u5982\u4E0B:</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (BOOL)removeImageWithIdentifier:(NSString *)identifier {
    __block BOOL removed = NO;
  	// \u7B49\u5F85\u5E76\u884C\u961F\u5217\u5176\u4ED6\u64CD\u4F5C\u5B8C\u6210\uFF0C\u540C\u6B65\u6267\u884C\u79FB\u9664\u64CD\u4F5C
    dispatch_barrier_sync(self.synchronizationQueue, ^{
        AFCachedImage *cachedImage = self.cachedImages[identifier];
        if (cachedImage != nil) {
            [self.cachedImages removeObjectForKey:identifier];
            self.currentMemoryUsage -= cachedImage.totalBytes;
            removed = YES;
        }
    });
    return removed;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="\u56FE\u7247\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247\u4E0B\u8F7D" aria-hidden="true">#</a> <a name="image-download"></a>\u56FE\u7247\u4E0B\u8F7D</h4><p>\u4EE5 <code>UIImageView+AFNetworking</code> \u4E3A\u4F8B\uFF0C\u63D0\u4F9B\u4E86\u5982\u4E0B\u4E0B\u8F7D\u63A5\u53E3</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>// \u6839\u636E URL \u4E0B\u8F7D\u56FE\u7247
- (void)setImageWithURL:(NSURL *)url;

// \u6839\u636E URL \u4E0B\u8F7D\u56FE\u7247\uFF0C\u5E76\u8BBE\u7F6E\u5360\u4F4D\u56FE
- (void)setImageWithURL:(NSURL *)url placeholderImage:(nullable UIImage *)placeholderImage;

// \u6839\u636E\u8BF7\u6C42\u4E0B\u8F7D\u56FE\u7247\uFF0C\u5E76\u8BBE\u7F6E\u5360\u4F4D\u56FE\uFF0C\u63D0\u4F9B\u56DE\u8C03
- (void)setImageWithURLRequest:(NSURLRequest *)urlRequest 
placeholderImage:(nullable UIImage *)placeholderImage 
success:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, UIImage *image))success 
failure:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u6700\u7EC8\u90FD\u65B9\u6CD5\u90FD\u8FDB\u5165\u5230</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (void)setImageWithURLRequest:(NSURLRequest *)urlRequest
              placeholderImage:(UIImage *)placeholderImage
                       success:(void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, UIImage *image))success
                       failure:(void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure
{
    // \u68C0\u67E5 URL
    if ([urlRequest URL] == nil) {
        self.image = placeholderImage;
        if (failure) {
            NSError *error = [NSError errorWithDomain:NSURLErrorDomain code:NSURLErrorBadURL userInfo:nil];
            failure(urlRequest, nil, error);
        }
        return;
    }
    
    // \u8BE5\u8BF7\u6C42\u662F\u5426\u6B63\u5728\u6267\u884C
    if ([self isActiveTaskURLEqualToURLRequest:urlRequest]){
        return;
    }
    
   	// \u53D6\u6D88\u5F53\u524D\u6267\u884C\u7684\u4E0B\u8F7D\u4EFB\u52A1                
    [self cancelImageDownloadTask];
    
    // \u4F18\u5148\u4ECE\u5185\u5B58\u7F13\u5B58\u4E2D\u83B7\u53D6\u56FE\u7247
    AFImageDownloader *downloader = [[self class] sharedImageDownloader];
    id &lt;AFImageRequestCache&gt; imageCache = downloader.imageCache;

    //Use the image from the image cache if it exists
    UIImage *cachedImage = [imageCache imageforRequest:urlRequest withAdditionalIdentifier:nil];
    if (cachedImage) {
        if (success) {
            success(urlRequest, nil, cachedImage);
        } else {
            self.image = cachedImage;
        }
        // \u83B7\u53D6\u5230\u7F13\u5B58\uFF0C\u6E05\u9664\u6B63\u5728\u4E0B\u8F7D\u7684\u64CD\u4F5C
        [self clearActiveDownloadInformation];
    } else {
        // \u6CA1\u6709\u7F13\u5B58\uFF0C \u5148\u663E\u793A\u5360\u4F4D\u56FE(\u5982\u679C\u63D0\u4F9B\u7684\u8BDD)
        if (placeholderImage) {
            self.image = placeholderImage;
        }
				// \u6267\u884C\u771F\u6B63\u7684\u4E0B\u8F7D\u64CD\u4F5C
        __weak __typeof(self)weakSelf = self;
        NSUUID *downloadID = [NSUUID UUID];
        AFImageDownloadReceipt *receipt;
        receipt = [downloader
                   downloadImageForURLRequest:urlRequest
                   withReceiptID:downloadID
                   success:^(NSURLRequest * _Nonnull request, NSHTTPURLResponse * _Nullable response, UIImage * _Nonnull responseObject) {
                       __strong __typeof(weakSelf)strongSelf = weakSelf;
                       if ([strongSelf.af_activeImageDownloadReceipt.receiptID isEqual:downloadID]) {
                           if (success) {
                               success(request, response, responseObject);
                           } else if(responseObject) {
                               // \u663E\u793A\u4E0B\u8F7D\u7684\u56FE\u7247
                               strongSelf.image = responseObject;
                           }
                           [strongSelf clearActiveDownloadInformation];
                       }

                   }
                   failure:^(NSURLRequest * _Nonnull request, NSHTTPURLResponse * _Nullable response, NSError * _Nonnull error) {
                       __strong __typeof(weakSelf)strongSelf = weakSelf;
                        if ([strongSelf.af_activeImageDownloadReceipt.receiptID isEqual:downloadID]) {
                            if (failure) {
                                failure(request, response, error);
                            }
                            [strongSelf clearActiveDownloadInformation];
                        }
                   }];

        self.af_activeImageDownloadReceipt = receipt;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br></div></div><p>\u4E0B\u8F7D\u56FE\u7247\u5728 <code>AFImageDownloader</code> \u4E2D\u6267\u884C\uFF0C\u8BE5\u7C7B\u662F\u5BF9 <code>AFHTTPSessionManager</code> \u7684\u7F51\u7EDC\u8BF7\u6C42\u505A\u4E86\u5C01\u88C5\uFF0C\u7528\u4E8E\u6267\u884C\u56FE\u7247\u4E0B\u8F7D\u4EE5\u53CA\u56FE\u7247\u7F13\u5B58\u7B49\u64CD\u4F5C\u3002 \u5177\u4F53\u4E0B\u8F7D\u903B\u8F91\u5982\u4E0B\uFF1A</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (nullable AFImageDownloadReceipt *)downloadImageForURLRequest:(NSURLRequest *)request
                                                  withReceiptID:(nonnull NSUUID *)receiptID
                                                        success:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse  * _Nullable response, UIImage *responseObject))success
                                                        failure:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure {
    __block NSURLSessionDataTask *task = nil;
    // \u5728\u4E32\u884C\u961F\u5217\u91CC\u9762 \u540C\u6B65 \u751F\u6210\u4E0B\u8F7D\u64CD\u4F5C\uFF0C\u4FDD\u8BC1\u7EBF\u7A0B\u5B89\u5168
    dispatch_sync(self.synchronizationQueue, ^{
        
        NSString *URLIdentifier = request.URL.absoluteString;
        if (URLIdentifier == nil) {
            if (failure) {
                NSError *error = [NSError errorWithDomain:NSURLErrorDomain code:NSURLErrorBadURL userInfo:nil];
                dispatch_async(dispatch_get_main_queue(), ^{
                    failure(request, nil, error);
                });
            }
            return;
        }

        // 1) Append the success and failure blocks to a pre-existing request if it already exists
        AFImageDownloaderMergedTask *existingMergedTask = self.mergedTasks[URLIdentifier];
        if (existingMergedTask != nil) {
            // \u6B63\u5728\u4E0B\u8F7D\uFF0C\u6DFB\u52A0\u4E0B\u8F7D\u4E0B\u8F7D\u56DE\u8C03
            AFImageDownloaderResponseHandler *handler = [[AFImageDownloaderResponseHandler alloc] initWithUUID:receiptID success:success failure:failure];
            [existingMergedTask addResponseHandler:handler];
            task = existingMergedTask.task;
            return;
        }

        // 2) Attempt to load the image from the image cache if the cache policy allows it
        switch (request.cachePolicy) {
            case NSURLRequestUseProtocolCachePolicy:
            case NSURLRequestReturnCacheDataElseLoad:
            case NSURLRequestReturnCacheDataDontLoad: {
                // \u83B7\u53D6\u7F13\u5B58\u56FE\u7247
                UIImage *cachedImage = [self.imageCache imageforRequest:request withAdditionalIdentifier:nil];
                if (cachedImage != nil) {
                    if (success) {
                        dispatch_async(dispatch_get_main_queue(), ^{
                            success(request, nil, cachedImage);
                        });
                    }
                    return;
                }
                break;
            }
            default:
                break;
        }

        // 3) Create the request and set up authentication, validation and response serialization
        NSUUID *mergedTaskIdentifier = [NSUUID UUID];
        NSURLSessionDataTask *createdTask;
        __weak __typeof__(self) weakSelf = self;
        // \u521B\u9020\u4E0B\u8F7D\u8BF7\u6C42
        createdTask = [self.sessionManager
                       dataTaskWithRequest:request
                       uploadProgress:nil
                       downloadProgress:nil
                       completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
                           dispatch_async(self.responseQueue, ^{
                               __strong __typeof__(weakSelf) strongSelf = weakSelf;
                               // \u53D6\u51FA\u4FDD\u5B58\u7684\u4E0B\u8F7D\u8BF7\u6C42
                               AFImageDownloaderMergedTask *mergedTask = [strongSelf safelyGetMergedTask:URLIdentifier];
                               if ([mergedTask.identifier isEqual:mergedTaskIdentifier]) {
                                   mergedTask = [strongSelf safelyRemoveMergedTaskWithURLIdentifier:URLIdentifier];
                                   if (error) {
                                       // \u56DE\u8C03\u6240\u6709\u7684\u5931\u8D25\u56DE\u8C03\u4FE1\u606F
                                       for (AFImageDownloaderResponseHandler *handler in mergedTask.responseHandlers) {
                                           if (handler.failureBlock) {
                                               dispatch_async(dispatch_get_main_queue(), ^{
                                                   handler.failureBlock(request, (NSHTTPURLResponse *)response, error);
                                               });
                                           }
                                       }
                                   } else {
                                       // \u7F13\u5B58\u4E0B\u8F7D\u56FE\u7247
                                       if ([strongSelf.imageCache shouldCacheImage:responseObject forRequest:request withAdditionalIdentifier:nil]) {
                                           [strongSelf.imageCache addImage:responseObject forRequest:request withAdditionalIdentifier:nil];
                                       }
                                       // \u56DE\u8C03\u6240\u6709\u7684\u6210\u529F\u56DE\u8C03\u4FE1\u606F
                                       for (AFImageDownloaderResponseHandler *handler in mergedTask.responseHandlers) {
                                           if (handler.successBlock) {
                                               dispatch_async(dispatch_get_main_queue(), ^{
                                                   handler.successBlock(request, (NSHTTPURLResponse *)response, responseObject);
                                               });
                                           }
                                       }
                                       
                                   }
                               }
                               [strongSelf safelyDecrementActiveTaskCount];
                               // \u5F00\u542F\u4E00\u4E0B\u4E00\u4E2A\u8BF7\u6C42
                               [strongSelf safelyStartNextTaskIfNecessary];
                           });
                       }];
        // \u5B58\u50A8\u4E0B\u8F7D\u8BF7\u6C42\uFF0C\u7528\u4E8E\u4E0B\u8F7D\u5B8C\u6210\u65F6\u7684\u56DE\u8C03
        // 4) Store the response handler for use when the request completes
        AFImageDownloaderResponseHandler *handler = [[AFImageDownloaderResponseHandler alloc] initWithUUID:receiptID
                                                                                                   success:success
                                                                                                   failure:failure];
        AFImageDownloaderMergedTask *mergedTask = [[AFImageDownloaderMergedTask alloc]
                                                   initWithURLIdentifier:URLIdentifier
                                                   identifier:mergedTaskIdentifier
                                                   task:createdTask];
        [mergedTask addResponseHandler:handler];
        self.mergedTasks[URLIdentifier] = mergedTask;
        // \u5224\u65AD\u4E0B\u8F7D\u8BF7\u6C42\u662F\u5426\u8FBE\u5230\u9608\u503C\uFF0C\u9ED8\u8BA4\u6700\u5927\u4E0B\u8F7D4\u4E2A
        // 5) Either start the request or enqueue it depending on the current active request count
        if ([self isActiveRequestCountBelowMaximumLimit]) {
            [self startMergedTask:mergedTask];
        } else {
            [self enqueueMergedTask:mergedTask];
        }

        task = mergedTask.task;
    });
    if (task) {
        return [[AFImageDownloadReceipt alloc] initWithReceiptID:receiptID task:task];
    } else {
        return nil;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br></div></div><p>\u6267\u884C\u4E0B\u8F7D\u903B\u8F91\u5982\u4E0B\uFF1A</p><ol><li>\u5224\u65AD <code>URL</code> \u662F\u5426\u5408\u7406</li><li>\u5224\u65AD\u8FD9\u4E2A <code>URL</code> \u751F\u6210\u7684 <code>task</code> \u662F\u5426\u5DF2\u7ECF\u7F13\u5B58\uFF0C \u5982\u679C\u5DF2\u7ECF\u7F13\u5B58\uFF0C\u7ED9\u8BE5 <code>task</code> \u6DFB\u52A0\u4E00\u4E2A\u56DE\u8C03</li><li>\u6839\u636E\u8BF7\u6C42\u7B56\u7565\u53BB\u83B7\u53D6\u7F13\u5B58\u56FE\u7247</li><li>\u6CA1\u6709\u83B7\u53D6\u5230\u7F13\u5B58\u56FE\u7247\uFF0C\u5219\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u4E0B\u8F7D\u8BF7\u6C42 task</li><li>\u7F13\u5B58\u8BE5\u4E0B\u8F7D <code>task</code>\uFF0C\u8DDF\u4E0B\u8F7D\u56DE\u8C03\uFF0C\u4E0B\u8F7D <code>URL</code> \u7B49\u4FE1\u606F\u7ED1\u5B9A\u5728\u4E00\u8D77\uFF0C\u65B9\u4FBF\u4E0B\u8F7D\u6210\u529F\u4E4B\u540E\uFF0C\u67E5\u627E\u56DE\u8C03\u4FE1\u606F\u7B49</li><li>\u5224\u65AD\u5F53\u524D\u7684\u6D3B\u8DC3\u7684\u8BF7\u6C42\u4E2A\u6570\u662F\u5426\u5DF2\u7ECF\u8D85\u8FC7\u9608\u503C\uFF0C\u5982\u679C\u6CA1\u6709\u6267\u884C\u4E0B\u8F7D\u64CD\u4F5C\uFF0C\u5982\u679C\u8D85\u8FC7\uFF0C\u6839\u636E\u8BF7\u6C42\u7F13\u5B58\u7B56\u7565\uFF0C\u628A\u8BE5 <code>task</code> \u5B58\u5230\u9002\u5F53\u7684\u4F4D\u7F6E</li><li>\u4E0B\u8F7D\u6210\u529F\u4E4B\u540E\uFF0C\u6839\u636E URL \u53D6\u51FA\u4FDD\u5B58\u7684\u4E0B\u8F7D\u56DE\u8C03\u4FE1\u606F\uFF0C\u6839\u636E\u4E0B\u8F7D\u7ED3\u679C\u6267\u884C\u76F8\u5E94\u7684\u4E0B\u8F7D\u56DE\u8C03</li></ol><h4 id="\u5176\u4ED6\u77E5\u8BC6" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u77E5\u8BC6" aria-hidden="true">#</a> <a name="others"></a>\u5176\u4ED6\u77E5\u8BC6</h4><ol><li><p>\u4FDD\u8BC1\u7EBF\u7A0B\u5B89\u5168</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>- (AFImageDownloaderMergedTask *)safelyGetMergedTask:(NSString *)URLIdentifier {
    __block AFImageDownloaderMergedTask *mergedTask;
    dispatch_sync(self.synchronizationQueue, ^(){
        mergedTask = self.mergedTasks[URLIdentifier];
    });
    return mergedTask;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u53D6\u51FA\u4E0B\u8F7D\u4EFB\u52A1\u7684\u65F6\u5019\uFF0C\u5728\u4E00\u4E2A\u4E32\u884C\u961F\u5217\u91CC\u9762\u540C\u6B65\u6267\u884C\u64CD\u4F5C\u3002</p></li><li><p>\u5206\u7C7B\u52A8\u6001\u6DFB\u52A0\u5C5E\u6027</p><div class="language-objective ext-objective line-numbers-mode"><pre class="language-objective"><code>+ (AFImageDownloader *)sharedImageDownloader {
    return objc_getAssociatedObject(self, @selector(sharedImageDownloader)) ?: [AFImageDownloader defaultInstance];
}

+ (void)setSharedImageDownloader:(AFImageDownloader *)imageDownloader {
    objc_setAssociatedObject(self, @selector(sharedImageDownloader), imageDownloader, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5728 UIImageView \u5206\u7C7B\u4E2D\u52A8\u6001\u6DFB\u52A0\u4E0B\u8F7D\u5BF9\u8C61\u3002</p></li></ol><h4 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> <a name="reference"></a>\u53C2\u8003</h4>`,14),k={href:"http://cocoadocs.org/docsets/AFNetworking/3.1.0",target:"_blank",rel:"noopener noreferrer"},R=n("AFNetworking docs"),v={href:"https://juejin.im/post/5c5c2b8251882562826951b8",target:"_blank",rel:"noopener noreferrer"},N=n("\u6D45\u8C08\u79FB\u52A8\u7AEF\u56FE\u7247\u538B\u7F29");function U(I,T){const s=l("ExternalLinkIcon");return i(),p(b,null,[t,e("p",null,[u,d,m,e("a",g,[f,a(s)]),S]),h,e("p",null,[e("a",k,[R,a(s)])]),e("p",null,[e("a",v,[N,a(s)])])],64)}var D=c(o,[["render",U]]);export{D as default};
