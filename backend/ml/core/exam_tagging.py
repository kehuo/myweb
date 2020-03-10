# @File: exam_tagging
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:55 PM


def exam_tagging_func(args, global_var):
    raw_input = args.get("data", None)

    res = {"code": "SUCCESS",
           "data": {"input": raw_input}}
    return res
