# @File: nlp_tagging
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 3:00 PM

from flask import render_template, make_response

from app.init_global import global_var


def nlp_tagging_func():
    html = render_template("ml/nlp_tagging.html")
    res = make_response(html)
    res.status_code = 200
    return res
