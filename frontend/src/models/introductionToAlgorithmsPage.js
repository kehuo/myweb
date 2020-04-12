// 该文件处理 算法导论的 新页面 (顶部1个目录栏的版本. pages/IntroductionToAlgorithms/Page.js)
import {
  getAlgorithmsCatalog,
  getAlgorithmsMdPage
} from "@/services/introductionToAlgorithmsOps";

import { message } from "antd";

export default {
  namespace: "introductionToAlgorithms",

  // catalog: 目录json数据; md_content: 某一章节的具体.md文件数据
  state: {
    md: null,
    catalog: null
    // md_content: null
  },

  effects: {
    // init - 获取 home.md h
    *init({ payload, callback }, { call, put }) {
      //console.log("models-init开始, payload= " + JSON.stringify(payload));
      const response0 = yield call(getAlgorithmsMdPage, payload);
      if (!response0.code || response0.code != "SUCCESS") {
        message.error("获取算法导论 md 失败!");
        return;
      }
      // console.log("response0= " + JSON.stringify(response0))
      yield put({
        type: "saveMd",
        payload: response0.data
      });
    },
    // 获取 catalog.json
    *fetch_catalog({ payload, callback }, { call, put }) {
      const response1 = yield call(getAlgorithmsCatalog, payload);
      if (!response1.code || response1.code != "SUCCESS") {
        message.error("获取 算法导论目录 失败!");
        return;
      }
      yield put({
        type: "saveCatalog",
        payload: response1.data
      });
    }
    //   // 获取某一章节(section) 的 md
    //   *fetch_section_md({ payload, callback }, { call, put }) {
    //     const response2 = yield call(getAlgorithmsMdPage, payload);
    //     if (!response2.code || response2.code != "SUCCESS") {
    //       message.error("获取 算法导论某一章节 md 文件失败!");
    //       return;
    //     }
    //     yield put({
    //       type: "saveSectionMd",
    //       payload: response2.data
    //     });
    //   }
  },

  reducers: {
    // init 函数 - 存储 home.md
    // home_md 是一个字符串
    saveMd(state, action) {
      let payload = action.payload;
      //console.log("saveMd, payload= " + JSON.stringify(payload))
      return {
        ...state,
        md: payload
      };
    },

    // fetch_catalog - 存储算法导论目录
    // catalog 是一个字典
    saveCatalog(state, action) {
      let payload = action.payload;
      return {
        ...state,
        catalog: payload
      };
    },

    // fetch_section_md - 存储某一章节的md数据
    // section_md 是一个字符串
    saveSectionMd(state, action) {
      let payload = action.payload;
      return {
        ...state,
        section_md: payload
      };
    }
  }
};
