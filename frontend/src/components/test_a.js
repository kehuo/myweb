// 这个文件用来放组件


import React from 'react';
import TestB from "./test_b"

// 通过函数的方式声明一个 名叫 "FunctionApp" 的组件
// "export default App;" 作用是将App组件发布出去，也就是说其他文件可以通过App这个名称从该文件中获取App组件. (比如我们可以在 index.js 中引入这个 Aoo 组件了)
// const MyApp = () => (
//     <div>This is an component declarated via JS function</div>
//     );
    
//     export default MyApp;
    


class TestA extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        // this.state = { text : 'This is TEXT!' } 方法就是State的初始化方式，当这个组件被加载的时候，text这个属性就被放到了state中。
        // 然后，我们在下方render函数return的标签中输入 { this.state.text }，“{ }”括号的作用是在标签中使用js语句，该语句作用就是获取该组件的state中的text属性值。
        this.state = {
            text: "TestA text."
        }
    }

    render(){
        // 将 TestA 的 state 中的 text， 赋值到变量 temp_text 上, 然后通过Props传递给下一个组件 TestB.
        let temp_text = this.state.text

        // 注意, 这里返回子组件 TestB 的渲染结果, 不用返回自己 testA.
        return(<TestB required_text_data={temp_text} />)
    }
}

export default TestA;