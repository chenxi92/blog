

### iOS 和 Unity 相互调用



#### Unity 调用 iOS

1. 在 `.cs` 文件内定义如下函数

```c#
[DllImport ("__Internal")]
private static extern float FooPluginFunction(string name); // 参数为字符串类型，返回值 float 类型
```

2. 在 `.cpp.`  或者  `.mm` 文件内实现如下函数

```c
extern "C" {
  float FooPluginFunction(const char* name)
  {
      // Unity 端调用到 iOS 端
    	printf("name is = %s", name);
      return 1.0;
  }
}
```



#### iOS 调用 Unity

1. 在 `.cpp`或 `.mm` 文件内，调用如下方法

```c++
// 第一个参数: 脚本挂载的 Object 的名称
// 第二个参数: 在 CS 文件上定义的方法名称
// 第三个参数: 传递的参数（只支持传递 string 类型的内容）
UnitySendMessage("GameObjectName1", "iosToUnity", "Message to send");
```

2. 在 `.cs` 文件内实现，如下方法

```c#
public void iosToUnity(string msg)
{
    // iOS 端调用到 Unity 端
  	Debug.Log("iOS to Unity, msg = ", msg);
}
```



#### iOS 中间层写法

1. 新建 `Unity_iOS_Bridge.h` 和 `Unity_iOS_Bridge.mm` 文件, 文件放在 Unity 工程的 `Assets/Plugins/iOS/ ` 文件夹下
2. `Unity_iOS_Bridge.h` 文件写法：

```objective-c
#import <Foundation/Foundation.h>
#import "UnityAppController.h"
// 集成自 UnityAppController
@interface Unity_iOS_Bridge : UnityAppController

@end
```



3. `Unity_iOS_Bridge.mm` 文件写法：

```objective-c
// Unity_iOS_Bridge 添加分类
IMPL_APP_CONTROLLER_SUBCLASS(Unity_iOS_Bridge)

@implementation Unity_iOS_Bridge

#pragma mark - 生命周期

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
		// 先执行父类的生命周期方法  
  	[super application:application didFinishLaunchingWithOptions:launchOptions];
    
    // 执行自定义操作
    
    return YES;
}

@end

extern "C" {
  float FooPluginFunction()
  {
      // Unity 端调用到iOS端
      return 1.0
  }
}
```





### 参考

[plugins for iOS](https://docs.unity3d.com/Manual/PluginsForIOS.html)