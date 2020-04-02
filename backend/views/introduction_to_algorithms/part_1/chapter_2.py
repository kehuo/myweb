# @File: chapter_1
# @Author: Kevin Huo
# @LastUpdate: 4/2/2020 10:18 PM


from flask import render_template, make_response


def part_1_chapter_2_func():
    """
    第 1 章
    第 2 节- 算法基础
    """
    p = 1
    c = 2
    param = {"part": p, "chapter": c, "title": "算法基础"}

    html = render_template("introduction_to_algorithms/part_%s/chapter_%s.html" % (p, c), param=param)
    res = make_response(html)
    res.status_code = 200
    return res
