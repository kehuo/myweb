# @File: index
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 6:16 PM


# from flask import render_template, make_response
#
#
# def index_func():
#     """
#     home page
#     """
#     html = render_template("index.html")
#
#     res = make_response(html)
#     res.status_code = 200
#     return res

# @File: index
# @Author: Kevin Huo
# @LastUpdate: 3/15/2020 4:04 PM

from flask import render_template, make_response, session, redirect, url_for

from web_forms.name import NameForm


def index_func():
    """
    这里使用2个技巧:
    1. POST / 重定向 / GET 模式, 这个技巧保证了用户的在刷新浏览器之后, 请求服务器的最后一个响应是GET，而不是POST.
        ## 重定向用到的 flask 模块: redirect / url_for
    2. 因为POST请求结束后, 用户名等数据就没了, 所以用 flask 全局请求上下文 session, 来保存用户名这个数据, 传递给重定向后的url
        ## 用到的模块: session

    详见书 p40
    """
    form = NameForm()
    if form.validate_on_submit():
        session["username"] = form.name.data
        # 如果用户输入了数据, 那么读取并返回, 该函数结束
        # "index" 是端点名, 等于 app.add_rule函数的第二个参数. 下面这行return的代码也可以写成:
        # return redirect(url_for("/"))
        return redirect(url_for(endpoint="index"))

    # index.html 中预定义了2个变量, 一个叫 form, 一个叫 username
    html = render_template("index.html", form=form, username=session.get("username"))
    res = make_response(html)
    res.status_code = 200
    return res

