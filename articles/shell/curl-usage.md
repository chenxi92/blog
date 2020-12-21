

#### 安装

```bash
brew install curl	
```



#### 用法

##### 基本

发送 HTTP 请求，并答应服务器的响应内容

```bash
curl quiet-waters-1228.herokuapp.com/hello
```

响应内容

```http
Hello, World!
Thank you for cURLing me!
```



如果想看到更多的响应信息， 可以使用 `-i` 参数来发送 HTTP 请求

```bash
curl -i quiet-waters-1228.herokuapp.com/hello
```

响应内容

```http
HTTP/1.1 200 OK
Cache-Control: max-age=0, private, must-revalidate
Content-Type: text/html; charset=utf-8
Etag: "a0bb15ce430e40738d857e3e7dfe0de7"
Server: thin 1.6.1 codename Death Proof
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-Request-Id: d605f89d-bffc-4983-8ca4-8ac2b77c7b8d
X-Runtime: 0.002568
X-Ua-Compatible: chrome=1
X-Xss-Protection: 1; mode=block
transfer-encoding: chunked
Connection: keep-alive

Hello, World!
Thank you for cURLing me!
```



##### 下载文件



##### 指定请求方法



-X



-d



-d  @[file-name]



-F



##### 设置请求头





[cURL](http://conqueringthecommandline.com/book/curl)