import * as urls from "../utils/urls";
import request from "@/utils/request";

export async function getVDPackageList(params) {
  let url = urls.getVDPackageListUrl(params);
  return request(url);
}

export async function editVDPackage(record) {
  if (record.id == 0 || record.id == "0") {
    let url = urls.getVDPackageListUrl();
    return request(url, {
      method: "POST",
      body: {
        data: record,
        method: "post"
      }
    });
  } else {
    let url = urls.getVDPackageOneUrl(record.id);
    return request(url, {
      method: "PUT",
      body: {
        data: record,
        method: "put"
      }
    });
  }
}

export async function deleteVDPackageOne(record) {
  let url = urls.getVDPackageOneUrl(record.id);
  return request(url, {
    method: "DELETE",
    body: {
      method: "delete"
    }
  });
}

export async function getVDPackageOne(id) {
  let url = urls.getVDPackageOneUrl(id);
  return request(url);
}
