<p align="right">2021-7-23</p>



内容简介：

1. 安装 vapor
2. 新建 vapor 工程
3. 创建数据库表（SQLite 数据库）
4. 编写 CURD 接口
5. 进行接口测试



#### 环境

Xcode 12.2

Swift 5.3.1



#### 安装

```shell
brew install vapor
```

下载完成之后通过 `vapor --help` 查看使用信息



#### 新建工程

```shell
vapor new <project-name>
```



新建一个 ToDoList 工程 (使用 `fluent` 并选择 `SQLite` 存储数据, 不使用 `leaf` )，命令行输出如下：

```shell
$ vapor new ToDoList    
Cloning template...
name: ToDoList
Would you like to use Fluent? (--fluent/--no-fluent)
y/n> y
fluent: Yes
db: SQLite
Would you like to use Leaf? (--leaf/--no-leaf)
y/n> n
leaf: No
Generating project files
+ Package.swift
+ main.swift
+ configure.swift
+ routes.swift
+ Todo.swift
+ CreateTodo.swift
+ .gitkeep
+ TodoController.swift
+ AppTests.swift
+ Dockerfile
+ docker-compose.yml
+ .gitignore
+ .dockerignore
Creating git repository
Adding first commit
                                                                                   
                                                                  **               
                                                                **~~**             
                                                              **~~~~~~**           
                                                            **~~~~~~~~~~**         
                                                          **~~~~~~~~~~~~~~**       
                                                        **~~~~~~~~~~~~~~~~~~**     
                                                      **~~~~~~~~~~~~~~~~~~~~~~**   
                                                     **~~~~~~~~~~~~~~~~~~~~~~~~**  
                                                    **~~~~~~~~~~~~~~~~~~~~~~~~~~** 
                                                   **~~~~~~~~~~~~~~~~~~~~~~~~~~~~**
                                                   **~~~~~~~~~~~~~~~~~~~~~~~~~~~~**
                                                   **~~~~~~~~~~~~~~~~~~~~~++++~~~**
                                                    **~~~~~~~~~~~~~~~~~~~++++~~~** 
                                                     ***~~~~~~~~~~~~~~~++++~~~***  
                                                       ****~~~~~~~~~~++++~~****    
                                                          *****~~~~~~~~~*****      
                                                             *************         
                                                                                   
                                                    _       __    ___   ___   ___  
                                                   \ \  /  / /\  | |_) / / \ | |_) 
                                                    \_\/  /_/--\ |_|   \_\_/ |_| \ 
                                                      a web framework for Swift    
                                                                                   
                                                  Project ToDoList has been created!
                                                                   
                                           Use cd 'ToDoList' to enter the project directory
                                             Use vapor xcode to open the project in Xcode
```



##### 打开工程

1. 进入到项目目录
2. 终端运行 `vapor xcode` 命令打开工程； 
3. 双击 Package.swift 文件打开工程



##### 项目目录结构

```shell
.
├── Dockerfile
├── Package.swift
├── Sources
│   ├── App
│   │   ├── Controllers
│   │   │   └── TodoController.swift
│   │   ├── Migrations
│   │   │   └── CreateTodo.swift
│   │   ├── Models
│   │   │   └── Todo.swift
│   │   ├── configure.swift
│   │   └── routes.swift
│   └── Run
│       └── main.swift
├── Tests
│   └── AppTests
│       └── AppTests.swift
└── docker-compose.yml
```



打开 vapor 自动创建的模版工程，Xcode开始自动下载所需要的模块，等待下载完毕。



##### 设置工作目录

Xcode 默认会在 `DervedData` 目录下运行。 未设置自定义的工作目录， vapor 会提示

```shell
[ WARNING ] No custom working directory set for this scheme, using /path/to/DerivedData/project-abcdef/Build/
```

首先找到 Scheme 选择器，点击`Edit Scheme`  ，在对话框中选中 `Run` ，选中 `Options` ，勾选 `Use custom working directory:` 设置工作目录。



##### 创建表

###### 编写表结构

1. 在 `Models` 文件夹下找到 `Todo.swift` 文件， 默认有 一个 `id` 和 `title` 字段，新添加 `completed` 和 `order` 字段

```swift
import Fluent
import Vapor

final class Todo: Model, Content {
  	// 数据库中表的名称
    static let schema = "todos"
    
    @ID(key: .id)
    var id: UUID?

    @Field(key: "title")
    var title: String
    
    @Field(key: "completed")
    var completed: Bool
    
    @Field(key: "order")
    var order: Int?

    init() { }

    init(id: UUID? = nil, title: String, completed: Bool = false, order: Int? = nil) {
        self.id = id
        self.title = title
        self.completed = completed
        self.order = order
    }
}
```



2. 在 `Migrations` 文件夹下找到 `CreateTodo.swift` 文件，为新加的字段设置在数据库表中的类型、默认值、是否必须等信息。

```swift
import Fluent

struct CreateTodo: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("todos") // 数据库中表的名称
            .id() // id 字段
            .field("title", .string, .required) // title 字段
            .field("completed", .bool, .required, .custom("DEFAULT false")) // completed 字段
            .field("order", .int) // order 字段
            .create() // 创建表
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("todos").delete()
    }
}
```



###### 生成表文件

方式一：

在命令行中执行： `vapor run migrate`

```shell
$ vapor run migrate
[4/4] Linking Run
Migrate Command: Prepare
The following migration(s) will be prepared:
+ App.CreateTodo on default
Would you like to continue?
y/n> y
Migration successful
```



方式二：

在 `configure.swift` 文件中的 `app.migrations.add(CreateTodo())` 下面添加 `try app.autoMigrate().wait()`

```swift
import Fluent
import FluentSQLiteDriver
import Vapor

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)

    app.migrations.add(CreateTodo())
  	try app.autoMigrate().wait()
    
  	// register routes
    try routes(app)
}
```



执行完成之后，会在项目目录下创建 `db.sqlite` 文件，同时生成 `todos` 表。 `todos` 表的建表语句如下：

```sqlite
CREATE TABLE "todos"(
"id" UUID PRIMARY KEY, 
"title" TEXT NOT NULL, 
"completed" INTEGER NOT NULL DEFAULT false, 
"order" INTEGER)
```



##### 编写API

在 Models 文件夹下创建 `TodoAPIModel.swift` 文件, 用来代表数据库中返回的 `Todo` 对象

```swift
import Vapor

struct TodoAPIModel: Content {
    let id: Todo.IDValue
    let title: String
    let completed: Bool
    let order: Int?
    let url: String
}

extension TodoAPIModel {
    init(_ todo: Todo) throws {
        self.id = try todo.requireID()
        self.title = todo.title
        self.completed = todo.completed
        self.order = todo.order
        self.url = "http://127.0.0.1:8080/todos/\(self.id)"
    }
}
```



开始编写 增、删、改、查 的API接口



##### Create

1. 创建模型（title 为必传参数， order 为可选），同时需要校验传递过来的参数，是否符合规范

```swift
struct CreateRequestBody: Content {
    let title: String
    let order: Int?

    func makeTodo() -> Todo {
        return Todo(title: title, completed: false, order: order)
    }
}

extension CreateRequestBody: Validatable {
    static func validations(_ validations: inout Validations) {
      	// title 不为空，且大于1个字符
        validations.add("title", as: String.self, is: !.empty && .count(1...))
       // order 需要大于0
        validations.add("order", as: Int.self, is: .range(0...), required: false)
    }
}
```



2. 在 `TodoController.swift` 文件内编写API

```swift
func boot(routes: RoutesBuilder) throws {
    let todos = routes.grouped("todos")
    todos.post(use: create)
}
func create(req: Request) throws -> EventLoopFuture<TodoAPIModel> {
   // 校验传递参数
    try CreateRequestBody.validate(content: req)
  	
  	// 参数转为 CreateRequestBody 模型
    let requestBody = try req.content.decode(CreateRequestBody.self)
  	
  	// 构建 Todo 模型
    let todo = requestBody.makeTodo()
    
  	return todo.save(on: req.db) // 存入数据库
        .flatMapThrowing { try TodoAPIModel(todo) } // 返回 TodoAPIModel 模型
}
```



3. 测试

通过 curl 测试：

```shell
curl -H "Content-Type: application/json" -d '{"title": "learn vapor", "order": 3}' -X POST "http://127.0.0.1:8080/todos"
```



通过测试代码：

在 `AppTest.swift` 文件内添加测试代码

```swift
func testCreate() throws {
    let app = Application(.testing)
    defer { app.shutdown() }
    try configure(app)

    let todoModel = Todo(title: "learn vapor", order: 2)
    try app.test(.POST, "todos", beforeRequest: { req in
        try req.content.encode(todoModel)
    }, afterResponse: { res in
        XCTAssertEqual(res.status, .ok)
        let model = try res.content.decode(TodoAPIModel.self)
        print("\n\(model)\n")
    })
}
```



##### Update

1. 创建模型

```swift
struct UpdateRequestBody: Content {
    let title: String?
    let completed: Bool?
    let order: Int?
}
```



2. 在 `TodoController.swift` 文件内编写API

```swift
func boot(routes: RoutesBuilder) throws {
  	// 请求进行分组  
  	let todos = routes.grouped("todos")
    todos.post(use: create)
    todos.patch(":todoID", use: update)
}
func update(req: Request) throws -> EventLoopFuture<TodoAPIModel> {
    // 查找 url 内制定 todo
  	guard let todoIDString = req.parameters.get("todoID"),
          let todoID = UUID(todoIDString) else {
        throw Abort(.badRequest, reason: "Invalid parameter `todoID`")
    }
		
  	// 请求参数转模型
    let requestBody = try req.content.decode(UpdateRequestBody.self)

    return Todo.find(todoID, on: req.db) // 根据id在数据库中查找数据
        .unwrap(or: Abort(.notFound))   // 未找到，直接返回
        .flatMap { todo in  // todo 代表已经查找到的对象
            // 更新已经查找到的 todo 对象的数据
            if let title = requestBody.title {
                todo.title = title
            }
            if let completed = requestBody.completed {
                todo.completed = completed
            }
            if let order = requestBody.order {
                todo.order = order
            }
            // 存入数据库
            return todo.save(on: req.db).transform(to: todo)
        }
        .flatMapThrowing { try TodoAPIModel($0) } // 把已经修改好的 todo 对象，转成 TodoAPIModel 模型
}
```



3. 测试

通过 curl 测试：

```shell
url="http://127.0.0.1:8080/todos/056A865C-293D-455A-BCAB-5E8B375F9952"
curl -H "Content-Type: application/json" \
	-d '{"title": "learn vapor this year", "completed": true, "order": 0}'\
	-X PATCH "${url}"
```



通过测试代码：

在 `AppTest.swift` 文件内添加测试代码

```swift
func testCreate() throws {
    let app = Application(.testing)
    defer { app.shutdown() }
    try configure(app)

    let todoID = "056A865C-293D-455A-BCAB-5E8B375F9952"
    let todoModel = Todo(title: "learn vapor this year", completed: true, order: 0)

    try app.test(.PATCH, "todos/\(todoID)", beforeRequest: { req in
        try req.content.encode(todoModel)
    }, afterResponse: { res in
        XCTAssertEqual(res.status, .ok)
        let model = try res.content.decode(TodoAPIModel.self)
        print(model)
    })
}
```





##### Get

获取所有的 todo 列表

1. 在 `TodoController.swift` 文件内编写API

```swift
func boot(routes: RoutesBuilder) throws {
  	// 请求进行分组  
  	let todos = routes.grouped("todos")
    todos.post(use: create)
    todos.patch(":todoID", use: update)
  	
  	todos.get(use: index)
}

func index(req: Request) throws -> EventLoopFuture<[TodoAPIModel]> {
    return Todo.query(on: req.db)
        .all() // 查找所有数据
        .flatMapThrowing { todos in
            // convert `todos` to `[TodoAPIModel]
            try todos.map { try TodoAPIModel($0) }
        }
}
```



2. 测试

通过 curl 测试：

```shell
url="http://127.0.0.1:8080/todos/"
curl "${url}"
```



通过测试代码：

在 `AppTest.swift` 文件内添加测试代码

```swift
func convertStringToArray(_ text: String) -> [Dictionary<String, Any>] {
    do {
        let data = text.data(using: .utf8)!
        if let jsonArray = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [Dictionary<String, Any>]
        {
            return jsonArray
        }
    } catch {
        print(error)
    }
    return []
}

func testGetAll() throws {
    let app = Application(.testing)
    defer { app.shutdown() }
    try configure(app)

    try app.test(.GET, "todos", afterResponse: { res in
        XCTAssertEqual(res.status, .ok)

        let array = convertStringToArray(res.body.string)
        for element in array {
            print("\n\(element)")
        }
    })

    print("\nend\n")
}
```



##### Delete

根据 id 删除某一个todo列表

1. 在 `TodoController.swift` 文件内编写API

```swift
func boot(routes: RoutesBuilder) throws {
  	// 请求进行分组  
  	let todos = routes.grouped("todos")
    todos.post(use: create)
    todos.patch(":todoID", use: update)
  	todos.get(use: index)
  	
  	todos.group(":todoID") { todo in
        todo.delete(use: delete)
    }
}

func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
    return Todo.find(req.parameters.get("todoID"), on: req.db) // 数据库根据 todoID 查找
        .unwrap(or: Abort(.notFound))  // 未找到：直接返回
        .flatMap { $0.delete(on: req.db) } // 找到： 从数据库删除
        .transform(to: .ok)  // 返回成功的状态码
}
```



2. 测试

通过 curl 测试：

```shell
url="http://127.0.0.1:8080/todos/056A865C-293D-455A-BCAB-5E8B375F9952"
curl -X DELETE "${url}"
```



通过测试代码：

在 `AppTest.swift` 文件内添加测试代码

```swift
func testDelete() throws {
    let app = Application(.testing)
    defer { app.shutdown() }
    try configure(app)

    let todoID = "056A865C-293D-455A-BCAB-5E8B375F9952"
    try app.test(.DELETE, "todos/\(todoID)", afterResponse: { res in
        XCTAssertEqual(res.status, .ok)
    })
}
```



##### 查看所有的API接口

1. 在 `Scheme` 选项中，点击 `Edit Scheme`， 选中 `Run` -> `Arguments` ，在 `Arguments Passed On Launch` 中添加 `routes` 字段，运行程序，在控制台会显示所有的API接口
2. 在终端上进入项目目录下，执行命令：`swift run Run routes` 

```shell
+--------+----------------+
| GET    | /              |
+--------+----------------+
| GET    | /hello         |
+--------+----------------+
| GET    | /todos         |
+--------+----------------+
| GET    | /todos/:todoID |
+--------+----------------+
| POST   | /todos         |
+--------+----------------+
| DELETE | /todos/:todoID |
+--------+----------------+
| PATCH  | /todos/:todoID |
+--------+----------------+
```



#### 参考文档

[Vapor Docs](https://docs.vapor.codes/4.0/)

[How to Build a To-Do List Back End With Vapor 4 and Swift](https://betterprogramming.pub/vapor-4-todo-backend-5035c9d7e295)

[Testing in Vapor 4](https://www.raywenderlich.com/16909142-testing-in-vapor-4)