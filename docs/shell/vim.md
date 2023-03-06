# Vim

Record some usages about Vim.

Platform: `macOS`



## Modal editing

Vim has the following operation modes:

- `Normal` for moving around a file and making edits
- `Insert` for inserting text
- `Replace` for replacing text
- `Visual` (plain, line, or block) for selecting blocks for text
- `Command-line` for running command



Keystrokes have different meanings in different operating modes. For example, the letter `x` in insert mode will just insert a literal character `x`, but in Normal mode, it will delete the character under the cursor, and in Visual mode, it will delete the selection.



## Command-Line

Command mode can be entered by typing `:` in `Normal mode`.

- `:q` quit (close window)
- `:w` save
- `:wq` save and quit
- `:ls` show open buffers
- `:help {topic}` open help
  - `:help :w` opens help for the `:w` command
  - `:help w` opens help for the `w` movement



## Movement

- Basic movement:
  - `h` (move left)
    - `{number}h` move cursor to left `{number}` steps
  - `l` (move right)
    - `{number}l` move cursor to right `{number}` steps
  - `j` (move down line)
    - `{number}j` move cursor to down `{number}` lines
  - `k` (move up line)
    - `{number}k` move cursor to up `{number}` lines
- Words
  - `w` (jump to next word)
    - `{number}w` move cursor to next `{number}` words
  - `b` (jump to beginning of word)
  - `e` (jump to end of word)
- Lines
  - `0` (jump to the begin of the line)
  - `^` (jumpt to first non-blank character)
  - `&` (jump to end of the line)
- Screen
  - `H` (jump to top of the screen)
  - `M` (jump to middle of the screen)
  - `L` (jump to the bottom of the scree)
- Scroll
  - `Ctrl+u` (scroll up)
  - `Ctrl+d` (scroll down)
- File
  - `gg` (jump to the begin of the file)
  - `G` (jump to the end of the file)



## Selection

Visual model:

- Visual: `v`
- Visual Line: `V`
- Visual Block: `Ctrl-V`

Can use movement keys to make selection.



## Edit

- `i` enter `Insert mode`
  - `o` insert line below
  - `O` insert line above
- `x` delete character (equal to `dl`)
- `u` to undo
- `Ctrl+r` to redo
- Copy (must in `Normal model`)
  - `yy` to copy entire line 
  - `{number}yy` to copy up `{number}` lines (include current line)
  - `yaw` to copy a word with it's trailing whitespace
  - `yiw` to copy a word without its trailing withspace
  - `y$` to copy everying right of the cursor to the end of the line
  - `y^` to copy everying left of the cursor to the start of the line
- Past
  - `p` to paste

- Delete 

  - `d {motion}` delete {motion}

    - `dw` delete word
    - `d&` delete to the end of the line
    - `d0` delete to the beginning of the line
    - `{number}dd` delete the following `{number}` lines (e.g `3dd` will delete the following 3 lines include the current line)
    - `dl` delete the current selected charcter

  -  Delete multiple lines

    Deleting multiple lines on a specific pattern is as follows:

    > `:g<pattern>/d`

    The global command ( `g` ) tells the delete command ( `d` ) to delete all lines containing the `<pattern>` .

    use the exclamation mark `!` to delete the lines not matching the pattern:

    > `:g!<pattern>/d`

    - `:g/foo/d` - Delete all lines containing the stirng `foo`.

    - `:g!/foo/d` - Delete all lines not containing the string `foo`.

    - `:g/^\s*$/d` - Remove all blank lines. Remove the blank lines that have zero or more whitespace characters (`\s*`).

    

## Insert mode

- `i` insert before the cursor
- `a` insert after the cursor
- `I` insert at the beginning of the line
- `A` insert at the end of the line



## Search

The basic steps to perform a search in Vim are as follows:

- Type `/` (to search backward) or `?` (to search forward) to start search

- Type the search pattern
- Press `Enter` to persorm search
- Press `n` to find the next occurrence or `N` to find the previous occurrence.



To ignore the case sensitive, append the `\c` at the search pattern.

To browse the search history ,type `/` or `?` and use the arrow up/down keys to search history.



## Replace

The [substitute](https://www.oreilly.com/library/view/vi-and-vim/9781449303082/ch01s07.html) command has the following syntax:

> :s/`<old>`/`<new>`/options



#### 1. In a Single Line

> :s/`<old>`/`<new>`/g

This replace the `<old>` with `<new>` in the current line.



#### 2. All Occurrence

> :%s/`<old>`/`<new>`/g

This replace the` <old>` with `<new>` in the every line of the file.



#### 3. Case-Insensitive

> :%s/`<old>`/`<new>`/gi

We can perform case-insensitive search by adding the `i` option at the end.



#### 4. With Specific Lines

The basic syntax:

> :`start_line_number`, `end_line_number` s/`<old>`/`<new>`g

For example:

```shell
:2, 3 s/hello//gi
```

The above command will replace `hello` (case-insensitive) with empty string between 2 to 3 lines.



## Practices

### 1. How to insert a string `insert-` before each line?

The original file `test` has the following content:

```
2.3.4.5
12.3.4.6
99.3.44.55
4.5.5.3
```

The steps are as follows:

- Type `vim test` at your command line
- Type `Ctrl+v` to enter Visual block mode
- Type `G` to jumpt the first character at the end of the file
- Type `I` to enter the insert mode
- Type `insert-` 
- Type `ESC` to exit the Visual block mode



### How to insert a string `-insert` after each line?

The original file `test` has the following content:

```
2.3.4.5
12.3.4.6
99.3.44.55
4.5.5.3
```

The steps are as follows:

- Type `vim test` at your command line
- Type `Ctrl+v` to enter Visual block mode
- Type `G` to jumpt the first character at the end of the file
- Type `$` to select all the content
- Type `A` to enter the insert mode (insert at the end)
- Type `-insert` 
- Type `ESC` to exit the Visual block mode



## Reference

[Messing Semester- Editors (Vim)](https://missing.csail.mit.edu/2020/editors/)

[Vim Cheat Sheet](https://vim.rtorr.com/)

[Search and Replace in Vim](https://www.baeldung.com/linux/vim-search-replace)
