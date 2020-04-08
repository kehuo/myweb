# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6


from core.comment.resources import CommentList, CommentOne
from common.utils.http import app_url


def comment_route(api, version, model):
    """
    api - flask api 对象
    version - "v1"
    model - "ml" 或者 "azure" 等等

    初始化出的 url 示例 -- /api/v1/ml/tagging
    """
    api.add_resource(CommentList, app_url(version, model, '/comment_list'))

    # create new comment
    api.add_resource(CommentOne, app_url(version, model, '/comment'))