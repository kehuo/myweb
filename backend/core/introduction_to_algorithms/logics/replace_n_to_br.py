# @File: replace_n_to_br.py
# @Author: Kevin Huo
# @Date: 2020/4/10


def replace_n_to_br_func(raw_str):
    """
    将字符串中的换行符, 全部替换成前端的 <br/> 换行符
    """
    new = "<br/>"
    return raw_str.replace("\n", new)


if __name__ == '__main__':
    t = "123\n   456\n 789"
    print(replace_n_to_br_func(t))
