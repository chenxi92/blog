# Facebook SDK integration issues



## Game crashes after start on iOS with Facebook SDK v18.0.0

I'm using `External Dependency Manager for Unity` to manage native SDK for Unity project. I add the following `FacebookSDKDependencies.xml` into `Editor` folder

```xml
<?xml version="1.0" encoding="utf-8"?>
<dependencies>
    <androidPackages>
        <androidPackage spec="com.parse.bolts:bolts-android:1.4.0" />
        <androidPackage spec="com.facebook.android:facebook-core:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-applinks:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-login:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-share:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-gamingservices:[18.0.0,19)" />
    </androidPackages>
    <iosPods>
        <iosPod name="FBSDKCoreKit_Basics" version="~> 18.0.0" />
        <iosPod name="FBSDKCoreKit" version="~> 18.0.0" />
        <iosPod name="FBSDKLoginKit" version="~> 18.0.0" />
        <iosPod name="FBSDKShareKit" version="~> 18.0.0" />
        <iosPod name="FBSDKGamingServicesKit" version="~> 18.0.0" />
    </iosPods>
</dependencies>
```



Environment

- CocoaPods version: `1.16.2`
- Xcode version: `16.3`
- Mac OS version: `15.4.1`
- Facebook SDK version: `18.0.0`
- Unity version: `2022.3.49f1`
- External Dependency Manager for Unity version: `1.2.185`

The `External Dependency Manager` -> `iOS Resolver` -> `iOS Resolver Settings` was using default.



When I run the generated Xcode project, app crashes with the following error message:

```
[general] Error loading /var/containers/Bundle/Application/F4F5FA01-9C7F-46E4-940E-C099CDFEE3DD/xxx.app/Frameworks/UnityFramework.framework/UnityFramework (142):  dlopen(/var/containers/Bundle/Application/F4F5FA01-9C7F-46E4-940E-C099CDFEE3DD/xxx.app/Frameworks/UnityFramework.framework/UnityFramework, 0x0109): Library not loaded: @rpath/FBAEMKit.framework/FBAEMKit
```



**Reason**

The `FBAEMKit.framework` was not find at runtime.



### Fix Method 1

Modify `FacebookSDKDependencies.xml` with `addToAllTargets="true"` attribute.

This can help ensure that the specified pods are linked against all targets that CocoaPods integrates with.

```xml
<?xml version="1.0" encoding="utf-8"?>
<dependencies>
    <androidPackages>
        <androidPackage spec="com.parse.bolts:bolts-android:1.4.0" />
        <androidPackage spec="com.facebook.android:facebook-core:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-applinks:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-login:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-share:[18.0.0,19)" />
        <androidPackage spec="com.facebook.android:facebook-gamingservices:[18.0.0,19)" />
    </androidPackages>
    <iosPods>
        <iosPod name="FBSDKCoreKit_Basics" version="~> 18.0.0" addToAllTargets="true" />
        <iosPod name="FBSDKCoreKit" version="~> 18.0.0" addToAllTargets="true" />
        <iosPod name="FBSDKLoginKit" version="~> 18.0.0" addToAllTargets="true" />
        <iosPod name="FBSDKShareKit" version="~> 18.0.0" addToAllTargets="true" />
        <iosPod name="FBSDKGamingServicesKit" version="~> 18.0.0" addToAllTargets="true" />
    </iosPods>
</dependencies>
```



The generated Xcode's `Podfile` looks like

```ruby
source 'https://cdn.cocoapods.org/'
source 'https://github.com/CocoaPods/Specs'

platform :ios, '12.0'

target 'UnityFramework' do
  pod 'FBSDKCoreKit', '~> 18.0.0'
  pod 'FBSDKCoreKit_Basics', '~> 18.0.0'
  pod 'FBSDKGamingServicesKit', '~> 18.0.0'
  pod 'FBSDKLoginKit', '~> 18.0.0'
  pod 'FBSDKShareKit', '~> 18.0.0'
end
target 'Unity-iPhone' do
  pod 'FBSDKCoreKit', '~> 18.0.0'
  pod 'FBSDKCoreKit_Basics', '~> 18.0.0'
  pod 'FBSDKGamingServicesKit', '~> 18.0.0'
  pod 'FBSDKLoginKit', '~> 18.0.0'
  pod 'FBSDKShareKit', '~> 18.0.0'
end
use_frameworks! :linkage => :static
```

The `Unity-iPhone`  -> `Build Phases` section,  appears a new build phases `[CP] Embed Pods Frameworks` ,  it will ensure the dynamic frameworks embedded correctly at runtime.





### Fix Method 2

Add C# method to embedded the framework at the post build phase.

```c#
#if UNITY_EDITOR

using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;
using UnityEditor.iOS.Xcode.Extensions;
using UnityEngine;

public class FacebookSDKEmbeded
{
	[PostProcessBuild(201)]
    public static void OnPostProcessBuild_Embed_Facebook(BuildTarget target, string pathToBuildProject)
    {
        if (target != BuildTarget.iOS)
        {
            return;
        }
        
        var pbxProjectPath = PBXProject.GetPBXProjectPath(pathToBuildProject);
        var pbxProject = new PBXProject();
        pbxProject.ReadFromFile(pbxProjectPath);
    
        var mainTargetGuid = pbxProject.GetUnityMainTargetGuid();
        var frameworks = new List<string>
        {
            "FBAEMKit",
            "FBSDKCoreKit_Basics",
            "FBSDKCoreKit",
            "FBSDKLoginKit",
            "FBSDKShareKit",
            "FBSDKGamingServicesKit",
        };
        foreach (var framework in frameworks)
        {
            var fileName = framework + ".xcframework";
            var relativePath = Path.Combine("Pods", framework, "XCFrameworks", fileName);
            var absolutePath = Path.Combine(pathToBuildProject, relativePath);
            if (!Directory.Exists(absolutePath))
            {
                Debug.LogWarning($"XCFramework not found: {absolutePath}");
                continue;
            }
            var fileGuid = pbxProject.AddFile(relativePath, relativePath);
            pbxProject.AddFileToEmbedFrameworks(mainTargetGuid, fileGuid);
        }
        pbxProject.AddBuildProperty(mainTargetGuid, "LD_RUNPATH_SEARCH_PATHS", "$(inherited) @executable_path/Frameworks");
        pbxProject.WriteToFile(pbxProjectPath);
    }
}

#endif
```



### Fix Method 3

Split Facebook SDK framework from `.xcframework` files (just use the `ios-arm64` architecture) and use it in the Unity project directly.

Make sure the `AddToEmbeddedBinaries` is checked in the inspector, since Facebook SDK are all dynamic framework.