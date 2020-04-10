//import { fakeRegister } from "@/services/api";
// 弃用虚假注册, 改用真实注册
import { userRegister } from "@/services/userRegisterOps";

import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";

export default {
  namespace: "register",

  state: {
    status: null
  },

  // payload = {"name":"kevin","email":"123@123.com","password":"123123","confirm":"123123","prefix":"86"}
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(userRegister, payload);
      console.log(
        "models/register.js submit函数, 参数payload= " + JSON.stringify(payload)
      );
      if (!response.code || response.code != "SUCCESS") {
        console.log(
          "models/register.js submit函数, resp error " +
            JSON.stringify(response)
        );

        message.error("在model/register submit函数中, 注册普通新用户 失败!");
        return;
      }
      yield put({
        type: "registerHandle",
        payload: response
      });
    }
    // *submit({ payload }, { call, put }) {
    //   const response = yield call(fakeRegister, payload);
    //   yield put({
    //     type: "registerHandle",
    //     payload: response
    //   });
    // }
  },

  // payload = {"code":"SUCCESS",
  //            "data":{"id":11,
  //                    "role_name":"enduser",
  //                    "user_id":"dcae447cc9b45f05a33491bc46733250",
  //                    "username":"ae"}
  //           }
  reducers: {
    registerHandle(state, { payload }) {
      console.log(
        "modes/register.js reducers payload= " + JSON.stringify(payload)
      );

      // 后台会返回 role_name 字段, 将此字段设置给 setAuthority
      setAuthority(payload.data.role_name);
      //setAuthority("user");
      reloadAuthorized();
      return {
        ...state,
        status: payload
        //status: payload.status
      };
    }
  }
};
