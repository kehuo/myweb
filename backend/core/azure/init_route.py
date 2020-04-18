# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from core.azure.resources import AzureRedirectUri, AzureAuthorizationCode
from common.utils.http import app_url


def azure_route(api, version, model):
    # 获取 authorization code 的默认请求参数
    # 默认的 response mode / scope / endpoint 等等
    api.add_resource(AzureAuthorizationCode, app_url(version, model, '/authorization_code_request_default_params'))
    api.add_resource(AzureRedirectUri, app_url(version, model, '/redirect_uri'))
