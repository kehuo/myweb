# @File: pages
# @Author: Kevin Huo
# @LastUpdate: 4/10/2020 10:13 AM

import json
from common.utils.http import load_json_file

DATA_PATH = "../data/introduction_to_algorithms/part1/chapter2/1.json"


def get_pages(args):
    """
    args = {"part": "1", "chapter": "4", "section": "3"}
    """
    print(args)
    page_data = load_json_file(DATA_PATH)

    res = {"code": "SUCCESS",
           "data": page_data}
    return page_data
