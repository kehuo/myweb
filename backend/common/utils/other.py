# @File: other.py
# @Author: Kevin Huo
# @Date: 2020/4/10

from datetime import datetime


def hit_daily_comment_creation_threshold(global_var):
    """
    默认每天全网站最多创建 1000 条评论.
    该函数用来检测是否超出了 1000 条的限制
    """
    can_create = False

    daily_max_threshold = global_var["daily_comment_creation_max_threshold"]

    today = datetime.now().date()

    # 情况1 - current_comment_situation 为空数组
    # 数组第一项写入 当前时间戳
    # 第二项写入 0
    # 初始化完成, 并can_create = True
    if len(global_var["today_already_created_comment_count"]) == 0:
        global_var["today_already_created_comment_count"].append(today)
        global_var["today_already_created_comment_count"].append(0)
        can_create = True

    # 情况2 - 数组不为空, 且第一项 == today
    else:
        if global_var["today_already_created_comment_count"][0] == today:
            # 查看数组第二项是否 大于等于 daily_max_threshold
            if global_var["today_already_created_comment_count"][1] >= daily_max_threshold:
                # 超过最大限制, 无法创建
                can_create = False
            else:
                # 可以创建
                can_create = True
        # 情况 3 - 数组不为空, 但是第一项 不等于 today(已经到明天了)
        # 可以评论, 将数组第一项更新成新的 today
        can_create = True
        global_var["today_already_created_comment_count"][0] = today
        global_var["today_already_created_comment_count"][1] = 0
    return can_create
