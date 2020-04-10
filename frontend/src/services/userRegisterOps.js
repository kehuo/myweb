import * as urls from "../utils/urls";
import request from "@/utils/request";

// params = {"name":"kevin",
//           "email":"123@123.com",
//           "password":"123123",
//           "confirm":"123123",
//           "prefix":"86"}

// 后台支持的格式:
// req_body = {"data": {"name": xxx, "password", "email": "xxx"}}
export async function userRegister(params) {
  let url = urls.userRegisterUrl();

  // 重新包装一下 req_body
  const req_body = {
    name: params.name,
    password: params.password
  };

  // 如果客户填写了 email, 那么邮箱也写入 req body
  if (params.email) {
    req_body.email = params.email;
  }
  console.log("req body: " + JSON.stringify(req_body));
  return request(url, {
    method: "POST",
    // 按后台支持的格式提供请求 body
    body: {
      //...params,
      data: { ...req_body },
      method: "post"
    }
  });
}
