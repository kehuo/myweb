# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from core.auth.resources import LogIn, CurrentUser, Users, Register
from common.utils.http import app_url


def auth_route(api, version, model):
    """
    注意 - 特定将管理员和普通用户的 "创建用户" 分成2个api，是因为这2个场景还是有区别的.
    1. 管理员创建用户的时候, 可以手动指定role, 也就是说, 管理员有权限创建另一个管理员
    2. 但是，普通用户在注册页面创建自己的账号时, 只能指定用户名的信息, 而role是自动给定的.
    """
    # 登陆
    api.add_resource(LogIn, app_url(version, model, '/login'))

    # 注册 - 非管理员
    api.add_resource(Register, app_url(version, model, '/register'))

    # 获取当前用户 这个api一旦开启, 前端就会获取current user 信息.
    # 一旦获取到后台的 errMessage, 就会强制跳转到登陆页面. 所以可以尝试不要让这个 api 返回errMessage,
    # 而是返回一个虚拟的 guest 账号
    api.add_resource(CurrentUser, app_url(version, model, '/current_user'))

    # 创建新用户(管理员创建用户的api)
    api.add_resource(Users, app_url(version, model, '/create'))

