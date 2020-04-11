# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from common.utils.http import encoding_resp_utf8
from core.test.logics.markdown import get_markdown_file
from core.auth.logics.utils import check_permission


class TestMarkdown(Resource):
    """
    测试 markdown 文件 (已经成功, 详见 data/test/sample.md)
    """
    @check_permission(["admin"])
    def get(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        # db = global_var["db"]
        res = get_markdown_file(args)

        return encoding_resp_utf8(res)