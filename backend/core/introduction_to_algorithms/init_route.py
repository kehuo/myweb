# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from core.introduction_to_algorithms.resources import IntroductionToAlgorithms, IntroductionToAlgorithmsCatalog
from common.utils.http import app_url


def introduction_to_algorithms_route(api, version, model):
    # 获取算法导论的目录 (catalog.json 文件)
    api.add_resource(IntroductionToAlgorithmsCatalog, app_url(version, model, '/catalog'))

    # 请求某一章节的具体页面内容 (.md 文件)
    api.add_resource(IntroductionToAlgorithms, app_url(version, model, '/page'))