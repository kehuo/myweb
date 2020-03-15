# @File: name
# @Author: Kevin Huo
# @LastUpdate: 3/15/2020 3:51 PM

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class NameForm(FlaskForm):
    """使用方法:
    StringField -- 一个属性为 type="text"的 HTML <input>元素
    SubmitFiled -- 一个属性为 type="submit"的 HTML <input> 元素

    DataRequired 函数 -- 保证用户传入的数据不为空

    详见 书中第四章 p35"""
    name = StringField("What's your name?", validators=[DataRequired()])
    submit = SubmitField("Click to Submit!")
