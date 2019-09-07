---
prev: /views/relearn_front_end/34/
next: /views/relearn_front_end/36/
---
# HTML标准分析（三十五）

## 一、介绍

> 由于阅读标准有一定门槛，需要了解一些机制，这一篇介绍怎么用 `JavaScript` 代码去抽取标准中我们需要的信息。

## 二、HTML 标准

### 2.1、标准是如何描述一个标签的

1、采用 `WHATWG` 的 `living standard` 标准

> `WHATWG`：超文本应用技术工作组；排版引擎比较；网页超文本技术工作小组；网络超文本应用技术工作组；（来自有道的翻译）

```
Categories:
    Flow content.
    Phrasing content.
    Embedded content.
    If the element has a controls attribute: Interactive content.
    Palpable content.
Contexts in which this element can be used:
    Where embedded content is expected.
Content model:
    If the element has a src attribute: zero or more track elements, then transparent, but with no media element descendants.
    If the element does not have a src attribute: zero or more source elements, then zero or more track elements, then transparent, but with no media element descendants.
Tag omission in text/html:
    Neither tag is omissible.
Content attributes:
    Global attributes
    src — Address of the resource
    crossorigin — How the element handles crossorigin requests
    poster — Poster frame to show prior to video playback
    preload — Hints how much buffering the media resource will likely need
    autoplay — Hint that the media resource can be started automatically when the page is loaded
    playsinline — Encourage the user agent to display video content within the element's playback area
    loop — Whether to loop the media resource
    muted — Whether to mute the media resource by default
    controls — Show user agent controls
    width — Horizontal dimension
    height — Vertical dimension
DOM interface:
    [Exposed=Window, HTMLConstructor]
    interface HTMLVideoElement : HTMLMediaElement {
      [CEReactions] attribute unsigned long width;
      [CEReactions] attribute unsigned long height;
      readonly attribute unsigned long videoWidth;
      readonly attribute unsigned long videoHeight;
      [CEReactions] attribute USVString poster;
      [CEReactions] attribute boolean playsInline;
    };
```

2、上面代码描述分为六个部分

- `Categories`：标签所属的分类。
- `Contexts in which this element can be used`：标签能够用在哪里。
- `Content model`：标签的内容模型。
- `Tag omission in text/html`：标签是否可以省略。
- `Content attributes`：内容属性。
- `DOM interface`：用 `WebIDL` 定义的元素类型接口。

## 三、用代码分析 HTML 标准

> HTML 标准描述用词非常的严谨，这给我们抓取数据带来了巨大的方便。

### 3.1、第1步：打开HTML标准网站

打开单页面版 HTML 标准 [https://html.spec.whatwg.org/](https://html.spec.whatwg.org/)

### 3.2、第2步：获取元素文本

打开控制台执行下面代码：

```js
Array.prototype.map.call(document.querySelectorAll(".element"), e=>e.innerText);
```

输出结果是107个元素：

```js
// 大概就是这样子的，我截取了一部分
(107) ["Categories:↵None.↵Contexts in which this element c…: HTMLElement {↵  // also has obsolete members↵};", "Categories:↵None.↵Contexts in which this element c…ctor]↵interface HTMLHeadElement : HTMLElement {};", "Categories:↵Metadata content.↵Contexts in which th…nt {↵  [CEReactions] attribute DOMString text;↵};", …]
[0 … 99]
[100 … 106]
length: 107
__proto__: Array(0)
```

### 3.3、第3步：组装元素名

在第2步的基础上可以发现，返回的元素是没有元素名的，这一步主要是通过id属性获取，然后组装起来

```js
var elementDefinations = Array.prototype.map.call(document.querySelectorAll(".element"), e => ({
  text:e.innerText,
  name:e.childNodes[0].childNodes[0].id.match(/the\-([\s\S]+)\-element:/)?RegExp.$1:null}));
console.log(elementDefinations);
```

输出结果:

```js
// 大概就是这样子的，我截取了一部分
(107) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
[0 … 99]
[100 … 106]
length: 107
__proto__: Array(0)

// 但是{}里面就是类似这样的
{
    name: "html"
    text: "Categories:↵None.↵Contexts in which this element can be ....."
}
```

### 3.4、第4步：拆分文本

#### 1、categories

> 把这些不带任何条件的 category 先保存起来，然后打印出来其它的描述看看：

```js
for(let defination of elementDefinations) {
  //console.log(defination.name + ":")
  let categories = defination.text.match(/Categories:\n([\s\S]+)\nContexts in which this element can be used:/)[1].split("\n");
  defination.categories = [];
  for(let category of categories) {
    if(category.match(/^([^ ]+) content./))
      defination.categories.push(RegExp.$1);
    else
      console.log(category)  
  }
}
```

输出结果：

```js
2 None.
 If the element is allowed in the body: flow content.
 If the element is allowed in the body: phrasing content.
 If the itemprop attribute is present: flow content.
 If the itemprop attribute is present: phrasing content.
2 Sectioning root.
3 If the element's children include at least one li element: Palpable content.
 None.
 If the element's children include at least one name-value group: Palpable content.
2 None.
 Sectioning root.
 None.
 If the element has an href attribute: Interactive content.
 ...
```

#### 2、Content Model

> 先处理掉最简单点的部分，就是带分类的内容模型，再过滤掉带 If 的情况、Text 和 Transparent。

```js
for(let defination of elementDefinations) {
  //console.log(defination.name + ":")
  let categories = defination.text.match(/Categories:\n([\s\S]+)\nContexts in which this element can be used:/)[1].split("\n");
  defination.contentModel = [];
  let contentModel = defination.text.match(/Content model:\n([\s\S]+)\nTag omission in text\/html:/)[1].split("\n");
  for(let line of contentModel)
    if(line.match(/([^ ]+) content./))
      defination.contentModel.push(RegExp.$1);
    else if(line.match(/Nothing.|Transparent./));
    else if(line.match(/^Text[\s\S]*.$/));
    else
      console.log(line)
}
```

输出结果：

```js
A head element followed by a body element.
One or more h1, h2, h3, h4, h5, h6 elements, optionally intermixed with script-supporting elements.
3 Zero or more li and script-supporting elements.
Either: Zero or more groups each consisting of one or more dt elements followed by one or more dd elements, optionally intermixed with script-supporting elements.
......
```

### 3.5、第5步：编写 check 函数

> 有了 contentModel 和 category，要检查某一元素是否可以作为另一元素的子元素，就可以判断一下两边是否匹配。

#### 1、设置索引

```js
var dictionary = Object.create(null);

for(let defination of elementDefinations) {
  dictionary[defination.name] = defination;
}
```

#### 2、check函数

```js
function check(parent, child) {
  for(let category of child.categories)
    if(parent.contentModel.categories.conatains(category))
      return true;
  if(parent.contentModel.names.conatains(child.name))
      return true;
  return false;
}
```

## 拓展

[https://html.spec.whatwg.org/](https://html.spec.whatwg.org/)