#### 基本概念

- 工作区(Working Directory)

> 在电脑里面能够看到的目录

- 版本库（Repository）

> 工作区又一个隐藏文件夹`.git`, 叫做Git的版本库。<br>
> Git的版本库存放很多东西， 其中比价重要的就是stage（或者index) 的暂存区， 还有Git为我们自动创建的第一个分支`master`， 以及指向`master`的指针`HEAD`。

![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)

- 远程仓库区(Remote)

> 代码托管的服务器


#### 常见命令

1. `git clone <remote-url>` 克隆某个远端仓库
2. `git add <file path>` 把工作区中修改的文件添加到暂存区
3. `git commit` 把暂存区中的内容提交到当前分支
4. `git pull` 拉取远端代码，并自动合并
5. `git push` 当前分支代码推送到远端仓库

##### 版本回退

- `git reset --hard HEAD^` 把当前分支指向上一个版本，
- `git reset --hard HEAD~100`, 把当前分支回退往上100个版本， 
- `git reset --hard xxxx`, 把当前分支指到指定版本

##### 撤销文件的修改
1. 文件没有添加到暂存区
	- `git checkout -- <file path>` 把文件在工作区的修改全部撤销，这里有两种情况：
		- 一种是自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
		- 一种是已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

2. 文件已经添加到暂存区
	- `git reset HEAD <file>` 把暂存区的修改撤销掉（`unstage`），重新放回工作区

3. 暂存区内容已经提交到当前分支
	- 回退当前提交到工作区 `git reset HEAD^`
	- 撤销工作区中文件的修改 `git checkout -- <file path>`

##### 分支管理

- 查看分支：`git branch`
- 创建分支：`git branch <name>`
- 切换分支：`git checkout <name>`
- 创建+切换分支：`git checkout -b <name>`
- 合并某分支到当前分支：`git merge <name>`
- 删除分支：`git branch -d <name>`

##### 解决冲突
`Git` 用`<<<<<<<`，`=======`，`>>>>>>>`标记出冲突的内容， 手动解决之后，先`git add `, 再`git commit`即可。
