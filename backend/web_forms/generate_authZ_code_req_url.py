# @File: request_for_authorization_code_by_client_id
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 1:50 AM


from app.init_global import global_var
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class GenerateAuthZCodeReqUrlForm(FlaskForm):
    """使用方法:
    StringField -- 一个属性为 type="text"的 HTML <input>元素
    SubmitFiled -- 一个属性为 type="submit"的 HTML <input> 元素
    DataRequired 函数 -- 保证用户传入的数据不为空

    default 参数 -- 表单刚开始里面就会填充的 默认值
    详见 书中第四章 p35"""
    req_url = StringField("AzureAD authorize endpoint", default=global_var["azure_ad_authorize_endpoint"], validators=[DataRequired()])

    client_id = StringField("Azure registered app client ID", default=global_var["client_id"], validators=[DataRequired()])
    response_type = StringField("response type", default=global_var["response_type"], validators=[DataRequired()])
    redirect_uri = StringField("redirect_uri", default=global_var["redirect_uri"], validators=[DataRequired()])
    response_mode = StringField("response_mode", default=global_var["response_mode"], validators=[DataRequired()])
    scope = StringField("scope", default=global_var["scope"], validators=[DataRequired()])
    state = StringField("state", default=global_var["state"], validators=[DataRequired()])

    submit = SubmitField("Click to generate request url")
