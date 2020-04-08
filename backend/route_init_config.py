# @File: model_route_config
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 7:34 PM

# from views.azure.init_route import azure_route
# from views.introduction_to_algorithms.init_route import introduction_to_algorithms_route
# from views.ml.init_route import ml_route
#
# # 在 app/core_view_funcs.py 中, 会按照以下字典, 对每一个model初始化所有视图函数的路由
# global_views_route_init_func_dict = {
#     "azure": azure_route,
#     "introduction_to_algorithms": introduction_to_algorithms_route,
#     "ml": ml_route
# }

global_views_route_init_func_dict = {}

# todo 前后端分离后, 只需要初始化 api 的 route
from core.auth.init_route import auth_route
from core.welcome.init_route import welcome_route
from core.azure.init_route import azure_route
from core.introduction_to_algorithms.init_route import introduction_to_algorithms_route
from core.ml.init_route import ml_route
from core.comment.init_route import comment_route


global_api_route_init_func_dict = {
    "auth": auth_route,
    "welcome": welcome_route,
    "ml": ml_route,
    "azure": azure_route,
    "introduction_to_algorithms": introduction_to_algorithms_route,
    "comment": comment_route
}