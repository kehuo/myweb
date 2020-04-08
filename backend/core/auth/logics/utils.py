# @File: http.py
# @Author: Kevin Huo
# @Date: 2020/4/8


import hashlib
from flask_jwt_extended import (create_access_token, create_refresh_token, get_jwt_identity, verify_jwt_in_request)
from functools import wraps
from db_models.db_models import User
from app.init_global import global_var


def encrypt_password(password):
    my_md5 = hashlib.md5()
    my_md5.update(password.encode("utf-8"))
    my_md5_digest = my_md5.hexdigest()
    return my_md5_digest


def check_permission(user_roles):
    """
    这个函数的作用 -- 判断current_user 是否在当前被访问的函数 所支持的 role 中.

    示例:
    当请求 createUser 函数时, 如果 createUser 定义了 @check_permission(["global_admin"]), 那么
    只有当 current_user 的 role name 是 "global_admin" 时, 才可以请求这个 function, 否则401

    传入一这个 function 支持的 uer_roles 数组, 判断 current_user 的 role_name 是否在这个uer_roles数组中
    """
    def decorator(function):
        @wraps(function)
        def wrap_function(*args, **auth):
            auth["permission"] = False
            try:
                verify_jwt_in_request()
            except Exception as e:
                return {"errorCode": "BAUTH_TOKEN_MISSING", "errorMessage": "请重新登录"}, 401
            current_user = get_jwt_identity()
            db = global_var["db"]
            user = db.session.query(User).filter(User.name == current_user).first()
            if user:
                auth["logined"] = True
            else:
                return {"errorCode": "BAUTH_TOKEN_MISSING", "errorMessage": "请重新登录"}, 401
            if user.role_id in user_roles:
                auth["permission"] = True
                auth["role_id"] = user.role_id
                auth["userId"] = user.id
            else:
                return {"code": "FAILURE", "message": "user has no privileges"}, 403
            return function(*args, **auth)

        return wrap_function

    return decorator
