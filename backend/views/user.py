# @File: views
# @Author: Kevin Huo
# @LastUpdate: 3/15/2020 1:17 PM

"""
注意, 这个引入的request, 是flask运行期间的一个 会定义一个 request 变量. 他的作用:
在一个线程中, 可以让视图函数 临时地全局访问 request 变量, 他可以让视图函数更方便地读取: 客户端发来的请求中各种各样的数据.

Flask 有 2 种上下文 -- 应用上下文 和 请求上下文.
1. current_app - 应用上下文, 代表当前运行的 flass app 实例
2. g -- 应用上下文, 处理请求时, 用来存储临时的对象, 每次请求都会重设这个变量
3. request -- 请求上下文, 请求对象, 封装了客户端发出的 HTTP 请求中的内容
4. session -- 请求上下文, 用户会话, 值是一个字典, 里面存储了 请求之间需要记住的值.

使用 request, 可以访问以下请求对象:
1. form -- 一个字典, 存储了请求中的表单字段
2. args -- 一个字典, 存储了url中的 QueryString.
3. values -- 一个字典, 是 forms 和 args 的合集
4. cookies -- 一个字典, 存储请求的所有 cookies.
5. headers -- 一个字典, 存储 了一个HTTP请求的首部所有字段和值
6. files -- 一个字典, 存储了请求中上传的所有文件
7. get_data() -- 返回请求主体缓冲的数据
8. get_json() -- 返回一个字典, 包含了解析请求主体之后的 JSON

9. blueprint -- 是处理请求的 flask blueprint 的名称.
10. endpoint -- 代表了请求的 flask 断点的名称, 即 app.add_url_rule 函数的第二个参数.
11. method -- Get / Post 等请求方法
12. scheme -- 代表请求方案, Http 或者 Https
13. is_secure() -- 如果Https请求, 则返回 True. 如果是HTTP请求, 返回 False,
14. host -- 请求定义的主机名. 如果有端口号, 还会包含端口号
15. path -- URL 的路径部分
16. query_string -- URL 的 query_string部分, 返回的是 原始二进制值
17. full_path -- url路径 + query_string 的和.
18. url -- 客户端请求的完整 URL
19. base_url -- 同url, 但是没有 query_string
20. environ -- 请求的原始 WSGI 环境字典
"""
from flask import request, make_response, render_template


def user(username):
    """
    视图函数返回的内容, 既可以是简单的 HTML 字符串, 也可以是复杂的表单

    通常, 200状态码是默认的, 可写可不写.

    make_response 一共有8个可以设置和调用的属性+方法, 具体的使用姿势见书 P18
    """
    user_agent = request.headers.get("User-Agent")
    # html = "<h1>Hello %s, your browser is: %s</h1>" % (username, user_agent)
    html = render_template("user.html", username=username, user_agent=user_agent)

    # 封装一个响应
    res = make_response(html)
    res.status_code = 200
    res.set_cookie("answer", "42")
    return res
