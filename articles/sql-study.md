#### 语法特点

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

####  创建数据库

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

它创建了一个 company 表，`id` 作为主键 

它创建了一个 company 表，`id` , `name`, `age`, `address`, `salary` 五个字段；

`primary key` 约束唯一标识数据库表中的每条记录, 主键必须包含唯一的值, 主键列不能包含 NULL 值, 每个表有且只能拥有一个主键。

`autoincrement` 会在新记录插入表中时生成一个唯一的数字, 默认初始值是1，该数字会自动增长；

`not null` 约束表示在表中创建纪录时这些字段不能为 `null`;

`default` 约束用于向列中插入默认值；

#### SQLite 插入数据

```sqlite
# 添加数据，省略id字段，默认是1
insert into company (name, age, address, salary) values 
	('Paul', 32, 'California', 20000.00);

# 添加数据，省略address字段，默认是'TianTongYuan'
insert into company (id, name, age, salary) values
	(2, 'Allen', 25, 15000.00);
# 添加数据，指定列名及被插入的值
insert into company (id, name, age, address, salary) values
	(3, 'Teddy', 23, 'Norway', 20000.00);

insert into company (id, name, age, address, salary) values
	(4, 'Mark', 25, 'Rich-Mond', 65000.00);

insert into company (id, name, age, address, salary) values
	(5, 'David', 27, 'Texas', 85000.00);

insert into company (id, name, age, address, salary) values
	(6, 'Kim', 23, 'South-Hall', 45000.00);

# 添加数据，需指定要插入数据的列名，只需提供被插入的值即可
insert into company values (7, 'James', 24, 'Houston', 100000.00);

insert into company (name, age, address, salary) values
	('Peak', 27, 'China', 24000.00);
```

