# @File: init_route
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 7:29 PM

from flask import render_template, make_response

from app.init_global import global_var
from model_api_route_config import init_api_route_func_map
import views.user as user_view_funcs
import views.index as index_view_funcs


class RouteInitializer(object):
    def __init__(self, app, api, api_version):
        self.app = app
        self.api = api
        self.api_version = api_version
        self.model_func_map = []

    def _init_api_route(self):
        """
        该函数用来初始化 api 的url, 这些url一般用来返回 json格式的数据, 符合 Restful API

        model = "ml", 写在service.conf中, 会加载到global_var["models"]中
        route_init_func = {"ml": ml_route_func}
        func = ["ml", ml_route]

        运行的时候: ml_route(api, api_version="v1", func[0]="ml")
        """

        for model in global_var["models"]:
            func = init_api_route_func_map.get(model, None)
            if func is None:
                print('Failed to get model function')
                continue
            self.model_func_map.append([model, func])

        # init model route
        for func in self.model_func_map:
            func[1](self.api, self.api_version, func[0])

    def _init_view_route(self):
        """
        该方法用来初始化 视图函数相关的url.

        这个方法存在的意义在于: 我已经放弃用 React 来编写前端. 我决定直接用flask 来构造前端的页面, 所以在这里定义相关url.

        add_url_rule 方法的3个参数: (URL, 端点名, 视图函数)
        其中 URL = "/", 就是浏览器中访问的url, 注意可以用尖括号<>添加变量
        端点名 = "index", 是用来后台处理时的一个标志符, 就说明我把 "URL" 叫做 "index" 这个意思.
        最后的视图函数 = index, 这是一个具体的视图函数, 定义在 根路径下 views/ 文件夹下的某个文件中.
        """
        self.app.add_url_rule("/", "index", index_view_funcs.index, methods=["GET", "POST"])
        self.app.add_url_rule("/user/<username>", "user", user_view_funcs.user)

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
        if init_api:
            self._init_api_route()
        if init_views:
            self._init_view_route()
        print("URL初始化完成, app.url_map=\n%s" % self.app.url_map)
