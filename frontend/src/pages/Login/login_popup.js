// 这个文件用来放组件


import React from 'react';
// 引入登录窗口所需的组件
import { Segment, Input, Button } from 'semantic-ui-react'


class LoginPopup extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        // 注意，调用的函数要绑定this，在构造函数中使用 this.userChange = this.userChange.bind(this); 不然会出错
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // 这个函数供 "用户名" 的输入框使用
    userChange(e){
        // setState 的作用: 将数据存到 this.State 中
        this.setState({username: e.target.value})
    }

    // 这个函数供 "密码" 输入框使用
    passwordChange(e){
        this.setState({password: e.target.value})
    }


    // 这个函数供 "登录" 按钮使用 (当点击按钮时， 调用request_to_backend函数)
    submit(){
        this.request_to_backend()
        //window.alert(this.state.username)
        //window.alert(this.state.password)
    }

    // Post 请求后台的 "/api/v1/auth/login" 接口.
    request_to_backend(){
        let req_body = JSON.stringify({username: this.state.username, password: this.state.password})
        let auth_url = "http://127.0.0.1:5000/api/v1/auth/login"

        fetch(
            auth_url, 
            {
                method: "POST",
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: req_body
            }
        ).then(
            res => res.json()
        ).then(
            data => {
                if(data.code == "SUCCESS") window.alert("验证成功, 欢迎登陆");
                else window.alert("登录失败, 用户名或密码错误")
            }
        )
    }

    render(){
        return(
            <div style={{margin: "10px"}}>
                <Segment>
                    <h2>请登录</h2>
                    <input id="user" placeholder="输入用户名" onChange={this.userChange}/>
                    <br/>
                    <input id="password" placeholder="密码" onChange={this.passwordChange}/>
                    <br/>
                    <Button primary content="登录" onClick={this.submit}/>
                    <Button content="重置"/>
                </Segment>
            </div>
        )
    }
}

export default LoginPopup;