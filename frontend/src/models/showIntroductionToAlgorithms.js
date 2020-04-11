import { getMarkdownPage } from "@/services/testMarkdownPageOps";
import { message } from "antd";

export default {
  namespace: "showIntroductionToAlgorithms",

  state: {
    markdown_data: null
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      const response = yield call(getMarkdownPage, payload);
      if (!response.code || response.code != "SUCCESS") {
        message.error("获取后台 md 文件失败!");
        return;
      }
      yield put({
        type: "saveMarkdown",
        payload: response.data
      });
    }
  },

  reducers: {
    saveMarkdown(state, action) {
      let payload = action.payload;
      return {
        ...state,
        markdown_data: payload.mdcontent
      };
    }
  }
};
