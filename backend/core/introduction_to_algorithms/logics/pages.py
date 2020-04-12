# @File: pages
# @Author: Kevin Huo
# @LastUpdate: 4/10/2020 10:13 AM

from common.utils.http import load_md_file


def get_md_page(args):
    """
    新办法 - md文件维护每一章节的静态页面数据
    前端用这个模块解析.md文件: const ReactMarkdown = require("react-markdown");

    参数解释
    -------
    args = {"part": "1", "chapter": "4", "section": "3"}

    特别的, 当 args = {"part": "", "chapter": "", "section": ""} 时, 返回算法导论的home.md 文件
    """
    DATA_PATH = "./data/introduction_to_algorithms/"

    if (args["part"] == "-1") and (args["chapter"] == "-1") or (args["section"] == "-1"):
        # 返回默认home.md 页面
        DATA_PATH += "home.md"

    else:
        DATA_PATH += "part%s/chapter%s/section%s.md" % (args["part"], args["chapter"], args["section"])

    page_str_data = load_md_file(DATA_PATH)

    res = {"code": "SUCCESS",
           "data": page_str_data}
    return res


# def get_page(args):
#     """
#     旧办法 - json 维护页面文件 (大段文字难维护, 已弃用)
#     前端用 <pre>{这串字符串}</pre> 显示即可.
#
#     args = {"part": "1", "chapter": "4", "section": "3"}
#     """
#     DATA_PATH = "./data/introduction_to_algorithms/"
#
#     DATA_PATH += "part%s/chapter%s/section%s.json" % (args["part"], args["chapter"], args["section"])
#     page_data = load_json_file(DATA_PATH)
#
#     res = {"code": "SUCCESS",
#            "data": page_data}
#     return res