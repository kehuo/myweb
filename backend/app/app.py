# @File: app
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 12:33 AM


import os

from flask import Flask
from flask_restful import Api
from flask_bootstrap import Bootstrap
from flask_cors import CORS

from app.init_global import init_global_func

"""用 parent_path 的目的, 主要是想把 templates 和 static 路径, 放在项目的跟路径下."""
parent_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

"""
1. app
2. api, 注意配置了 cors, 否则前端react localhost:8000 将无法访问 localhost:5000 后端
3. boot_strap
4. init global
5. init route (包括 restful API 和 前端视图函数的 url)
"""

# 1 需要设置 root_path, 保证flask在寻找templates时, 会在 root_path 指定的路径下寻找 templates 文件夹.
app = Flask(__name__, root_path=parent_path)
config_file_path = "./service.conf"
app.config.from_pyfile(config_file_path, silent=True)

# 2
api_version = 'api/%s' % app.config['API_VERSION']
cors = CORS(app, resources={r'/{}/*'.format(api_version): {'origins': '*', 'supports_credentials': True}})

api = Api(app)

# 3
bootstrap = Bootstrap(app)

# 4
init_global_func(app)

# 5 这里做2个事情 --- 4.1 初始化api的url // 4.2 初始化视图函数的url
from app.init_route import RouteInitializer
route_initializer = RouteInitializer(app=app, api=api, api_version=api_version)
route_initializer.run(init_views=True)
