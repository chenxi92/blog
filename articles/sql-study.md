

#### SQLite 语法特点

1. 不区分大小写；

2. 每条语句以分号(**;**)结尾；

#### SQLite 关键字

| 命令   | 描述                                                   |
| ------ | :----------------------------------------------------- |
| create | 创建一个新的表，一个表的视图，或者数据库中的其他对象。 |
| alter  | 修改数据库中的某个已有的数据库对象，比如一个表。       |
| drop   | 删除整个表，或者表的视图，或者数据库中的其他对象。     |
| insert | 创建一条记录。                                         |
| update | 修改记录。                                             |
| delete | 删除记录。                                             |
| select | 从一个或多个表中检索某些记录。                         |

在Mac的终端上输入`sqlite3`，出现如下提示：

```sqlite
TESTdeMacBook-Pro:Desktop chenxi$ sqlite3 
SQLite version 3.24.0 2018-06-04 14:10:15
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite> 
```

显示帮助， 输入`.help`,出现帮助命令

* `.help`   显示帮助信息

* `.exit`   退出应用程序

* `.quit` 退出应用程序

* `.headers on | off`  是否显示头部信息

* `.mode MODE ?TABLE?` 设置输出模式，MODE 可以是下列之一：
  - **csv** 逗号分隔的值
  - **column** 左对齐的列
  - **html** HTML 的 <table\>代码
  - **insert** TABLE 表的 SQL 插入（insert）语句
  - **line** 每行一个值
  - **list** 由 .separator 字符串分隔的值
  - **tabs** 由 Tab 分隔的值
  - **tcl** TCL 列表元素

* `.databases` 列举出所有的数据库

* `.tables` 列举出所有的表

  

**以下所有命令都在Mac终端下执行**

####  SQLite 创建数据库

> sqlite3 DatabaseName.db

#### SQLite 创建表

SQLite 的 CREATE TABLE 语句
用于在任何给定的数据库创建一个新表。创建基本表，涉及到命名表、定义列及每一列的数据类型。

```sqlite
create table company (
   id integer primary key   autoincrement,
   name           text      not null,
   age            int       not null,
   address        text      default 'TianTongYuan' ,  
   salary         real
);
```



它创建了一个 company 表，`id` , `name`, `age`, `address`, `salary` 五个字段；

`primary key` 约束唯一标识数据库表中的每条记录, 主键必须包含唯一的值, 主键列不能包含 NULL 值, 每个表有且只能拥有一个主键。

`autoincrement` 会在新记录插入表中时生成一个唯一的数字, 默认初始值是1，该数字会自动增长；

`not null` 约束表示在表中创建纪录时这些字段不能为 `null`;

`default` 约束用于向列中插入默认值；



#### SQLite 插入数据

插入数据方式有两种：

1. 指定列的名称以及被插入的值；
2. 只需要提供被插入的值



在终端上分别执行如下命令，插入8条数据；

```shell
# 添加数据，省略id字段，默认是1
insert into company (name, age, address, salary) values 
	('Paul', 32, 'California', 20000.00);

# 添加数据，省略address字段，默认是'TianTongYuan'
insert into company (id, name, age, salary) values
	(2, 'Allen', 25, 15000.00);

insert into company (id, name, age, address, salary) values
	(3, 'Teddy', 23, 'Norway', 20000.00);

insert into company (id, name, age, address, salary) values
	(4, 'Mark', 25, 'Rich-Mond', 65000.00);

insert into company (id, name, age, address, salary) values
	(5, 'David', 27, 'Texas', 85000.00);

insert into company (id, name, age, address, salary) values
	(6, 'Kim', 23, 'South-Hall', 45000.00);

insert into company values (7, 'James', 24, 'Houston', 100000.00);

insert into company (name, age, address, salary) values
	('Peak', 27, 'China', 24000.00);
```

#### SQLite 查询数据

1. 获取所有可用的字段：

   ```sqlite
   select * from company;
   ```

2. 获取部分字段：

   ```sqlite
   select id, name, salary from company;
   ```

   

使用 `where` 子句查询记录：

基本语法如下：

```sqlite
select column1,  column2, columnN from table_name where [condition]; 
```



##### 比较运算符

- ==  检查两个操作数的值是否相等，如果相等则条件为真。

- =    检查两个操作数的值是否相等，如果相等则条件为真。

- !=  检查两个操作数的值是否相等，如果不相等则条件为真。

- \>   检查左操作数的值是否大于右操作数的值，如果是则条件为真。

- \>= 检查左操作数的值是否大于等于右操作数的值，如果是则条件为真。

- <   检查左操作数的值是否小于右操作数的值，如果是则条件为真。

- <= 检查左操作数的值是否小于等于右操作数的值，如果是则条件为真。

- !< 检查左操作数的值是否不小于右操作数的值，如果是则条件为真。

- ##### !> 检查左操作数的值是否不大于右操作数的值，如果是则条件为真。



##### 逻辑运算符

- `and`        用于结合一个 SQL 语句的 WHERE 子句中的多个条件。

- `or`          用于结合一个 SQL 语句的 WHERE 子句中的多个条件。

- `between` 用于在给定最小值和最大值范围内的一系列值中搜索值。

- `exists`   用于在满足一定条件的指定表中搜索行的存在。

- `in`           用于把某个值与一系列指定列表的值进行比较。

- `not in`   `in`运算符的对立面。

- `like`       用于把某个值与使用通配符运算符的相似值进行比较。

  

查询 `age` 大于等于 25 并且 `salary` 大于等于 65000.00 的所有记录：

```sqlite
select * from company where age >= 25 and salary >= 65000;
```

查询 `age` 大于等于 25 或者 `salary` 大于 65000.00 的所有记录：

```sqlite
select * from company where age >= 25 or salary > 65000;
```

查询  `name`  是以 `Ki`  开头的所有记录:

```sqlite
select * from company where name like 'Ki%';
```

查询 `age` 是  25 或者 27 的所有记录:

```sqlite
select * from company where age in ( 25, 27 );
```

查询所有 `age` 在 25 到 27 之间的所有记录:

```sqlite
select * from company where age between 25 and 27;
```



##### limit 限制符: 

 用于限制由 select 语句返回的数据数量。

查询所有 `age` 在 25 到 27 之间的前 2 条记录:

```sql
 select * from company where age between 25 and 27 limit 2;
```

查询所有 `age` 在 25 到 27 之间的从第 1 条记录之后的前 2 条记录:

```sqlite
select * from company where age between 25 and 27 limit 2 offset 1;
```



##### order 限制符：

用来基于一个或多个列按升序或降序顺序排列数据。

基本语法:

```sqlite
select column-list from table_name [where condition] [order by column1, column2, columnN] [asc | desc];
```

按照 `age` 字段升序查询所有记录:

```sqlite
select * from company order by age asc;
```

按照 `salary` > 20000 并且  `age` 字段降序查询所有记录:

```sqlite
select * from company where salary > 20000 order by age asc;
```



##### 常用函数

计算数据库中某一个表的行数:

```sqlite
select count (*) from company;
```

计算数据库中某一列的最大值:

```sqlite
select max(age) from company;
```

计算数据库中某一列的最小值:

```sqlite
select min(id) from company;
```

计算数据库中某一列的平均值:

```sqlite
select avg(salary) from company;
```

计算数据库中某一列的总和:

```sqlite
select sum(salary) from company;
```

把数据库中某一列的值转换成大写:

```sqlite
select upper(name) from company;
```

把数据库中某一列的值转换成小写:

```sqlite
select lower(address) from company;
```

计算数据库中某一列的值字符串长度:

```sqlite
select address, length(address) from company;
```



#### SQLite 修改数据

基本语法:

```sqlite
update table_name set column1 = value1, column2 = value2 ...., columnN = valueN where [condition];
```

修改 `age`  > 26 并且 `salary` = 24000 的所有字段, 把其中的  `address`  的值设置为  `BeiJing` 。

```
update company set address = 'BeiJing' where age > 26 and salary = 24000;
```

#### SQLite 删除数据

基本语法：

```sqlite
delete from table where [condition];
```

删除 id 为 7 的用户:

```sqlite
delete from company where id = 7;
```

删除整张表:

```sqlite
delete from company;
```



**练习脚本:**

```shell
#!/bin/bash

DBName="first-blood.db"

create() {
	echo "create table company (
	id integer primary key   autoincrement,
	name           text      not null,
    age            int       not null,
    address        text      default 'TianTongYuan',  
    salary         real
	);" | sqlite3 $DBName
} 

insertValue() {
	echo "insert into company (name, age, address, salary) values 
	('Paul', 32, 'California', 20000.00);" | sqlite3 $DBName

	echo "insert into company (id, name, age, salary) values
	(2, 'Allen', 25, 15000.00);" | sqlite3 $DBName

	echo "insert into company (id, name, age, address, salary) values
	(3, 'Teddy', 23, 'Norway', 20000.00);" | sqlite3 $DBName

	echo "insert into company (id, name, age, address, salary) values
	(4, 'Mark', 25, 'Rich-Mond', 65000.00);" | sqlite3 $DBName

	echo "insert into company (id, name, age, address, salary) values
	(5, 'David', 27, 'Texas', 85000.00);" | sqlite3 $DBName

	echo "insert into company (id, name, age, address, salary) values
	(6, 'Kim', 23, 'South-Hall', 45000.00);" | sqlite3 $DBName

	echo "insert into company values (7, 'James', 24, 'Houston', 100000.00);" | sqlite3 $DBName

	echo "insert into company (name, age, address, salary) values
	('Peak', 27, 'China', 24000.00);" | sqlite3 $DBName
}

queryValue() {
	echo "query data ..."
	echo "select * from company;" | sqlite3 $DBName
	echo ""
}

updateValue() {
	echo "update ..."
	echo "update company set address = 'BeiJing' where age > 26 and salary = 24000;" | sqlite3 $DBName
}

deleteValue() {
	echo "delete ..."
	echo "delete from company where id = 7;" | sqlite3 $DBName
}

create

insertValue 

queryValue

updateValue

queryValue

deleteValue

queryValue

```

