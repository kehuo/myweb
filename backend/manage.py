# @File: manage
# @Author: Kevin Huo
# @LastUpdate: 3/10/2020 8:58 PM


from app.app import app
from flask_script import Manager, Server


def run_manage():
    manager = Manager(app)
    manager.add_command("runserver", Server(host=app.config['LISTEN'],
                                            port=app.config['PORT'],
                                            use_debugger=app.config['DEBUG']))
    manager.run()
    return


def main():
    run_manage()


if __name__ == '__main__':
    main()
