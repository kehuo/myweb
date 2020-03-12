# @File: route
# @Author: Kevin Huo
# @LastUpdate: 3/12/2020 11:17 PM


from common.utils import app_url
from auth.resources import Login


def auth_route_func(api, version, model):
    api.add_resource(Login, app_url(version, model, "/login"))
