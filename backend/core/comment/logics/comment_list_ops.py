# @File: comment_list_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/7


from db_models.db_models import Comment, User
import traceback
from sqlalchemy import or_
from common.utils.http import getValueWithDefault
from common.utils.db import build_rows_result


def get_comment_list(args, global_var):
    """
    支持用keyword关键词过滤 类型/内容

    User 和 Comment 通过 User.user_id 和 Comment.created_by 连表
    """
    keyword = getValueWithDefault(args, 'keyword', None)
    page = getValueWithDefault(args, 'page', 1)
    pageSize = getValueWithDefault(args, 'pageSize', 1000)

    db = global_var["db"]
    try:
        query = db.session.query(
            Comment.id, Comment.content, Comment.created_at, User.name
        ) \
            .join(User, User.user_id == Comment.creator_user_id)

        # 1 用keyword过滤一次 (注意, 目前测试，只能用.contains方法过滤，而不能用.like方法。)
        # 参考文档: https://blog.csdn.net/weixin_41829272/article/details/80609968
        if keyword is not None:
            query = query.filter(or_(Comment.content.contains(keyword),
                                     Comment.created_at.contains(keyword)))

        # 2 用 page 和 pageSize 分页
        offset = (page - 1) * pageSize
        total = query.count()
        rows = query.order_by(Comment.id).offset(offset).limit(pageSize).all()
        items = ["id", "content", "created_at", "creator"]
        data = build_rows_result(rows, items)

        rst = {
            "code": "SUCCESS",
            "data": {
                "total": total,
                "comments": data
            }
        }
    except Exception as e:
        rst = {
            "code": "FAILURE",
            "message": "Get comments failed. %s" % traceback.format_exc()
        }

    return rst
