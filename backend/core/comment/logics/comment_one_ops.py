# @File: comment_one_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/8

import traceback
from db_models.db_models import Comment, User
from common.utils.http import create_uuid
from flask_jwt_extended import get_jwt_identity


def create_comment(args, global_var):
    """
    创建一条新评论
    -------------

    raw_str 就用 data["content"]

    另外, 由于生成的 comment_id 格式中有中划线, 很奇怪, 所以建议删掉:
    uuid = "-".join(uuid)
    """
    data = args["data"]
    db = global_var["db"]

    comment_id = create_uuid(raw_str=data["content"])
    comment_id = "".join(comment_id.split("-"))

    current_user_name = get_jwt_identity()
    try:
        # 根据 current_user_name 找到 user_id
        user_query = db.session.query(User.user_id).filter(User.name == current_user_name).first()
        current_user_id = user_query.user_id
        print("userid:%s" % current_user_id)
        record = Comment(
            comment_id=comment_id,
            content=data["content"],
            creator_user_id=current_user_id
        )
        db.session.add(record)
        db.session.commit()
        res = {
            "code": "SUCCESS",
            "data": {"id": record.id,
                     "creator": current_user_name}
        }
    except Exception as e:
        res = {
            "code": "FAILURE",
            "message": traceback.format_exc()
        }
        print(traceback.format_exc())
    return res

