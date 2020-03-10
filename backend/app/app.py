# @File: app
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 3:34 PM


from flask import Flask
from flask_restful import Api
from app.init_global import init_global_func


"""
1. app
2. api
3. init global
4. init route
"""

# 1
app = Flask(__name__)
config_file_path = "../service.conf"
app.config.from_pyfile(config_file_path, silent=True)

# 2
api_version = 'api/%s' % app.config['API_VERSION']
api = Api(app)

# 3
init_global_func(app)

