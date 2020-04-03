# @File: view_func_builder
# @Author: Kevin Huo
# @LastUpdate: 4/3/2020 10:56 AM

from flask import render_template, make_response


class IntroductionToAlgorithmsViewFuncBuilder(object):
    """
    该类统一定义了 7 章 35 节 <算法导论> 的全部视图函数

    具体每一个函数的逻辑, 会调用 logics/* 下的函数, 具体问题具体实现.

    https://vimiix.com/post/2017/11/15/use-jinjia2-without-flask/
    """
    def __init__(self, global_var):
        self.global_var = global_var
        self.view_funcs = {}

    def build_one(self, part_str, chapter_str, title):
        """构造一个视图函数的具体方法"""
        param = {"part": part_str, "chapter": chapter_str, "title": title}
        # print(param)
        # print("introduction_to_algorithms/part_%s/chapter_%s.html" % (part_str, chapter_str))
        html = render_template("introduction_to_algorithms/part_%s/chapter_%s.html" % (part_str, chapter_str), param=param)
        res = make_response(html)
        res.status_code = 200
        return res

    def build(self):
        """
        根据 catalog.json 的章节去构建. 最终:
        self.view_funcs = {
            "1": {
                "1": "算法在计算中的作用",
                "2": "算法基础",
                ...
            },

            "2": {
                "6": "xxx"
            },

            ...

            "7": {
                "27": "多线程算法",
                ...
                "35": "近似算法" (END)
            }
        }
        """
        catalog = self.global_var["introduction_to_algorithms_catalog"]

        for p in catalog:
            chapters = catalog[p]["chapters"]
            for c in chapters:
                # p = "1", c="2", title = "算法基础" -- 第1章 第2节 算法基础
                title = chapters[c]
                if p not in self.view_funcs:
                    self.view_funcs = {}
                self.view_funcs[p][c] = self._build_one(p, c, title)
        print(self.view_funcs)