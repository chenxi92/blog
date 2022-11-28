
## Git基本概念

- 工作区(Working Directory)

> 在电脑里面能够看到的目录

- 版本库（Repository）

> 工作区又一个隐藏文件夹`.git`, 叫做Git的版本库。<br>
> Git的版本库存放很多东西， 其中比价重要的就是stage（或者index) 的暂存区， 还有Git为我们自动创建的第一个分支`master`， 以及指向`master`的指针`HEAD`。

![index](../.vuepress/public/images/others/git/index.jpg)

- 远程仓库区(Remote)

> 代码托管的服务器



## 常见命令

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



## 版本回退

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




## 撤销文件的修改
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
	
	

## Branches

### Show branch

List local branches :

> git branch

List remote branches:

> git branch -r

List all branches (both local and remote)

> git branch -a



### Create branch

Create a branch with:

> git branch <branch-name>

Switch to a different branch with:

> git checkout <branch-name>

Create a branch and switch to it with:

> git checkout -b <branch-name>



### Merge branch

Merge a specific branch to current with:

> git merge <branch-name>



### Delete branch

Delete a local branch with:

> git branch -d <branch-name>

To delete a local branch that has not been merged to the current branch or an upstream:

> git branch -D <branch-name>



Delete a remote branch with:

> git push origin --delete <branch-name>

Or

> git push origin :<branch-name>



Delete multiple branches

> git branch | grep 'fix/' | xargs git branch -d

This will delete all branches that start with `fix/` .



### Rename branch

To rename the current(local) branch:

> git branch -m <new-branch-name>

To rename a different(local) branch:

> git branch -m <old-branch-name> <new-branch-name>



## Unstaged Edits

### I want to move my unstaged edits to a different, existing branch

```shell
git stash
git checkout <exist-branch-name>
git stash pop
```



## Resolve conflict
If you want to keep one branch's version of the code, you can use `--ours` or `--theirs`.

> git checkout --ours <file-path>



If you want to resoleve conflic manually, first find the conflict content, then correct the content. 

After resolved commit and push to remote.



## Submodules

### Clone all submodules

> git clone --recursive <url>

If already cloned

> git submodule update --init --recursive



### Remove a submodule

To remove a submodule with the following:

```shell
git submodule deinit <submodule-name>
git rm <submodule-name>
git rm --cached <submodule-name>
git -rf .git/modules/<submodule-name>
```



### Add a submodule

Add a submodule to your exist repository with:

> git submodule add `<submodule-url>`  `<path>`

`path` option means where you want to save the submodule, if empty the submodule will save in the root directory.



### Update submodule

> git submodule update --remote



## Generate publick key

Generate a publish key with:

> ssh-keygen

publick key usually located in the `~/.ssh` .



## Tags

### Show tag

Show the list of tags with:

> git tag

Show a specific tag with:

> git tag <tag-name>



### Create tag

Create a tag with:

> git tag -a <tag-name> 

Or add some message with:

> git tag -a <tag-name> -m 'xxx'

Create a tag from previous commit with:

> git tag -a <tag-name> <commit-id>

Use the `git log` command to get the commit id



### Push tag

Push a specific tag to remote with:

> git push origin <tag-name>

Push all the tags with:

> git push origin --tags



### Delete tag

Delete a local tag with:

> git tag -d <tag-name>



## Git ignore

### Ignore files before commit

Create a `.gitignore` file at the root directory of your repository. 

Commit the `.gitignore` file and push it to remote.

Some rules about the `.gitignore` file:

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



### Ignore files after committed

First remove the file from you local cache:

> git rm --cached <file-path>

Then create a `.gitignore` file and edit the ignore rules

Finally push it to remote with:

```shell
git add .
git commit -m "xxx"
git push
```



## Commits

### What did I commit?

Show the latest commit on your current HEAD with:

> git show

Or

> git log -n1 -p

Or

> git log --pretty=oneline

See a file at a specific commit with:

> git show <commit-id>:<file-name>



### I wrote the wrong thing in a commit message

If you wrote the wrong thing and the commit has not yet been pushed, you can do the following to change the commit message without changing the changes in the commit:

> git commit --amend --only

This will open your default text editor, where you can edit the message. 

On the other hand, you can do this all in one command:

> git commit --amend --only -m 'xxx'



### I want to remove a file form the previous commit

In order to remove changes for a file form the previous commit, do the following:

```shell
$ git checkout HEAD^ myfile
$ git add myfile
$ git commit --amend --on-edit
```

In case the file was newly added to the commit and you want to remove it(from Git alone), do:

```shell
$ git rm --cached myfile
$ git commit --amend --no-edit
```

The `--no-edit` option is used to keep the existing commit message.



## Reference
[git-book](https://git-scm.com/book/en/v2)

[git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

[生成 SSH 公钥](https://git-scm.com/book/zh/v1/服务器上的-Git-生成-SSH-公钥)

[git flight rules](https://github.com/k88hudson/git-flight-rules)

