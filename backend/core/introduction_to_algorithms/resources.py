# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from core.introduction_to_algorithms.logics.pages import get_page
from common.utils.http import encoding_resp_utf8
from core.auth.logics.utils import check_permission


class IntroductionToAlgorithms(Resource):
    # @check_permission(["enduser"])
    def get(self, **auth):
        print("算法导论进入")
        """
        part - 1-7部分
        chapter - 1-35 章
        section - 每一章的第xx小节

        示例, 请求 "第1部分 第4章 第3小节" 的格式:
        http://localhost:5000/api/v1/introduction_to_algorithms/page?part=1&chapter=4&section=3
        """
        parser = reqparse.RequestParser()
        parser.add_argument('part', type=str, required=False, location='args')
        parser.add_argument('chapter', type=str, required=False, location='args')
        parser.add_argument('section', type=str, required=False, location='args')
        args = parser.parse_args()

        # db = global_var["db"]
        res = get_page(args)

        return encoding_resp_utf8(res)
