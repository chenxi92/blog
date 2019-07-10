#### 数据库

##### 创建数据库

```
use DATABASE_NAME
```

数据库不存在，创建新的，否则切换到指定数据库。



```
show dbs
show databases
```

查看所有的数据库。



##### 删除数据库

```
db.dropDatabase()
```

需要进入到该数据库中，然后才能执行删除指令。



#### 集合

##### 创建集合

```
db.createCollection(name, options)
```

`name` 要创建的集合名称

`options` 可选参数，指定有关内存大小及索引的选项



##### 删除集合

```
db.collection.drop()
```

`collection` 是指待删除的集合名称。



##### 显示集合

```
show collections
```

```
show tables
```


#### 文档

##### 插入

```
db.COLLECTION_NAME.insert(document)
```

如果该集合不存在，则自动创建该集合并插入。



##### 更新

###### `update()` 方法

`update()` 方法用于更新已存在的文档

```
db.collection.update(
	<quere>,
	<update>,
	{
		upsert: <boolean>,
		multi: <boolean>,
		writeConcern: <document>
	}
)
```

`query` : update 的查询条件。

`upadte` : update 的对象和一些更新的操作符(如\$, \$inc …)。

`upsert` : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。

`multi` : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。

`writeConcern` : 可选，抛出异常的级别。



###### `save() 方法`

`save()` 方法通过传入的文档来替换已有文档

```
db.collection.save(
	<document>,
	{
			writeConcern: <document>
	}
)
```

`document`  : 文档数据。

`writeConcern`  : 可选，抛出异常的级别。


##### 删除文档

```
db.collection.remove(
	<query>,
	{
 		justOne: <boolean>,
 		writeConcern: <document>
	})
```

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- **writeConcern** :（可选）抛出异常的级别。


##### 查询

```
db.collection.find()
```

```
db.collection.find().pretty()
```



###### 操作符

| 符号 | 英语              | 数学表达式 |
| ---- | ----------------- | ---------- |
| $gt  | greater than      | >          |
| $gte | grater than equal | >=         |
| $lt  | less than         | <          |
| $lte | less than equal   | <=         |
| $ne  | not equal         | !=         |
| $eq  | Equal             | =          |


###### 条件表达式

AND 条件

MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开。

```
db.col.find({key1:value1, key2:value2}).pretty()
```



OR 条件

MongoDB OR 条件语句使用了关键字 **$or**

```
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```



###### 排序

```
>db.COLLECTION_NAME.find().sort({KEY:1})
```

其中 1 为升序排列，而 -1 是用于降序排列。



###### 限制

`limit()` 指定读取记录条数。

```
db.COLLECTION_NAME.find().limit(NUMBER)
```



`skip()` 指定跳过的记录条数。

```
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```



###### aggregate

MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。

基本语法

```
db.collection.aggregate([{<stage}, ...])
```

常见表达式

| 表达式 | 描述 |
| --- | --- |
| $sum | 计算总和。 |
| $avg | 计算平均值。 |
| $min | 获取集合中所有文档对应值的最小值。|
| $max | 获取集合中所有文档对应值的最大值。|
| $push | 在结果文档中插入值到一个数组中。|
| $addToSet | 在结果文档中插入值到一个数组中，数组中的值不重复。 |
| $first | 根据资源文档的排序获取第一个文档数据。 |
| $last | 根据资源文档的排序获取最后一个文档数据. |


MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。
管道操作是可以重复的。

常见管道操作

| 符号 | 作用 |
| --- | --- |
| $count   | 返回查询到的文档的数目 |
| $group   | 将集合中的文档分组，可用于统计结果。 |
| $limit   | 用来限制MongoDB聚合管道返回的文档数。 |
| $lookup  | 用于连表查询。 |
| $match   | 用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。 |
| $out     | 指定输出文档。 |
| $project | 修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。 |
| $skip    | 在聚合管道中跳过指定数量的文档，并返回余下的文档。和 $limit 搭配使用，起到翻页效果。 |
| $sort    | 将输入文档排序后输出。 |
| $unwind  | 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。 |

[aggregation-operator](https://docs.mongodb.com/manual/reference/operator/aggregation)


**代码示例**

原始数据：

表 `table_rechargeorder`, 数据结构
```json
{
    "_id" : ObjectId("5d1a27b91d88292e072dcc28"),
    "humanId" : NumberLong(63363983084519424),
    "amount" : "39.92",
    "orderState": 3
}
```

表 `table_human`, 数据结构
```json
{
    "_id" : ObjectId("5d19fe201d8829714b062e39"),
    "uid" : "59187521",
    "channelId" : "40000",
    "clienVersion" : "1.0.0.0",
    "country" : "zh-CN",
    "firstPay" : NumberLong(1561995230292),
    "food" : 2900,
    "humanId" : NumberLong(63363983084519424),
    "language" : "ChineseSimplified",
    "lastLoginDate" : NumberLong(1561994970523),
    "lastLoginOutDate" : NumberLong(1561995335314),
    "lastPayTime" : NumberLong(1561995230292),
    "level" : 2,
    "name" : "Hisoka555",
    "timeSecOnlineToday" : 1530,
    "totalPay" : 0,
    "totalRaidAmount" : 0
}
```

表 `table_matchinfo`, 数据结构
```json
{
    "_id" : ObjectId("5d19fe201d8829714b062e3c"),
    "humanId" : NumberLong(63363983084519424),
    "food" : 0,
    "foodSpeed" : 0.0,
    "medal" : 0,
    "name" : "Hisoka555",
    "towerSn" : 0
}
```

表 `table_buildingentity`, 数据结构
```json
{
    "_id" : ObjectId("5d19ff561d8829714b062e4e"),
    "humanId" : NumberLong(63363983084519424),
    "buildingCells" : "{\"1\":{\"id\":1001,\"buildingId\":1,\"confId\":11002,\"typeId\":1,\"content\":\"{}\"},\"2\":{\"id\":1006,\"buildingId\":2,\"confId\":17001,\"typeId\":7,\"content\":\"{\\\"s\\\":2460,\\\"c\\\":1561993889924}\"},\"3\":{\"id\":1007,\"buildingId\":3,\"confId\":14001,\"typeId\":4,\"content\":\"{}\"},\"4\":{\"id\":1008,\"buildingId\":4,\"confId\":12001,\"typeId\":2,\"content\":\"{}\"},\"5\":{\"id\":1004,\"buildingId\":5,\"confId\":18001,\"typeId\":8,\"content\":\"{\\\"r\\\":{\\\"i\\\":0,\\\"s\\\":0,\\\"a\\\":[1]},\\\"h\\\":{\\\"a\\\":[]},\\\"b\\\":{\\\"i\\\":0,\\\"t\\\":0,\\\"c\\\":0}}\"},\"6\":{\"id\":1012,\"buildingId\":6,\"confId\":15001,\"typeId\":5,\"content\":\"{\\\"r\\\":{\\\"i\\\":0,\\\"s\\\":0,\\\"a\\\":[1]},\\\"i\\\":{\\\"a\\\":[]},\\\"b\\\":{\\\"i\\\":0,\\\"t\\\":0,\\\"c\\\":0}}\"}}"
}
```

需求：

1. 查找 `table_rechargeorder` 表中 `amount` 不为空 并且 `orderState` 等于 3 的数据；
2. 累加 `table_rechargeorder` 表中 `amount` 字段， 根据 `humanId` 合并成一组；
3. 根据 `table_rechargeorder` 表中 `humanId` 字段, 去 `table_human` 中找对应 `humanId` 的数据, 其中在表 `table_human` 中查询到的结果以 `table_human` 为键插入到 步骤2 的结果中;
4. 步骤3的结果中键`table_human` 对应的值是一个数组，数据里面只有一个元素，使用 $unwind 合并成一个值
5. 根据 `table_rechargeorder` 表中 `humanId` 字段, 去 `table_matchinfo` 中找对应 `humanId` 的数据, 其中在表 `table_matchinfo` 中查询到的结果以 `table_matchinfo` 为键插入到 步骤4 的结果中;
6. 合并 `table_matchinfo` 对应的数组;
7. 根据 `table_rechargeorder` 表中 `humanId` 字段, 去 `table_buildingentity` 中找对应 `humanId` 的数据, 其中在表 `table_buildingentity` 中查询到的结果以 `table_buildingentity` 为键插入到 步骤6 的结果中;
8. 合并 `table_buildingentity` 对应的数组;
9. 使用 `$project` 显示需要的字段;



查询代码文件如下：


创建 `demo.js` 文件

```javascript
// 连表查询
function query_lookup() {
	
	var query = [
		{ 
			$match : { 
				"amount":{
					"$ne" :""
				},
				"orderState": 3
			}
		},
		{
			$group : {
				_id : "$humanId",
				// amout 是字符串类型， 需要放在一个数组内部
				"totalAmount" : {
					$push: "$amount"
				}
			}
		},
		{
			$lookup: {
				from: "table_human",
				localField: "_id",
				foreignField: "humanId",
				as: "table_human"
			}
		},
		// table_human 中的数组合成一个
		{
			"$unwind" : "$table_human"
		},
		{
			$lookup: {
				from: "table_matchinfo",
				localField: "_id",
				foreignField: "humanId",
				as: "table_matchinfo"
			}
		},
		// table_matchinfo 中的数组合成一个
		{
			$unwind : "$table_matchinfo"
		},
		{
			$lookup: {
				from: "table_buildingentity",
				localField: "_id",
				foreignField: "humanId",
				as: "table_buildingentity"
			}
		},
		// table_buildingentity 中的数组合成一个
		{
			$unwind: "$table_buildingentity"
		},
		{
			$project: {
				"_id": 1,
				"totalAmount": 1,

				"table_human.uid": 1,
				"table_human.name": 1,
				"table_human.level": 1,
				"table_human.totalPay": 1,
				"table_human.country": 1,
				"table_human.language": 1,
				"table_human.timeCreate": 1,
				"table_human.timeSecOnlineToday": 1,
				"table_human.lastLoginDate": 1,
				"table_human.lastPayTime": 1,

				"table_matchinfo.medal": 1,

				"table_buildingentity.buildingCells": 1
			}
		},
		{
			$sort : {
				"totalAmount": -1
			}
		}
	]

	db.table_rechargeorder.aggregate(query).forEach(function(item) {
		
		// printjson (item)

		// totalAmount 是 字符串数组 类型
		var totalAmount = parseFloat(parseFloat(eval(item.totalAmount.join("+"))).toFixed(2));

		// 提取城堡等级字段
		var cells = JSON.parse(item.table_buildingentity.buildingCells);
		var main_cell = cells["1"]
		var confId = main_cell.confId.toString();
		var castle_level = parseInt(confId.substr(-2)).toString();

		var dic = {
			"id": item._id,
			"totalAmount": totalAmount,
			"uid":      item.table_human.uid,
			"name":     item.table_human.name,
			"level":    item.table_human.level,
			"totalPay":	item.table_human.totalPay,
			"country":  item.table_human.country,
			"language": item.table_human.language,
			"timeCreate":         item.table_human.timeCreate,
			"timeSecOnlineToday": item.table_human.timeSecOnlineToday,
			"lastLoginDate":      item.table_human.lastLoginDate,
			"lastPayTime":        item.table_human.lastPayTime,
			"medal":              item.table_matchinfo.medal,
			"castleLevel":       castle_level
		}

		// 输出需要的字段
		printjson(dic)
	})
}

query_lookup();
```

**调用**

在 demo.js 文件所在的目录下，执行如下命令:

```shell
mongo --quiet 192.168.2.101:27017/mytestdb < ./demo.js > ./demo.json
```

其中:

`--quiet` 静默输出，减少输出 MongoDB 头部信息;

`192.168.2.101:27017` 数据库地址;

`mytestdb` 数据库名称

连接到数据库之后，执行当前文件夹下的 `demo.js` 文件内的脚本, 把查询到的结果输出到当前文件夹下的 `demo.json` 文件中。



###### mapReduce

基本语法

```javascript
db.collection.mapReduce(
	function() {emit(key, value);}, // map 函数
	function(key, values) { // reduce 函数
		return reduceFunction
	},
	{ // option
		out: collection_name,
		query: document,
		sort: document,
		limit: number
	}
)
```

参数说明:
* map 函数: 将一个值和一个键， 映射成一个键值对。
* reduce函数: 是一个javascript功能，可以减少或分组具有相同键的所有文档。
* out: 指定map-reduce查询结果的位置。
* query: 指定选择文档的可选选择条件。
* sort: 指定可选的排序条件。
* limit: 指定可选的最大文档数。





