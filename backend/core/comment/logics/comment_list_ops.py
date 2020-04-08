# @File: comment_list_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/7


from datetime import datetime, timedelta


def get_comment_list(args, global_var):
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
    now = datetime.now()
    created = now - timedelta(hours=1)
    created = created.strftime("%Y-%m-%d %H:%M:%S")
    data = {
        "total": 3,
        "comments": [
            {"id": 0, "created_by": "hk", "content": "good website!", "created_at": created},
            {"id": 1, "created_by": "tmj", "content": "perfect!", "created_at": created},
            {"id": 2, "created_by": "tmj", "content": "perfect!", "created_at": created},
        ]
    }

    res = {
        "code": "SUCCESS",
        "data": data
    }

    return res


# def get_comment_list(db, args):
#     """
#     支持用keyword关键词过滤 类型/内容
#     """
#     keyword = getValueWithDefault(args, 'keyword', None)
#     page = getValueWithDefault(args, 'page', 1)
#     pageSize = getValueWithDefault(args, 'pageSize', 1000)
#
#     try:
#         query = db.session.query(
#             ReportTaggingSamples.id, ReportTaggingSamples.content, ReportTaggingSamples.type
#         )
#
#         # 1 用keyword过滤一次 (注意, 目前测试，只能用.contains方法过滤，而不能用.like方法。)
#         # 参考文档: https://blog.csdn.net/weixin_41829272/article/details/80609968
#         if keyword is not None:
#             query = query.filter(or_(ReportTaggingSamples.content.contains(keyword),
#                                      ReportTaggingSamples.type.contains(keyword)))
#
#         # 2 用 page 和 pageSize 分页
#         offset = (page - 1) * pageSize
#         total = query.count()
#         rows = query.order_by(ReportTaggingSamples.id).offset(offset).limit(pageSize).all()
#         items = ["id", "content", "type"]
#         data = build_rows_result(rows, items)
#
#         rst = {
#             "code": "SUCCESS",
#             "data": {
#                 "total": total,
#                 "exam_reports": data
#             }
#         }
#     except Exception as e:
#         traceback.print_exc()
#         rst = {
#             "code": "FAILURE",
#             "message": "Get exam report list failed. %s" % str(e)
#         }
#
#     return rst
