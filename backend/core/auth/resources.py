# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

import json
from flask import Response
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, get_jwt_identity, verify_jwt_in_request)

from core.auth.logics.utils import check_permission
from common.utils.http import encoding_resp_utf8
from app.init_global import global_var
import core.auth.logics.login as LoginUtils
from core.auth.logics.get_current_user import getCurrentUser
import core.auth.logics.user as UserUtils
from core.auth.logics.register import register_user_account


class LogIn(Resource):
    """
    登陆
    """
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('userName', type=str, required=True, location='json')
        parser.add_argument('password', type=str, required=True, location='json')
        args = parser.parse_args()
        rst = LoginUtils.login(global_var['db'], args)

        access_token = create_access_token(identity=args['userName'])
        resp = Response(json.dumps(rst, ensure_ascii=False), content_type="application/json; charset=utf-8")
        resp.set_cookie('_op_token_dv', access_token)
        resp.headers['x-bb-set-bauthtoken'] = access_token
        resp.headers['Access-Control-Expose-Headers'] = 'x-bb-set-bauthtoken'
        return resp


class Register(Resource):
    """
    普通用户注册
    这个 注册 和 admin的创建用户不同.

    因为管理员可以创建管理员, 而普通用户注册不可以.
    另外, 管理员创建用户需要check_permission, 而普通用户注册时不需要
    """
    def post(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('data', type=dict, required=True, location='json')
        args = parser.parse_args()

        rst = register_user_account(args, global_var)
        return encoding_resp_utf8(rst)


class LogOut(Resource):
    """
    登出
    """
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True, location='json')
        args = parser.parse_args()
        rst = LoginUtils.logout(global_var['db'], args)
        return encoding_resp_utf8(rst)


class CurrentUser(Resource):
    """
    注意: 这里返回的验证失败的 errorCode: BAUTH_TOKEN_MISSING 不要轻易修改。
    因为不管是key: errorCode, 还是value: BAUTH_TOKEN_MISSING, 都是和前端对应的.
    比如, 若将errorCode改成 err_code, 或者将 BAUTH_TOKEN_MISSING 改成 TOKEN_FAILED, 会导致前端拿不到结果.
    """
    def get(self):
        try:
            verify_jwt_in_request()
        except Exception as e:
            print(e)
            # 这里的return结果，不要轻易修改.
            return {'errorCode': 'BAUTH_TOKEN_MISSING', 'errorMessage': '无效 access token'}, 401
            # return {'errorCode': 'Unauthorized Access Token', 'errorMessage': '无效的access token'}, 401
        current_user = get_jwt_identity()
        db = global_var['db']
        rst = getCurrentUser(db, current_user)

        return encoding_resp_utf8(rst)


class Users(Resource):
    """管理员 创建新用户"""
    @check_permission(["admin"])
    def post(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('data', type=dict, required=True, location='json')
        args = parser.parse_args()

        rst = UserUtils.createUser(args, global_var)
        return encoding_resp_utf8(rst)
