# @File: core_view_funcs
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 1:46 PM

from common.utils.http import build_app_url

from views.ml.core_view_funcs.nlp_tagging import nlp_tagging_func


def ml_route(app, model):
    """
    和 Azure 相关的 所有视图函数, 都在这里统一初始化

    参数:
    app -- Flask 的 app 全局对象
    model -- "introduction_to_algorithms"
    """
    # 1  todo NLP-Seg 模型
    tmp = build_app_url(model, "/nlp_tagging")
    app.add_url_rule(tmp,
                     endpoint=tmp[1:],
                     view_func=nlp_tagging_func,
                     methods=["GET"])
