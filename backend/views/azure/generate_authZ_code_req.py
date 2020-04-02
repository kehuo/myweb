# @File: receive_authorization_code
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:29 AM

from flask import render_template, make_response, session, redirect, url_for

from web_forms.generate_authZ_code_req_url import GenerateAuthZCodeReqUrlForm


def generate_authZ_code_req_func():
    """
    该视图函数用来生成 请求 AAD authorize endpoint 的完整 url + query_string

    2 关于 flask views 的构造技巧
    ====================
    视图函数返回的内容, 既可以是简单的 HTML 字符串, 也可以是复杂的表单
    通常, 200状态码是默认的, 可写可不写.
    make_response 一共有8个可以设置和调用的属性+方法, 具体的使用姿势见书 P18
    """
    form = GenerateAuthZCodeReqUrlForm()

    if form.validate_on_submit():
        # 点击 submit 按钮, 提交表单后, 生成完整的 url
        query_string = "client_id=%s&response_type=%s&redirect_uri=%s&response_mode=%s&scope=%s&state=%s" % \
                       (form.client_id.data,
                        form.response_type.data,
                        form.redirect_uri.data,
                        form.response_mode.data,
                        form.scope.data,
                        form.state.data)

        session["generate_authZ_code_complete_url"] = form.req_url.data + "?" + query_string
        session["scope"] = form.scope.data
        return redirect(url_for(endpoint="generate_authZ_code_req"))

    html = render_template("azure/GenerateAuthZCodeReq.html",
                           form=form,
                           generate_authZ_code_complete_url=session.get("generate_authZ_code_complete_url"))
    res = make_response(html)
    res.status_code = 200
    return res
