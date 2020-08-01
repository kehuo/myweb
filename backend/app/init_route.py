# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:36 AM

from app.init_global import global_var
from route_init_config import global_api_route_init_func_dict


class RouteInitializer(object):
    def __init__(self, app, api, api_version):
        self.app = app
        self.api = api
        self.api_version = api_version

        self.models = global_var["models"]
        self.api_model_func_map = []
        self.api_route_map = global_api_route_init_func_dict

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

    def run(self):
        """
        这个函数支持4个初始化:
        1. API 路由部分.
            1.1 默认的路由 (比如 "/", "/check_health" 等等)
            1.2 需要加载的模块的相关 API 路由 (前后端分离后, 后台只需要提供api给前端即可.)
        """
        self._add_api_routes_for_all_models()
        print("URL初始化完成, app.url_map=\n%s" % self.app.url_map)
