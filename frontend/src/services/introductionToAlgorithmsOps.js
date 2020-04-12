import * as urls from "../utils/urls";
import request from "@/utils/request";

// GET 请求算法导论的 目录 catalog.json文件
// 格式 /introduction_to_algorithms/catalog
export async function getAlgorithmsCatalog(params) {
  let url = urls.getAlgorithmsCatalogUrl(params);
  return request(url);
}

// GET 请求算法导论的某一章节的具体 md 文件 (新版本)
// 格式 /introduction_to_algorithms/page?part=1&chapter=2&section=1
export async function getAlgorithmsMdPage(params) {
  let url = urls.getAlgorithmsMdPageUrl(params);
  return request(url);
}
