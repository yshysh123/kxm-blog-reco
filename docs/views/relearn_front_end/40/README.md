---
prev: /views/relearn_front_end/39/
next: /views/relearn_front_end/41/
---
# HTML语言（四十）

## 一、介绍

> JavaScript 语言把它称为`编程语言`，它最大的特点是图灵完备的，大致可以理解为`包含了表达一切逻辑的能力`。像 HTML 这样的语言，称为`标记语言（mark up language）`，它是纯文本的一种升级，`标记`一词的概念来自：编辑审稿时使用不同颜色笔所做的`标记`。

## 二、基本语法

> HTML 作为 SGML 的子集，它遵循 SGML 的基本语法：包括标签、转义等。

![基本语法](https://static001.geekbang.org/resource/image/b6/bc/b6fdf08dbe47c837e274ff1bb6f630bc.jpg)

### 2.1、标签语法

> HTML 中，用于描述一个元素的标签分为开始标签、结束标签和自闭合标签。开始标签和自闭合标签中，又可以有属性。

- 开始标签：`<tagname>`
  - 带属性的开始标签：`<tagname attributename="attributevalue">`
- 结束标签：`</tagname>`
- 自闭合标签：`<tagname />`

**注意：HTML 中开始标签的标签名称只能使用英文字母。**

**属性中一定要转义的有：**

- 无引号属性：`<tab> <LF> <FF> <SPACE> &`五种字符。
- 单引号属性：`' &`两种字符。
- 双引号属性：`" &`两种字符。

### 2.2、文本语法

> 在 HTML 中，规定了两种文本语法，一种是普通的文本节点，另一种是 CDATA 文本节点。在 CDATA 节点内，不需要考虑多数的转义情况。只有字符组合`]]>`需要处理，这里不能使用转义，只能拆成两个 CDATA 节点。

## 三、DTD（Document Type Defination）

> DTD (文档类型定义)。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。

### 3.1、HTML4.01的三种DTD

1、严格模式

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

2、过渡模式

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

3、frameset 模式

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

### 3.2、HTML规定了XHTML的三个版本

1、版本一

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

2、版本二

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

3、版本三

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

## 四、文本实体

> DTD 规定了 HTML 包含了哪些标签、属性和文本实体。其中文本实体分布在三个文件中：HTMLsymbol.ent HTMLspecial.ent 和 HTMLlat1.ent。

**所谓文本实体定义就是类似以下的代码：**

> 每一个文本实体由`&`开头，由`;`结束，这属于基本语法的规定，文本实体可以用`#`后跟一个十进制数字，表示字符 Unicode 值。除此之外这两个符号之间的内容，则由 DTD 决定。

```html
&lt;
&nbsp;
&gt;
&amp;
```

## [HTML 4.01 符号实体](http://www.w3school.com.cn/tags/html_ref_symbols.html)
