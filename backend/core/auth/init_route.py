# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from core.auth.resources import LogIn, CurrentUser, Users
from common.utils.http import app_url


def auth_route(api, version, model):
    # 登陆
    api.add_resource(LogIn, app_url(version, model, '/login'))

    # 获取当前用户
    api.add_resource(CurrentUser, app_url(version, model, '/currentUser'))

    # 创建新用户
    api.add_resource(Users, app_url(version, model, '/create_user'))

