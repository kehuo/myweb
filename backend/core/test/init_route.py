# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from core.test.resources import TestMarkdown
from common.utils.http import app_url


def test_route(api, version, model):
    """
    api - flask api 对象
    version - "v1"
    model - "ml" 或者 "azure" 等等

    初始化出的 url 示例 -- /api/v1/test/markdown
    """
    api.add_resource(TestMarkdown, app_url(version, model, '/markdown'))
