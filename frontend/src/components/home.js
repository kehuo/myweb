import React from "react"
import {Link} from "react-router-dom"


// 首先，我们要在上方用 import 引入一个 Link组件，这个组件由react-router-dom内部定义，用于链接跳转.
// 然后, 在render函数的return中设置3对Link标签，to后面填写Page1的地址（“/Page1/”、“/Page1”皆可），并包含跳转链接的文字

// ***注意，这里的跳转并没有访问新的html文件，而是由React改变了原本html页面中的内容。

class Home extends React.Component{
    render(){
        return(
            <div>
                <div>
                    This is Home!
                </div>
                <div>
                    <Link to="/Page1/" style={{color:'black'}}>
                        <div>点击跳转到Page1</div>
                    </Link>
                    
                    <Link to="/Page2/" style={{color:'black'}}>
                        <div>点击跳转到Page2</div>
                    </Link>
                
                    <Link to="/Page3/" style={{color:'black'}}>
                        <div>点击跳转到Page3</div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home