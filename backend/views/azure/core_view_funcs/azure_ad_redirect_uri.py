# @File: azure_ad_redirect_uri
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:44 PM

from flask import render_template, make_response, request, url_for, session


def azure_ad_redirect_uri_func():
    """这个视图函数用来接收 从 login.microsoftonline.com 重定向过来的authZ code 或者 access_token
    并且根据 request.args 的相关字段值, 将页面重定向到 generate_access_token_req 页面 或者 其他页面.

    flask.request 中的属性和方法:
    ============================
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

    login.microsoftonline.com/common/OAuth2/v2.0/authorize 的示例返回结果如下:
    只有3个参数: code / state / session_state
    http://localhost:5000/azure_ad_redirect_uri?code=OAQABAAIAAABeAFzDwllzTYGDLh_qYbH8PFcmVlvwmpakl3Pxbs3nRvbZ-U-MuSV4hcw7j4ehXkiKflvMaTlkGlx2svtkHoDE7Bf5XC2TT5BOZphk_BgRBa55wHLdIlw9kss1Ui6jYrVI1VUHAro_egU9AuvJ6xjRRYjeib8RxWntHgY7MtFD70YWnZv6mttOSN-GvpvsmhNJvHdL71gOdIoUAlX1To4kl_awIWyWvU14znW3c4FMCjRQt0I0I6wPigU4ehpLh9VKHR4bZ33EFbhH5T11yaHdnXw40jH9tDBQavBk6Ijj8rGWS6LYOloGfPVlXiOl28nwP3dyqCnpukrl7brwrA7nTW_Oh6djxXioy54sLxyqEyfokC19Q94zmbAo2wFxoh3XXYZJC8Hh7c861VWyzlSa9OFQ7OWZcEBXfF2Su7oNcrCYa1XGANWXG6p4AVNoGy0C0S7UiPVLqqMlkMzAwUY3bWVSL84jGZqdRKQLkJwD6Ey7iTHRbxIHI2j8n1NdayafjpgtwWwNAgcPr9Dj1AAcvCHrYZvPXkkgQHuZxH3OMJyhMvpoJVnQEyrcmKCSBamllzvaCCH_xXV7isLwO8CE-xb-NC8oBxh49ql0xQ9wOCAA&state=123456&session_state=2b1572a9-edda-46cb-b53b-10a1f144d853#
    """
    query_string = dict(request.args)
    session["authZ_code"] = "" if "error" is query_string else query_string["code"]

    # todo 在直接向 access_token 发请求之前, 可以考虑在这个函数中构造一个 表单, 展示默认 req body, 且可以更改后发起请求.
    redirect_url_endpoint = {"authZ_code": url_for(endpoint="azure/generate_authZ_code_req"),
                             "access_token": url_for(endpoint="azure/generate_access_token_req")}

    html = render_template("azure/AzureADRedirectUri.html",
                           authZ_code_endpoint_response=query_string,
                           redirect_url_endpoint=redirect_url_endpoint)

    res = make_response(html)
    return res
