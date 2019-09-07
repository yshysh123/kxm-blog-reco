---
prev: /views/relearn_front_end/10/
next: /views/relearn_front_end/12/
---
# 浏览器工作解析一（十一）

## 一、URL到网页呈现发生了什么？

### 1.1、过程

- 1、浏览器首先使用 `HTTP` 协议或者 `HTTPS` 协议，向服务端请求页面
- 2、把请求回来的 `HTML` 代码经过解析，构建成 `DOM` 树
- 3、计算 `DOM` 树上的 `CSS` 属性
- 4、最后根据 `CSS` 属性对元素逐个进行渲染，得到内存中的位图
- 5、一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度
- 6、合成之后，再绘制到界面上

### 1.2、流程图

winter用访问极客时间网站为例整理了一下流程

![流程图](https://static001.geekbang.org/resource/image/63/4c/6391573a276c47a9a50ae0cbd2c5844c.jpg)

注意一点：从 HTTP 请求回来，就产生了流式的数据，后续的 DOM 树构建、CSS 计算、渲染、合成、绘制，都是尽可能地流式处理前一步的产出

## 二、HTTP协议

### 2.1、HTTP标准

#### 2.1.1、介绍

1、HTTP 标准由 `IETF` 组织制定，跟它相关的标准主要有两份：

1）、`HTTP1.1`：[https://tools.ietf.org/html/rfc2616](https://tools.ietf.org/html/rfc2616)

2）、`HTTP1.1`：[https://tools.ietf.org/html/rfc7234](https://tools.ietf.org/html/rfc7234)

2、`TCP` 协议是一条双向的通讯通道，`HTTP` 在 `TCP `的基础上，规定了 `Request-Response` 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。

3、`HTTP` 是纯粹的文本协议，它是规定了使用 `TCP` 协议来传输文本格式的一个应用层协议。

#### 2.1.2、小实验

> winter用一个纯粹的 `TCP` 客户端来手工实现 `HTTP`，实验需要使用`telnet`客户端

1、运行 `telnet`，连接到极客时间主机

```bash
telnet time.geekbang.org 80
```

2、`TCP` 连接已经建立，输入下面字符作为请求（请求部分）

```bash
GET / HTTP/1.1
Host: time.geekbang.org
```

第一行被称作 `request line`，它分为三个部分，`HTTP Method`（请求的方法）、请求的路径、请求的协议和版本。

紧跟在`request line`后面的是请求头，每行用冒号分隔名称和值

3、按下两次回车，收到服务端回复（响应部分）

```bash
HTTP/1.1 301 Moved Permanently
Date: Fri, 25 Jan 2019 13:28:12 GMT
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

第一行被称作 `response line`，它也分为三个部分，协议和版本、状态码和状态文本。

紧随在 `response line` 之后，是响应头，每行用冒号分隔的名称和值

## 三、HTTP 协议格式

### 3.1、HTTP协议划分

![HTTP协议划分](https://static001.geekbang.org/resource/image/3d/a1/3db5e0f362bc276b83c7564430ecb0a1.jpg)

### 3.2、HTTP Method（方法）

> 类型：`GET、POST、HEADPUT、DELETE、CONNECT、OPTIONS、TRACE`

1、浏览器通过地址栏访问页面都是 `GET` 方法

2、表单提交产生 `POST` 方法

3、`PUT` 和 `DELETE` 分别表示添加资源和删除资源

4、`CONNECT` 现在多用于 `HTTPS` 和 `WebSocket`

5、`OPTIONS` 和 `TRACE` 一般用于调试，多数线上服务都不支持

### 3.3、 HTTP Status code（状态码）和 Status text（状态文本）

#### 3.3.1、1xx

> 临时回应，表示客户端请继续。对前端来说`1xx` 系列的状态码是非常陌生的，原因是 `1xx` 的状态被浏览器 `http` 库直接处理掉了，不会让上层应用知晓。

#### 3.3.2、2xx

> `2xx` 系列的状态最熟悉的就是 `200`，这通常是网页请求成功的标志

#### 3.3.3、3xx

> 表示请求的目标有变化，希望客户端进一步处理。

- `301`&`302`：永久性与临时性跳转。
- `304`：跟客户端缓存没有更新。

#### 3.3.4、4xx

> 客户端请求错误。

- `403`：无权限。
- `404`：表示请求的页面不存在。
- `418`：`It’s a teapot.` 这是一个彩蛋，来自 `IETF` 的一个愚人节玩笑。（[超文本咖啡壶控制协议](https://tools.ietf.org/html/rfc2324)）

#### 3.3.5、5xx

> 服务端请求错误。

- `500`：服务端错误。
- `503`：服务端暂时性错误，可以一会再试。

### 3.4、HTTP Head (HTTP 头)

#### 3.4.1、Request Header

![Request Header](https://static001.geekbang.org/resource/image/2b/a2/2be3e2457f08bdf624837dfaee01e4a2.png)

#### 3.4.2、Response Header

![Response Header](https://static001.geekbang.org/resource/image/ef/c9/efdeadf27313e08bf0789a3b5480f7c9.png)

### 3.5、HTTP Request Body

> `HTTP` 请求的 `body` 主要用于提交表单场景。

常见的 `body` 格式是：

- `application/json`
- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/xml`

1、使用 `html` 的 `form` 标签提交产生的 html 请求，默认会产生 `application/x-www-form-urlencoded` 的数据格式

2、当有文件上传时，则会使用 `multipart/form-data`。

## 四、HTTPS

### 4.1、作用

- 1、确定请求的目标服务端身份
- 2、保证传输的数据不会被网络中间节点窃听或者篡改

### 4.2、标准

`HTTPS` 的标准也是由 `RFC` 规定的[查看详情](https://tools.ietf.org/html/rfc2818)

- `HTTPS` 是使用加密通道来传输 `HTTP` 的内容。
- `HTTPS`首先与服务端建立一条 `TLS` 加密通道。
- `TLS` 构建于 `TCP` 协议之上，它实际上是对传输的内容做一次加密，所以从传输内容上看，HTTPS 跟 HTTP 没有任何区别。

## 五、HTTP2

> HTTP 2 是 HTTP 1.1 的升级版本[查看详情](https://tools.ietf.org/html/rfc7540)

### 5.1、最大改进

- 1、`支持服务端推送`：服务端推送能够在客户端发送第一个请求到服务端时，提前把一部分内容推送给客户端，放入缓存当中，这可以避免客户端请求顺序带来的并行度不高，从而导致的性能问题。
- 2、`支持 TCP 连接复用`：TCP 连接复用，则使用同一个 TCP 连接来传输多个 HTTP 请求，避免了 TCP 连接建立时的三次握手开销，和初建 TCP 连接时传输窗口小的问题。
