[教程](https://www.cnblogs.com/wfwenchao/p/4697178.html?utm_source=tuicool&utm_medium=referral)
<br/>
[教程2](https://www.jianshu.com/p/61e02a55f2a6)

## h2 header

> * Hi good
>     > really good? not sure.
> * 3种方法实现
>     > 方案1 - 自顶向下的递归实现<br/>
>     方案2 - 自顶向下, 并且带备忘的动态规划<br/>
>     方案3 - 自底向上的动态规划

### 下面是3种分界线
***

---
___

### 下面是带链接的文字
#### 有问题找[百度](https://www.baidu.com) 就行了.

### 链接可以带 title, 以下是行内式 和参数式的写法
[行内式写法](https:/kevinhuo.cool "测试title") 

#### 参数式 - 先定义再调用
[参数式写法]: https://kevinhuo.cool "参数式title"
这里调用一下:[参数式写法]


#### 图片也有 行内式 和 参数式

##### 行内式:
![行内式图片](https://www.cnblogs.com/images/logo_small.gif)

##### 参数式 (貌似显示不出来):
[参数式图片]: https://www.cnblogs.com/images/logo_small.gif
参数式图片式先定义, 再这里:![参数式图片]调用

### 非常重要!! 展示代码的代码框!!
#### 第一种 - 单行代码, 很少, 可以用 单反引号 包起来, 如下:
`print("Hello World!")`

#### 多行 - 用3个反引号, 如果给代码写注释, 可以在反引号后面写(需要进一步研究)
```def func():``` 

#### 在行首空出4个空格, 或者1个tab, md文件就会将其用<pre></pre> 和 <code></code>将其包围起来
    def func(input):
        if input == 2:
            print("error!")
        else:
            print("success")
        return