import React from "react"
import { Segment, Menu, Image } from 'semantic-ui-react';

// 在react 中引入 css 的方式是用 require 关键字, 这样就可以在该js文件中, 使用 page1.css 中所有的样式对象了.
require("./page1.css")


class Page1 extends React.Component{
    render(){
        // 先创建一个 css 对象, 在组件中引入时, 直接用 style = css_obj 的方法即可
        return(
            <div>
                <Segment style={{textAlign: "center", width: "60%", margin: "10px auto"}}>
                    个人网站
                </Segment>

                <Segment style={{textAlign: "center", margin: "10px auto"}}>
                    1. 机器学习项目 <br/>
                    2. 个人app <br/>
                    3. 学习笔记 <br/>
                    4. 其他 <br/>
                </Segment>
            </div>
        )
    }
}

export default Page1