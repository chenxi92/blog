
<p align="right">2019-8-9</p>

### `shell` 连接 `Mysql` 的几种方式

```shell
user="apper" # 用户名
password="superme@2019" # 密码
host="192.168.1.110" # ip地址
port="3306" # 端口号
database="upay" # 数据库名称
sql_string="SELECT * FROM ThirdUQUserRelation;" # 查询语句

# 方式1
mysql -h${host} -P${port} -u${user} -p${password} $database -e "${sql_string}"

# 方式2
mysql --host=${host} --port=${port} --user=${user} --password=${password} --database=$database -e "${sql_string}"

# 方式3
file_path="/path/to/sql"
mysql -h${host} -P${port} -u${user} -p${password} $database < ${file_path}
```



### 数据库操作

##### 显示数据库

```
show databases;
```



##### 使用某个数据库

```
use <数据库名称>;
```



##### 创建一个数据库

```
create database <数据库名称>;
```



##### 删除一个数据库

```
drop database <数据库名称>;
```

### 表操作

##### 显示所有表 

(需要先通过 use 语句进入到该数据库里面)

```
show tables;
```



##### 创建表

基本语法形式
```
create table table_name (column_name column_type);
```

创建表示例:
```shell
CREATE TABLE `ExchangeRate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baseCurrencyCode` varchar(8) NOT NULL DEFAULT 'USD'    COMMENT '基础币种代号',
  `targetCurrencyCode` varchar(8) NOT NULL DEFAULT ''  COMMENT '目标币种代号',
  `baseAmount` varchar(11) NOT NULL DEFAULT '1'        COMMENT '基础货币数量',
  `targetAmount` Double(10, 2) NOT NULL DEFAULT '0'      COMMENT '目标货币数量',
  `time` varchar(20),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

* `AUTO_INCREMENT` 表示自增

* `NOT NULL` 表示该字段的值不为空

* `DEFAULT` 表示该字段的默认值

* `COMMENT` 表示注释内容



##### 删除表

```
DROP TABLE table_name;
```



##### 插入数据

```
INSERT INTO table_name (field1, field2, ...) VALUES (value1, value2, ...);
```



##### 查询数据

基本语法形式
```shell
SELECT column_name, column_name
FROM table_name
[WHERE Clause]
[LIMIT N]
[OFFSET M];
```

- `column_name` 表示字段名称，使用 * 来代表所有字段;

- `[WHERE Clause]` where 语句来过滤筛选条件(`可选`);

- `[LIMIT N]` limit 语句来制定返回数据的数据(`可选`);

- `[OFFSET M]` offset 语句来指定开始查询的偏移量，默认情况下偏移量为0(`可选`);



##### 更新数据

基本语法形式

```
UPDATE table_name SET filed1=new-value1, field2=new-value2
[WHERE Clause];
```



##### 删除数据

基本语法形式

```
DELETE FROM table_name [WHERE Clause];
```



#####  `LIKE` 子句

Like 子句可以使用类似正则表达似的进行匹配搜索。

基本语法形式
```
SELECT field1, field2,...fieldN 
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue';
```

- LIKE 通常与 % 一同使用，类似于一个元字符的搜索。

- `%` 表示任意 0 个或多个字符。可匹配任意类型和长度的字符，有些情况下若是中文，请使用两个百分号（%%）表示。

- `_` 表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句。

- `[]` 表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。

- `[^]` 表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。


`DISTINCT` 删除重复数据(用法 `distinct(filed1)` )

`ORDER BY` 字段排序, 使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列 (用法 `order by age desc` )

`GROUP BY` 对结果分组 (用法 `group name`)



##### 连表查询

- `INNER JOIN（内连接,或等值连接）`：获取两个表中字段匹配关系的记录。

- `LEFT JOIN（左连接）`：获取左表所有记录，即使右表没有对应匹配的记录。

- `RIGHT JOIN（右连接）`： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。



#####  `ALTER` 命令

当我们需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。

删除表 `table_name` 中的字段 `i`:
```
ALTER TABLE table_name DROP i;
```

在表 `table_name` 中添加 `INT` 类型的字段 `i`:
```
ALTER TABLE table_name ADD i INT;
```

在表 `table_name` 中修改字段 `c` 的类型为 `char(10)` :
```
ALTER TABLE table_name MODIFY c CHAR(10);
```

修改表名 `table_name` 为 `new_table_name`:
```
ALTER TABLE table_name RENAME TO new_table_name;
```



### 常见函数



| 函数            | 作用               |
| --------------- | ------------------ |
| json_extract    | 提取 json 字符串   |
| replace(s1, s2) | s2 替换 s1         |
| count(*)        | 统计次数           |
| trim            | 去掉字符串首尾空格 |
| NOW()           | 当前日期和时间     |
| DATE()          | 当前日期           |
| CURTIME()       | 当前时间           |

#### INSTR

> INSTR(str, substr)

`INSTR()` 函数返回字符串中子字符串第一次出现的位置。如果在`str`中找不到子字符串，则`INSTR()`函数返回零(`0`)。

该函数不区分大小写。

作用类似 `LIKE` 运算符。

#### LOCATE

> LOCATE(substr, str)

返回字符串 `str` 中第一次出现子字符串 `substr` 的位置。

如果 substr 不在 str 中， 返回 0

如果 substr 或者 str 为 NULL， 返回 null

其他情况，返回大于 0 的值

#### CAST

> CAST(expression AS TYPE)

#### REPLACE

> REPLACE(str, old_string, new_string)

将 str 中的 old_string 替换为 new_string 。

#### JSON_EXTRACT

> JSON_EXTRACT(json_doc, path)

从 json 字符串中提取指定字段的值 [使用举例](https://dev.mysql.com/doc/refman/8.0/en/json-search-functions.html#operator_json-column-path)

```mysql
mysql> SELECT c, JSON_EXTRACT(c, "$.id"), g
     > FROM jemp
     > WHERE JSON_EXTRACT(c, "$.id") > 1
     > ORDER BY JSON_EXTRACT(c, "$.name");
+-------------------------------+-----------+------+
| c                             | c->"$.id" | g    |
+-------------------------------+-----------+------+
| {"id": "3", "name": "Barney"} | "3"       |    3 |
| {"id": "4", "name": "Betty"}  | "4"       |    4 |
| {"id": "2", "name": "Wilma"}  | "2"       |    2 |
+-------------------------------+-----------+------+
3 rows in set (0.00 sec)

# -> 操作符, 当作函数的别名
mysql> SELECT c, c->"$.id", g
     > FROM jemp
     > WHERE c->"$.id" > 1
     > ORDER BY c->"$.name";
+-------------------------------+-----------+------+
| c                             | c->"$.id" | g    |
+-------------------------------+-----------+------+
| {"id": "3", "name": "Barney"} | "3"       |    3 |
| {"id": "4", "name": "Betty"}  | "4"       |    4 |
| {"id": "2", "name": "Wilma"}  | "2"       |    2 |
+-------------------------------+-----------+------+
3 rows in set (0.00 sec)
```



### 操作案例

#### 复制表

```sql
insert into <target-table> 
(user_id, app_id, channel_id, token, first_pay, stat, device_id, create_time, update_time) 
select 
user_id, app_id, channel_id, token, first_pay, stat, device_id, create_time, update_time
from <source-table>
```



### 其他

##### 配置文件位置

从命令行终端运行此命令，将在寻找Linux/BSD / OS X系统中的MySQL配置文件 my.cnf 文件：

```
mysql --help | grep 'Default options' -A 1
```

上面命令执行后，会有这样的输出：

```
Default options are read from the following files in the given order:
/etc/my.cnf /etc/mysql/my.cnf /usr/local/etc/my.cnf ~/.my.cnf
```


### 参考

- [MySQL 教程](https://www.runoob.com/mysql/mysql-tutorial.html)

- [MySQL 配置修改](https://github.com/jaywcjlove/mysql-tutorial/blob/master/chapter2/2.5.md)



















