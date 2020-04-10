import * as urls from "../utils/urls";
import request from "@/utils/request";

// GET 请求后台
// 格式 /introduction_to_algorithms/page?part=1&chapter=2&section=1
export async function getAlgorithmsSectionPage(params) {
  let url = urls.getAlgorithmsSectionPageUrl(params);
  return request(url);
}
