# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from core.introduction_to_algorithms.resources import IntroductionToAlgorithms
from common.utils.http import app_url


def introduction_to_algorithms_route(api, version, model):
    api.add_resource(IntroductionToAlgorithms, app_url(version, model, '/pages'))