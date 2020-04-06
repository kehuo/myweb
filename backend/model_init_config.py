# @File: model_init_config
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 4:01 PM

# from views.introduction_to_algorithms.init_model_func import introduction_to_algorithms_init_func
#
#
# global_init_func_dict = {
#     "introduction_to_algorithms": [introduction_to_algorithms_init_func]
# }

# todo 前后端分离后的新配置 -- 所有后台模块都在 core/ 下.
from core.introduction_to_algorithms.init_model_func import introduction_to_algorithms_init_func
from core.azure.init_model_func import azure_init_func
from core.ml.init_model_func import ml_init_func


global_init_func_dict = {
    "introduction_to_algorithms": [introduction_to_algorithms_init_func],
    "azure": [azure_init_func],
    "ml": [ml_init_func]
}

