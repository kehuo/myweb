
import React from 'react';

// 通过函数的方式声明一个 名叫 "FunctionApp" 的组件
// "export default App;" 作用是将App组件发布出去，也就是说其他文件可以通过App这个名称从该文件中获取App组件. (比如我们可以在 index.js 中引入这个 Aoo 组件了)
const FunctionApp = () => (
<div>This is an component declarated via JS function</div>
);

export default FunctionApp;
