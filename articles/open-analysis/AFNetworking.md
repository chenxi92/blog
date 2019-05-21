### <p align="center">AFNetworking  源码分析

<p align="right">
2019-5-11
</p>
SDK 版本 3.2.1

#### 目录

- [架构图](#architect-flow)
- [网络请求流程](#request-flow)
- [网络响应流程](#response-flow)

- [缓存](#cache)

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
    // 保存请求的回调到dataTask的代理对象上
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

`AFURLSessionManager` 实现了 `NSURLSessionDelegate`, `NSURLSessionTaskDelegate`, `NSURLSessionDataDelegate`, `NSURLSessionDownloadDelegate` 等网络协议。



接受数据处理流程如下：

```objective-c
- (void)URLSession:(NSURLSession *)session
          dataTask:(NSURLSessionDataTask *)dataTask
    didReceiveData:(NSData *)data
{
    // 获取task的代理对象，并由该代理对象去处理相关数据
    AFURLSessionManagerTaskDelegate *delegate = [self delegateForTask:dataTask];
    [delegate URLSession:session dataTask:dataTask didReceiveData:data];
    
    // block如果存在，执行block处理数据
    if (self.dataTaskDidReceiveData) {
        self.dataTaskDidReceiveData(session, dataTask, data);
    }
}
```

获取 `task` 的代理对象

```objective-c
- (AFURLSessionManagerTaskDelegate *)delegateForTask:(NSURLSessionTask *)task {
    NSParameterAssert(task);

    AFURLSessionManagerTaskDelegate *delegate = nil;
    [self.lock lock]; // 加锁
    // 根据每一个 task 的 taskIdentifier 的属性值来获取代理对象
    delegate = self.mutableTaskDelegatesKeyedByTaskIdentifier[@(task.taskIdentifier)];
    [self.lock unlock];

    return delegate;
}
```

`task` 的代理对象 `AFURLSessionManagerTaskDelegate` ，实现了 `NSURLSessionTaskDelegate`, `NSURLSessionDataDelegate`, `NSURLSessionDownloadDelegate` 协议。

接收的数据具体由 `AFURLSessionManagerTaskDelegate` 类来处理

```objective-c
- (void)URLSession:(__unused NSURLSession *)session
          dataTask:(__unused NSURLSessionDataTask *)dataTask
    didReceiveData:(NSData *)data
{
    // 更新下载进度
    self.downloadProgress.totalUnitCount = dataTask.countOfBytesExpectedToReceive;
    self.downloadProgress.completedUnitCount = dataTask.countOfBytesReceived;
		// 保存数据
    [self.mutableData appendData:data];
}
```



下载完成处理流程：

```objective-c
- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error
{
    // 获取代理
    AFURLSessionManagerTaskDelegate *delegate = [self delegateForTask:task];

    // delegate may be nil when completing a task in the background
    if (delegate) {
      	// 代理来处理数据
        [delegate URLSession:session task:task didCompleteWithError:error];
        // 移除代理对象
        [self removeDelegateForTask:task];
    }
		// block 处理下载完成的情况
    if (self.taskDidComplete) {
        self.taskDidComplete(session, task, error);
    }
}
```



代理具体处理数据为

```objective-c
- (void)URLSession:(__unused NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error
{
    __strong AFURLSessionManager *manager = self.manager;

    __block id responseObject = nil;

    __block NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    userInfo[AFNetworkingTaskDidCompleteResponseSerializerKey] = manager.responseSerializer;
    
    // 提升性能，不再需要的数据，及时释放
    //Performance Improvement from #2672
    NSData *data = nil;
    if (self.mutableData) {
        data = [self.mutableData copy];
        //We no longer need the reference, so nil it out to gain back some memory.
        self.mutableData = nil;
    }

#if AF_CAN_USE_AT_AVAILABLE && AF_CAN_INCLUDE_SESSION_TASK_METRICS
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
           // 执行代理对象的 completionHandler 
            if (self.completionHandler) {
                self.completionHandler(task.response, responseObject, error);
            }
						// 发送通知 下载完成
            dispatch_async(dispatch_get_main_queue(), ^{
                [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
            });
        });
    } else {
        dispatch_async(url_session_manager_processing_queue(), ^{
          	// 处理返回的数据
          	// 处理返回的错误码是否有效
          	// 转成json数据
            NSError *serializationError = nil;
            responseObject = [manager.responseSerializer responseObjectForResponse:task.response data:data error:&serializationError];

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
              	// 执行代理对象的 completionHandler 
                if (self.completionHandler) {
                    self.completionHandler(task.response, responseObject, serializationError);
                }
 								// 发送通知 下载完成
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
                });
            });
        });
    }
}
```



#### <a name="cache"></a>缓存

UIKit 的扩展库中，下载图片的时候，使用了内存缓存类 `AFAutoPurgingImageCache`。该类实现了 `AFImageRequestCache` 内存缓存协议。



图片像素大小计算：

```objective-c
- (instancetype)initWithImage:(UIImage *)image identifier:(NSString *)identifier {
    if (self = [self init]) {
        self.image = image;
        self.identifier = identifier;

        CGSize imageSize = CGSizeMake(image.size.width * image.scale, image.size.height * image.scale);
       // 每个像素4个字节
        CGFloat bytesPerPixel = 4.0;
        CGFloat bytesPerSize = imageSize.width * imageSize.height;
        self.totalBytes = (UInt64)bytesPerPixel * (UInt64)bytesPerSize;
        self.lastAccessDate = [NSDate date];
    }
    return self;
}
```

参考 [     浅谈移动端图片压缩（iOS & Android）](https://juejin.im/post/5c5c2b8251882562826951b8)

```
表示颜色时，有两种形式，一种为索引色（Index Color），一种为直接色（Direct Color）

索引色：用一个数字索引代表一种颜色，在图像信息中存储数字到颜色的映射关系表（调色盘 Palette）。每个像素保存该像素颜色对应的数字索引。一般调色盘只能存储有限种类的颜色，通常为 256 种。所以每个像素的数字占用 1 字节（8 bit）大小。
直接色：用四个数字来代表一种颜色，数字分别对应颜色中红色，绿色，蓝色，透明度（RGBA）。每个像素保存这四个纬度的信息来代表该像素的颜色。根据色彩深度（每个像素存储颜色信息的 bit 数不同），最多可以支持的颜色种类也不同，常见的有 8 位（R3+G3+B2）、16 位（R5+G6+B5）、24 位（R8+G8+B8）、32 位（A8+R8+G8+B8）。所以每个像素占用 1~4 字节大小。
```





#### 参考

[AFNetworking docs](http://cocoadocs.org/docsets/AFNetworking/3.1.0)

[AFNetworking 源码分析](https://www.jianshu.com/p/856f0e26279d)
