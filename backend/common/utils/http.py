# @File: utils
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:32 PM

import json
from datetime import datetime
import uuid

from flask import json, Response

from app.init_global import global_var


def app_url(version, model, name):
    name = "/%s/%s%s" % (version, model, name)
    # name = '/{}/{}{}'.format(version, model, name)
    return name


def build_app_url(model, name):
    """
    用来构造 view func 视图函数的 url
    和 app_url 的区别在于, 这个函数不需要 api_version.

    :param model: 该参数是 service.conf 中的 MODELS 的其中一个, 比如 model = "ml"
    :param name: 每个 api 根据用途自定义, 比如 "/login" 或者 "/user"
    :return: "/ml/v1/"
    """
    res = "/%s%s" % (model, name)
    return res


def encoding_resp_utf8(data):
    json_response = json.dumps(data, ensure_ascii=False)
    response = Response(json_response, content_type="application/json; charset=utf-8")
    return response


def load_json_file(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


def load_md_file(path):
    """读取并加载算法导论的 .md 文件,
    最终返回的是 string 数据. 因为前端支持的格式是 str 类型"""
    with open(path, "r", encoding="utf-8") as f:
        md_data = f.readlines()
    md_str = "".join(md_data)
    return md_str


def getValueWithDefault(aMap, key, defaultVal=None):
    v = aMap.get(key, defaultVal)
    if v is None:
        v = defaultVal
    return v


def create_uuid(raw_str):
    """
    raw_str 可能是 username + 当前时间戳, 等等.
    https://blog.csdn.net/yl416306434/article/details/80569688

    使用 uuid5, 散列方式是 SHA1, 而不是MD5
    """
    now = datetime.now().strftime("%Y-%m-%d %H-%M-%S %f")
    raw_str = raw_str + now
    print(raw_str)
    return str(uuid.uuid5(namespace=uuid.NAMESPACE_DNS, name=raw_str))
