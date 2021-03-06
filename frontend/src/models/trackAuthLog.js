import {
  getTrackAuthLogList,
  getTrackAuthLogOne,
  getTrackAuthLogCompare
} from "@/services/trackAuthLogOps";
import { getDepartmentList } from "@/services/departmentOps";
import { getOrganizationList } from "@/services/organizationOps";
import { message } from "antd";
import { buildOptionsByTags } from "../utils/utils";

export default {
  namespace: "trackAuthLog",

  state: {
    data: [],
    total: 0,

    orgOpts: [],
    deptOpts: [],
    detailOne: {}
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      const response0 = yield call(getOrganizationList, {
        page: 1,
        pageSize: 1000
      });
      if (!response0.code || response0.code != "SUCCESS") {
        message.error("获取机构列表数据失败!");
        return;
      }

      yield put({
        type: "saveOrg",
        payload: response0.data
      });
    },

    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(getTrackAuthLogList, payload);
      if (!response.code || response.code != "SUCCESS") {
        message.error("获取修改日志列表数据失败!");
        return;
      }

      yield put({
        type: "saveList",
        payload: response.data
      });
    },

    *getOne({ payload, callback }, { call, put }) {
      const rs0 = yield call(getTrackAuthLogOne, payload);
      if (!rs0.code || rs0.code != "SUCCESS") {
        message.error("获取修改日志失败!");
        return;
      }

      yield put({
        type: "saveOne",
        payload: rs0.data
      });

      if (callback) {
        callback();
      }
    },

    *queryDepartment({ payload, callback }, { call, put }) {
      const response = yield call(getDepartmentList, payload);
      if (!response.code || response.code != "SUCCESS") {
        message.error("获取科室数据失败!");
        return;
      }

      yield put({
        type: "saveDepartment",
        payload: response.data
      });
    },

    *compare({ payload, callback }, { call, put }) {
      const rs0 = yield call(getTrackAuthLogCompare, payload);
      if (!rs0.code || rs0.code != "SUCCESS") {
        message.error("获取日志差异失败!");
        return;
      }

      if (callback) {
        callback(rs0.data);
      }
    }
  },

  reducers: {
    saveList(state, action) {
      let payload = action.payload;
      return {
        ...state,
        data: payload.items,
        total: payload.total
      };
    },

    saveOrg(state, action) {
      let payload = action.payload;
      return {
        ...state,
        orgOpts: buildOptionsByTags(payload.orgs, "name", "code")
      };
    },

    saveDepartment(state, action) {
      let payload = action.payload;
      let opts = [];
      for (let i = 0; i < payload.departments.length; i++) {
        let curD = payload.departments[i];
        opts.push({
          k: curD.name + "-" + curD.code,
          v: curD.code
        });
      }
      return {
        ...state,
        deptOpts: opts
      };
    },

    saveOne(state, action) {
      let payload = action.payload;
      return {
        ...state,
        detailOne: payload
      };
    }
  }
};
