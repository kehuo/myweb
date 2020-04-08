import React from "react";
import { Router as DefaultRouter, Route, Switch } from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@tmp/history";
import RendererWrapper0 from "/Users/hk/dev/myweb/frontend/src/pages/.umi/LocaleWrapper.jsx";
import _dvaDynamic from "dva/dynamic";

const Router = require("dva/router").routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/user",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import("../../layouts/UserLayout"),
          LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/UserLayout").default,
    routes: [
      {
        path: "/user",
        redirect: "/user/login",
        exact: true
      },
      {
        path: "/user/userInfo",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import("../setting/UserInfo"),
              LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                .default
            })
          : require("../setting/UserInfo").default,
        exact: true
      },
      {
        path: "/user/login",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import("../setting/Login"),
              LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                .default
            })
          : require("../setting/Login").default,
        exact: true
      },
      {
        path: "/user/register",
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require("@tmp/dva").getApp(),
              models: () => [
                import("/Users/hk/dev/myweb/frontend/src/pages/User/models/register.js").then(
                  m => {
                    return { namespace: "register", ...m.default };
                  }
                )
              ],
              component: () => import("../User/Register"),
              LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                .default
            })
          : require("../User/Register").default,
        exact: true
      },
      {
        path: "/user/register-result",
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require("@tmp/dva").getApp(),
              models: () => [
                import("/Users/hk/dev/myweb/frontend/src/pages/User/models/register.js").then(
                  m => {
                    return { namespace: "register", ...m.default };
                  }
                )
              ],
              component: () => import("../User/RegisterResult"),
              LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                .default
            })
          : require("../User/RegisterResult").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import("../../layouts/BasicLayout"),
          LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/BasicLayout").default,
    routes: [
      {
        path: "/",
        redirect: "/welcome",
        exact: true
      },
      {
        path: "/welcome",
        name: "welcome",
        icon: "home",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import("../Welcome/Welcome"),
              LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                .default
            })
          : require("../Welcome/Welcome").default,
        exact: true
      },
      {
        path: "/ml",
        name: "ml",
        icon: "team",
        routes: [
          {
            path: "/ml/tagging",
            name: "tagging",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import("../MachineLearning/Tagging/Tagging"),
                  LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                    .default
                })
              : require("../MachineLearning/Tagging/Tagging").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        path: "/introduction-to-algorithms",
        name: "introduction-to-algorithms",
        icon: "team",
        routes: [
          {
            path: "/introduction-to-algorithms/part-1",
            name: "introduction-to-algorithms-part-1",
            routes: [
              {
                path: "/introduction-to-algorithms/part-1/chapter-1",
                name: "introduction-to-algorithms-part-1-chapter-1",
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import("../Welcome/Welcome"),
                      LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                        .default
                    })
                  : require("../Welcome/Welcome").default,
                exact: true
              },
              {
                path: "/introduction-to-algorithms/part-1/chapter-2",
                name: "introduction-to-algorithms-part-1-chapter-2",
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import("../Welcome/Welcome"),
                      LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                        .default
                    })
                  : require("../Welcome/Welcome").default,
                exact: true
              },
              {
                component: () =>
                  React.createElement(
                    require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                      .default,
                    { pagesPath: "src/pages", hasRoutesInConfig: true }
                  )
              }
            ]
          },
          {
            path: "/introduction-to-algorithms/part-2",
            name: "introduction-to-algorithms-part-2",
            routes: [
              {
                path: "/introduction-to-algorithms/part-2/chapter-6",
                name: "introduction-to-algorithms-part-2-chapter-6",
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import("../Welcome/Welcome"),
                      LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                        .default
                    })
                  : require("../Welcome/Welcome").default,
                exact: true
              },
              {
                path: "/introduction-to-algorithms/part-2/chapter-7",
                name: "introduction-to-algorithms-part-2-chapter-7",
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import("../Welcome/Welcome"),
                      LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                        .default
                    })
                  : require("../Welcome/Welcome").default,
                exact: true
              },
              {
                component: () =>
                  React.createElement(
                    require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                      .default,
                    { pagesPath: "src/pages", hasRoutesInConfig: true }
                  )
              }
            ]
          },
          {
            component: () =>
              React.createElement(
                require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        path: "/comment",
        name: "comment",
        icon: "home",
        routes: [
          {
            path: "/comment/list",
            name: "comment-list",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import("../Comment/CommentList"),
                  LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                    .default
                })
              : require("../Comment/CommentList").default,
            exact: true
          },
          {
            path: "/comment/one",
            name: "comment-one",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import("../Comment/CommentPopup"),
                  LoadingComponent: require("/Users/hk/dev/myweb/frontend/src/components/PageLoading/index")
                    .default
                })
              : require("../Comment/CommentPopup").default,
            hideInMenu: true,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        component: () =>
          React.createElement(
            require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: () =>
      React.createElement(
        require("/Users/hk/dev/myweb/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach("onRouteChange", {
        initialValue: {
          routes,
          location,
          action
        }
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf("callback(history.location, history.action)") > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
