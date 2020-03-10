# @File: init_global
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 3:48 PM

import sys
from app.init_db import init_db_func
from model_init_config import global_init_func_dict

global_var = dict()


def init_global_func(app):
    """
    这个函数用来在启动app.run()之前, 将所有需要初始化的组件/函数/变量, 都先初始化好.

    1. 维护一个全局变量字典 global_var, 所有 service.conf 配置信息, 以及其他数据和对象, 都可以初始化到这个字典中进行全局调用.
    2. 该函数中, 会临时创建一个 init_func_list, 会将以下需要初始化运行的函数, 全部放入该列表, 然后依次运行:
        2.1 init_db_func 函数
            # 运行时会初始化一个 flask db 对象, 并存储在 global_var["db"], 供以后全局调用这个db对象.
        2.2 model_init_config.py 文件里面 global_init_func_dict 字典中所有的函数.
            #这个字典中具体有哪些函数, 需要根据每个模块的需求来自定义.
        todo 以后若有其他函数需要提前初始化, 均可以加到这里. 比如 init_redis 等等.
    """
    # 1
    global global_var
    global_var['version'] = app.config['VERSION']
    global_var['description'] = app.config['SERVICE_DESC']
    global_var['service'] = app.config['SERVICE_NAME']
    global_var['models'] = app.config['MODELS'].split(',')

    # 2
    init_func_list = list()

    # 2.1
    init_func_list.append(init_db_func)

    # 2.2
    for model in global_var["models"]:
        model = model.strip()
        func = global_init_func_dict.get(model, None)
        if func is None:
            continue

        init_func_list.extend(func)

    # 最后, 逐个运行 init_func_list 中的每个函数
    for func in init_func_list:
        try:
            func(app, global_var)
        except Exception as e:
            print("init_func_list 运行失败, 错误信息:\n%s" % str(e))
            sys.exit(0)

    return
