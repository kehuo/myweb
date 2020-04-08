# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/7

from flask_restful import Resource, reqparse

from core.welcome.logics.test_logic import test_func
from common.utils.http import encoding_resp_utf8


class Welcome(Resource):
    """
    获取数据库中所有 检查报告初始文本 的列表 (对应前端 exam-standard/show-exam-report-list 页面)
    """

    # @check_permission([1, 2, 3, 4])
    def get(self, **auth):
        parser = reqparse.RequestParser()
        # parser.add_argument('page', type=int, required=False, location='args')
        # parser.add_argument('pageSize', type=int, required=False, location='args')
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        # db = global_var["db"]
        res = test_func(args)

        return encoding_resp_utf8(res)
