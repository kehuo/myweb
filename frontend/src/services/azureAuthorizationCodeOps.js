import * as urls from "../utils/urls";
import request from "@/utils/request";

// 从后台获取默认的 请求 query string
export async function getAzureAuthorizationCodeDefaultParams(params) {
  let url = urls.getAzureAuthorizationCodeDefaultParamsUrl(params);
  return request(url);
}
