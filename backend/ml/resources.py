# @File: resources
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:44 PM

from flask_restful import Resource, reqparse

from app.init_global import global_var
from common.utils import encoding_resp_utf8
from ml.core.exam_tagging import exam_tagging_func


class ExamTagging(Resource):
    def get(self, **auth):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=False, location='args')
        args = parser.parse_args()

        res = exam_tagging_func(args, global_var)

        return encoding_resp_utf8(res)