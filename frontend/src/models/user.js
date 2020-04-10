// import { query as queryUsers, queryCurrent } from '@/services/user';
import { getCurrentUser } from "@/services/userOps";
export default {
  namespace: "user",

  state: {
    // list: [],
    currentUser: {}
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = yield call(getCurrentUser);
      if (response && response.data) {
        let rsUser = response.data;
        let current = {
          status: true,
          id: rsUser.id,
          orgCode: rsUser.orgCode,
          currentAuthority: rsUser.roleName,
          userName: rsUser.name,
          //fullName: rsUser.fullName,
          realName: rsUser.real_name,
          email: rsUser.email,
          disabled: rsUser.disabled,
          roleId: rsUser.roleId
          //orgName: rsUser.orgName,
          //roleName: rsUser.roleName
        };

        //console.log("models/user fetchCurrent函数, response= " + JSON.stringify(response));
        yield put({
          type: "saveCurrentUser",
          payload: current
        });
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      // 页面加载时, 在BasicLayout.js中, componentDidMount 会请求 models/user.js
      // 也就是当前文件的 fetchCurrent 函数. 这个函数会请求后台 /get_current_user api.
      // 后台如果能从数据库找到, 那么返回正常结果:
      // res = {"code": "SUCCESS", "data": {"name": xxx, "email": xxx, "role_id": xxx}}
      // 但是如果失败, 后台会返回 res= {"code": "FAILURE", "message": "get current user failed"}
      // 这里的处理是: 如果没有后台, 那么返回一个空字典给 this.props.currentUser
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    }
  }
};
