// import { getDepartmentList } from "@/services/departmentOps";
// import { getOrganizationList } from "@/services/organizationOps";
// import { getOperatorList } from "@/services/operatorOps";
// import { getStatisticsInfo } from "@/services/statisticsOps";
import { message } from "antd";
import { buildOptionsByTags } from "../utils/utils";

import { getWelcomeData } from "@/services/welcomeOps";

// welcome.js 只需要向后台请求一个 api -- 获取welcome页面的数据: /get_welcome_data

// function buildWelcomeData(data, listXTag, listYTag, rankXTag, rankYTag) {
//   let dataList = buildOptionsByTags(
//     data.dataList,
//     listXTag,
//     listYTag,
//     "x",
//     "y",
//     true
//   );
//   let dataRank = buildOptionsByTags(
//     data.dataRank,
//     rankXTag,
//     rankYTag,
//     "title",
//     "total",
//     true
//   );
//   let x = {
//     dataList: dataList,
//     dataRank: dataRank
//   };
//   return x;
// }

export default {
  namespace: "welcome",
  // 这里的 welcomeData, 和最后的 reducer 里的welcomeData 是一样的.
  state: {
    welcomeData: {}

    // recordCount: {
    //   dataList: [],
    //   dataRank: []
    // },

    // operationTime: {
    //   dataList: [],
    //   dataRank: []
    // },

    // operationClick: {
    //   dataList: [],
    //   dataRank: []
    // },

    // numberOrganization: 0,
    // numberDepartment: 0,
    // numberOperator: 0

    // 这里 state 结束
  },

  // yield put 出来的 type 值, 需要和当前文件最下面 reducer 的key值相匹配.
  // payload: 就是后台api返回的json数据, 这个取决于后台的json的数据结构
  // 一般, 后台返回的数据都是 res = {"code": "SUCCESS", "data": "xxx": "xxx", "xxx": "xxx"} 这样
  effects: {
    *init({ payload, callback }, { call, put }) {
      // 注意, 这个 payload, 是 pages/Welcome/Welcome.js 传来的数据.
      // 如果请求后台需要携带一些 post req body, 或者 get string query, 就可以从 payload.params 中获取.
      // 目前 Welcome.js 传过来的 payload 是一个空字典.
      // let queryAll = {
      //   page: 1,
      //   pageSize: 1
      // };

      // HUO Ke website welcome data 请求
      // call 函数的第一个参数, 是 src/services/welcomeOps.js 中的一个函数, 比如 getWelcomeData 函数.
      // 后面所有的参数, 都会作为 getWelcomeData 的参数, 传入 getWelcomeData 函数.
      // 所以, 如果某个call 的函数不需要任何参数, 那call的时候, 只给call第一个参数即可.
      // 一般来说, 把 pages/Welcome/Welcome.js 传过来的 payload.params 给这个函数就够了.
      const response = yield call(getWelcomeData, payload.params);
      if (!response.code || response.code != "SUCCESS") {
        message.error("获取welcome页面数据失败!");
        return;
      }
      // 如果请求返回200 - 则将数据存在 reducer 的 saveWelcomeData 中.
      yield put({
        type: "saveWelcomeData",
        // payload = {"title": "Welcome to HUO Ke Website"}
        payload: response.data
      });

      // 请求1
      // const response0 = yield call(getOrganizationList, queryAll);
      // if (!response0.code || response0.code != "SUCCESS") {
      //   message.error("获取机构列表数据失败!");
      //   return;
      // }

      // yield put({
      //   type: "saveOrgCount",
      //   payload: response0.data.total
      // });

      // 请求2
      // const response1 = yield call(getDepartmentList, queryAll);
      // if (!response1.code || response1.code != "SUCCESS") {
      //   message.error("获取科室列表数据失败!");
      //   return;
      // }
      // yield put({
      //   type: "saveDeptCount",
      //   payload: response1.data.total
      // });

      // 请求3
      // const response2 = yield call(getOperatorList, queryAll);
      // if (!response2.code || response2.code != "SUCCESS") {
      //   message.error("获取医生列表数据失败!");
      //   return;
      // }
      // yield put({
      //   type: "saveOperatorCount",
      //   payload: response2.data.total
      // });

      // 请求4
      // const response = yield call(
      //   getStatisticsInfo,
      //   payload.opType,
      //   payload.params
      // );
      // if (!response.code || response.code != "SUCCESS") {
      //   message.error("获取统计数据失败!");
      //   return;
      // }
      // switch (payload.params.mode) {
      //   case "record_count":
      //     yield put({
      //       type: "saveRecordCountStat",
      //       payload: response.data
      //     });
      //     break;
      //   case "time_avg":
      //     yield put({
      //       type: "saveOperationTimeStat",
      //       payload: response.data
      //     });
      //     break;
      //   case "click_avg":
      //     yield put({
      //       type: "saveOperationClickStat",
      //       payload: response.data
      //     });
      //     break;
      //   default:
      //     break;
      // }

      // 这里 init 函数结束
    }

    // 由于 Welcome.js 目前暂不需要 fetch 函数, 所以暂时注释掉.
    // *fetchOperationData({ payload, callback }, { call, put }) {
    //   const response = yield call(
    //     getStatisticsInfo,
    //     payload.opType,
    //     payload.params
    //   );
    //   if (!response.code || response.code != "SUCCESS") {
    //     message.error("获取统计数据失败!");
    //     return;
    //   }

    //   switch (payload.params.mode) {
    //     case "record_count":
    //       yield put({
    //         type: "saveRecordCountStat",
    //         payload: response.data
    //       });
    //       break;
    //     case "time_avg":
    //       yield put({
    //         type: "saveOperationTimeStat",
    //         payload: response.data
    //       });
    //       break;
    //     case "click_avg":
    //       yield put({
    //         type: "saveOperationClickStat",
    //         payload: response.data
    //       });
    //       break;
    //     default:
    //       break;
    //   }

    // //这里 fetch 函数结束
    // }

    // 这里 effect 函数结束
  },

  reducers: {
    saveWelcomeData(state, action) {
      let payload = action.payload;
      // payload = {"title": "Welcome to HUO Ke Website"}
      // payload.title = "Welcome to HUO Ke Website"
      // console.log("saveWelcoeData.payload:" + payload.title)
      return {
        ...state,
        // welcomeData = {"title": "Welcome to HUO Ke Website"}
        welcomeData: payload
      };
    }
    // saveRecordCountStat(state, action) {
    //   let payload = action.payload;
    //   let x = buildWelcomeData(
    //     payload,
    //     "work_date",
    //     "record_count_sum",
    //     "disease_name",
    //     "record_count_sum"
    //   );
    //   return {
    //     ...state,
    //     recordCount: x
    //   };
    // },

    // saveOperationTimeStat(state, action) {
    //   let payload = action.payload;
    //   let x = buildWelcomeData(
    //     payload,
    //     "work_date",
    //     "operation_time_avg",
    //     "disease_name",
    //     "time_avg"
    //   );
    //   return {
    //     ...state,
    //     operationTime: x
    //   };
    // },

    // saveOperationClickStat(state, action) {
    //   let payload = action.payload;
    //   let x = buildWelcomeData(
    //     payload,
    //     "work_date",
    //     "operation_click_avg",
    //     "disease_name",
    //     "click_avg"
    //   );
    //   return {
    //     ...state,
    //     operationClick: x
    //   };
    // },

    // saveOrgCount(state, action) {
    //   let payload = action.payload;
    //   return {
    //     ...state,
    //     numberOrganization: payload
    //   };
    // },

    // saveDeptCount(state, action) {
    //   let payload = action.payload;
    //   return {
    //     ...state,
    //     numberDepartment: payload
    //   };
    // },

    // saveOperatorCount(state, action) {
    //   let payload = action.payload;
    //   return {
    //     ...state,
    //     numberOperator: payload
    //   };
    // }

    // 这里 reducer 结束
  }

  // 这是最开头的 export default 结束
};
