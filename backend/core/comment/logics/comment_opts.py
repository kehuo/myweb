# @File: comment_list_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/7

import traceback
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import or_

from db_models.db_models import Comment, User
from common.utils.http import getValueWithDefault, create_uuid
from common.utils.db import build_rows_result, build_one_result
from common.utils.other import hit_daily_comment_creation_threshold


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
            Comment.id, Comment.content, Comment.created_at, User.name, Comment.comment_id
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
        items = ["id", "content", "created_at", "creator", "comment_id"]
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


def get_one_comment(args, global_var, comment_id):
    """
    通过 comment_id 获取
    """

    db = global_var["db"]
    res = {}
    try:
        record = db.session.query(
            Comment.id, Comment.content, Comment.created_at, User.name, Comment.comment_id
        ) \
            .join(User, User.user_id == Comment.creator_user_id) \
            .filter(Comment.comment_id == comment_id) \
            .first()

        if record:
            items = ["id", "content", "created_at", "creator", "comment_id"]
            res = build_one_result(record, items)

    except Exception as e:
        res = {
            "code": "FAILURE",
            "message": "Get one comment failed. %s" % traceback.format_exc()
        }
    return res


def create_comment(args, global_var):
    """
    创建一条新评论 (每天只能允许创建最多 1000 条评论)
    -------------

    raw_str 就用 data["content"]

    另外, 由于生成的 comment_id 格式中有中划线, 很奇怪, 所以建议删掉:
    uuid = "-".join(uuid)
    """
    can_create = hit_daily_comment_creation_threshold(global_var)

    if not can_create:
        res = {
            "code": "FAILURE",
            "message": "Hit max daily comment creation threshold, please try to comment tomorrow."
        }
        return res

    data = args["data"]
    db = global_var["db"]

    comment_id = create_uuid(raw_str=data["content"])
    comment_id = "".join(comment_id.split("-"))

    current_user_name = get_jwt_identity()
    try:
        # 根据 current_user_name 找到 user_id (该信息从前端传过来)
        # user_query = db.session.query(User.user_id).filter(User.name == current_user_name).first()
        # current_user_id = user_query.user_id
        record = Comment(
            comment_id=comment_id,
            content=data["content"],
            creator_user_id=getValueWithDefault(data, "creator_user_id", "GUEST_USER")
        )
        db.session.add(record)
        db.session.commit()
        res = {
            "code": "SUCCESS",
            "data": {"id": record.id,
                     "creator": current_user_name}
        }
        global_var["today_already_created_comment_count"][1] += 1
    except Exception as e:
        res = {
            "code": "FAILURE",
            "message": traceback.format_exc()
        }
        print(traceback.format_exc())
    return res

