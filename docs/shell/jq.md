### jq 使用总结

#### 简介

> Jq is a lightweight and flexible command-line JSON processor.

jq 是一个用来处理json数据的命令行工具



#### 下载

> brew install jq



#### 语法

> jq  [options]  <jq filter>  [file...]



#### 示例

#####  `.`  语法 

把输入转输出

```shell
echo '{"foo": 0}' | jq .
{
  "foo": 0
}
```



##### 对象的索引

```shell
         jq '.foo'
Input:   {"foo": 42, "bar": "less interesting data"}
Output:  42
```



##### 数组索引  `.[2]`

数组索引从0开始，所以 `.[2]` 表示第3个元素。

```shell
	       jq '.[0]'
Input:	 [{"name":"JSON", "good":true}, {"name":"XML", "good":false}]
Output:	 {"name":"JSON", "good":true}
```



##### 数组切片 `.[10: 15]`

`.[10: 15]` 表示提取数组内的元素：从第 11 个元素开始到第16个元素结束，包括第 11 个元素，不包括第 16 个元素

```shell
	      jq '.[2:4]'
Input	  ["a","b","c","d","e"]
Output	["c", "d"]
```



##### 数组遍历 `.[]`

```shell
	      jq '.[]'
Input	  [{"name":"JSON", "good":true}, {"name":"XML", "good":false}]
Output	{"name":"JSON", "good":true}
        {"name":"XML", "good":false}
```



##### `,` 语法

```shell
	      jq '.foo, .bar'
Input	  {"foo": 42, "bar": "something else", "baz": true}
Output	42
        "something else"
```



##### 管道语法 `|`

```shell
	      jq '.[] | .name'
Input	  [{"name":"JSON", "good":true}, {"name":"XML", "good":false}]
Output	"JSON"
        "XML"
```



##### 常见内置函数

###### length

- 用于数组的个数
- 用于对象的key-value对数
- 字符串的支付长度
- null 的 length 为0

```shell
				jq '.[] | length'
Input	  [[1,2], "string", {"a":2}, null]
Output	2
        6
				1
				0
```



###### keys

- 用于数组，表示数组的索引。从 0 到 length -1
- 用与对象，表示对象的所有key

```shell
				jq 'keys'
Input		{"abc": 1, "abcd": 2, "Foo": 3}
Output	["Foo", "abc", "abcd"]
```



###### map(x)

- 对数组的每个元素执行 x 操作， 返回一个新数组

```shell
				jq 'map(.+1)'
Input		[1,2,3]
Output	[2,3,4]


				jq 'map_values(.+1)'
Input		{"a": 1, "b": 2, "c": 3}
Output	{"a": 2, "b": 3, "c": 4}
```



###### has(key)

- 判断 key 是否存在

```shell
				jq 'map(has("foo"))'
Input		[{"foo": 42}, {}]
Output	[true, false]
```



###### sort

- 对输入内容进行排序

```shell
				jq 'sort'
Input		[8,3,null,6]
Output	[null,3,6,8]

				jq 'sort_by(.foo)'
Input		[{"foo":4, "bar":10}, {"foo":3, "bar":100}, {"foo":2, "bar":1}]
Output	[{"foo":2, "bar":1}, {"foo":3, "bar":100}, {"foo":4, "bar":10}]
```



###### startswith(str)

```shell
				jq '[.[]|startswith("foo")]'
Input		["fo", "foo", "barfoo", "foobar", "barfoob"]
Output	[false, true, false, true, false]
```



###### endswith(str)

```
				jq '[.[]|endswith("foo")]'
Input		["foobar", "barfoo"]
Output	[false, true]
```



##### 条件语句

```shell
	      jq 'if . == 0 then "zero" elif . == 1 then "one" else "many" end'
Input	  2
Output	"many"
```



#### 参考资料

[Download jq](https://stedolan.github.io/jq/download/)

[jq Mannual (development version)](https://stedolan.github.io/jq/manual/)