# @File: generate_access_token_req
# @Author: Kevin Huo
# @LastUpdate: 3/21/2020 2:42 PM

import json
import requests
from flask import session, render_template, make_response, url_for

from app.init_global import global_var


def generate_access_token_req_func():
    """
    Microsoft document
    ================
    https://docs.microsoft.com/en-us/graph/auth-v2-user#3-get-a-token

    该视图函数一般是从 azure_ad_redirect_url 重定向过来的.

    用来根据 azure_ad_redirect_url 提供的 authZ code, 生成一个用来请求 AAD token endpoint 的完整 POST请求和 请求body.

    1. 从 session 中读取 authZ_code
    2. 构造用来请求 Azure AD token endpoint 的请求url 和 请求 body
    3. 构造完成后, 点击按钮, 用第三方包 requests.post 发起请求, 获取 access token 响应.
    4. 将返回的 access token 渲染到 html 页面, 返回.


    成功后的返回示例:
    ====================
    resp_from_aad_token_endpoint{
        "token_type": "Bearer",
        "scope": "Mail.Read User.Read profile openid email",
        "expires_in": 3599,
        "ext_expires_in": 3599,
        "access_token": "eyJ0eXAiOiJKV1QiLCJub25jZSI6InR3aVhITjRSTkdlUTJRSk5iTjcteEg5OVNPUTBXamNQU044TFViUmlHUXciLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yYjRiM2NjOS01ZWMyLTRiNTYtYWQxZC00OTBlZmZjMzkyZTYvIiwiaWF0IjoxNTg0NzY5MDE4LCJuYmYiOjE1ODQ3NjkwMTgsImV4cCI6MTU4NDc3MjkxOCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhPQUFBQTd1WWtidSs5WEpkTWJUL0QwOTBCSnI4U1QzaTIxOVF4dTZyWVVzZVBSNGc9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJLZXZpbkh1byBFWE8iLCJhcHBpZCI6IjkxN2MzNmMyLWVmZDItNDBjMS1iY2M5LWIyNjAyNDQ5ZjQ5NCIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiaHVvIiwiZ2l2ZW5fbmFtZSI6ImtlIiwiaXBhZGRyIjoiMTY3LjIyMC4yMzMuMTg1IiwibmFtZSI6Imh1b2tlIiwib2lkIjoiYjMxZTIyZjQtNTAyZi00NGRhLTk3NmYtYjJhMDAyZmE2ZDUwIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAwOTRCNDVFNUMiLCJzY3AiOiJNYWlsLlJlYWQgVXNlci5SZWFkIHByb2ZpbGUgb3BlbmlkIGVtYWlsIiwic3ViIjoiS3dwZWkxZm56V2dGS0JSejRoUmxDVG5nN1Rob24wcjJkX2F6ZXQ3ak1FYyIsInRpZCI6IjJiNGIzY2M5LTVlYzItNGI1Ni1hZDFkLTQ5MGVmZmMzOTJlNiIsInVuaXF1ZV9uYW1lIjoiaGtAa2V2aW5odW8ub25taWNyb3NvZnQuY29tIiwidXBuIjoiaGtAa2V2aW5odW8ub25taWNyb3NvZnQuY29tIiwidXRpIjoiNlotcVJwSUJsRUtDUWJtOWZsY0JBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl0sInhtc19zdCI6eyJzdWIiOiJNLVQ1a09Vbk0wMEhMSlJTLVg2dkFJSG4wTG1yeVVWRG9uRmdOUXpkc0hvIn0sInhtc190Y2R0IjoxNTc4NjQwOTEyfQ.ItHelNUpChxkY1h-lsTXycZl9sMKlLI9Nj5583FHjVQK1iV6GPIXeUSvdI795OYt3HnhHC0xPhoIPVufOk871OGM0lEDENpfxfmuLHP9JA3pOSyImATOUTB6DVjENEQzJWxPRa-WM7hIALYwY-WtjtscxgmVTqyviNbLdujYAQEYh8QnmfgdXAwBriK2_2Ru_SCnVJrXzuiieLpl7lmrLLBvcKl16nynQynsl_AITMcWxneaHsp4xLC4MSbttKY8ET6ZnqJkxJqkCiOmraJNKJmVO1L1-fmmOvou0mrsKpklBSzwbRU1zu8yqjUQhzB4bOg9-QzxOqTgw7CVxfzinw"
    }
    """
    # 1 authZ_code
    authZ_code = session.get("authZ_code") if ("authZ_code" in session and session["authZ_code"] is not None) else "123code"

    # 2 url / headers / body
    post_req_url = global_var["azure_ad_token_endpoint"]
    post_req_header = {"Content-Type": global_var["access_token_post_request_content_type"]}
    post_req_body = {"client_id": global_var["client_id"],
                     "scope": session["scope"],
                     "code": authZ_code,
                     "redirect_uri": url_for(endpoint="azure/azure_ad_redirect_uri", _external=True),
                     "grant_type": global_var["grant_type"],
                     "client_secret": global_var["client_secret"]
                     }

    # 3 requests.post(注意, 由于Content-Type 不是 application/json, 所以不用对 req_body 做 json.dumps()操作.)
    resp_from_aad_token_endpoint = requests.post(url=post_req_url, data=post_req_body, headers=post_req_header).json()

    # 4 渲染html
    html = render_template("azure/GenerateAccessTokenReq.html",
                           post_req_url=post_req_url,
                           post_req_body=post_req_body,
                           response_dict=resp_from_aad_token_endpoint)
    res = make_response(html)
    res.status_code = 200
    return res

