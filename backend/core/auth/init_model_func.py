# @File: init_model_func.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from flask_jwt_extended import JWTManager
from datetime import timedelta


def auth_init_func(app, global_var):
    # 初始化 jwt manager
    try:
        if isinstance(app.config['JWT_ACCESS_TOKEN_EXPIRES'], int):
            time = app.config['JWT_ACCESS_TOKEN_EXPIRES']
            app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=time)
            global_var['secret_key'] = app.config['SECRET_KEY']
            jwt = JWTManager(app)
            print("init jwt finished")
            global_var["jwt"] = jwt

    except Exception as e:
        print("init JWT failed, error: %s" % str(e))
