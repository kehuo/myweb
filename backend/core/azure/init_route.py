# @File: init_route.py
# @Author: Kevin Huo
# @Date: 2020/4/6

from core.azure.resources import AzureRedirectUri
from common.utils.http import app_url


def azure_route(api, version, model):
    api.add_resource(AzureRedirectUri, app_url(version, model, '/redirect_uri'))
