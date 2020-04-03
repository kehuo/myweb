# @File: view_func
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 1:36 PM

from flask import render_template, make_response
from app.init_global import global_var


def introduction_to_algorithms_func(p, c):
    # p = 1, c = 2, title = "算法导论基础"
    title = global_var["introduction_to_algorithms_catalog"][str(p)]["chapters"][str(c)]
    param = {"part": p, "chapter": c, "title": title}
    html = render_template("introduction_to_algorithms/part_%s/chapter_%s.html" % (p, c), param=param)
    res = make_response(html)
    res.status_code = 200
    return res
