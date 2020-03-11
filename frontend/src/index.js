// 这是整个项目的主要渲染文件，其他文件都依附于此文件进行展开.


// 引入react以及react-dom中的内容，是React框架的基础依赖包, 相当于地基.
import React from 'react';
import ReactDOM from 'react-dom';

// 引入 UI控件 所需要的包
import 'semantic-ui-css/semantic.min.css';

// 当你的 app.js 创建完成后， 因为你已经通过 export 将app.js 中的组件发布了出来, 所以这里可以引入这个已经发布的组件
import TestA from "./components/test_a"
import MyApp from "./components/app"

// 其中, ReactDOM 提供渲染函数，也就是下方这一行所用的函数。
// ReactDOM.render 函数，就是将其中的内容渲染到上文中提到的 index.html中, id为“root”的标签中.
// 其中有两个参数，第一个参数是一个<div>标签，至于为什么标签能出现在js代码中，各位可以去查找参照JSX和ES6相关知识.
// document.getElementById('root') 用来获取 root 节点

// 1. 最基本的用法, 就是直接render一个 <div></div>标签
//ReactDOM.render(<div>Hello World！</div>, document.getElementById('root'));

// 2. 其次, 可以从“./test_a” 这个路径中获取 TestA 组件后，放入在ReactDOM.render的第一个参数里.
//ReactDOM.render(<TestA/>, document.getElementById('root'));

// 3. test_a 和 test_b 仅仅用来测试, 正式的网站使用 app.js 中的组件 MyApp
ReactDOM.render(<MyApp/>, document.getElementById('root'));
