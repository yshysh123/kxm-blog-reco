---
prev: /views/relearn_front_end/26/
next: /views/relearn_front_end/28/
---
# JavaScript的词法（二十七）

## 一、JavaScript 的词法（lexical grammar）

> `ECMAScript 源码文本`会被从左到右扫描，并被转换为一系列的输入元素，包括 `token、控制符、行终止符、注释和空白符`。ECMAScript 定义了一些关键字、字面量以及行尾分号补全的规则。

[**可以参考MDN文档--词法文法**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)

### 1.1、分类

- `WhiteSpace` 空白字符
- `LineTerminator` 换行符
- `Comment` 注释
- `Token` 词
    - `IdentifierName 标识符名称`：典型案例就是使用的变量名，注意这里关键字也包含在内。
    - `Punctuator 符号`：使用的运算符和大括号等符号。
    - `NumericLiteral 数字直接量`：就是写的数字。
    - `StringLiteral 字符串直接量`：就是用单引号或者双引号引起来的直接量。
    - `Template 字符串模板`：用反引号 ` 括起来的直接量。

### 1.2、特别之处

1、除法和正则表达式冲突问题

> JavaScript 不但支持除法运算符` / `和` /= `，还支持用斜杠括起来的正则表达式` /.../ `。

**解决方案**：是定义两组词法，然后靠语法分析传一个标志给词法分析器，让它来决定使用哪一套词法。

2、字符串模板

> 理论上，` ${ } `内部可以放任何 `JavaScript 表达式代码`，而这些代码是以 ` } ` 结尾的，也就是说，这部分词法不允许出现 ` } ` 运算符。

```js
// <!-- 模板语法 -->
`Hello, ${world}`
```

3、四种词法定义

- InputElementDiv
- InputElementRegExp
- InputElementRegExpOrTemplateTail
- InputElementTemplateTail

## 二、空白符号 Whitespace

### 2.1、空白符号分类

- `<HT>`(或称`<TAB>`) 是 `U+0009`，是缩进 `TAB` 符，字符串中写的 `\t` 。
- `<VT>`是 `U+000B`，也就是垂直方向的 `TAB 符 \v`。
- `<FF>`是 `U+000C`，`Form Feed`，分页符，字符串直接量中写作 `\f`。
- `<SP>`是 `U+0020`，就是最普通的空格。
- `<NBSP>`是 `U+00A0`，非断行空格，它是 `SP` 的一个变体，在文字排版中，可以避免因为空格在此处发生断行，其它方面和普通空格完全一样。
- `<ZWNBSP>`(旧称`<BOM>`) 是 `U+FEFF`，这是 `ES5` 新加入的空白符，是` Unicode `中的零宽非断行空格，在以 `UTF 格式`编码的文件中，常常在文件首插入一个额外的 `U+FEFF`，解析 `UTF 文件`的程序可以根据 `U+FEFF` 的表示方法猜测文件采用哪种 `UTF 编码`方式。这个字符也叫做`bit order mark`。

### 2.2、所有的 Unicode 中的空格分类

![空格分类](https://static001.geekbang.org/resource/image/dd/60/dd26aa9599b61d26e7de807dee2c6360.png)

## 三、换行符 LineTerminator

### 3.1、四种换行符

- `<LF>`：是 `U+000A`，就是最正常换行符，在字符串中的 `\n`
- `<CR>`：是 `U+000D`，这个字符真正意义上的`回车`，在字符串中是 `\r`
- `<LS>`：是 `U+2028`，是 `Unicode` 中的行分隔符。
- `<PS>`：是 `U+2029`，是 `Unicode` 中的段落分隔符。

**注意**：换行符会影响 JavaScript 的两个重要语法特性：`自动插入分号` 和 `no line terminator`规则。

## 四、注释 Comment

```js
// 多行注释
/* MultiLineCommentChars */ 

// 单行注释
// SingleLineCommentChars
```

## 五、标识符名称 IdentifierName

> `IdentifierName`可以以`美元符$`，`下划线_`或者 `Unicode 字母`开始，除了开始字符以外，还可以使用 `Unicode` 中的连接标记、数字、以及连接符号。

关键字

```js
await break case catch class const 
continue debugger default delete do else 
export extends finally for function if 
import ininstance of new return super 
switch this throw try typeof 
var void while with yield
```

```js
// 为了未来使用而保留的关键字
enum

// 在严格模式下还有
implements package protected 
interface private public
```

`NullLiteral（null）和 BooleanLiteral（true false）` 也是保留字。

仅当不是保留字的时候，`IdentifierName`会被解析为`Identifier`。

## 六、符号 Punctuator

```
{ ( ) [ ] . ... ; , < > <= >= == != === !== 
+ - * % ** ++ -- << >> >>> & | ^ ! ~ && || 
? : = += -= *= %= **= <<= >>= >>>= &= |= 
^= => / /= }
```

## 七、数字直接量 NumericLiteral

> JavaScript 规范中规定的数字直接量可以支持四种写法：十进制数、二进制整数、八进制整数和十六进制整数。

1、十进制的 Number 可以带小数，小数点前后部分都可以省略，但是不能同时省略

```js
.01    // 0.01
1.     // 12
12.01  // 12.01
```

2、12.toString() 为什么会报错？

```js
12.toString()
// Uncaught SyntaxError: Invalid or unexpected token

// 原因： `12.` 会被当做省略了小数点后面部分的数字而看成一个整体，相当于执行了12toString()，所以会报错

// 解决：加入空格让其单独成为一个 token

12 .toString()  // "12"

// 或者加一个.

12..toString()  // "12"
```

另外科学计数法跟进制就不写了。。。。

## 八、字符串直接量 StringLiteral

```js
// 双引号
" DoubleStringCharacters "

// 单引号
' SingleStringCharacters '
```

### 8.1、单字符转义

> 即一个反斜杠 `\` 后面跟一个字符这种形式。

![单字符转义](https://static001.geekbang.org/resource/image/02/75/022c2c77d0a3c846ad0d61b48c4e0e75.png)

## 九、正则表达式直接量 RegularExpressionLiteral

> 正则表达式由 Body 和 Flags 两部分组成

```js
/RegularExpressionBody/g
```

其中 Body 部分至少有一个字符，第一个字符不能是 *（因为 /* 跟多行注释有词法冲突）。

## 十、字符串模板 Template

>  在 JavaScript 词法中，包含 `${ }` 的 Template，是被拆开分析的

```js
`a${b}c${d}e`

/*
// 被拆成了五个部分

`a${  //  这个被称为模板头
b     //  普通标识符
}c${  //  被称为模板中段
d     //  普通标识符
}e`   //  被称为模板尾

*/
```

模板支持添加处理函数的写法，这时模板的各段会被拆开，传递给函数当参数：

```js
function kaimo(){
    console.log(arguments);
}

var temp = "kaimo"

kaimo`hello ${temp} !`

// [["hello ", " !"], "kaimo"]
```
