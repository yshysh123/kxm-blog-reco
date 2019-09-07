---
prev: /views/relearn_front_end/27/
next: /views/relearn_front_end/29/
---
# 通过四则运算的解释器快速理解编译原理（二十八）

## 一、分析

> 按照编译原理相关的知识，将其分成几个步骤。

- `定义四则运算`：产出四则运算的词法定义和语法定义。
- `词法分析`：把输入的字符串流变成 token。
- `语法分析`：把 token 变成抽象语法树 AST。
- `解释执行`：后序遍历 AST，执行得出结果。

## 二、定义四则运算

### 2.1、定义词法

- **Token**
  - **Number**: `1 2 3 4 5 6 7 8 9 0` 的组合
  - **Operator**: `+、-、*、/` 之一
- **Whitespace**：`<sp>`
- **LineTerminator**：`<LE> <CR>`

### 2.2、定义语法

> 语法定义多数采用 BNF。[巴科斯范式](https://baike.baidu.com/item/BNF/7328753?fr=aladdin)(BNF: `Backus-Naur Form` 的缩写)是由 John Backus 和 Peter Naur 首次引入一种形式化符号来描述给定语言的语法（最早用于描述ALGOL 60 编程语言）。JavaScript 标准里面就是一种跟 BNF 类似的自创语法。

1、加法是由若干个乘法再由加号或者减号连接成的：

```js
<Expression> ::=
    <AdditiveExpression><EOF>

<AdditiveExpression> ::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```

2、可把普通数字当成乘法的一种特例：

```js
<MultiplicativeExpression> ::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

上面就是四则运算的定义。

## 三、词法分析：状态机

> 词法分析：把字符流变成 token 流，有两种方案，一种是状态机，一种是正则表达式，它们是等效的。

### 3.1、实现状态机

```js
// 可能产生四种输入元素，其中只有两种 token，状态机的第一个状态就是根据第一个输入字符来判断进入了哪种状态

var token = [];
function start(char) {
    if(char === '1' || char === '2'|| char === '3'
        || char === '4'|| char === '5'|| char === '6'|| char === '7'
        || char === '8'|| char === '9'|| char === '0') {
        token.push(char);
        return inNumber;
    }
    if(char === '+' || char === '-' || char === '*' || char === '/') {
        emmitToken(char, char);
        return start
    }
    if(char === ' ') {
        return start;
    }
    if(char === '\r' || char === '\n') {
        return start;
    }
}
function inNumber(char) {
    if ( char === '1' || char === '2' || char === '3'
        || char === '4'|| char === '5' || char === '6' || char === '7'
        || char === '8' || char === '9' || char === '0') {
        token.push(char);
        return inNumber;
    } else {
        emmitToken("Number", token.join(""));
        token = [];
        // put back char
        return start(char);
    }
}

// 用函数表示状态，用 if 表示状态的迁移关系，用 return 值表示下一个状态。
```

### 3.2、运行状态机

```js
function emmitToken(type, value) {
    console.log(value);
}

var input = "1024 + 2 * 256"

var state = start;

for(var c of input.split(''))
    state = state(c);

state(Symbol('EOF'))

// 输出结果
1024
+
2
*
256
```

## 四、语法分析：LL

> LL 语法分析根据每一个产生式来写一个函数。

### 4.1、写好函数名

```js
function AdditiveExpression( ){

}
function MultiplicativeExpression(){

}
```

### 4.2、假设已经拿到 token

```js
var tokens = [{
    type:"Number",
    value: "1024"
}, {
    type:"+",
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];
```

### 4.3、AdditiveExpression处理

1、三种情况

```js
<AdditiveExpression> ::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```

2、AdditiveExpression 的写法

> AdditiveExpression 的写法是根传入的节点，利用产生式合成新的节点。

```js
function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return node;
    }
    if(source[0].type === "AdditiveExpression" && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[source.shift(), source.shift(), MultiplicativeExpression(source)]
        }
        source.unshift(node);
    }
    if(source[0].type === "AdditiveExpression" && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[source.shift(), source.shift(), MultiplicativeExpression(source)]
        }
        source.unshift(node);
    }
}
```

### 4.4、函数 Expression 处理

1、把解析好的 token 传给的顶层处理函数 Expression。

```js
Expression(tokens);
```

2、如果 Expression 收到第一个 token，是个 Number，就需要对产生式的首项层层展开，根据所有可能性调用相应的处理函数，这个过程在编译原理中称为求 `closure`。

```js
function Expression(source){
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "EOF" ) {
        let node = {
            type:"Expression",
            children:[source.shift(), source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}
function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression")
        return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}
function MultiplicativeExpression(source){
    if(source[0].type === "Number") {
        let node = {
            type:"MultiplicativeExpression",
            children:[source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "*") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"*",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression"&& source[1] && source[1].type === "/") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"/",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression")
        return source[0];

    return MultiplicativeExpression(source);
};

var source = [{
    type:"Number",
    value: "3"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "300"
}, {
    type:"+",
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];
var ast = Expression(source);

console.log(ast);
// 输出结果 children: Array(1) children: Array(3)还可以继续展开。。。
{
    type: "Expression",
    children: [
        {
            type: "AdditiveExpression",
            operator: "+",
            children: [
                {
                    type: "AdditiveExpression",
                    children: Array(1)
                },
                {
                    type: "+",
                    value: "+"
                },
                {
                    type: "MultiplicativeExpression",
                    operator: "*",
                    children: Array(3)
                }
            ]
        },
        {
            type: "EOF"
        }
    ]
}
```

## 五、解释执行

> 得到了 AST 之后，只需要对这个树做遍历操作执行即可。

```js
// 根据不同的节点类型和其它信息，用 if 分别处理即可：
function evaluate(node) {
    if(node.type === "Expression") {
        return evaluate(node.children[0])
    }
    if(node.type === "AdditiveExpression") {
        if(node.operator === '-') {
            return evaluate(node.children[0]) - evaluate(node.children[2]);
        }
        if(node.operator === '+') {
            return evaluate(node.children[0]) + evaluate(node.children[2]);
        }
        return evaluate(node.children[0])
    }
    if(node.type === "MultiplicativeExpression") {
        if(node.operator === '*') {
            return evaluate(node.children[0]) * evaluate(node.children[2]);
        }
        if(node.operator === '/') {
            return evaluate(node.children[0]) / evaluate(node.children[2]);
        }
        return evaluate(node.children[0])
    }
    if(node.type === "Number") {
        return Number(node.value);
    }
}
```
