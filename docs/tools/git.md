#### 目录

[Git基本概念](#git-concept)

[常见命令](#common-command)

[版本回退](#version-back)

[撤销文件的修改](#undo-file-change)

[分支](#branch)

[解决冲突](#resolved-conflict)

[子模块](#submodule)

[生成 SSH 公钥](#generate-publick-key)

[标签](#tag)

[忽略文件/文件夹](#ignore)



#### <a name="git-concept"></a>Git基本概念

- 工作区(Working Directory)

> 在电脑里面能够看到的目录

- 版本库（Repository）

> 工作区又一个隐藏文件夹`.git`, 叫做Git的版本库。<br>
> Git的版本库存放很多东西， 其中比价重要的就是stage（或者index) 的暂存区， 还有Git为我们自动创建的第一个分支`master`， 以及指向`master`的指针`HEAD`。

![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)

- 远程仓库区(Remote)

> 代码托管的服务器



#### <a name="common-command"></a>常见命令

1. `git clone <remote-url>` 克隆某个远端仓库

2. `git add <file path>` 把工作区中修改的文件添加到暂存区

3. `git commit -m 'xx'` 把暂存区中的内容提交到当前分支

4. `git pull` 拉取远端代码，并自动合并

5. `git push origin master` 当前分支(默认是`master`分支)代码推送到远端仓库

6. `git push origin local_branch_name:local_branch_name` 把本地的 `local_branch_name` 分支推送到远端的 `local_branch_name` 分支， 远端没有 `local_branch_name` 会自动创建

7. `git rebase`  [变基操作](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)

   作用：把本地未 push 的分叉提交历史整理成直线；

   ```bash
   把 experiment 分支合并到 master 分支上使用rebase操作流程:
   1. git checkout experiment
   2. git rebase master
   3. git checkout master
   4. git merge experiment
   
   # 发生冲突之后，解决完毕后,不再使用 git commit 命令，而是继续执行 rebase 操作
   git rebase --continue 
   ```

   

   

#### <a name="version-back"></a>版本回退

- `git reset --hard HEAD^` 把当前分支指向上一个版本，
- `git reset --hard HEAD~100`, 把当前分支回退往上100个版本， 
- `git reset --hard xxxx`, 把当前分支指到指定版本

`git rest` 的原理是: 让最新提交的指针回到以前某个时点，该时点之后的提交都从历史中消失。

默认情况下, `git reset` 不改变工作区的文件(但会改变暂存区)， `--hard` 参数可以让工作区的文件也回到以前的状态。

另一种常见场景是，提交代码之后，突然意识到这个提交有问题，应该撤销掉， 需要执行 `git revert HEAD` . 

上面代码原理是: 在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化。它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险。

`git revert` 命令还有两个参数:
	- `--no-edit` 执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
	- `--no-commit` 只抵消暂存区和工作区的文件变化，不产生新的提交。

替换上一次提交， 使用 `git commit --amend -m "A new commit."` 来修改上一次提交的信息。




#### <a name="undo-file-change"></a>撤销文件的修改
1. 文件没有添加到暂存区(没有使用`git add `)
	- `git checkout -- <file path>` 把文件在工作区的修改全部撤销，这里有两种情况：
		- 一种是自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
		- 一种是已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

2. 文件已经添加到暂存区(使用`git add `， 尚未使用`git commit`)
	- `git reset HEAD <file>` 把暂存区的修改撤销掉（`unstage`），重新放回工作区
	- `git checkout -- <file path>` 撤销工作区中文件的修改

3. 暂存区内容已经提交到当前分支(使用`git commit`)
	- `git reset HEAD^` 回退当前提交到工作区 
	- `git checkout -- <file path>` 撤销工作区中文件的修改 
	
	

#### <a name="branch"></a>分支

- 查看本地分支: `git branch`

- 查看所有分支: `git branch -a`

- 创建分支: `git branch <name>`

- 切换分支: `git checkout <name>`

- 创建+切换分支: `git checkout -b <name>`

- 合并某分支到当前分支: `git merge <name>`

- 删除分支: `git branch -d <name>`

- 删除远程分支: `git push origin --delete <branchName>`

- 当前分支修改内容保留到其他分支

  ```shell
  # 暂存当前分支修改内容
  git stash
  
  # 切换到其他分支
  git checkout <branch-name>
  
  # 拉取最新代码
  git pull
  
  # 暂存内容同步到新分支
  git stash pop
  ```
  
  





#### <a name="resolved-conflict"></a>解决冲突
`Git` 用`<<<<<<<`，`=======`，`>>>>>>>`标记出冲突的内容， 手动解决之后，先`git add `, 再`git commit`即可。



#### <a name="submodule"></a>子模块

克隆带子模块的项目
```shell
git clone <url>
```

默认会包含子模块目录，但是其中没有任何文件。<br>
你必须运行两个命令：<br>

`git submodule init` 用来初始化本地配置文件，而 `git submodule update` 则从该项目中抓取所有数据并检出父项目中列出的合适的提交。


```shell
git clone --recursive <url>
```
自动初始化并更新仓库中的每一个子模块。



> git submodule add `<url>`  `<path>`

为已经存在的git工程添加子模块，`<path>` 表示指定子模块的位置，不指定则在根目录下。



> git submodule update --remote

拉取子模块的最新代码，默认是在master分支上拉取。



#### <a name="generate-publick-key"></a>生成git ssh 公钥

> 1. SSH 公钥默认储存在账户的主目录下的 ~/.ssh 目录

> 2. 有 .pub 后缀的文件就是公钥，另一个文件则是密钥

> 3. 假如没有这些文件，或者干脆连 .ssh 目录都没有，可以用 `ssh-keygen` 来创建



#### <a name="tag"></a>标签

###### 列出标签

```
git tag
```



###### 创建标签

Git 使用两种主要类型的标签：轻量标签（`lightweight`）与附注标签（`annotated`）。

一个轻量标签很像一个不会改变的分支——它只是一个特定提交的引用。使用如下命令:

```
git tag -a <tagname> -m "add annotation"
```



轻量标签本质上是将提交校验和存储到一个文件中——没有保存任何其他信息。使用如下命令:

```
git tag <tagname>
```



###### 后期打标签

1. 查看提交历史:

```shell
$ git log --pretty=oneline
15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```

2. 现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “updated rakefile” 提交。 你可以在之后补上标签。 

```
$ git tag -a v1.2 9fceb02
```



###### 查看标签内容

```
git show <tagname>
```



###### 推送标签

默认情况下， `git push` 命令不会推送标签到远程服务器上。使用如下命令显示推送标签:

```
git push origin [tarname]
```

或一次性推送所有标签

```
git push origin --tags
```



###### 删除本地标签

```
git tag -d <tagname>
```



###### 新建分支然后切回到某个标签

```
git checkout -b branchname tagname
```



#### <a name="ignore"></a>忽略文件/文件夹

##### 文件/文件夹尚未被提交

1. 创建 .gitignore 文件

   ```shell
   # 忽略 .a 文件
   *.a
   
   # 但否定忽略 lib.a, 尽管已经在前面忽略了 .a 文件
   !lib.a
   
   # 仅在当前目录下忽略 TODO 文件， 但不包括子目录下的 subdir/TODO
   /TODO
   
   # 忽略 build/ 文件夹下的所有文件
   build/
   
   # 忽略 doc/notes.txt, 不包括 doc/server/arch.txt
   doc/*.txt
   
   # 忽略所有的 .pdf 文件 在 doc/ directory 下的
   doc/**/*.pdf
   ```

   

2. 编写忽略规则



##### 文件/文件夹已经提交

1. 从本地缓存内删除

```shell
# 忽略文件
git rm --cached <file-path>

# 忽略文件夹
git rm -r --cached <folder-path>
```

2. 在 .gitignore 文件内编写忽略规则
3. 提交到 git 仓库

```shell
git add .
git commit -m <message>
git push
```





#### 参考资料
[git-book](https://git-scm.com/book/en/v2)

[git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

[生成 SSH 公钥](https://git-scm.com/book/zh/v1/服务器上的-Git-生成-SSH-公钥)
