import React from "react"
// 引入 css 文件
require("./page2.css")


class Page2 extends React.Component{
    // 构造函数
    constructor(props){
        super(props)
        this.state = {
            my_json: ""
        }
    }
    
    // getData 函数用来请求数据 (注意, 如果后台返回json数据, 需要用res.json(), 如果是字符串, 需要用res.text() 方法)
    getData(){
        fetch(
            "http://127.0.0.1:5000/api/v1/ml/page2", 
            {method: 'GET'}
            ).then(
                res => res.json()
                ).then(
                    data => {this.setState({my_json:data})}
                )
        }

    componentWillMount(){
        this.getData();
        }

    
    render(){
        return(
            <div>
                <div>{this.state.my_json.code}</div>
                <div>{this.state.my_json.output}</div>
            </div>
        )
    }
}

export default Page2