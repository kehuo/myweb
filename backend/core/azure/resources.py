# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from app.init_global import global_var
from core.azure.logics.oauth import get_redirect_uri_display_content, get_default_params_to_request_authorization_code
from common.utils.http import encoding_resp_utf8


class AzureAuthorizationCode(Resource):
    """
    获取默认的请求params, 比如
    endpoint / resposne mode / state / scope 等等
    """
    def get(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        res = get_default_params_to_request_authorization_code(args, global_var)

        return encoding_resp_utf8(res)


class AzureRedirectUri(Resource):
    def get(self, **auth):
        parser = reqparse.RequestParser()
        # parser.add_argument('page', type=int, required=False, location='args')
        # parser.add_argument('pageSize', type=int, required=False, location='args')
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        # db = global_var["db"]
        res = get_redirect_uri_display_content(args)

        return encoding_resp_utf8(res)
