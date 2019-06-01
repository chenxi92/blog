<p align="right">2019-6-1</p>



> **LaTeX**（/ˈlɑːtɛx/，常被读作/ˈlɑːtɛk/或/ˈleɪtɛk/），排版时通常使用**LATEX**，是一种基于[TeX](https://zh.wikipedia.org/wiki/TeX)的[排版](https://zh.wikipedia.org/wiki/排版)系统，由[美国](https://zh.wikipedia.org/wiki/美国)[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)家[莱斯利·兰伯特](https://zh.wikipedia.org/wiki/莱斯利·兰伯特)在20世纪80年代初期开发，利用这种格式系统的处理，即使用户没有排版和程序设计的知识也可以充分发挥由TeX所提供的强大功能，不必一一亲自去设计或校对，能在几天，甚至几小时内生成很多具有书籍质量的印刷品。对于生成复杂表格和[数学](https://zh.wikipedia.org/wiki/数学)公式，这一点表现得尤为突出。因此它非常适用于生成高印刷质量的[科技](https://zh.wikipedia.org/wiki/科技)和数学、物理文档。这个系统同样适用于生成从简单的信件到完整书籍的所有其他种类的文档。
>
> <p align="right">维基百科</p>

Mac 使用使用 LaTeX 可以下载 [MacTeX](http://www.tug.org/mactex/)  ，也可使用 `Sublime Text` 编辑器配合 `LaTeXTools` 插件。

#### 基本语法

##### 序言

编写文档的序言部分，可以使用如下代码实例:

```
\documentclass{article}

\title{标题}
\author{作者}
\date{February 2017} 

\begin{document}

% 显示序言部分内容
\maketitle

\end{document}
```

`\documentclass{article}`  表明文档的类型是 `article` 类型，其他可供选择的值有：` article` 、`book`、`report` 等。

`\title{标题}` 表示文档的标题

`\author{作者}` 表示文档的作者

`\date{February 2017} ` 表示文档的时间,  还可以用`\today` 表示当前的时间。

文档的正文部分放在 `\begin{document}`  和  `\end{document}` 之间。

`\maketitle` 表示打印序言部分的内容。

`%` 开头的内容表示注释



##### 粗体、斜体、下划线

`\textbf{}` 命令会把大括号里面的内容以粗体的方式显示。

`\textit{}` 命令会把大括号里面的内容以斜体的方式显示。

`\underline{}` 命令会把大括号里面的内容以添加写划线的方式显示。



##### 图片

```latex
\documentclass{article}
\usepackage{graphicx}
\graphicspath{ {images/} }
 
\begin{document}
The universe is immense and it seems to be homogeneous, 
in a large scale, everywhere we look at.
 
\includegraphics{universe}
 
There's a picture of a galaxy above
\end{document}
```

LaTeX 自己本身不能管理图片，需要引用 **graphicx** [宏包](https://zhuanlan.zhihu.com/p/43981639) (package),  `\graphicspath{ {images/} }`  表示图片位于当前目录下的 `images` 文件夹下， `\includegraphics{universe}` 表示使用 `universe` 这样图片。

更多图片用法，请参考 [insert-images](https://www.overleaf.com/learn/latex/Inserting_Images)。



##### 列表

列表分为有序列表和无序列表，列表的每一个子项都使用 `\item` 来表示。

无序列表通过 `itemsize` 环境变量来生成。

```latex
\begin{itemize}
  \item The individual entries are indicated with a black dot, a so-called bullet.
  \item The text in the entries may be of any length.
\end{itemize}
```

有序列表通过 `enumerate` 环境变量来生成。

```latex
\begin{enumerate}
  \item This is the first entry in our list
  \item The list numbers increase with each entry we add
\end{enumerate}
```

有序列表和无序列表还可以互相嵌套。

更多列表用法，请参考 [Lists](https://www.overleaf.com/learn/Lists) 。



##### 数学公式

数学公式有两种显示方式: 内联(`inline`) 和 展示(`display`)。

内联数学公式:

```latex
In physics, the mass-energy equivalence is stated 
by the equation $E=mc^2$, discovered in 1905 by Albert Einstein.
```

内联的数学公式可以使用: ` \( … \)`  、`$ ... $`  、`\begin{math} ... \end{math}` 等三种命令来表示。

展示数学公式:

```latex
The mass-energy equivalence is described by the famous equation
 
\[E=mc^2\]
 
discovered in 1905 by Albert Einstein. 
In natural units ($c = 1$), the formula expresses the identity
 
\begin{equation}
E=m
\end{equation}
```

展示数学公式可以使用: `\[ ... \]`  、  `\begin{equation} ... \end{equation}`  、`\begin{displaymath} ... \end{displaymath}` 等三种命令来表示。

其他数学公式常用的宏包是: **amsmath**。

更多数学公式的用法，请参考 [Mathematical-expressions](https://www.overleaf.com/learn/latex/Mathematical_expressions)。



##### 章节片段

有如下常见章节片段:

`\part{part}`                              只是适用于 `documentclass` 类型是 `book` 和 `reprot`

`\chapter{chapter}`                  只是适用于 `documentclass` 类型是 `book` 和 `reprot`

`\section{section}`                 

`\subsection{subsection}`

`\paragraph{paragraph}`

`\subparagraph{subparagraph}`



##### 表格

创建一个简单的表格

```latex
\begin{center}
\begin{tabular}{ |c| c| c| }
\hline
cell1 & cell2 & cell3 \\ 
\hline
cell4 & cell5 & cell6 \\  
\hline
cell7 & cell8 & cell9 \\
\hline
\end{tabular}
\end{center}
```

`\tabular` 环境变量表示创建表格。`{|c|c|c|}` 表示表格有 3 列，每一列都居中显示，每一列之间的分隔符是 `|` 。`c` 表示居中对齐，`l` 表示居左对齐，`r` 表示居右对齐。 `\\` 表示换行， `\hline` 表示水平线。`\center` 环境变量，表示列表居中对齐。

更多表格用法，请参考 [Tables](https://www.overleaf.com/learn/latex/Tables) 。



#### 常见宏包

数学 - `amsmath`

图片- `graphicx`

颜色 - `xcolor`

表格 - `array`

中文 - `ctex` 或 `xecjk`

字体 - `fontspec`



#### 支持中文

##### 1. TeXShop 支持中文

`TexShow` 偏好设置 --> `编码` --> `Unicode(UTF-8)`

`排版` --> ` XeLaTeX` 

引入 `ctex` 包 

```latex
\documentclass{article}
\usepackage{ctex}
```

或者使用 `ctexart` 文档格式

```latex
\documentclass{ctexart}
```



##### 2. 编译 `tex` 文件

引入 `ctex` 包，使用如下命令编译 `tex` 文件。

```latex
xelatex xxx.tex
```



#### 参考资料

[Lear LaTeX in 30 minutes](https://www.overleaf.com/learn/Learn_LaTeX_in_30_minutes)

[Support Chinese](https://www.overleaf.com/learn/latex/Chinese)