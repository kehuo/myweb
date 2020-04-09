import * as urls from "../utils/urls";
import request from "@/utils/request";

// 该文件是用来处理 "用户评论" 所有的请求

// 获取所有的 comment list
export async function getCommentList(params) {
  let url = urls.getCommentListUrl(params);
  return request(url);
}

// 创建1条新评论
// record = {"updateParams": {"id": 0, "comment_id": "", "content": "123123123", "creator": "", "created_at": ""},
//           "queryParams": {"page": 1, "pageSize": 10}}
export async function createComment(record) {
  console.log(
    "services/createComment 函数, 参数 record= " + JSON.stringify(record)
  );
  let url = urls.createCommentUrl();
  // 请求后台的 req body = {"data": "content": "xxx"}
  return request(url, {
    method: "POST",
    body: {
      data: {
        content: record.updateParams.content
      },
      method: "post"
    }
  });
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
