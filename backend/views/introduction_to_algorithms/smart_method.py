from flask import render_template, make_response

from common.utils import load_json_file

# 读取 算法导论 的目录文件
catalog = load_json_file(path="data/introduction_to_algorithms/catalog.json")


def each_algorithm_view_funcs(part, chapter):
    global catalog
    # 初始化 7 章 35 节内容的 视图函数
    param = {"part": part, "chapter": chapter, "title": catalog[str(part)]["chapters"][str(chapter)]}

    html = render_template("introduction_to_algorithms/part_%s/chapter_%s.html" % (part, chapter), param=param)
    res = make_response(html)
    res.status_code = 200
    return res


