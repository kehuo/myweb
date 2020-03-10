// 这是整个项目的主要渲染文件，其他文件都依附于此文件进行展开.


// 引入react以及react-dom中的内容，是React框架的基础依赖包, 相当于地基.
import React from 'react';
import ReactDOM from 'react-dom';

// 当你的 app.js 创建完成后， 因为你已经通过 export 将app.js 中的组件发布了出来, 所以这里可以引入这个已经发布的组件
import FunctionApp from "./components/function_component"
import ClassApp from "./components/class_component"

// 其中, ReactDOM 提供渲染函数，也就是下方这一行所用的函数。
// ReactDOM.render 函数，就是将其中的内容渲染到上文中提到的 index.html中, id为“root”的标签中.
// 其中有两个参数，第一个参数是一个<div>标签，至于为什么标签能出现在js代码中，各位可以去查找参照JSX和ES6相关知识.
// document.getElementById('root') 用来获取 root 节点
ReactDOM.render(<div>Hello World！</div>, document.getElementById('root'));

// 从“./app”这个路径中获取App组件后，放入在ReactDOM.render的第一个参数里.
ReactDOM.render(<FunctionApp/>, document.getElementById('root'));
ReactDOM.render(<ClassApp/>, document.getElementById('root'));
