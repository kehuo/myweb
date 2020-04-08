# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/7


from core.welcome.resources import Welcome
from common.utils.http import app_url


def welcome_route(api, version, model):
    """
    api - flask api 对象
    version - "v1"
    model - "ml" 或者 "azure", "welcome" 等等

    初始化出的 url 示例 -- /api/v1/ml/tagging
    """
    api.add_resource(Welcome, app_url(version, model, '/get_welcome_data'))
