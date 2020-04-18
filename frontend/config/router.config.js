// 2020 年 4 月 6日 HUO Ke 注释.
// 该文件和 public/js/apiUrl.js, 以及 src/layouts/BasicLayout 的关系:
// 首先, 在这个 router.config.js 文件中, 定义你想添加的路由. 指定好 name / path / componenet 等信息.
// 然后 (很关键), 去 public/js/apiUrl.js, 把刚添加的路由的 parent 路由, 加到 window.moduleSupport 数组中.
// 至此. 你所做的事情就结束了.

// 接下来, BasicLayout.js 会调用 buildRoutes 方法, 遍历 apiUrl.js 中的 moduleSupport 数组.
// 并且会将 moduleSupport 中存在的 module 名, 和 src/locales/ch-ZH.js 中的中文名匹配上.
// 最后, 把这个 module 以及其下所有的子路由, 全部渲染到前端页面左边的 Dashboard 中.
// 这样, 你就可以在菜单栏中看到所有的路由了.

export default [
  // user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      //userInfo: 页面右上角的图标, 点一下个人信息后, 就是userInfo界面
      { path: "/user/userInfo", component: "./setting/UserInfo" },
      { path: "/user/login", component: "./setting/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  },

  // app
  {
    path: "/",
    component: "../layouts/BasicLayout",
    //Routes: ['src/pages/Authorized'],
    routes: [
      // 根路径重定向到 welcome 页面
      {
        path: "/",
        redirect: "/welcome"
      },

      // 首页
      {
        path: "/welcome",
        name: "welcome",
        icon: "home",
        component: "./Welcome/Welcome"
      },

      // 机器学习
      {
        path: "/ml",
        name: "ml",
        icon: "team",
        routes: [
          {
            path: "/ml/tagging",
            name: "tagging",
            component: "./MachineLearning/Tagging/Tagging"
          }
        ]
      },

      // Azure
      {
        path: "/azure",
        name: "azure",
        icon: "team",
        routes: [
          // azure oauth 请求 authroization code 的页面
          {
            path: "/azure/authorization-code",
            name: "authorization-code",
            // component: "./MachineLearning/Tagging/Tagging"
            component: "./Azure/AuthorizationCode/AuthorizationCode"
          },

          // azure ad 验证的重定向返回uri
          // 可以在这个页面选择 返回authroization code页面, 或者继续请求access token
          {
            path: "/azure/aad-redirect-uri",
            name: "aad-redirect-uri",
            component: "./Azure/AADRedirectUri/AADRedirectUri"
          },

          // azure oauth 请求 authroization code 的页面
          {
            path: "/azure/access-token",
            name: "access-token",
            component: "./MachineLearning/Tagging/Tagging"
          }
        ]
      },

      // 算法导论 (新)
      {
        path: "/introduction-to-algorithms",
        name: "introduction-to-algorithms",
        icon: "home",
        routes: [
          {
            path: "/introduction-to-algorithms/page",
            name: "page",
            component: "./IntroductionToAlgorithms/Page"
          }
        ]
      },

      // 用户评论页面
      {
        path: "/comment",
        name: "comment",
        icon: "home",
        //component: "./Comment/Comment"
        routes: [
          {
            path: "/comment/list",
            name: "list",
            component: "./Comment/CommentList"
            //hideInMenu: true,
          },
          {
            path: "/comment/one",
            name: "one",
            component: "./Comment/CommentPopup",
            hideInMenu: true
          }
        ]
      }
    ]
  }
];
