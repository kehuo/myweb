# @File: test_dunc
# @Author: Kevin Huo
# @LastUpdate: 4/9/2020 1:09 PM


def get_default_params_to_request_authorization_code(args, global_var):
    """
    该函数用来构造:
    请求 https://login/microsoftonline.com/common/OAuth2/V2.0/authorize 的完整请求url
    (GET 请求)
    """
    req_endpoint = global_var["azure_ad_authorize_endpoint"]
    client_id = global_var["client_id"]
    response_type = global_var["response_type"]
    redirect_uri = global_var["redirect_uri"]
    response_mode = global_var["response_mode"]
    scope = global_var["scope"]
    state = global_var["state"]

    query_string = "client_id=%s&response_type=%s&redirect_uri=%s&response_mode=%s&scope=%s&state=%s" % (
        client_id, response_type, redirect_uri, response_mode, scope, state
    )
    complete_req_url = req_endpoint + "?" + query_string
    res = {
        "code": "SUCCESS",
        "data": {
            "params": {
                "req_endpoint": req_endpoint,
                "client_id": client_id,
                "response_type": response_type,
                "redirect_uri": redirect_uri,
                "response_mode": response_mode,
                "scope": scope,
                "state": state
            },
            "complete_req_url": complete_req_url
        }
    }
    return res


def get_redirect_uri_display_content(args):
    """这是 azure ad 重定向过来的页面, 暂时不需要处理数据. 所以默认返回一个成功的信息即可"""
    res = {
        "code": "SUCCESS",
        "data": {"content": "this azure redirect uri page"}
    }
    return res
