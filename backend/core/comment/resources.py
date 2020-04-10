# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from core.auth.logics.utils import check_permission
from app.init_global import global_var
from core.comment.logics.comment_opts import get_comment_list, create_comment, get_one_comment
from common.utils.http import encoding_resp_utf8


class CommentList(Resource):
    """
    获取 数据库中所有 评论

    评论可能很多, 所以使用 page 和 pageSize 用来前端分页.
    """
    # @check_permission(["enduser"])
    def get(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, required=False, location='args')
        parser.add_argument('pageSize', type=int, required=False, location='args')
        parser.add_argument('keyword', type=str, required=False, location='args')
        args = parser.parse_args()

        res = get_comment_list(args, global_var)

        return encoding_resp_utf8(res)

    @check_permission(["admin", "vip", "enduser", "guest"])
    def post(self, **auth):
        """
        创建一条评论
        ----------
        <1> 3是默认普通用户的role_id, 默认有评论的权限
        <2> 每天又评论数量限制, 被定义在 global_var["daily_comment_creation_max_threshold"] 中.
        <3> 是否超过每日限制, 可以根据 global_var["today_already_created_comment_count"] 来判断
        """
        parser = reqparse.RequestParser()
        parser.add_argument("data", type=dict, required=False, location="json")
        args = parser.parse_args()

        res = create_comment(args, global_var)

        return encoding_resp_utf8(res)


class CommentOne(Resource):
    """
    查看一条评论
    """
    @check_permission(["admin", "vip", "enduser"])
    def get(self, comment_id, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument("data", type=dict, required=False, location="json")
        args = parser.parse_args()

        res = get_one_comment(args, global_var, comment_id)

        return encoding_resp_utf8(res)