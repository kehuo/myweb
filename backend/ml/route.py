# @File: route
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:30 PM

from ml.resources import ExamTagging
from common.utils import app_url


def ml_route_func(api, version, model):
    """
    :param api: flask_restful 的 api 对象
    :param version: service.conf 中的 API_VERSION 值
    :param model: service.conf 中的 MODELS 中的其中一个值, 比如 "ml"

    /api/v1/ml/tagging
    """
    # 标注模型
    api.add_resource(ExamTagging, app_url(version, model, '/tagging'))
