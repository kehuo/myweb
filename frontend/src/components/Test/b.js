// 这个文件用来放组件


import React from 'react';


class TestB extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        // this.state = { text : 'This is TEXT!' } 方法就是State的初始化方式，当这个组件被加载的时候，text这个属性就被放到了state中。
        // 然后，我们在下方render函数return的标签中输入 { this.state.text }，“{ }”括号的作用是在标签中使用js语句，该语句作用就是获取该组件的state中的text属性值。
        this.state = {}
    }

    render(){
        // 这里用 this.props, 是因为要接受上一级的组件TestA传过来的 this.props.text
        return(<div>{this.props.required_text_data}</div>)
    }
}

export default TestB;