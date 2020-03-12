# @File: model_route_config
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 7:34 PM

from ml.route import ml_route_func
from auth.route import auth_route_func


# 在 app文件夹下的 init_route.py 中，会按照以下字典，对每一个model初始化所有route
init_route_func_map = {"ml": ml_route_func,
                       "auth": auth_route_func}
