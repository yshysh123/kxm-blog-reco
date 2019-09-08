---
title: HTML里的链接元素（二十四）
date: 2019-05-27
tags:
 - Html
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/23/
next: /views/relearn_front_end/25/
---

## 一、介绍

> 链接是 `HTML` 中的一种机制，它是 `HTML` 文档和其它文档或者资源的连接关系。链接两种类型：一种是超链接型标签，一种是外部资源链接。

![链接](https://static001.geekbang.org/resource/image/ca/51/caab7832c425b3af2b3adae747e6f551.png)

## 二、link 标签

### 2.1、超链接型 link 标签

> 超链接型 `link` 标签是一种被动型链接。`link` 标签具有特定的 `rel` 属性，会成为特定类型的 `link` 标签。

#### 1、`canonical 型 link`

> 提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

```html
<link rel="canonical" href="...">
```

#### 2、`alternate 型 link`

> 提示页面它的变形形式，就是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，也可以提供给搜索引擎来使用的。

```html
<link rel="alternate" href="...">
```

典型应用场景：页面提供 rss 订阅时

```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
```

#### 3、`prev 型 link 和 next 型 link`

> 用来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。

#### 4、其它超链接类的 `link`

- `rel="author"`：链接到本页面的作者，一般是 `mailto:` 协议
- `rel="help"`：链接到本页面的帮助页
- `rel="license"`：链接到本页面的版权信息页
- `rel="search"`：链接到本页面的搜索页面（一般是站内提供搜索时使用）

### 2.2、外部资源类 link 标签

> 外部资源型 `link` 标签会被主动下载，并且根据 `rel` 类型做不同的处理。

#### 1、`icon 型 link`

> 唯一一个外部资源类的`元信息 link`，其它元信息类 link 都是超链接，`icon 型 link` 中的图标地址默认会被浏览器下载和使用。

**注意**：多数浏览器会使用域名根目录下的 `favicon.ico`，即使它并不存在，从性能的角度考虑，建议页面中有 `icon 型的 link`。

#### 2、`预处理类 link`

> `预处理类 link 标签`就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（`乱用性能反而更差`）。

- `dns-prefetch 型`：link 提前对一个域名做 dns 查询
- `preconnect 型`：link 提前对一个服务器建立 tcp 连接
- `prefetch 型`：link 提前取 href 指定的 url 的内容
- `preload 型`：link 提前加载 href 指定的 url
- `prerender 型`：link 提前渲染 href 指定的 url

#### 3、`modulepreload 型的 link`

> 预先加载一个 `JavaScript` 的模块，这样能保证 JS 模块不必等到执行时才加载。所谓加载，是指完成下载并放入内存，并不会执行对应的 `JavaScript`。

```html
<!-- 预加载这两个js，提高性能 -->
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="kaimo.js">
<!-- 比如app.js里import了kaimo.js -->
<script type="module" src="app.js">
```

#### 4、`stylesheet 型 link`

```html
<link rel="stylesheet" href="xxx.css" type="text/css">
```

#### 5、`pingback 型 link`

> 表示本网页被引用时，应该使用的 `pingback 地址`，这个机制是一份独立的标准，遵守 `pingback 协议`的网站在引用本页面时，会向这个 `pingback url` 发送一个消息。

## 三、a 标签

### 3.1、有 `rel` 属性的种类

> 下面的跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

- `alternate`
- `author`
- `help`
- `license`
- `next`
- `prev`
- `search`

### 3.2、独有的 rel 类型

- `tag`：表示本网页所属的标签
- `bookmark`：到上级章节的链接·

### 3.3、辅助的 rel 类型

> 用于提示浏览器或者搜索引擎做一些处理

- `nofollow`：此链接不会被搜索引擎索引
- `noopener`：此链接打开的网页无法使用 `opener` 来获得当前页面的窗口
- `noreferrer`：此链接打开的网页无法使用 `referrer` 来获得当前页面的 `url`
- `opener`：打开的网页可以使用 `window.opener` 来访问当前页面的 `window 对象`，这是 a 标签的默认行为。

## 四、area 标签

> 与 a 标签非常相似，不同的是，它不是文本型的链接，而是`区域型的链接`。`area` 是整个 `html` 规则中唯一支持`非矩形热区`的标签。

`shape 属性`支持三种类型

- `圆形`：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r
- `矩形`：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2
- `多边形`：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点

```html
<!-- area 必须跟 img 和 map 标签配合使用 -->
<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```

**总的来说**：`a 标签`基本解决了在页面中`插入文字型`和`整张图片超链接`的需要，如果想要`在图片的某个区域产生超链接`，就要用到area 标签。
