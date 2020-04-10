# @File: register.py
# @Author: Kevin Huo
# @Date: 2020/4/10

import traceback
from db_models.db_models import User, Role
from core.auth.logics.utils import encrypt_password
from common.utils.http import getValueWithDefault, create_uuid


def register_user_account(args, global_var):
    """
    普通用户注册一个新账号

    role_id = 3 >> role_name = "enduser" (普通注册用户)
    """
    db = global_var["db"]
    data = args['data']

    user_id = create_uuid(raw_str=data["name"])
    user_id = "".join(user_id.split("-"))
    try:
        record = User(
            # 必须 (用户手动必须填写的只有2项, userName 和 password)
            user_id=user_id,
            name=data['name'],
            password=encrypt_password(data['password']),
            role_id=3,
            disabled=0,

            # 可选
            realname=getValueWithDefault(data, 'realname', ''),
            email=getValueWithDefault(data, 'email', '')
        )
        db.session.add(record)
        db.session.commit()

        # 需要给前端返回 role_name, 因为前端的 src/models/register.js 的reducer 中要调用 setAuthority 方法更新current user 角色
        role_name = db.session.query(Role).filter(Role.id == 3).first().name
        rst = {
            'code': 'SUCCESS',
            'data': {
                'id': record.id,
                "username": record.name,
                "user_id": record.user_id,
                "role_name": role_name
            }
        }
    except Exception as e:
        traceback.print_exc()
        db.session.rollback()
        rst = {
            'code': 'FAILURE',
            'message': 'register account failed, %s' % str(traceback.format_exc())
        }
    return rst
