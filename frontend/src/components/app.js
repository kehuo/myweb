import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./Home/home"
import Page1 from "./Page1/page1"
import Page2 from "./Page2/page2"
import Page3 from "./page3"


// 1. style={{margin:'10px'}} 是设置外边距为 10px
// 2. 如果在 "/" 的前面加上 exact, 那么每次点导航栏里的一个按钮，就会直接跳到对应的页面, 如果删掉 exact, 那么会把导航栏不会消失
class MyApp extends React.Component {
    render(){
        return(
            <Router>
                <div style={{margin:'10px'}}>
                <Route path="/" component={Home} />
                <Route path="/Page1" component={Page1} />
                <Route path="/Page2" component={Page2} />
                <Route path="/Page3" component={Page3} />
                </div>
            </Router>
        )
    }
}
export default MyApp;
    