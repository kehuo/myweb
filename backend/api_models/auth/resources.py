# @File: resources
# @Author: Kevin Huo
# @LastUpdate: 3/12/2020 11:17 PM


from flask_restful import Resource, reqparse

from app.init_global import global_var
from api_models.auth.core.login_logic import handle_login


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True, location="json")
        parser.add_argument("password", type=str, required=True, location="json")
        args = parser.parse_args()

        res = handle_login(args, global_var)

        return res
