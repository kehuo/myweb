# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:36 AM


from flask import render_template, make_response

from app.init_global import global_var
from route_init_config import global_route_init_func_dict

from views.azure.core_view_funcs.generate_authZ_code_req import generate_authZ_code_req_func
from views.azure.core_view_funcs.azure_ad_redirect_uri import azure_ad_redirect_uri_func
from views.azure.core_view_funcs.generate_access_token_req import generate_access_token_req_func
from views.index import index_func

from views.introduction_to_algorithms.core_view_funcs.chapters import introduction_to_algorithms_func


class RouteInitializer(object):
    def __init__(self, app):
        self.app = app

        self.models = global_var["models"]
        self.model_func_map = []

    def _default(self):
        """
        添加一些默认的视图函数, 比如 index, 404, 500 等等
        """
        # 1 index page
        self.app.add_url_rule("/",
                              endpoint="index",
                              view_func=index_func,
                              methods=["GET"])

        # 定义错误处理页面
        @self.app.errorhandler(404)
        def page_not_found(e):
            html = render_template("default/404.html")
            res = make_response(html)
            res.status_code = 404
            return res

        @self.app.errorhandler(500)
        def internal_server_error(e):
            html = render_template("default/500.html")
            res = make_response(html)
            res.status_code = 500
            return res

    def _all_models(self):
        """
        初始化所有模块所需的视图函数的路由
        models 包括 -- azure / ml / introduction_to_algorithms 等.
        """
        for model in self.models:
            func = global_route_init_func_dict.get(model, None)
            if func is None:
                print('failed to get function for model:%s' % model)
                continue
            self.model_func_map.append([model, func])
        # init model route
        for func in self.model_func_map:
            func[1](self.app, func[0])
        return

    def run(self, init_default_views=True, init_model_views=True):
        """
        1 先初始化 默认路由
        2 再初始化每一个模块的路由 (azure / ml / introduction_to_algorithms)
        """
        if init_default_views is True:
            self._default()

        if init_model_views is True:
            self._all_models()

        print("URL初始化完成, app.url_map=\n%s" % self.app.url_map)
