import * as urls from "../utils/urls";
import request from "@/utils/request";

// 请求后台的一个 markdown 页面
export async function getMarkdownPage(params) {
  let url = urls.getMarkdownPageUrl(params);
  return request(url);
}
