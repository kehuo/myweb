# @File: user.py
# @Author: Kevin Huo
# @Date: 2020/4/8


import traceback
from db_models.db_models import User
from core.auth.logics.utils import encrypt_password
from common.utils.http import getValueWithDefault, create_uuid


def createUser(args, global_var):
    db = global_var["db"]
    data = args['data']

    user_id = create_uuid(raw_str=data["name"])
    user_id = "".join(user_id.split("-"))
    try:
        record = User(
            user_id=user_id,
            name=data['userName'],
            realname=getValueWithDefault(data, 'realname', ''),
            # 创建用户时disabled必须是0
            disabled=0,
            email=getValueWithDefault(data, 'email', ''),
            password=encrypt_password(data['password']),
            # role_id=data['role_id']
            # 3 = 普通用户
            role_id=getValueWithDefault(data, "role_id", 3)
        )
        db.session.add(record)
        db.session.commit()

        rst = {
            'code': 'SUCCESS',
            'data': {
                'id': record.id,
                "username": record.name,
                "user_id": record.user_id
            }
        }
    except Exception as e:
        traceback.print_exc()
        db.session.rollback()
        rst = {
            'code': 'FAILURE',
            'message': 'create user failed, %s' % str(traceback.format_exc())
        }
    return rst
