// 11-14 huoke注释
// <1> 在 services 路径下新建了一个 examReporDemo.js 文件, 用来代替 services/trackAuthLogOps.js
// <2> 不需要 organizationOps 和 departmentOps， 全部注释掉

//import { getTrackAuthLogList } from '@/services/trackAuthLogOps';
import { getCommentList, createComment } from "@/services/commentOps";
// import { getOrganizationList } from '@/services/organizationOps';
// import { getDepartmentList } from '@/services/departmentOps';
import { message } from "antd";
// import { buildOptionsByTags } from '../utils/utils';

export default {
  //namespace 必须在整个前端项目唯一
  namespace: "commentList",

  // 该state, 会在 CommentList.js 第一次加载时, 被赋值给 CommentList.js中的 this.props.commentList
  // this.props.commentList = {"data": [], "total": 0}
  state: {
    data: [],
    total: 0
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      // init函数的参数 payload, 是 src/pages/Comment.js 中传过来的.
      console.log(
        "models/commentList, init 函数中, payload= " + JSON.stringify(payload)
      );
      const response = yield call(getCommentList, payload);
      if (!response.code || response.code != "SUCCESS") {
        message.error("init所有评论列表失败!");
        return;
      }
      // console.log(
      //   "models/commentList, init 函数请求后台完成, response= " +
      //     JSON.stringify(response)
      // );
      // 假如CommentList.js call 了 init 函数, 那么init函数会将 saveList 存储的数据返回给 CommentList.js 的 this.props.
      yield put({
        type: "saveList",
        payload: response.data
      });
    },

    // CommentPopup.js 在重新加载所有评论时， 会调用 fetch 函数
    *fetch({ payload, callback }, { call, put }) {
      // console.log(
      //   "models/commentList, fetch 函数中, payload= " + JSON.stringify(payload)
      // );
      const response = yield call(getCommentList, payload);
      // console.log("commentList.js fetch响应: " + response.code);
      if (!response.code || response.code != "SUCCESS") {
        message.error("fetch评论列表失败!");
        return;
      }
      // 这里, models/init 函数会把后台返回的
      yield put({
        type: "saveList",
        payload: response.data
      });
    },

    // CommentPopup.js onSubmit函数中 在新建1条评论时， 会调用 create 函数
    // payload = {"updateParams": {"id": 0, "comment_id": "", "content": "123123", "creator": "", "created_at": ""},
    //        "queryParams": {"page": 1, "pageSize": 10}}
    *create({ payload, callback }, { call, put }) {
      console.log(
        "models/commentList, create 函数中, payload= " + JSON.stringify(payload)
      );
      const response = yield call(createComment, payload);
      console.log("commentList.js create 响应: " + response.code);
      if (!response.code || response.code != "SUCCESS") {
        message.error("创建评论失败!");
        return;
      }
      yield put({
        type: "saveCreateCommentResponse",
        payload: response.data
      });
    },

    // CommentPopup.js onSubmit函数中, 在编辑已有评论时， 会调用 fetch 函数
    *edit({ payload, callback }, { call, put }) {
      console.log(
        "models/commentList, edit 函数中, payload= " + JSON.stringify(payload)
      );
      const response = yield call(getCommentList, payload);
      console.log("commentList.js edit响应: " + response.code);
      if (!response.code || response.code != "SUCCESS") {
        message.error("删除评论失败!");
        return;
      }
      yield put({
        type: "saveEditCommentResponse",
        payload: response.data
      });
    }

    // 这里 effect 结束
  },

  // payload = flask 后端传来的json中的 data 部分.
  // 假设flask完整json是 res = {"code": "SUCCESS", "data": {"total": 3, "comments": [xxx, xxx, xxx]}}
  // 那么 payload = {"data": {"totao": 3, "comments": [xxx, xxx, xxx]}} 这一部分
  reducers: {
    // 存储 "获取所有评论列表" 的数据
    saveList(state, action) {
      let payload = action.payload;
      // console.log(
      //   "models/init 函数, saveList 存储的数据 payload= " +
      //     JSON.stringify(payload)
      // );
      // 这里return是给 CommentList.js 的this.props, 即:
      // this.props = {"data": 这return的data, "total": 这return的total}
      return {
        ...state,
        data: payload.comments,
        total: payload.total
      };
    },

    // 存储 "新建" 一条评论后, 后台返回的数据 (一般是 {"code": "SUCCESS", "data": {"id": 1}})
    saveCreateCommentResponse(state, action) {
      let payload = action.payload;
      // creator: 后台返回的 creator
      // id: 后台返回的 coment表中的 id (注意, 不是comment_id, 而是 id)
      return {
        ...state,
        creator: payload.creator,
        id: payload.id
      };
    },

    // 存储 "编辑" 一条已有的评论后, 后台返回的数据 (一般是 {"code": "SUCCESS", "data": {"id": 1}})
    saveEditCommentResponse(state, action) {
      let payload = action.payload;
      return {
        ...state,
        editor: payload.editor,
        id: payload.id
      };
    }
  }
};
