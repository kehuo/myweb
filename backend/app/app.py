# @File: app
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 3:34 PM


from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from app.init_global import init_global_func


"""
1. app
2. api, 注意配置了 cors, 否则前端react localhost:8000 将无法访问 localhost:5000 后端
3. init global
4. init route
"""

# 1
app = Flask(__name__)
config_file_path = "../service.conf"
app.config.from_pyfile(config_file_path, silent=True)

# 2
api_version = 'api/%s' % app.config['API_VERSION']
cors = CORS(app, resources={r'/{}/*'.format(api_version): {'origins': '*', 'supports_credentials': True}})

api = Api(app)

# 3
init_global_func(app)

# 4
from app.init_route import init_route_func
init_route_func(api, api_version)
