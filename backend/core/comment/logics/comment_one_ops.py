# @File: comment_one_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/8

from db_models.db_models import Comment
from common.utils import create_uuid


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
    try:
        record = Comment(
            comment_id=comment_id,
            content=data["content"],
            created_by=1
        )
        db.session.add(record)
        db.session.commit()
        res = {
            "code": "SUCCESS",
            "data": {"id": record.id}
        }
    except Exception as e:
        res = {
            "code": "FAILURE",
            "message": str(e)
        }
    return res

