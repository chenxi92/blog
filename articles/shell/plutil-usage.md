


生成plist文件
```shell
echo '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict/></plist>' > option.plist
```

插入
插入字符串
在option.plist文件中插入string类型的键值对, 键{key} 值{value}
```shell
plutil -insert {key} -string {valu}e option.plist
```

插入值的类型有:
```
-bool: 布尔类型
-integer: 64位整数
-float: 64位浮点数
-string: 字符串
-date: 日期
-data: base64 编码的字符串
-xml: xml 属性
-json: json 片段
```

插入字典
```shell
plutil -insert my-dic -xml <dict/> option.plist
plutil -insert my-dic.name -string peak option.plist
plutil -insert my-dic."com\.company" -string test option.plist
```
创建一个 my-dic 的字典，插入key是name，value是peak的键值对，插入key是com.company, value是test的键值对
字典内的key使用 `.` 分割，放在字典名称后面，如果key包含 `.` 使用 `\` 来转义。

修改
基本语法
```shell
plutil -replace keypath -type value
```

删除
基本语法
```shell
plutil -remove keypath
```

查找
```shell
plutil -extract keypath fmt
```

