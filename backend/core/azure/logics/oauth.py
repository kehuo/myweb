# @File: test_dunc
# @Author: Kevin Huo
# @LastUpdate: 4/9/2020 1:09 PM


def get_redirect_uri_display_content(args):
    """这是 azure ad 重定向过来的页面, 暂时不需要处理数据. 所以默认返回一个成功的信息即可"""
    res = {
        "code": "SUCCESS",
        "data": {"content": "this azure redirect uri page"}
    }
    return res
