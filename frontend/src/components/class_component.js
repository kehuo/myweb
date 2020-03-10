// 这个文件用来放组件


import React from 'react';

class ClassApp extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: "This is an component declarated via JS class."
        }
    }

    render(){
        return(<div>{this.state.text}</div>)
    }
}

export default ClassApp;