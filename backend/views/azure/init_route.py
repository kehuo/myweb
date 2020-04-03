# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 1:46 PM

from common.utils import build_app_url

from views.azure.core_view_funcs.generate_authZ_code_req import generate_authZ_code_req_func
from views.azure.core_view_funcs.azure_ad_redirect_uri import azure_ad_redirect_uri_func
from views.azure.core_view_funcs.generate_access_token_req import generate_access_token_req_func


def azure_route(app, model):
    """
    和 Azure 相关的 所有视图函数, 都在这里统一初始化

    参数:
    app -- Flask 的 app 全局对象
    model -- "azure"

    tmp = "/azure/generate_authZ_code_req"
    tmp[1:] = "/azure/generate_authZ_code_req" (其实就是把前面的 左下划线 删掉)
    """
    # 2.1 生成用来请求 AAD authorize endpoint 的完整url 和 query_string (这个AAD endpoint 支持 GET 请求)
    tmp = build_app_url(model, "/generate_authZ_code_req")
    app.add_url_rule(tmp,
                     endpoint=tmp[1:],
                     view_func=generate_authZ_code_req_func,
                     methods=["GET", "POST"])

    # 2.2 生成用来请求 AAD token endpoint 的完整url 和 req_body (这个AAD endpoint 支持 POST 请求)
    tmp = build_app_url(model, "/generate_access_token_req")
    app.add_url_rule(tmp,
                     endpoint=tmp[1:],
                     view_func=generate_access_token_req_func,
                     methods=["GET"])

    # 2.3 用来接收从 AAD endpoint 重定向过来的数据. 可能是 authZ code, 或者 access token, 或者 error message
    tmp = build_app_url(model, "/azure_ad_redirect_uri")
    app.add_url_rule(tmp,
                     endpoint=tmp[1:],
                     view_func=azure_ad_redirect_uri_func,
                     methods=["GET"])
