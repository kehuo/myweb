# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 1:46 PM

from common.utils.http import build_app_url

from views.introduction_to_algorithms.core_view_funcs.chapters import introduction_to_algorithms_func


def introduction_to_algorithms_route(app, model):
    """
    和 Azure 相关的 所有视图函数, 都在这里统一初始化

    参数:
    app -- Flask 的 app 全局对象
    model -- "introduction_to_algorithms"
    """
    # 2.1 生成 7 部分, 35 章中的其中一章的 html 页面 (第p部分, 第c章)
    tmp = build_app_url(model, "/<p>/<c>")
    app.add_url_rule(tmp,
                     endpoint=tmp[1:],
                     view_func=introduction_to_algorithms_func,
                     methods=["GET"])
