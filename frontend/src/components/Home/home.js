import React from "react"
import {Link} from "react-router-dom"

// UI控件, 用来引入样式, 让页面美观 (其中《 menu 组件用来创建页面的导航栏!!!很重要的功能!!完美)
// Image用来插入图片, 使用格式: <Image rounded src={require('./img/2331.jpg')}/>
import { Segment, Menu, Image } from 'semantic-ui-react';


class Home extends React.Component{
    render(){
        return(
            <div>
                <Segment>
                    <div id="title_div">
                        This is Home!
                    </div>
                </Segment>

                <Menu>
                    <Menu.Item>
                        <Link to="/Page1/" style={{color:'black'}}>
                            <div>点击跳转到Page1</div>
                        </Link>
                    </Menu.Item>

                    <Menu.Item>
                        <Link to="/Page2/" style={{color:'black'}}>
                            <div>点击跳转到Page2</div>
                        </Link>
                    </Menu.Item>

                    <Menu.Item>
                        <Link to="/Page3/" style={{color:'black'}}>
                            <div>点击跳转到Page3</div>
                        </Link>
                    </Menu.Item>
                </Menu>

                <Image rounded src={require("./mountain.jpg")} style={{width: 596, height: 338}}/>
            </div>
        )
    }
}

export default Home