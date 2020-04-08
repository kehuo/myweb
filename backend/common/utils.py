# @File: utils
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:32 PM

import json
from datetime import datetime
from decimal import Decimal

from flask import json, Response


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


def getValueWithDefault(aMap, key, defaultVal=None):
    v = aMap.get(key, defaultVal)
    if v is None:
        v = defaultVal
    return v


def strip_value(value, strip):
    if value is None:
        return value
    if isinstance(value, str):
        if strip:
            value = value.strip()
    elif isinstance(value, Decimal):
        value = float(value)
    return value


def build_rows_result(rows, items, process_none=True, json_items=[], strip=False):
    rst = []
    item_len = len(items)
    for row in rows:
        x = {}
        for i in range(0, item_len):
            name = items[i]
            if isinstance(row[i], datetime):
                x[name] = datetime.strftime(row[i], '%Y-%m-%d %H:%M:%S')
            elif name in json_items:
                try:
                    content = json.loads(row[i]) if row[i] is not None and row[i] != '' else ''
                except Exception as e:
                    content = row[i]
                x[name] = content
            elif process_none:
                value = row[i] if row[i] is not None else ''
                x[name] = strip_value(value, strip=strip)
            else:
                x[name] = strip_value(row[i], strip=strip)
        rst.append(x)
    return rst