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
      { path: "/user/login", component: "./setting/Login" }
      //{ path: '/user/register', component: './User/Register' },
      //{ path: '/user/register-result', component: './User/RegisterResult' },
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

      // 算法导论
      {
        path: "/introduction-to-algorithms",
        name: "introduction-to-algorithms",
        icon: "team",
        routes: [
          // 第一部分
          {
            path: "/introduction-to-algorithms/part-1",
            name: "introduction-to-algorithms-part-1",
            routes: [
              // 第1章
              {
                path: "/introduction-to-algorithms/part-1/chapter-1",
                name: "introduction-to-algorithms-part-1-chapter-1",
                component: "./Welcome/Welcome"
              },

              // 第2章
              {
                path: "/introduction-to-algorithms/part-1/chapter-2",
                name: "introduction-to-algorithms-part-1-chapter-2",
                component: "./Welcome/Welcome"
              }
            ]
          },

          // 第二部分
          {
            path: "/introduction-to-algorithms/part-2",
            name: "introduction-to-algorithms-part-2",
            routes: [
              // 第1章
              {
                path: "/introduction-to-algorithms/part-2/chapter-6",
                name: "introduction-to-algorithms-part-2-chapter-6",
                component: "./Welcome/Welcome"
              },

              // 第2章
              {
                path: "/introduction-to-algorithms/part-2/chapter-7",
                name: "introduction-to-algorithms-part-2-chapter-7",
                component: "./Welcome/Welcome"
              }
            ]
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
            name: "comment-list",
            component: "./Comment/CommentList"
            //hideInMenu: true,
          },
          {
            path: "/comment/one",
            name: "comment-one",
            component: "./Comment/CommentPopup",
            hideInMenu: true
          }
        ]
      }
    ]
  }
];
