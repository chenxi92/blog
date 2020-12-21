<p align="right">Update: 2020-12-21</p>



#### 安装

```bash
brew install curl	
```



#### 用法

##### 1. 基本用法

发送 HTTP 请求，并答应服务器的响应内容

```bash
curl [url]
```



如果想看到更多的响应信息， 可以使用 `-i` 参数来发送 HTTP 请求

```bash
curl -i [url]
```



##### 2. 下载文件

```bash
# 下载文件并重新命名
curl -o [custom-file-name] [url]
```



##### 3. 指定请求方法

使用 `-X` 指定HTTP请求方法， 默认时Get方法.

```bash
# 发送post请求
curl -X POST [url]

# 发送post请求，并且指定body参数 (指定name 和 age 的值)
curl -X POST -d "name=peak&age=12" [url]

# 发送post请求， 并且body参数使用本地文件, 从当前目录下的from_data.json文件中传递参数
curl -X POST -d @form_data.json [url]
```



##### 4. 设置请求头

```bash
# 指定请求头的内容
curl -X POST -H "Accept: application/json" [url]
```



#### 参考

[cURL](http://conqueringthecommandline.com/book/curl)