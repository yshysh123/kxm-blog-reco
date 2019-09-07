---
prev: /views/relearn_front_end/11/
next: /views/relearn_front_end/13/
---
# 浏览器工作解析二（十二）

## 一、概括

> 本文主要聊聊浏览器如何解析请求回来的 `HTML` 代码以及 `DOM` 树又是如何构建的。

![流程图](https://static001.geekbang.org/resource/image/34/5a/34231687752c11173b7776ba5f4a0e5a.png)

## 二、解析代码

### 2.1、词（token）是如何被拆分的

> “词”（指编译原理的术语 `token`，表示最小的有意义的单元），种类大约只有 `标签开始`、`属性`、`标签结束`、`注释`、`CDATA节点`几种。

接下拆解下面代码：

```html
<p class="a">text text text</p>
```

这段代码依次拆成词（`token`）：

- &lt;p“标签开始”的开始
- class=“a” 属性
- &gt;  “标签开始”的结束
- text text text 文本
- &lt;/p&gt; 标签结束

关于`token`的解释：

![token解释](https://static001.geekbang.org/resource/image/f9/84/f98444aa3ea7471d2414dd7d0f5e3a84.png)

从 `HTTP` 协议收到的字符流读取字符。每读入一个字符，其实都要做一次决策，而且这些决定是跟“当前状态”有关的。把字符流解析成词（`token`），最常见的方案就是使用状态机。

### 2.2、状态机

#### 2.2.1、过程

把部分词（token）的解析画成一个状态机：

![token->状态机](https://static001.geekbang.org/resource/image/8b/b0/8b43d598bc1f83a8a1e7e8f922013ab0.png)

[具体的可以参考HTML官方文档](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)

状态机的初始状态，我们仅仅区分 “< ”和 “非 <”：

- 如果获得的是一个非 `<` 字符，那么可以认为进入了一个文本节点
- 如果获得的是一个 `<` 字符，那么进入一个标签状态

可能会遇到的情况：

- 比如下一个字符是“ `!` ” ，那么很可能是进入了注释节点或者 `CDATA节点`
- 如果下一个字符是 “ `/` ”，那么可以确定进入了一个结束标签
- 如果下一个字符是字母，那么可以确定进入了一个开始标签
- 如果我们要完整处理各种 HTML 标准中定义的东西，那么还要考虑 “ `?` ” “ `%` ”等内容

#### 2.2.2、代码化

```js
// 初始状态
var data = function(c){
    if(c=="&") {
        return characterReferenceInData;
    }
    if(c=="<") {
        return tagOpen;
    }
    else if(c=="\0") {
        error();
        emitToken(c);
        return data;
    }
    else if(c==EOF) {
        emitToken(EOF);
        return data;
    }
    else {
        emitToken(c);
        return data;
    }
};

// tagOpenState 是接受了一个“ < ” 字符，来判断标签类型的状态。
var tagOpenState = function tagOpenState(c){
    if(c=="/") {
        return endTagOpenState;
    }
    if(c.match(/[A-Z]/)) {
        token = new StartTagToken();
        token.name = c.toLowerCase();
        return tagNameState;
    }
    if(c.match(/[a-z]/)) {
        token = new StartTagToken();
        token.name = c;
        return tagNameState;
    }
    if(c=="?") {
        return bogusCommentState;
    }
    else {
        error();
        return dataState;
    }
};
//……
```

状态迁移代码：

> 所谓的状态迁移，就是当前状态函数返回下一个状态函数。

```js
var state = data;
var char
while(char = getInput())
    state = state(char);
```

状态函数通过代码中的 `emitToken` 函数来输出解析好的 `token`（词），我们只需要覆盖 `emitToken`，即可指定对解析结果的处理方式。

词法分析器代码：

```js
function HTMLLexicalParser(){

    // 状态函数们……
    function data() {
        // ……
    }

    function tagOpen() {
        // ……
    }
    // ……
    var state = data;
    this.receiveInput = function(char) {
        state = state(char);
    }
}
```

至此，字符流被拆成词（token）。

## 三、构建 DOM 树

### 3.1、用栈实现词->dom树

HTML词法分析器：

```js
function HTMLSyntaticalParser(){
    var stack = [new HTMLDocument];
    // receiveInput负责接收词法部分产生的词（token）
    this.receiveInput = function(token) {
        // 构建dom树算法
    }
    // emmitToken 来调用
    this.getOutput = function(){
        return stack[0];
    }
}
```

NODE类：

```js
function Element(){
    this.childNodes = [];
}
function Text(value){
    this.value = value || "";
}
```

使用的栈正是用于匹配开始和结束标签的方案。

用上述的栈以及下面的html来进行解析过程分析：

```html
<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html>
```

栈-->dom树：

- 栈顶元素就是当前节点
- 遇到属性，就添加到当前节点
- 遇到文本节点，如果当前节点是文本节点，则跟文本节点合并，否则入栈成为当前节点的子节点
- 遇到注释节点，作为当前节点的子节点
- 遇到 `tag start` 就入栈一个节点，当前节点就是这个节点的父节点
- 遇到 `tag end` 就出栈一个节点（还可以检查是否匹配）

本来这里有个视频分析上面html代码的，用栈构造 `DOM` 树的全过程，这里就用一张图片看一下算了：

![栈-->dom树](https://static001.geekbang.org/resource/image/7c/12/7cf7a46496b2c19ae78d263bcd75ef12.png)

视频演示了怎样生成右边的结果。[更多详情规则可以参考W3C网站关于树的构建部分](http://w3c.github.io/html/syntax.html#tree-construction)

## 拓展

发现一个不错的`html-parser`，github地址是：[https://github.com/aimergenge/toy-html-parser](https://github.com/aimergenge/toy-html-parser)。

### lexer.js展示

```js
const EOF = void 0

function HTMLLexicalParser (syntaxer) {
  let state = data
  let token = null
  let attribute = null
  let characterReference = ''

  this.receiveInput = function (char) {
    if (state == null) {
      throw new Error('there is an error')
    } else {
      state = state(char)
    }
  }

  this.reset = function () {
    state = data
  }

  function data (c) {
    switch (c) {
      case '&':
        return characterReferenceInData

      case '<':
        return tagOpen

      // perhaps will not encounter in javascript?
      // case '\0':
      //   error()
      //   emitToken(c)
      //   return data

      //  can be handle by default case
      // case EOF:
      //   emitToken(EOF)
      //   return data

      default:
        emitToken(c)
        return data
    }
  }

  // only handle right character reference
  function characterReferenceInData (c) {
    if (c === ';') {
      characterReference += c
      emitToken(characterReference)
      characterReference = ''
      return data
    } else {
      characterReference += c
      return characterReferenceInData
    }
  }

  function tagOpen (c) {
    if (c === '/') {
      return endTagOpen
    }
    if (/[a-zA-Z]/.test(c)) {
      token = new StartTagToken()
      token.name = c.toLowerCase()
      return tagName
    }
    // no need to handle this
    // if (c === '?') {
    //   return bogusComment
    // }
    return error(c)
  }


  function tagName (c) {
    if  (c === '/') {
      return selfClosingTag
    }
    if  (/[\t \f\n]/.test(c)) {
      return beforeAttributeName
    }
    if (c === '>') {
      emitToken(token)
      return data
    }
    if (/[a-zA-Z]/.test(c)) {
      token.name += c.toLowerCase()
      return tagName
    }
  }

  function beforeAttributeName (c) {
    if (/[\t \f\n]/.test(c)) {
      return beforeAttributeName
    }
    if (c === '/') {
      return selfClosingTag
    }
    if (c === '>') {
      emitToken(token)
      return data
    }
    if (/["'<]/.test(c)) {
      return error(c)
    }

    attribute = new Attribute()
    attribute.name = c.toLowerCase()
    attribute.value = ''
    return attributeName
  }

  function attributeName (c) {
    if (c === '/') {
      token[attribute.name] = attribute.value
      return selfClosingTag
    }
    if (c === '=') {
      return beforeAttributeValue
    }
    if (/[\t \f\n]/.test(c)) {
      return beforeAttributeName
    }
    attribute.name += c.toLowerCase()
    return attributeName
  }

  function beforeAttributeValue (c) {
    if (c === '"') {
      return attributeValueDoubleQuoted
    }
    if (c === "'") {
      return attributeValueSingleQuoted
    }
    if (/\t \f\n/.test(c)) {
      return beforeAttributeValue
    }
    attribute.value += c
    return attributeValueUnquoted
  }

  function attributeValueDoubleQuoted (c) {
    if (c === '"') {
      token[attribute.name] = attribute.value
      return beforeAttributeName
    }
    attribute.value += c
    return attributeValueDoubleQuoted
  }

  function attributeValueSingleQuoted (c) {
    if (c === "'") {
      token[attribute.name] = attribute.value
      return beforeAttributeName
    }
    attribute.value += c
    return attributeValueSingleQuoted
  }

  function attributeValueUnquoted (c) {
    if (/[\t \f\n]/.test(c)) {
      token[attribute.name] = attribute.value
      return beforeAttributeName
    }
    attribute.value += c
    return attributeValueUnquoted
  }

  function selfClosingTag (c) {
    if (c === '>') {
      emitToken(token)
      endToken = new EndTagToken()
      endToken.name = token.name
      emitToken(endToken)
      return data
    }
  }

  function endTagOpen (c) {
    if (/[a-zA-Z]/.test(c)) {
      token = new EndTagToken()
      token.name = c.toLowerCase()
      return tagName
    }
    if (c === '>') {
      return error(c)
    }
  }

  function emitToken (token) {
    syntaxer.receiveInput(token)
  }

  function error (c) {
    console.log(`warn: unexpected char '${c}'`)
  }
}

class StartTagToken {}

class EndTagToken {}

class Attribute {}

module.exports = {
  HTMLLexicalParser,
  StartTagToken,
  EndTagToken
}
```

### syntaxer.js展示

```js
const { StartTagToken, EndTagToken } = require('./lexer')

class HTMLDocument {
  constructor () {
    this.isDocument = true
    this.childNodes = []
  }
}
class Node {}
class Element extends Node {
  constructor (token) {
    super(token)
    for (const key in token) {
      this[key] = token[key]
    }
    this.childNodes = []
  }
  [Symbol.toStringTag] () {
    return `Element<${this.name}>`
  }
}
class Text extends Node {
  constructor (value) {
    super(value)
    this.value = value || ''
  }
}

function HTMLSyntaticalParser () {
  const stack = [new HTMLDocument]

  this.receiveInput = function (token) {
    if (typeof token === 'string') {
      if (getTop(stack) instanceof Text) {
        getTop(stack).value += token
      } else {
        let t = new Text(token)
        getTop(stack).childNodes.push(t)
        stack.push(t)
      }
    } else if (getTop(stack) instanceof Text) {
      stack.pop()
    }

    if (token instanceof StartTagToken) {
      let e = new Element(token)
      getTop(stack).childNodes.push(e)
      return stack.push(e)
    }
    if (token instanceof EndTagToken) {
      return stack.pop()
    }
  }

  this.getOutput = () => stack[0]
}

function getTop (stack) {
  return stack[stack.length - 1]
}

module.exports = {
  HTMLSyntaticalParser
}
```
