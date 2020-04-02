# @File: log_out
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 11:05 PM


from flask import render_template, make_response


def log_out_func():
    """
    todo 这个 url 要等域名备案完成后才可以用. 因为 Microsoft Azure AD 强制要求 logout 的 url使用 https 协议.
    用来登出 Azure AD.
    """
    html = render_template("logout.html")

    res = make_response(html)
    return res
