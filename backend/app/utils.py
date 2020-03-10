# @File: utils
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 4:09 PM

import errno
import sys
import getopt


def load_config(app, filename, silent=False):
    """
    该函数是以前用来读取 service.conf 配置文件的. 现在由于可以直接 app.from_pyfile(), 所以该函数暂时不再使用.
    """
    try:
        with open(filename, 'r', encoding='utf-8') as config_file:
            exec (compile(config_file.read(), filename, 'exec'), app.config.__dict__)
    except IOError as e:
        if silent and e.errno in (errno.ENOENT, errno.EISDIR):
            return False
        e.strerror = 'Unable to load configuration file (%s)' % e.strerror
        raise
    for key in dir(app.config):
        if key.isupper():
            app.config[key] = getattr(app.config, key)
    return True


def get_service_config():
    """
    功能函数, 目前也暂时不用
    """
    config_file = './service.conf'
    opts, args = getopt.getopt(sys.argv[1:], "hc:")
    for op, value in opts:
        if op == "-c":
            config_file = value
            break
    return config_file
