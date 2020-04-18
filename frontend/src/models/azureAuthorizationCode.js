import { getAzureAuthorizationCodeDefaultParams } from "@/services/azureAuthorizationCodeOps";
import { message } from "antd";
import { buildOptionsByTags } from "../utils/utils";

export default {
  namespace: "azureAuthorizationCode",

  //后台: res = {"code": "xxx",
  //            "data": {"params": {"xx": xx, "x": xx}, "complete_req_url": xxx}
  //                    }
  state: {
    req_data: null
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(
        getAzureAuthorizationCodeDefaultParams,
        payload
      );
      if (!response.code || response.code != "SUCCESS") {
        message.error("获取authorization code 请求参数失败");
        return;
      }

      yield put({
        type: "saveDefaultParams",
        payload: response.data
      });
    }

    // 按下表单的提交按钮后触发该函数 (暂时不处理, 因为我按下submit后, 不会向后台发任何请求)
    // 只是会在页面最底部, 生成一个 complete_req_url
    // *submit({ payload }, { call, put }) {
    //     const response = yield call(userRegister, payload);
    //     console.log(
    //       "models/register.js submit函数, 参数payload= " + JSON.stringify(payload)
    //     );
    //     if (!response.code || response.code != "SUCCESS") {
    //       console.log(
    //         "models/register.js submit函数, resp error " +
    //           JSON.stringify(response)
    //       );

    //       message.error("在model/register submit函数中, 注册普通新用户 失败!");
    //       return;
    //     }
    //     yield put({
    //       type: "registerHandle",
    //       payload: response
    //     });
    //   }
  },

  reducers: {
    saveDefaultParams(state, action) {
      let payload = action.payload;
      // payload = response.data = {"complete_req_url": xx, "params": {xxxx}}
      return {
        ...state,
        req_data: payload
      };
    }
  }
};
