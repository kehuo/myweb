# @File: init_func
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 10:21 AM


from common.utils.http import load_json_file


def introduction_to_algorithms_init_func(app, global_var):
    """
    这个初始化函数, 会在根路径下 model_init_config 中被统一管理
    然后, 会在 app/init_global.py 中, 被调用

    这种类型的初始化函数, 都统一使用2个参数:
    1 一个是app -- Flask 的 app 对象.
    2 另一个是 global_var
    global_var["algorithm_catalog_json_path"] = {
        "windows": "C:\\xxx\\xxx\\catalog.json",
        "linux": "../data/introduction_to_algorithms//catalog.json"
    }

    该函数做2件事:
    1. 读取 <算法导论> 的目录文件, 并写入 global_var, 以便之后对应的视图函数使用它自己的目录名.
    2. 初始化 view_func_builder.py 中的 IntroductionToAlgorithmsViewFuncBuilder, 并将实例化的对象存入 global_var
    """
    # 1
    device_type = global_var["device_type"]
    catalog_path = global_var["algorithm_catalog_json_path"][device_type]
    catalog = load_json_file(catalog_path)

    global_var["introduction_to_algorithms_catalog"] = catalog

    # 2 用 app 和 global_var 初始化
    # introduction_to_algorithms_view_func_builder = IntroductionToAlgorithmsViewFuncBuilder(app, global_var)
    # global_var["introduction_to_algorithms_view_func_builder"] = introduction_to_algorithms_view_func_builder
