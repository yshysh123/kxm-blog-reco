---
title: div和span不是够用吗？（四）
date: 2019-04-26
prev: /views/relearn_front_end/3/
next: /views/relearn_front_end/5/
tags:
 - Html
categories:
 - 重学前端专栏
---

## 一、语义类标签是什么，使用它有什么好处？

### 1、语义类标签

> 语义类标签就是尽量使用有相对应的结构的含义的Html的标签

### 2、好处

- 对开发者友好，增加可读性，网页结构清晰，便于开发维护
- 利用SEO，爬虫...

### 3、使用语义标签的建议

> “用对”比“不用”好，“不用”比“用错”好。

## 二、作为自然语言延伸的语义类标签

- 作为自然语言和纯文本的补充，用来表达一定的结构或者消除歧义
- winter举了两个例子：html5中的ruby标签，em标签来进行说明
  
比如em标签例子

把“今天我吃了一个苹果”这句话放到不同上下文中，表达的意思会不同

```html
昨天我吃了一个香蕉。
今天我吃了一个苹果。
```

```html
昨天我吃了两个苹果。
今天我吃了一个苹果。
```

是不是感觉不同，当没有上下文的时候，可以用em标签

```html
今天我吃了一个 <em> 苹果 </em>。
今天我吃了 <em> 一个 </em> 苹果。
```

## 三、作为标题摘要的语义类标签

3.1、语义化的 HTML 能够支持自动生成目录结构，HTML 标准中还专门规定了生成目录结构的算法

```html
例如：
<h1>HTML 语义 </h1>
<p>balah balah balah balah</p>
<h2> 弱语义 </h2>
<p>balah balah</p>
<h2> 结构性元素 </h2>
<p>balah balah</p>
......
```

3.2、h1-h6是最基本的标题，它们表示了文章中不同层级的标题。避免副标题可以使用html5的hgroup标签

```html
<h1>JavaScript 对象 </h1>
<h2> 我们需要模拟类吗？</h2>
<p>balah balah</p>
......
```

生成标题结构如下

- JavaScript 对象
	- 我们需要模拟类吗？
	- ...

```html
<hgroup>
<h1>JavaScript 对象 </h1>
<h2> 我们需要模拟类吗？</h2>
</hgroup>
<p>balah balah</p>
......

```

生成标题结构如下

- JavaScript 对象——我们需要模拟类吗？
	- ...

3.3、section标签的嵌套会使h1-h6下降一级

```html
<section>
    <h1>HTML 语义 </h1>
    <p>balah balah balah balah</p>
    <section>
        <h1> 弱语义 </h1>
        <p>balah balah</p>
    </section>
    <section>
        <h1> 结构性元素 </h1>
        <p>balah balah</p>
    </section>
......
</section>
```

标题结构如下

- HTML 语义
	- 弱语义
	- 结构性元素
	- ......

## 四、作为整体结构的语义类标签

4.1、正确使用整体结构类的语义标签，可以让页面对机器更友好

```html
<body>
    <header>
        <nav> …… </nav>
    </header>
    <aside>
        <nav> …… </nav>
    </aside>
    <section> …… </section>
    <section> …… </section>
    <section> …… </section>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <footer>
        <address>……</address>
    </footer>
</body>
```
