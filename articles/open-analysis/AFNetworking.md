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
- [图片下载](#image-download)
- [其他知识](#others)
- [参考](#reference)

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



计算图片内存大小代码如下：

```objective-c
- (instancetype)initWithImage:(UIImage *)image identifier:(NSString *)identifier {
    if (self = [self init]) {
        self.image = image;
        self.identifier = identifier;

        CGSize imageSize = CGSizeMake(image.size.width * image.scale, image.size.height * image.scale);
        // 每个像素占4个字节， 32个bit
        CGFloat bytesPerPixel = 4.0;
        CGFloat bytesPerSize = imageSize.width * imageSize.height;
        self.totalBytes = (UInt64)bytesPerPixel * (UInt64)bytesPerSize;
        self.lastAccessDate = [NSDate date];
    }
    return self;
}
```



缓存图片，实现了 `AFImageRequestCache` 协议的如下方法

```
/**
 Adds the image to the cache with the given identifier.

 @param image The image to cache.
 @param identifier The unique identifier for the image in the cache.
 */
- (void)addImage:(UIImage *)image withIdentifier:(NSString *)identifier;
```

具体实现如下：

```objective-c
- (void)addImage:(UIImage *)image withIdentifier:(NSString *)identifier {
  	//  `dispatch_barrier_async` 保证并行队列 `self.synchronizationQueue` 里面的其他操作都完成之后，在执行添加缓存操作
  	dispatch_barrier_async(self.synchronizationQueue, ^{
        AFCachedImage *cacheImage = [[AFCachedImage alloc] initWithImage:image identifier:identifier];
				// 判断图片是否已经缓存过
        AFCachedImage *previousCachedImage = self.cachedImages[identifier];
        if (previousCachedImage != nil) {
            self.currentMemoryUsage -= previousCachedImage.totalBytes;
        }

        self.cachedImages[identifier] = cacheImage;
        self.currentMemoryUsage += cacheImage.totalBytes;
    });
		
  	// 添加缓存之后，检查缓存是否已经超过设定的阈值
    dispatch_barrier_async(self.synchronizationQueue, ^{
        if (self.currentMemoryUsage > self.memoryCapacity) {
            UInt64 bytesToPurge = self.currentMemoryUsage - self.preferredMemoryUsageAfterPurge;
            NSMutableArray <AFCachedImage*> *sortedImages = [NSMutableArray arrayWithArray:self.cachedImages.allValues];
            NSSortDescriptor *sortDescriptor = [[NSSortDescriptor alloc] initWithKey:@"lastAccessDate"
                                                                           ascending:YES];
          	// 根据最后存取时间，来升序排序
            [sortedImages sortUsingDescriptors:@[sortDescriptor]];

            UInt64 bytesPurged = 0;
						// 移除时间最早的图片
            for (AFCachedImage *cachedImage in sortedImages) {
                [self.cachedImages removeObjectForKey:cachedImage.identifier];
                bytesPurged += cachedImage.totalBytes;
                if (bytesPurged >= bytesToPurge) {
                    break ;
                }
            }
            self.currentMemoryUsage -= bytesPurged;
        }
    });
}
```

使用了 `NSSortDescriptor` 来根据最后访问时间来排序， 具体用法参考作者博客 [NSSortDescriptor](https://nshipster.com/nssortdescriptor/)。



移除图片具体实现如下:

```objective-c
- (BOOL)removeImageWithIdentifier:(NSString *)identifier {
    __block BOOL removed = NO;
  	// 等待并行队列其他操作完成，同步执行移除操作
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
```



####  <a name="image-download"></a>图片下载

以 `UIImageView+AFNetworking` 为例，提供了如下下载接口

```objective-c
// 根据 URL 下载图片
- (void)setImageWithURL:(NSURL *)url;

// 根据 URL 下载图片，并设置占位图
- (void)setImageWithURL:(NSURL *)url placeholderImage:(nullable UIImage *)placeholderImage;

// 根据请求下载图片，并设置占位图，提供回调
- (void)setImageWithURLRequest:(NSURLRequest *)urlRequest 
placeholderImage:(nullable UIImage *)placeholderImage 
success:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, UIImage *image))success 
failure:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure;
```

最终都方法都进入到

```objective-c
- (void)setImageWithURLRequest:(NSURLRequest *)urlRequest
              placeholderImage:(UIImage *)placeholderImage
                       success:(void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, UIImage *image))success
                       failure:(void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure
{
    // 检查 URL
    if ([urlRequest URL] == nil) {
        self.image = placeholderImage;
        if (failure) {
            NSError *error = [NSError errorWithDomain:NSURLErrorDomain code:NSURLErrorBadURL userInfo:nil];
            failure(urlRequest, nil, error);
        }
        return;
    }
    
    // 该请求是否正在执行
    if ([self isActiveTaskURLEqualToURLRequest:urlRequest]){
        return;
    }
    
   	// 取消当前执行的下载任务                
    [self cancelImageDownloadTask];
    
    // 优先从内存缓存中获取图片
    AFImageDownloader *downloader = [[self class] sharedImageDownloader];
    id <AFImageRequestCache> imageCache = downloader.imageCache;

    //Use the image from the image cache if it exists
    UIImage *cachedImage = [imageCache imageforRequest:urlRequest withAdditionalIdentifier:nil];
    if (cachedImage) {
        if (success) {
            success(urlRequest, nil, cachedImage);
        } else {
            self.image = cachedImage;
        }
        // 获取到缓存，清除正在下载的操作
        [self clearActiveDownloadInformation];
    } else {
        // 没有缓存， 先显示占位图(如果提供的话)
        if (placeholderImage) {
            self.image = placeholderImage;
        }
				// 执行真正的下载操作
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
                               // 显示下载的图片
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
```



下载图片在 `AFImageDownloader` 中执行，该类是对 `AFHTTPSessionManager` 的网络请求做了封装，用于执行图片下载以及图片缓存等操作。 具体下载逻辑如下：

```objective-c
- (nullable AFImageDownloadReceipt *)downloadImageForURLRequest:(NSURLRequest *)request
                                                  withReceiptID:(nonnull NSUUID *)receiptID
                                                        success:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse  * _Nullable response, UIImage *responseObject))success
                                                        failure:(nullable void (^)(NSURLRequest *request, NSHTTPURLResponse * _Nullable response, NSError *error))failure {
    __block NSURLSessionDataTask *task = nil;
    // 在串行队列里面 同步 生成下载操作，保证线程安全
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
            // 正在下载，添加下载下载回调
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
                // 获取缓存图片
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
        // 创造下载请求
        createdTask = [self.sessionManager
                       dataTaskWithRequest:request
                       uploadProgress:nil
                       downloadProgress:nil
                       completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
                           dispatch_async(self.responseQueue, ^{
                               __strong __typeof__(weakSelf) strongSelf = weakSelf;
                               // 取出保存的下载请求
                               AFImageDownloaderMergedTask *mergedTask = [strongSelf safelyGetMergedTask:URLIdentifier];
                               if ([mergedTask.identifier isEqual:mergedTaskIdentifier]) {
                                   mergedTask = [strongSelf safelyRemoveMergedTaskWithURLIdentifier:URLIdentifier];
                                   if (error) {
                                       // 回调所有的失败回调信息
                                       for (AFImageDownloaderResponseHandler *handler in mergedTask.responseHandlers) {
                                           if (handler.failureBlock) {
                                               dispatch_async(dispatch_get_main_queue(), ^{
                                                   handler.failureBlock(request, (NSHTTPURLResponse *)response, error);
                                               });
                                           }
                                       }
                                   } else {
                                       // 缓存下载图片
                                       if ([strongSelf.imageCache shouldCacheImage:responseObject forRequest:request withAdditionalIdentifier:nil]) {
                                           [strongSelf.imageCache addImage:responseObject forRequest:request withAdditionalIdentifier:nil];
                                       }
                                       // 回调所有的成功回调信息
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
                               // 开启一下一个请求
                               [strongSelf safelyStartNextTaskIfNecessary];
                           });
                       }];
        // 存储下载请求，用于下载完成时的回调
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
        // 判断下载请求是否达到阈值，默认最大下载4个
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
```



执行下载逻辑如下：

1. 判断 `URL` 是否合理
2. 判断这个 `URL` 生成的 `task` 是否已经缓存， 如果已经缓存，给该 `task` 添加一个回调
3. 根据请求策略去获取缓存图片
4. 没有获取到缓存图片，则创建一个新的下载请求 task
5. 缓存该下载 `task`，跟下载回调，下载 `URL` 等信息绑定在一起，方便下载成功之后，查找回调信息等
6. 判断当前的活跃的请求个数是否已经超过阈值，如果没有执行下载操作，如果超过，根据请求缓存策略，把该 `task` 存到适当的位置
7. 下载成功之后，根据 URL 取出保存的下载回调信息，根据下载结果执行相应的下载回调



#### <a name="others"></a>其他知识

1. 保证线程安全

   ```objective-c
   - (AFImageDownloaderMergedTask *)safelyGetMergedTask:(NSString *)URLIdentifier {
       __block AFImageDownloaderMergedTask *mergedTask;
       dispatch_sync(self.synchronizationQueue, ^(){
           mergedTask = self.mergedTasks[URLIdentifier];
       });
       return mergedTask;
   }
   ```

   取出下载任务的时候，在一个串行队列里面同步执行操作。

2. 分类动态添加属性

   ```objective-c
   + (AFImageDownloader *)sharedImageDownloader {
       return objc_getAssociatedObject(self, @selector(sharedImageDownloader)) ?: [AFImageDownloader defaultInstance];
   }
   
   + (void)setSharedImageDownloader:(AFImageDownloader *)imageDownloader {
       objc_setAssociatedObject(self, @selector(sharedImageDownloader), imageDownloader, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
   }
   ```

   在 UIImageView 分类中动态添加下载对象。

   

#### <a name="reference"></a>参考

[AFNetworking docs](http://cocoadocs.org/docsets/AFNetworking/3.1.0)

[AFNetworking 源码分析](https://www.jianshu.com/p/856f0e26279d)

[浅谈移动端图片压缩](https://juejin.im/post/5c5c2b8251882562826951b8)