

###### 小白教程， 如有错误，欢迎指正

**版本信息**

```
Mac 10.13.5
Xcode 9.4.1
Cocos Creator 1.9.2
Python 2.7
```

#### 步骤

> 新建 `Hello World` 工程，项目名称`demo`

> 使用Xcode新建两个.cpp文件， 分别取名`jsToCPP`和`AoneClient`

> `jsToCPP.h` 内容如下

```c++
#ifndef jsToCPP_h
#define jsToCPP_h

#include <stdio.h>
#include <string>
#include <map>
#include <vector>
#include <functional>

using namespace std;
class jsToCPP
{
public:
    //  单例
    static jsToCPP* getInstance();
    
    // 静态方法
    static void static_func();
    
    // 数组
    void setArray(string str);
    vector<string> getArray();
    
    // map
    void setMap(map<string, string> param);
    map<string, string> getMap();
    
    // 回调函数
   void initAsync(const function<void(int, string)>& cb);
    
    template<typename TypeOne, typename TypeTwo>
    string mapToString(map<TypeOne, TypeTwo>& m);
public:
    int age;
    function<void(int, string)> _initCb;
    
private:
    string getString(const int32_t& a);
    string getString(const int64_t& a);
    string getString(const string& s);
    
private:
    vector<string> _mArray;
    map<string, string> _mMap;
};
#endif /* jsToCPP_h */
```

> `jsToCpp.cpp` 内容如下

```c++
#include "jsToCPP.h"
#include "AoneClient.h"

jsToCPP* jsToCPP::getInstance()
{
    static jsToCPP _instance;
    return &_instance;
}

void jsToCPP::static_func()
{
    printf("--- <%s : %d>\n", __func__, __LINE__);
}

void jsToCPP::setArray(string str)
{
    printf("--- <%s : %d> array add = %s\n", __func__, __LINE__, str.c_str());
    _mArray.push_back(str);
}
vector<string> jsToCPP::getArray()
{
    return _mArray;
}


void jsToCPP::setMap(map<string, string> param)
{
    map<string, string>::iterator iter;
    for(iter = param.begin(); iter != param.end(); iter++) {
        printf("--- <%s : %d> key = %s\n", __func__, __LINE__, iter -> first.c_str());
        printf("--- <%s : %d> valut = %s\n", __func__, __LINE__, iter -> second.c_str());
        _mMap.insert(pair<string, string>(iter -> first, iter -> second));
    }
}
map<string, string> jsToCPP::getMap()
{
    return _mMap;
}


void _initCallback(int code, std::map<string, string> dataMap)
{
   jsToCPP* obj = jsToCPP::getInstance();

   string mapStr = obj -> mapToString(dataMap);

   obj -> _initCb(code, mapStr);
}

void jsToCPP::initAsync(const function<void(int, string)>& cb)
{
   _initCb = cb;

   AoneClient *client = new AoneClient();

   client -> initAsync(_initCallback);
}

template<typename TypeOne, typename TypeTwo>
string jsToCPP::mapToString(map<TypeOne, TypeTwo>& m)
{
    if(m.empty()) return "";
    string str = "{";
    typename map<TypeOne, TypeTwo>::iterator it;
    for (it = m.begin(); it != m.end(); it++)
    {
        str += "\"" + getString(it -> first) + "\":\"" + getString(it -> second) + "\"";
        str += ",";
    }
    // delete the last ","
    str = str.substr(0, str.length()-1);
    str += "}";
    return str;
}

// =====   Private Method

string jsToCPP::getString(const int32_t& a)
{
    char c[1024] = {0};
    snprintf(c, sizeof(c), "%d", a);
    return c;
}

string jsToCPP::getString(const int64_t& a)
{
    char c[1024] = {0};
    snprintf(c, sizeof(c), "%lld", a);
    return c;
}

string jsToCPP::getString(const string& s)
{
    return s;
}
```

> `AoneClient.h` 内容如下

```c++
#ifndef AoneClient_h
#define AoneClient_h

#include <stdio.h>
#include <string>
#include <map>

using namespace std;

typedef void(*AONESDK_CB)(int result, map<string, string> dataMap);

class AoneClient
{
public:
    AoneClient();
    ~AoneClient();

    void initAsync(AONESDK_CB cb);

private:
    AONESDK_CB _initCb;
};


#endif /* AoneClient_h */
```

> `AoneClient.cpp` 内容如下

```
#include "AoneClient.h"


AoneClient::AoneClient()
{
    printf("--- <%s : %d>\n", __func__, __LINE__);
}

AoneClient::~AoneClient()
{
    printf("--- <%s : %d>\n", __func__, __LINE__);
}

void AoneClient::initAsync(AONESDK_CB cb)
{
    _initCb = cb;
    assert(_initCb);
    printf("--- <%s : %d>\n", __func__, __LINE__);
    // 模拟初始化操作
    map<std::string, std::string> dataMap;
    dataMap.insert(pair<string, string>("name", "chenxi"));
    dataMap.insert(pair<string, string>("sex", "man"));
    dataMap.insert(pair<string, string>("skill", "Object-C"));
    dataMap.insert(pair<string, string>("type", "facebook"));
    int code = 1;
    
    _initCb(code, dataMap);
}
```

> 进入`CocosCreator`软件目录下，在`cocos2d-x`目录下，创建`jsToCPP`文件夹, 该文件夹的绝对路径为：`/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/jsToCPP`

> 拷贝创建好的`jsToCPP.h` 、`jsTocPP.cpp` 、 `AoneClient.h` 、 `AoneClient.cpp` 文件到 `jsToCPP` 目录

![jsToCPP-files](./jsToCPP-path.png)

> 在`cocos2d-x/tools/tojs/`目录下，新建`jsbToCPP.ini`文件，内容如下

``` .ini
# 模块名称
[jsToCPP]

# 绑定回调函数的前缀，也是生成的自动绑定文件的前缀
prefix = jsToCPP

# 绑定的类挂载在 JS 中的哪个对象中，类似命名空间
target_namespace = 

# 自动绑定工具基于 Android 编译环境，此处配置 Android 头文件搜索路径
android_headers = -I%(androidndkdir)s/platforms/android-14/arch-arm/usr/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.8/libs/armeabi-v7a/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.8/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.9/libs/armeabi-v7a/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.9/include

# 配置 Android 编译参数
android_flags = -D_SIZE_T_DEFINED_ 

# 配置 clang 头文件搜索路径
clang_headers = -I%(clangllvmdir)s/%(clang_include)s 

# 配置 clang 编译参数
clang_flags = -nostdinc -x c++ -std=c++11 -U __SSE__

# 配置引擎的头文件搜索路径
cocos_headers = -I%(cocosdir)s -I%(cocosdir)s/cocos/editor-support -I%(cocosdir)s/cocos -I%(cocosdir)s/cocos/platform/android -I%(cocosdir)s/external/sources

# 配置引擎编译参数
cocos_flags = -DANDROID

cxxgenerator_headers = 

# extra arguments for clang
extra_arguments = %(android_headers)s %(clang_headers)s %(cxxgenerator_headers)s %(cocos_headers)s %(android_flags)s %(clang_flags)s %(cocos_flags)s %(extra_flags)s 

# 需要自动绑定工具解析哪些头文件
headers = %(cocosdir)s/jsToCPP/jsToCPP.h

# 在生成的绑定代码中，重命名头文件
replace_headers = 

# 需要绑定哪些类，可以使用正则表达式，以空格为间隔
classes = jsToCPP

# what should we skip? in the format ClassName::[function function]
# ClassName is a regular expression, but will be used like this: "^ClassName$" functions are also
# regular expressions, they will not be surrounded by "^$". If you want to skip a whole class, just
# add a single "*" as functions. See bellow for several examples. A special class name is "*", which
# will apply to all class names. This is a convenience wildcard to be able to skip similar named
# functions from all classes.

skip = 

rename_functions =

rename_classes = 

# for all class names, should we remove something when registering in the target VM?
remove_prefix = 

# classes for which there will be no "parent" lookup
classes_have_no_parents = 

# base classes which will be skipped when their sub-classes found them.
base_classes_to_skip = 

# classes that create no constructor
# Set is special and we will use a hand-written constructor
abstract_classes = 

classes_need_extend =
```

> 在`cocos2d-x`目录下，找到`/tools/tojs/genbindings.py`文件， 在其中添加如下字段

```
        cmd_args = {
                    'cocos2dx.ini' : ('cocos2d-x', 'jsb_cocos2dx_auto'), \
                    'cocos2dx_audioengine.ini' : ('cocos2dx_audioengine', 'jsb_cocos2dx_audioengine_auto'), \
                    'cocos2dx_network.ini' : ('cocos2dx_network', 'jsb_cocos2dx_network_auto'), \
                    'cocos2dx_extension.ini' : ('cocos2dx_extension', 'jsb_cocos2dx_extension_auto'), \
                    'cocos2dx_ui.ini' : ('cocos2dx_ui', 'jsb_cocos2dx_ui_auto'), \
                    'cocos2dx_spine.ini' : ('cocos2dx_spine', 'jsb_cocos2dx_spine_auto'), \
                    'cocos2dx_dragonbones.ini' : ('cocos2dx_dragonbones', 'jsb_cocos2dx_dragonbones_auto'), \
                    'cocos2dx_experimental_webView.ini' : ('cocos2dx_experimental_webView', 'jsb_cocos2dx_experimental_webView_auto'), \
                    'cocos2dx_experimental_video.ini' : ('cocos2dx_experimental_video', 'jsb_cocos2dx_experimental_video_auto'), \
                    'creator.ini': ('creator', 'jsb_creator_auto'),
                    'creator_camera.ini': ('creator', 'jsb_creator_camera_auto'),
                    'creator_graphics.ini': ('creator', 'jsb_creator_graphics_auto'),
                    'creator_physics.ini': ('creator', 'jsb_creator_physics_auto'),
                    'box2d.ini' : ('box2d', 'jsb_box2d_auto'),
                    'anysdk-common.ini': ('protocols', 'jsb_anysdk_protocols_auto'),
                    'anysdk-appstore.ini': ('protocols', 'jsb_anysdk_protocols_auto'),
                    }

        # just generate custom file
        cmd_args.clear()
        cmd_args["jsToCPP.ini"] = ('jsToCPP', 'jsb_jsToCPP_auto')
```
其作用是，为节省运行时间，只需要生成我们自定义的代码

> 进入 `genbindings.py` 文件所在目录

> 运行该Python脚本: python genbindings.py


**运行该脚本可能遇到如下错误**

#####  1.  NDK 错误

```
NDK_ROOT not defined. Please define NDK_ROOT in your environment.
```

解决方法:

```
1. open .bash_profile
2. 添加NDK路径
```

##### 2. Python yaml 模块错误

```
Traceback (most recent call last):
  File "/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/tools/bindings-generator/generator.py", line 11, in <module>
    import yaml
ImportError: No module named yaml
-------------------------------------
Generating javascript bindings fails.
-------------------------------------

```

解决方法:

```
sudo easy_install  pyyaml
```

##### 3. Python  Cheetah
```
Traceback (most recent call last):
  File "/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/tools/bindings-generator/generator.py", line 16, in <module>
    from Cheetah.Template import Template
ImportError: No module named Cheetah.Template
-------------------------------------
Generating javascript bindings fails.
-------------------------------------
```

解决方式:
```
方法一:
1. [下载cheetah](http://pythonhosted.org//Cheetah/)
2. 解压
3. 进入根目录运行setup.py文件
   sudo python setup.py install
   
方法二：
sudo pip install Cheeta
```

运行之后，出现如下所示提示， 表示绑定成功:

```
>>> parse_header: /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/jsToCPP/jsToCPP.h
----------------------------------------
Generating javascript bindings succeeds.
----------------------------------------
```

> 找到`/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/auto` 目录，发现会生成`jsb_jsToCPP_auto.hpp` 和 `jsb_jsToCPP_auto.cpp` 文件， 该文件，后续需要添加到cocos2ds_js_bindings.xcodeproj, 后面再说。

> 找到 `/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/auto/api/` 目录， 发现会生成 `jsb_jsToCPP_auto_api.js` 文件，拷贝该文件到`/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/auto/script/` 目录下

> 打开demo工程，找到Helloworld.js文件，在该文件里面调用CPP文件, 参考代码

```
// use this for initialization
    onLoad: function () {
        if (cc.sys.platform !== cc.sys.IPHONE) {
          console.log("\n--- on load yet, not run on iPhone");
          return;
        }

        console.log("\n\n--- begin test static func");
        jsToCPP.static_func();

        var cppObj = jsToCPP.getInstance();
        console.log("old jsToCPP.age: " + cppObj.age);
        cppObj.age = 12;
        console.log("new jsToCPP.age: " + cppObj.age);


        // test array
        console.log("\n\n--- begin test array");
        cppObj.setArray("ont");
        cppObj.setArray("two");
        cppObj.setArray("three");
        var array = cppObj.getArray();
        if (array instanceof Array) {
          console.log("--- array data = [" + array.join(", ") + "]");
        }

        // test map
        console.log("\n\n--- begin test map");
        var mapObj = {
          "name": "chen xi",
          "result": "success",
          "msg": "this is a test message"
        };
        cppObj.setMap(mapObj);
        var map = cppObj.getMap();
        console.log("--- type ", map);
        // convert to json string
        var jsonData = JSON.stringify(map);
        console.log("--- map data = " + jsonData);

        // test callback
        console.log("\n\n--- begin test callback");
        var delegateObj = {
          onInitCallback: function (code, msg) {
            console.log("delegate obj, onCallback: " + code + ", msg = " + msg);
          },
        }
        cppObj.initAsync(delegateObj.onInitCallback);
    }
```

> 构建项目: `CocosCreator` -> `项`目 -> `构建发布`， 选择发布到iOS平台，构建完成之后，在该demo工程的根目录下会生成一个build文件夹， 找到编译生成的Xcode工程( `build/jsb-link/frameworks/runtime-src/proj.ios_mac/hello_world.xcodeproj`) ， 打开该Xcode工程， 在Classes目录下， 找到 `jsb_module_register.cpp` 文件， 进行如下操作

>  1.引入生成的绑定文件: `#include "cocos/scripting/js-bindings/auto/jsb_jsToCPP_auto.hpp"`

>  2.在`bool jsb_register_all_modules()` 方法中，注册CPP  `se->addRegisterCallback(register_all_jsToCPP);`

```
bool jsb_register_all_modules()
{
    se::ScriptEngine* se = se::ScriptEngine::getInstance();

    se->addBeforeInitHook([](){
        JSBClassType::init();
    });

    se->addBeforeCleanupHook([se](){
        se->garbageCollect();
        PoolManager::getInstance()->getCurrentPool()->clear();
        se->garbageCollect();
        PoolManager::getInstance()->getCurrentPool()->clear();
    });

    se->addRegisterCallback(jsb_register_global_variables);

    se->addRegisterCallback(run_prepare_script);

    se->addRegisterCallback(register_all_cocos2dx);
    se->addRegisterCallback(jsb_register_Node_manual);
    se->addRegisterCallback(register_all_cocos2dx_manual);
    se->addRegisterCallback(JSB_register_opengl);
    se->addRegisterCallback(register_all_jsToCPP);

   // ..... 
}
```

> 展开`coco2d_js_bindings.xcodeproj`, 找到 `auto` 目录，添加生成的`jsb_jsToCPP_auto.hpp` `js_jsToCPP_auto.cpp` 文件到该工程

> 添加 `jsToCPP` 文件夹下的所有文件到该工程， 并添加正确的搜索路径

![add-file-to-js_bindings-project](./add-jsToCPP.png)

**真机运行项目，出现如下信息:**

```
--- begin test static func
--- <static_func : 19>
JS: old jsToCPP.age: undefined
JS: new jsToCPP.age: 12
JS: 

--- begin test array
--- <setArray : 24> array add = ont
--- <setArray : 24> array add = two
--- <setArray : 24> array add = three
JS: --- array data = [ont, two, three]
JS: 

--- begin test map
--- <setMap : 37> key = msg
--- <setMap : 38> valut = this is a test message
--- <setMap : 37> key = name
--- <setMap : 38> valut = chen xi
--- <setMap : 37> key = result
--- <setMap : 38> valut = success
JS: --- type  [object Object]
JS: --- map data = {"msg":"this is a test message","name":"chen xi","result":"success"}
JS: 

--- begin test callback
--- <AoneClient : 6>
--- <initAsync : 18>
JS: delegate obj, onCallback: 1, msg = {"name":"chenxi","sex":"man","skill":"Object-C","type":"facebook"}
```

**完成!!!**

##### 参考链接

1. [mac下运行CocosCreator的genbindings.py出现的错误](https://blog.csdn.net/u013654125/article/details/79470547)
2. [JSB 2.0 绑定教程](https://github.com/cocos-creator/creator-docs/blob/master/zh/advanced-topics/jsb/JSB2.0-learning.md)
3. [No type named 'function' in namespace std](https://stackoverflow.com/questions/25023850/no-type-named-function-in-namespace-std)
