import { getAlgorithmsSectionPage } from "@/services/introductionToAlgorithmsOps";
import { message } from "antd";

export default {
  // 因为算法导论的层级是 part / chapter / section
  // 所以 section 是最小层, 所以每次请求一个 section 的数据, 并渲染在 pages 页面中.
  namespace: "showAlgorithmsSectionPage",

  // 后台的格式 res = {"code": "SUCCESS", "data": {"xxx": "xxx"}}
  // 所以初始状态设置 data: {} 即可
  state: {
    section_page_data: {}
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      const response = yield call(getAlgorithmsSectionPage, payload);
      console.log("model收到的参数:" + JSON.stringify(payload));
      if (!response.code || response.code != "SUCCESS") {
        message.error(
          "在model/showAlgorithmsSectionPage init函数中, 获取 算法导论页面数据 失败!"
        );
        return;
      }
      //   if (response.data.lossless.length == 0) {
      //     return;
      //   }
      console.log("model函数获取到数据: " + JSON.stringify(response));
      //   if (callback) {
      //     callback(response.data);
      //   }

      yield put({
        type: "saveSectionPageData",
        payload: response.data
      });
    }
  },

  reducers: {
    saveSectionPageData(state, action) {
      let payload = action.payload;
      // 左边是前端定义的, 右边是后台返回的 response.data
      return {
        ...state,
        section_page_data: payload
      };
    }
  }
};
