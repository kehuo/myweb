// 11-14 huoke注释
// <1> 在 services 路径下新建了一个 examReporDemo.js 文件, 用来代替 services/trackAuthLogOps.js
// <2> 不需要 organizationOps 和 departmentOps， 全部注释掉

//import { getTrackAuthLogList } from '@/services/trackAuthLogOps';
import { getCommentList } from "@/services/commentOps";
// import { getOrganizationList } from '@/services/organizationOps';
// import { getDepartmentList } from '@/services/departmentOps';
import { message } from "antd";
// import { buildOptionsByTags } from '../utils/utils';

export default {
  //namespace 必须在整个前端项目唯一
  namespace: "commentList",

  state: {
    data: [],
    total: 0
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      // init函数的参数 payload, 是 src/pages/Comment.js 中传过来的.
      const response = yield call(getCommentList, payload);
      if (!response.code || response.code != "SUCCESS") {
        message.error("init评论数据列表失败!");
        return;
      }
      yield put({
        type: "saveList",
        payload: response.data
      });
    }

    // *fetch({ payload, callback }, { call, put }) {
    //   const response = yield call(getCommentList, payload);
    //   if (!response.code || response.code != "SUCCESS") {
    //     message.error("fetch检查报告列表失败!");
    //     return;
    //   }
    //   yield put({
    //     type: "saveList",
    //     payload: response.data
    //   });
    // }

    // 这里 effect 结束
  },

  // payload = flask 后端传来的json中的 data 部分.
  // 假设flask完整json是 res = {"code": "SUCCESS", "data": {"total": 3, "comments": [xxx, xxx, xxx]}}
  // 那么 payload = {"data": {"totao": 3, "comments": [xxx, xxx, xxx]}} 这一部分
  reducers: {
    saveList(state, action) {
      let payload = action.payload;
      return {
        ...state,
        data: payload.comments,
        total: payload.total
      };
    }
  }
};
