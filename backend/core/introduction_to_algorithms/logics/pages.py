# @File: pages
# @Author: Kevin Huo
# @LastUpdate: 4/10/2020 10:13 AM

import json
from common.utils.http import load_json_file
from core.introduction_to_algorithms.logics.replace_n_to_br import replace_n_to_br_func

# 因为python manage.py runserver 是从backend更路径运行的, 所以 DATA_PATH 要以根路径为准
# BASE_DATA_PATH = "./data/introduction_to_algorithms/part1/chapter2/section1.json"


def get_page(args):
    """
    旧办法 - 直接返回带 \n 和 空格的字符串给前端
    前端用 <pre>{这串字符串}</pre> 显示即可.

    args = {"part": "1", "chapter": "4", "section": "3"}
    """
    DATA_PATH = "./data/introduction_to_algorithms/"

    DATA_PATH += "part%s/chapter%s/section%s.json" % (args["part"], args["chapter"], args["section"])
    page_data = load_json_file(DATA_PATH)

    res = {"code": "SUCCESS",
           "data": page_data}
    return res


# def get_page_v2(args):
#     """
#     新办法 - "123\n   456\n   789\n" 转成一个数组:
#     已经测试 - 不管用, 因为前端默认会删掉空格
#     arr = [
#         [123\n],
#         [   456\n],
#         [   789\n]
#     ]
#
#     args = {"part": "1", "chapter": "4", "section": "3"}
#     """
#     DATA_PATH = "./data/introduction_to_algorithms/"
#     DATA_PATH += "part%s/chapter%s/%s.json" % (args["part"], args["chapter"], args["section"])
#     page_data = load_json_file(DATA_PATH)
#
#     # 将 page_data["main"]["content"]["pseudo_code"] 从带换行符的字符串, 转成一个数组. 每行作为数组的一项
#     raw_str = page_data["main"]["content"]["pseudo_code"]
#     arr = []
#     idx_arr = [0]
#     for i in range(len(raw_str)):
#         s = raw_str[i]
#         if s == "\n":
#             begin, end = idx_arr[-1], i + 1
#             idx_arr.append(i)
#             one = raw_str[begin: end]
#             # one = one.rstrip()
#             arr.append(one)
#
#             if i == len(raw_str) - 1:
#                 break
#
#     page_data["main"]["content"]["pseudo_code"] = arr
#     # print(page_data["main"]["content"]["pseudo_code"])
#     for a in arr:
#         print(a)
#     res = {"code": "SUCCESS",
#            "data": page_data}
#     return res
