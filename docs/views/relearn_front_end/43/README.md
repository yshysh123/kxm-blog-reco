---
prev: /views/relearn_front_end/42/
next: /views/relearn_front_end/44/
---
# HTML的可访问性ARIA（四十三）

## 一、介绍

> ARIA 全称为 `Accessible Rich Internet Applications`，它表现为一组属性，是用于可访问性的一份标准。

## 二、综述

### 2.1、添加role属性

ARIA 给 HTML 元素添加的一个核心属性就是 role

```html
<span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="chk1-label">
</span> <label id="chk1-label">Remember my preferences</label>
```

上面代码给 `span` 添加了 `checkbox` 角色，表示这个 `span`被用于 `checkbox`，并且以 `checkbox`的交互方式来处理用户操作。

### 2.2、role属性的定义

> role 的定义是一个树形的继承关系。

整体结构：

![整体结构](https://static001.geekbang.org/resource/image/ae/69/aeccf64871b309735054912fbbb18a69.jpg)

其中，`widget` 表示一些可交互的组件，`structure` 表示文档中的结构，`window` 则代表窗体。

## 三、Widget 角色

这一类角色表示一个可交互的组件：

![可交互的组件](https://static001.geekbang.org/resource/image/10/dd/10ea9eb62d60fb4bfb18c27da50836dd.jpg)

按照继承关系展示列表和简要说明：

![继承关系说明图](https://static001.geekbang.org/resource/image/03/f1/038e1152c9bddc7ed864d271691d17f1.jpeg)

这些 widget 同时还会带来对应的 ARIA 属性，例如下面的两个

1、`Checkbox` 角色，会带来两个属性：

- `aria-checked` 表示复选框是否已经被选中；
- `aria-labelledby ` 表示复选框对应的文字。

2、`Button` 角色，会带来两个属性：

- aria-pressed 按钮是否已经被按下；
- aria-expanded 按钮控制的目标是否已经被展开。

[更多参考网站：https://www.w3.org/TR/wai-aria/](https://www.w3.org/TR/wai-aria/)

**一些复杂的角色**

1、`Combobox`是一个带选项的输入框，常见的搜索引擎，一般都会提供这样的输入框，当输入时，它会提供若干提示选项。

2、`Grid` 是一个表格，它会分成行、列，行列又有行头和列头表示行、列的意义。

3、`Tablist` 是一个可切换的结构，一般被称为选项卡，它包含了 `tab` 头和 `tabpanel`，在 `tab` 容器中，可能包含各种组件。

4、`Listbox` 是一个可选中的列表，它内部具有角色为 `Option` 的选项。

5、`Menu` 是指菜单，菜单中可以加入嵌套的菜单项（`Menuitem` 角色），除了普通菜单项，还可以有 `Menuitemcheckbox` 带复选框的菜单栏和 `Menuitemradio` 带单选框的菜单栏。

6、`Radiogroup` 是一组互斥的单选框的容器，它的内部可以由若干个角色为 `radio` 的单选框。

7、`Tree` 是树形控件，它的内部含有 `Treeitem` 树形控件项，它还有一种升级形式是 `Treegrid`。

## 四、structure 角色

这部分角色的作用类似于语义化标签，但是内容稍微有些不同。

![structure 角色](https://static001.geekbang.org/resource/image/b2/7a/b21a82fd68a885f751123f48a7e26b7a.jpg)

## 五、window 角色

在网页中，有些元素表示“新窗口”，这时候，会用到 window 角色。window 系角色非常少，只有三个角色：

- `window`
  - `dialog`
    - `alertdialog`
