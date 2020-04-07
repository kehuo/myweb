# @File: test_logic.py
# @Author: Kevin Huo
# @Date: 2020/4/7


def test_func(args):
    """
    参数:
    db - flask db 对象
    args - 前端传来的请求, 字典格式.

    error sample:
    res = {
        "code": "FAILURE",
        "message": "Incorrect Password"
    }
    """
    data = {"hello": "ml"}
    res = {
        "code": "SUCCESS",
        "data": data
    }

    return res