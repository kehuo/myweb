# @File: app
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 12:33 AM


import os

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_bootstrap import Bootstrap

from app.init_global import init_global_func

"""用 parent_path 的目的, 主要是想把 templates 和 static 路径, 放在项目的跟路径下.
由于前后端分离, 所以不再需要 parentpath 去识别 template 文件夹了."""
# parent_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

"""
1. app
2. api
3. boot_strap
4. init global
5. init route (视图函数暂不初始化, 只初始化api routes)
"""

# 1 需要设置 root_path, 保证flask在寻找templates时, 会在 root_path 指定的路径下寻找 templates 文件夹.
app = Flask(__name__)
config_file_path = "../service.conf"
app.config.from_pyfile(config_file_path, silent=True)

# 2. api
api_version = "api/%s" % app.config['API_VERSION']
cors = CORS(app, resources={r'/{}/*'.format(api_version): {'origins': '*', 'supports_credentials': True}})
api = Api(app)

# 3 因为前后端分离, 所以不再使用 Jinja2, 所以不再初始化 bootstrap.
# bootstrap = Bootstrap(app)

# 4 初始化 global_var 全局变量.
init_global_func(app)

# 5 支持2种route初始化:
# 5.1 api route (前后端分离后, 主要用这种)
# 5.2 views funcs route (前后端没有分离之前, 暂时用过视图函数的路由, 但是现在不再需要, 所以2个都设置False, 不再初始化)
from app.init_route import RouteInitializer
route_initializer = RouteInitializer(app=app, api=api, api_version=api_version)
route_initializer.run()
