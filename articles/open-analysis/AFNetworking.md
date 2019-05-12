### <p align="center">AFNetworking  源码分析

<p align="right">
2019-5-11
</p>
SDK 版本 3.2.1

#### 目录

- [架构图](#architect-flow)
- [网络请求流程](#request-flow)
- [网络响应流程](#response-flow)



#### <a name="architect-flow">架构图

- 网络通信 
  - `AFURLSessionManager`   基于 `NSURLSession` 做了一系列的封装，负责真正的网络请求。
  - `AFHTTPSessionManager` 继承自 `AFURLSessionManager` ， 具体请求逻辑交给父类来完成，一般使用该类发起网络请求。
- 网络状态监控
  - `AFNetworkReachabilityManager`  负责监控网络状态。
- 序列化/反序列化
  - `AFURLRequestSerialization` 负责构造 `NSURLRequest` 。
  - `AFURLResponseSerrialization` 负责解析 `NSURLResponse` 。
- 安全策略
  - `AFSecurityPolicy`
- UIKit扩展
  - `UIImageView+AFNetworking` `UIImageView` 的扩展，负责图片的下载以及缓存。
  - `AFAutoPurgingImageCache`  负责图片缓存
  - `AFImageDownloader` 负责图片下载，基于 `AFHTTPSessionManager` 的封装。



#### <a name="request-flow"></a>网络请求流程

以发起 `POST` 请求为例，

1. 调用如下接口初始化 `AFHTTPSessionManager` 对象

```objective-c
- (instancetype)initWithBaseURL:(nullable NSURL *)url
           sessionConfiguration:(nullable NSURLSessionConfiguration *)configuration NS_DESIGNATED_INITIALIZER;
```

初始化做了如下操作

```objective-c
- (instancetype)initWithBaseURL:(NSURL *)url
           sessionConfiguration:(NSURLSessionConfiguration *)configuration
{
    // 调用父类接口，初始化父类
    self = [super initWithSessionConfiguration:configuration];
    if (!self) {
        return nil;
    }
    
    // Ensure terminal slash for baseURL path, so that NSURL +URLWithString:relativeToURL: works as expected
    if ([[url path] length] > 0 && ![[url absoluteString] hasSuffix:@"/"]) {
        url = [url URLByAppendingPathComponent:@""];
    }

    self.baseURL = url;
    
    // 初始化 请求和响应 的序列化对象
    self.requestSerializer = [AFHTTPRequestSerializer serializer];
    self.responseSerializer = [AFJSONResponseSerializer serializer];

    return self;
}
```

2. 发起 `POST` 请求

```objective-c
- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                    parameters:(nullable id)parameters
                       success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                       failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure;
```

该 `POST` 请求最终调用到:

```
- (nullable NSURLSessionDataTask *)POST:(NSString *)URLString
                             parameters:(nullable id)parameters
                                headers:(nullable NSDictionary <NSString *, NSString *> *)headers
                               progress:(nullable void (^)(NSProgress *uploadProgress))uploadProgress
                                success:(nullable void (^)(NSURLSessionDataTask *task, id _Nullable responseObject))success
                                failure:(nullable void (^)(NSURLSessionDataTask * _Nullable task, NSError *error))failure
{
    // 构造dataTask对象
    NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"POST" URLString:URLString parameters:parameters headers:headers uploadProgress:uploadProgress downloadProgress:nil success:success failure:failure];
    
    // 执行请求
    [dataTask resume];
    
    return dataTask;
}
```

构造 `NSURLSessionDataTask` 对象做了如下操作

```objective-c
- (NSURLSessionDataTask *)dataTaskWithHTTPMethod:(NSString *)method
                                       URLString:(NSString *)URLString
                                      parameters:(id)parameters
                                         headers:(NSDictionary <NSString *, NSString *> *)headers
                                  uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgress
                                downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgress
                                         success:(void (^)(NSURLSessionDataTask *, id))success
                                         failure:(void (^)(NSURLSessionDataTask *, NSError *))failure
{
    // 使用序列化对象 构造 Requst 对象
    NSError *serializationError = nil;
    NSMutableURLRequest *request = [self.requestSerializer requestWithMethod:method URLString:[[NSURL URLWithString:URLString relativeToURL:self.baseURL] absoluteString] parameters:parameters error:&serializationError];
    // 添加请求头信息到Request对象中
    for (NSString *headerField in headers.keyEnumerator) {
        [request addValue:headers[headerField] forHTTPHeaderField:headerField];
    }
    if (serializationError) {
        if (failure) {
            dispatch_async(self.completionQueue ?: dispatch_get_main_queue(), ^{
                failure(nil, serializationError);
            });
        }

        return nil;
    }
    
    // 调用父类接口构造dataTask
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

    // 返回 dataTask
    return dataTask;
}
```

父类的构造 `dataTask` 做了如下操作

```objective-c
- (NSURLSessionDataTask *)dataTaskWithRequest:(NSURLRequest *)request
                               uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgressBlock
                             downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgressBlock
                            completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject,  NSError * _Nullable error))completionHandler {

    // 生成 NSURLSessionDataTask 对象
    __block NSURLSessionDataTask *dataTask = nil;
    url_session_manager_create_task_safely(^{
        dataTask = [self.session dataTaskWithRequest:request];
    });

    // 添加代理
    [self addDelegateForDataTask:dataTask uploadProgress:uploadProgressBlock downloadProgress:downloadProgressBlock completionHandler:completionHandler];

    return dataTask;
}
```

添加代理主要作用是把该 `dataTask` 和它对应的回调信息保存起来

```objective-c
- (void)addDelegateForDataTask:(NSURLSessionDataTask *)dataTask
                uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgressBlock
              downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgressBlock
             completionHandler:(void (^)(NSURLResponse *response, id responseObject, NSError *error))completionHandler
{
    // 生成dataTask代理对象
    AFURLSessionManagerTaskDelegate *delegate = [[AFURLSessionManagerTaskDelegate alloc] initWithTask:dataTask];
    delegate.manager = self;
    delegate.completionHandler = completionHandler;

    // 把该dataTask代理对象保存起来
    dataTask.taskDescription = self.taskDescriptionForSessionTasks;
    [self setDelegate:delegate forTask:dataTask];

    delegate.uploadProgressBlock = uploadProgressBlock;
    delegate.downloadProgressBlock = downloadProgressBlock;
}
```

实际存入是根据该 `dataTask` 的 `taskIdentifier` 属性值作为key值，保存在字典中

```objective-c
- (void)setDelegate:(AFURLSessionManagerTaskDelegate *)delegate
            forTask:(NSURLSessionTask *)task
{
    NSParameterAssert(task);
    NSParameterAssert(delegate);

    [self.lock lock];
    self.mutableTaskDelegatesKeyedByTaskIdentifier[@(task.taskIdentifier)] = delegate;
    [self addNotificationObserverForTask:task];
    [self.lock unlock];
}
```



#### <a name="response-flow"></a>网络响应流程



##### 参考

[AFNetworking docs](http://cocoadocs.org/docsets/AFNetworking/3.1.0)

[AFNetworking 源码分析](https://www.jianshu.com/p/856f0e26279d)
