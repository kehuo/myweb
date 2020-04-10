# @File: resources.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from flask_restful import Resource, reqparse

from core.introduction_to_algorithms.logics.pages import get_pages
from common.utils.http import encoding_resp_utf8


class IntroductionToAlgorithms(Resource):
    def get(self, **auth):
        """
        part - 1-7部分
        chapter - 1-35 章
        section - 每一章的第xx小节

        请求 "第1部分 第4章 第3小节" 的格式:
        https://localhost:5000/api/v1/introduction_to_algorithms/pages?part=1&chapter=4&section=3
        """
        parser = reqparse.RequestParser()
        parser.add_argument('part', type=str, required=False, location='args')
        parser.add_argument('chapter', type=str, required=False, location='args')
        parser.add_argument('section', type=str, required=False, location='args')
        args = parser.parse_args()

        # db = global_var["db"]
        res = get_pages(args)

        return encoding_resp_utf8(res)
