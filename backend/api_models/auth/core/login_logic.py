# @File: login_logic
# @Author: Kevin Huo
# @LastUpdate: 3/12/2020 11:21 PM


def handle_login(args, global_var):
    res = {"code": "SUCCESS",
           "data": {"username": args["username"],
                    "password": args["password"]}}
    return res
