# @File: chapter_1
# @Author: Kevin Huo
# @LastUpdate: 4/2/2020 10:18 PM


from flask import render_template, make_response


def part_6_chapter_26_func():
    """
    第1章 - 算法在计算中的作用
    """
    html = render_template("introduction_to_algorithms/part_1/chapter_1.html")
    res = make_response(html)
    res.status_code = 200
    return res
