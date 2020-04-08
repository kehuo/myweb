# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from app.init_global import global_var
from core.comment.logics.test_logic import get_comment_list
from common.utils import encoding_resp_utf8


class CommentList(Resource):
    """
    获取 数据库中所有 评论

    评论可能很多, 所以使用 page 和 pageSize 用来前端分页.
    """

    # @check_permission([1, 2, 3, 4])
    def get(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, required=False, location='args')
        parser.add_argument('pageSize', type=int, required=False, location='args')
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        db = global_var["db"]
        res = get_comment_list(db, args)

        return encoding_resp_utf8(res)