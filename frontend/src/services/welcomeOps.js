import * as urls from "../utils/urls";
import request from "@/utils/request";

// 获取一些在 welcome 首页展示的数据, 很简单的一些信息
export async function getWelcomeData(params) {
  let url = urls.getWelcomeDataUrl(params);
  return request(url);
}

// 首页会提供一个娱乐功能, 可以发布评论
// export async function editDepartmentAIConfig(record) {
//     if (record.id == 0 || record.id == "0") {
//       let url = urls.getDepartmentAIConfigListUrl({});
//       return request(url, {
//         method: "POST",
//         body: {
//           data: record,
//           method: "post"
//         }
//       });
//     } else {
//       let url = urls.getDepartmentAIConfigOneUrl(record.id);
//       return request(url, {
//         method: "PUT",
//         body: {
//           data: record,
//           method: "put"
//         }
//       });
//     }
//   }

//   export async function deleteDepartmentAIConfig(record) {
//     let url = urls.getDepartmentAIConfigOneUrl(record.id);
//     return request(url, {
//       method: "DELETE",
//       body: {
//         method: "delete"
//       }
//     });
//   }
