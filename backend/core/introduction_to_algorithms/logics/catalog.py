# @File: catalog.py
# @Author: Kevin Huo
# @LastUpdate: 4/10/2020 10:13 AM

import json
from common.utils.http import load_json_file
from core.introduction_to_algorithms.logics.replace_n_to_br import replace_n_to_br_func

# 因为python manage.py runserver 是从backend更路径运行的, 所以 DATA_PATH 要以根路径为准
# BASE_DATA_PATH = "./data/introduction_to_algorithms/part1/chapter2/section1.json"


def get_catalog_json(args):
    """
    data/introduction_to_algorithms/catalog.json
    """
    DATA_PATH = "./data/introduction_to_algorithms/catalog.json"

    page_data = load_json_file(DATA_PATH)

    res = {"code": "SUCCESS",
           "data": page_data}
    return res
