# @File: utils
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:32 PM

import json
from flask import json, Response


def app_url(version, model, name):
    """
    :param version: 该参数是 service.conf 中的 API_VERSION
    :param model: 该参数是 service.conf 中的 MODELS 的其中一个, 比如 model = "ml"
    :param name: 每个 api 根据用途自定义, 比如 "/login" 或者 "/user"
    :return: "/ml/v1/"
    """
    res = "/%s/%s%s" % (version, model, name)
    return res


def encoding_resp_utf8(data):
    json_response = json.dumps(data, ensure_ascii=False)
    response = Response(json_response, content_type="application/json; charset=utf-8")
    return response


def load_json_file(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data
