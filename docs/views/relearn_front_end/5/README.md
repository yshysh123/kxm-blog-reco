---
title: 如何运用语义类标签来呈现Wiki网页？（五）
date: 2019-04-28
prev: /views/relearn_front_end/4/
next: /views/relearn_front_end/6/
tags:
 - Html
categories:
 - 重学前端专栏
---

## 通过wiki网页案例来学习语义类标签

> HTML最初的设计场景就是“超文本”，早期HTML工作组的专家都是出版界书籍排版的专家。

案例网址：

[https://en.wikipedia.org/wiki/World_Wide_Web](https://en.wikipedia.org/wiki/World_Wide_Web)

打不开上面这个网址的，（winter很贴心）提供了副本网址：

[http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html](http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html)

> 说明：本文图片由winter专栏提供，觉得不错的可以去订阅winter的专栏学习全文。

### 1、aside

![aside图片](https://static001.geekbang.org/resource/image/b6/da/b692ade1e78d295de52ffe01edaa11da.png)

标记的这块区域属于aside内容主要就是起到导航作用。

### 2、article

![article图片](https://static001.geekbang.org/resource/image/cf/aa/cfc9a6542e0fc973e6e871043e7e42aa.jpeg)

标记的这块区域文章的主体部分可使用article，具有明确的独立性。

### 3、hgroup,h1,h2

![hgroup,h1,h2图片](https://static001.geekbang.org/resource/image/7d/48/7ddad196e7734fd32bfc577b3a459c48.jpeg)

标记的部分可以像下面这样解析：

- hgroup是标题组
- h1是一级标题：World Wide Web
- h2是二级标题：From Wikipedia, the free encyclopedia

代码的话就类似这样：

```html
<hgroup>
<h1>World Wide Web </h1>
<h2>From Wikipedia, the free encyclopedia</h2>
</hgroup>
```

### 4、abbr

![abbrt图片](https://static001.geekbang.org/resource/image/13/72/139b1603d3851b11e9ee4ed955aec972.png)

说实话这个标签我没有见过，有点惭愧，我特意查了一下[w3c的abbr标签](http://www.w3school.com.cn/tags/tag_abbr.asp)的定义和用法：

- `<abbr>` 标签指示简称或缩写，比如 "WWW" 或 "NATO"。
- 通过对缩写进行标记，您能够为浏览器、拼写检查和搜索引擎提供有用的信息。
- `<abbr>` 标签最初是在 HTML 4.0 中引入的，表示它所包含的文本是一个更长的单词或短语的缩写形式。

浏览器支持情况：

- 所有浏览器都支持 `<abbr>` 标签
- 注释：IE 6 或更早版本的 IE 浏览器不支持 `<abbr>` 标签。

实列：标记一个缩写

```html
The <abbr title="People's Republic of China">PRC</abbr> was founded in 1949.
```

通过这些介绍，winter这里提的WWW就很好理解了：

```html
<abbr title="World Wide Web">WWW</abbr>.
```

### 5、hr

![hr图片](https://static001.geekbang.org/resource/image/3e/1e/3e3fca7df41dd824da47efca4aa2731e.jpeg)

你们一开始是不是觉得这里是不是用hr吗？

我一开始认为就是用hr，但被winter打脸了`_(:3」∠)_`.

答案是不用。

解释如下：

> winter: hr表示故事走向的转变和话题的转变，显然这里是两个标题，并没有这种关系，应该通过css的border来实现

`<hr>`注意的几个点

- 修改颜色使用background-color属性
- hr标签是块级标签，有边框
- 设置它自身的边框为0，然后在设置height。

### 6、p

![p图片](https://static001.geekbang.org/resource/image/a5/d4/a5c22955f87e2861cadfa3fdb15565d4.jpeg)

标记的部分有三个注记（note），它在文章中的作用就是额外的注释，但是html中并没有note相关的语义，这时可以使用p标签进行相关实现。

### 7、strong

![strong图片](https://static001.geekbang.org/resource/image/d7/a1/d7f8b1f98df1488813c3fc2d6b06d5a1.jpeg)

如果上下文中某些词很重要我们可以用`strong`标签

比如代码：

```html
<p>
    hello winter
    <strong>The World Wide Web (WWW)</strong>
</p>
```

### 8、blockquote,q,cite

![blockquote,q,cite图片](https://static001.geekbang.org/resource/image/e5/1a/e516e5e00ecc5b6b0b743dd2a8d65d1a.png)

关于“引述”标签的用法

- `blockquote`：表示段落引述内容
- `q`：表示行内引述内容
- `cite`：表示引述的作品名

这个我基本很少用，为了弄的更清楚一点，我又去查W3C关于`blockquote`，`q`，`cite`的定义跟用法：

1）、[w3c关于blockquote标签](http://www.w3school.com.cn/tags/tag_blockquote.asp)

定义和用法：
> `<blockquote>` 标签定义块引用。`<blockquote>`与 `</blockquote>` 之间的所有文本都会从常规文本中分离出来，经常会在左、右两边进行缩进（增加外边距），而且有时会使用斜体。也就是说，块引用拥有它们自己的空间。

浏览器支持情况：
> 所有主流的浏览器均支持 `<blockquote>` 标签，注释：没有浏览器能够正确地显示`cite`属性。

例子：

```html
<blockquote>
    Here is a long quotation here is a long quotation here is a long quotation here is a long quotation here is a long quotation here is a long quotation here is a long quotation here is a long quotation here is a long quotation.
</blockquote>
```

`提示：`
> 如需把页面作为 strict XHTML 进行验证，那么`<blockquote>`元素必须包含块级元素，比如这样：

```html
<blockquote>
    <p>here is a long quotation here is a long quotation</p>
</blockquote>
```

2）、[w3c关于q标签](http://www.w3school.com.cn/tags/att_q_cite.asp)

定义和用法：
> `cite` 属性规定引用的来源。该属性的值是一个包含在引号中并指向联机文档的 URL，以及（如果有可能的话）引用在该文档中的确切位置。

浏览器支持情况：
> 主流浏览器均不支持 `cite` 属性。不过，搜索引擎可能会使用该属性获得更多有关引用的信息。

语法：

```html
<q cite="URL">
```

例子：
> 下面这个`q`元素中的`cite`属性指定了引用的来源：

```html
<p>
    WWF's goal is to:
    <q cite="http://www.wwf.org">
        build a future where people live in harmony with nature
    </q> we hope they succeed.
</p>
```

3）、[w3c关于cite标签](http://www.w3school.com.cn/tags/tag_cite.asp)

定义和用法:

- `<cite>`标签通常表示它所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。按照惯例，引用的文本将以斜体显示。
- 更多可以参考[w3c网址](http://www.w3school.com.cn/)...

浏览器支持情况：
> 所有浏览器都支持`<cite>`标签。

例子：
> 比如作品名：What is the difference between the Web and the Internet?

```html
<cite>What is the difference between the Web and the Internet?</cite>
```

### 9、time

![time图片](https://static001.geekbang.org/resource/image/95/b6/9573647112ae3812013b37c29aa7d2b6.png)

图片标记划线部分为日期，为了让机器阅读更加方便，我们可以添加`time`标签

代码如下：

```html
Retrieved <time datetime="2015-07-16">16 July 2015</time>.
```

### 10、figure,figcaption

![figure,figcaption](https://static001.geekbang.org/resource/image/6d/72/6d473b6fb734ea85a8cc209bc1716b72.png)

如图所示标记部分：图文的结合组成了一个figure的语法现象，`figure`标签用于表示与主文章相关的图像...等内容

例子：
> 用作文档中插图的图像：

```html
<figure>
  <p>黄浦江上的的卢浦大桥</p>
  <img src="shanghai_lupu_bridge.jpg" width="350" height="234" />
</figure>
```

`figcaption`标签用作文档中插图的图像，带有一个标题，代码如下：

```html
<figure>
  <figcaption>黄浦江上的的卢浦大桥</figcaption>
  <img src="shanghai_lupu_bridge.jpg" width="350" height="234" />
</figure>
```

### 11、dfn

![dfn](https://static001.geekbang.org/resource/image/b7/19/b7ae53127450b496729edd459cbc0619.png)

我刚开始看的时以为是dnf（大笑），这又是我没见过的`_(:3」∠)_`，于是我先查了一下[w3c关于dfn标签](http://www.w3school.com.cn/tags/tag_dfn.asp)，感觉介绍很少

`dfn标签`定义和用法：
> `<dfn>`标签可标记那些对特殊术语或短语的定义。现在流行的浏览器通常用斜体来显示 `<dfn>`中的文本。将来，`<dfn>`还可能有助于创建文档的索引或术语表。

图片划线部分就有`Internet`和WWW的定义，例子代码如下：

```html
The <dfn>Internet</dfn> is a global system of interconnected computer networks.
```

### 12、nav,ol,ul

![nav,ol,ul图片](https://static001.geekbang.org/resource/image/c1/f6/c12c129af98f6aa99b7dcdbdef1f62f6.png)

如图这个可以导航并且有顺序，代码如下：

```html
<nav>
  <h2>Contents</h2>
  <ol>
    <li><a href="...">History</a></li>
    <li><a href="...">Function</a>
      <ol>
        <li><a href="...">Linking</a></li>
        <li><a href="...">Dynamic updates of web pages</a></li>
        ...
      </ol>
    </li>
    ...
  </ol>
</nav>
```

### 13、pre,samp,code

![pre,samp,code图片](https://static001.geekbang.org/resource/image/ab/ed/ab5be608e3b4d2bd15b79c5b8885a2ed.png)

这三个标签的定义和用法:

- [pre](http://www.w3school.com.cn/tags/tag_pre.asp)：元素可定义预格式化的文本。被包围在 `pre`元素中的文本通常会保留空格和换行符。常见应用就是用来表示计算机的源代码。
- [samp](http://www.w3school.com.cn/tags/tag_samp.asp)：表示一段用户应该对其没有什么其他解释的文本字符
- [code](http://www.w3school.com.cn/tags/tag_code.asp)：标签用于表示计算机源代码或者其他机器可以阅读的文本内容。

例子代码：

```html
<pre>
    <samp>
        GET /home.html HTTP/1.1
        Host: www.example.org
    </samp>
</pre>
```

```html
<pre>
    <code>
        &lt;html&gt;
            &lt;head&gt;
                &lt;title&gt;Example.org – The World Wide Web&lt;/title&gt;
            &lt;/head&gt;
            &lt;body&gt;
                &lt;p&gt;The World Wide Web, abbreviated as WWW and commonly known ...&lt;/p&gt;
            &lt;/body&gt;
        &lt;/html&gt;
    </code>
</pre>
```

### 补充说明

> 上面winter已经讲了大概20来个标签，下面这些是没讲到的，winter做了一下整理补充

![补充说明](https://static001.geekbang.org/resource/image/96/9e/9684130e423b6734b23652f4f0b6359e.jpg)
