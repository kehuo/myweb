# @File: init_route
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:36 AM


from flask import render_template, make_response

from views.azure.generate_authZ_code_req import generate_authZ_code_req_func
from views.azure.azure_ad_redirect_uri import azure_ad_redirect_uri_func
from views.azure.generate_access_token_req import generate_access_token_req_func
from views.index import index_func


class RouteInitializer(object):
    def __init__(self, app, api, api_version):
        self.app = app
        self.api = api
        self.api_version = api_version
        self.model_func_map = []

    def _init_view_route(self):
        """
        添加后台支持的 api
        """
        # 1 index page
        self.app.add_url_rule("/",
                              endpoint="index",
                              view_func=index_func,
                              methods=["GET"])

        # 2 Azure AD OAuth2 相关
        # 2.1 生成用来请求 AAD authorize endpoint 的完整url 和 query_string (这个AAD endpoint 支持 GET 请求)
        self.app.add_url_rule("/generate_authZ_code_req",
                              endpoint="generate_authZ_code_req",
                              view_func=generate_authZ_code_req_func,
                              methods=["GET", "POST"])

        # 2.2 生成用来请求 AAD token endpoint 的完整url 和 req_body (这个AAD endpoint 支持 POST 请求)
        self.app.add_url_rule("/generate_access_token_req",
                              endpoint="generate_access_token_req",
                              view_func=generate_access_token_req_func,
                              methods=["GET"])

        # 2.3 用来接收从 AAD endpoint 重定向过来的数据. 可能是 authZ code, 或者 access token, 或者 error message
        self.app.add_url_rule("/azure_ad_redirect_uri",
                              endpoint="azure_ad_redirect_uri",
                              view_func=azure_ad_redirect_uri_func,
                              methods=["GET"])

        # 3 算法导论全部7部分, 35章节
        for _part in range(1, 8):
            for _chapter in range(1, 36):
                _each_url = "/introduction_to_algorithms/part_%s/chapter_%s" % (_part, _chapter)
                _each_endpoint = "introduction_to_algorithms/part_%s/chapter_%s" % (_part, _chapter)

                self.app.add_url_rule(_each_url)

        # 定义错误处理页面
        @self.app.errorhandler(404)
        def page_not_found(e):
            html = render_template("404.html")
            res = make_response(html)
            res.status_code = 404
            return res

        @self.app.errorhandler(500)
        def internal_server_error(e):
            html = render_template("500.html")
            res = make_response(html)
            res.status_code = 500
            return res

    def run(self, init_api=True, init_views=True):
        if init_views:
            self._init_view_route()
        print("URL初始化完成, app.url_map=\n%s" % self.app.url_map)
