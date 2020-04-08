import * as urls from "../utils/urls";
import request from "@/utils/request";

// 该文件是用来处理 "用户评论" 所有的请求

// 新建的函数1 > 获取所有的 comment list
export async function getCommentList(params) {
  let url = urls.getCommentListUrl(params);
  return request(url);
}


// 以下4个是原有的
// export async function getTrackAuthLogList(params) {
// 	let url = urls.getTrackAuthLogListUrl(params);
// 	return request(url);
// }

// export async function getTrackAuthLogOne(record) {
// 	let url = urls.getTrackAuthLogOneUrl(record.id);
// 	return request(url);
// }

// export async function getTrackAuthLogCompare(params) {
// 	let url = urls.getTrackAuthLogCompareUrl(params);
// 	return request(url);
// }

// export async function getTrackAuthLogOneNlp(params) {
// 	let url = urls.getTrackAuthLogOneNlpUrl(params);
// 	return request(url);
// }
