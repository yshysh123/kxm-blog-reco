---
title: 狭义的文档对象DOM（二十三）
date: 2019-05-23
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/22/
next: /views/relearn_front_end/24/
---

## 一、DOM API 介绍

> `文档对象模型`：用来描述文档，特指 `HTML 文档`，同时它又是一个`对象模型`，使用对象这样的概念来描述 `HTML 文档`。

DOM API 大致包含 4 个部分

- `节点`：DOM 树形结构中的节点相关 API。
- `事件`：触发和监听事件相关 API。
- `Range`：操作文字范围相关 API。
- `遍历`：遍历 DOM 需要的 API。

> `HTML 文档`是一个由标签嵌套而成的树形结构，因此，`DOM` 也是使用树形的对象模型来描述一个 `HTML 文档`。

## 二、节点

> `DOM` 的树形结构所有的节点有统一的接口 `Node`。

![Node类型](https://static001.geekbang.org/resource/image/6e/f6/6e278e450d8cc7122da3616fd18b9cf6.png)

节点的html写法

```html
Element: <tagname>...</tagname>
Text: text
Comment: <!-- comments -->
DocumentType: <!Doctype html>
ProcessingInstruction: <?a 1?>
```

## 三、Node

> Node 是 DOM 树继承关系的根节点。

1、Node 提供了一组属性，来表示它在 DOM 树中的关系

- `parentNode`
- `childNodes`
- `firstChild`
- `lastChild`
- `nextSibling`
- `previousSibling`

2、Node 中也提供了操作 DOM 树的 API

- `appendChild`
- `insertBefore`
- `removeChild`
- `replaceChild`

3、Node 还提供了一些高级 API

- `compareDocumentPosition`：是一个用于比较两个节点中关系的函数。
- `contains`：检查一个节点是否包含另一个节点的函数。
- `isEqualNode`：检查两个节点是否完全相同。
- `isSameNode`：检查两个节点是否是同一个节点。
- `cloneNode`：复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

4、DOM 标准规定了节点必须从文档的 `create` 方法创建出来

- `createElement`
- `createTextNode`
- `createCDATASection`
- `createComment`
- `createProcessingInstruction`
- `createDocumentFragment`
- `createDocumentType`

## 四、Element 与 Attribute

> 元素对应了 HTML 中的标签，它既有子节点，又有属性。

1、把元素的 `Attribute` 当作字符串来看，有以下的 API

- `getAttribute`
- `setAttribute`
- `removeAttribute`
- `hasAttribute`

2、把 `Attribute` 当作节点

- `getAttributeNode`
- `setAttributeNode`

## 五、查找元素

1、document 节点提供了查找元素的能力

- `querySelector`
- `querySelectorAll`
- `getElementById`
- `getElementsByName`
- `getElementsByTagName`
- `getElementsByClassName`

2、`getElementById、getElementsByName、getElementsByTagName、getElementsByClassName`，这几个 API 的性能高于 `querySelector`。

3、`getElementsByName、getElementsByTagName、getElementsByClassName` 获取的集合并非数组，而是一个能够动态更新的集合。

```js
var cxk = document.getElementsByClassName('kaimo');
console.log(cxk.length); // 0

var kaimo = document.createElement('div');
kaimo.setAttribute('class', 'kaimo')
document.documentElement.appendChild(kaimo)
console.log(cxk.length); // 1
```

浏览器内部是有高速的索引机制，来动态更新这样的集合的。

## 六、遍历

> `DOM API` 中还提供了 `NodeIterator 和 TreeWalker` 来遍历树。并且它们提供了过滤功能，还可以把属性节点也包含在遍历之内。

### 6.1、`NodeIterator` 的基本用法

```js
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);

var node;
while(node = iterator.nextNode()){
    console.log(node);
}
```

### 6.2、`TreeWalker` 的用法

```js
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)

var node;
while(node = walker.nextNode()){
    if(node.tagName === "p")
        node.nextSibling();
    console.log(node);
}
```

建议需要遍历 DOM 的时候，直接使用递归和 Node 的属性。

## 七、Range

> `Range API` 表示一个 HTML 上的范围，这个范围是以文字为最小单位的。

1、**注意**：`Range API` 比 `节点 API` 更精确操作 `DOM 树`，并且性能更高，但是使用起来比较麻烦，在实际项目中，并不常用，只有做底层框架和富文本编辑对它有强需求。

2、创建 `Range` 一般是通过设置它的`起止`来实现

```js
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)
```

3、通过 Range 也可以从用户选中区域创建

```js
// 用于处理用户选中区域
var range = document.getSelection().getRangeAt(0);
```

4、更改 Range 选中区段内容由 `extractContents（取出） 和 insertNode（插入）` 来实现。

```js
var fragment = range.extractContents()
range.insertNode(document.createTextNode("abcd"))
```

## 拓展

一些概念可以参考:

1、[https://developer.mozilla.org/zh-CN/docs/Web/API/Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)

2、[https://www.runoob.com/jsref/dom-obj-document.html](https://www.runoob.com/jsref/dom-obj-document.html)