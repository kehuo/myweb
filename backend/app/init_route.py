# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:36 AM


from flask import render_template, make_response

from app.init_global import global_var
from route_init_config import global_api_route_init_func_dict, global_views_route_init_func_dict

# 一切从 views 中引入的模块, 在前后端分离后, 将不再使用.
# todo 等后台api开发完成, 部署到公网稳定运行后, 将会逐步删除 views 等代码.
from views.azure.core_view_funcs.generate_authZ_code_req import generate_authZ_code_req_func
from views.azure.core_view_funcs.azure_ad_redirect_uri import azure_ad_redirect_uri_func
from views.azure.core_view_funcs.generate_access_token_req import generate_access_token_req_func
from views.index import index_func
from views.introduction_to_algorithms.core_view_funcs.chapters import introduction_to_algorithms_func

# 以下是 api 路由所需的模块
from flask_restful import Resource


class RouteInitializer(object):
    def __init__(self, app, api, api_version):
        self.app = app
        self.api = api
        self.api_version = api_version

        self.models = global_var["models"]

        self.views_model_func_map = []
        self.views_route_map = global_views_route_init_func_dict

        self.api_model_func_map = []
        self.api_route_map = global_api_route_init_func_dict

    def _default_views(self):
        """
        #############由于前后端分离, 该函数已弃用, 并准备逐步删除##########
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

    def _add_views_route_for_all_models(self):
        """
        #############由于前后端分离, 该函数已弃用, 并准备逐步删除##########

        初始化所有模块所需的视图函数的路由
        models 包括 -- azure / ml / introduction_to_algorithms 等.
        """
        for model in self.models:
            func = self.views_route_map.get(model, None)
            if func is None:
                print('failed to get function for model:%s' % model)
                continue
            self.views_model_func_map.append([model, func])
        # init model route
        for func in self.views_model_func_map:
            func[1](self.app, func[0])
        return

    def _default_api(self):
        """默认api, 比如 / 或者 /health_check 等等"""
        pass

    def _add_api_routes_for_all_models(self):
        """在 service.conf 的 MODELS 中指定的模块, 它们的api都会在这里被初始化"""
        for model in self.models:
            func = self.api_route_map.get(model, None)
            if func is None:
                print('failed to get model function')
                continue
            self.api_model_func_map.append([model, func])
            # init model route
        for func in self.api_model_func_map:
            func[1](self.api, self.api_version, func[0])
        return

    def run(self, init_default_api=True, init_model_api=True, init_default_views=False, init_model_views=False):
        """
        这个函数支持4个初始化:
        1. API 路由部分.
            1.1 默认的路由 (比如 "/", "/check_health" 等等)
            1.2 需要加载的模块的相关 API 路由 (前后端分离后, 后台只需要提供api给前端即可.)

        2. 视图函数部分 (自从前后端分离后, 这写视图函数其实已经不需要了, 但是写都写了, 暂时放着, 不删)
            2.1 默认视图函数的路由
            2.2 每一个模块的路由 (azure / ml / introduction_to_algorithms)
        """
        # flask restful api
        if init_default_api is True:
            self._default_api()

        if init_model_api is True:
            self._add_api_routes_for_all_models()

        # flask Jinja2 views route
        if init_default_views is True:
            self._default_views()

        if init_model_views is True:
            self._add_views_route_for_all_models()

        print("URL初始化完成, app.url_map=\n%s" % self.app.url_map)
