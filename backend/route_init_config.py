# @File: model_route_config
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 7:34 PM

from core.auth.init_route import auth_route
from core.welcome.init_route import welcome_route
from core.introduction_to_algorithms.init_route import introduction_to_algorithms_route
from core.ml.init_route import ml_route
from core.comment.init_route import comment_route


global_api_route_init_func_dict = {
    "auth": auth_route,
    "welcome": welcome_route,
    "ml": ml_route,
    "introduction_to_algorithms": introduction_to_algorithms_route,
    "comment": comment_route,
}
