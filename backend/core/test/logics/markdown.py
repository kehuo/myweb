# @File: comment_list_ops.py
# @Author: Kevin Huo
# @Date: 2020/4/7


def get_markdown_file(args):
    """
    data/test/sample.md
    """
    md_path = "./data/test/sample.md"
    with open(md_path, "r", encoding="utf=8") as md_f:
        md_data = md_f.readlines()

    md_str = "".join(md_data)
    res = {
        "code": "SUCCESS",
        "data": {
            "mdcontent": md_str
        }
    }

    return res