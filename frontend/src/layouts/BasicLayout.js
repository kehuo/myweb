import React from "react";
import { Layout } from "antd";
import DocumentTitle from "react-document-title";
import isEqual from "lodash/isEqual";
import memoizeOne from "memoize-one";
import { connect } from "dva";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import { enquireScreen, unenquireScreen } from "enquire-js";
import { formatMessage } from "umi/locale";
import SiderMenu from "@/components/SiderMenu";
import Authorized from "@/utils/Authorized";
import SettingDrawer from "@/components/SettingDrawer";
// 把logo改成了自己的 fire.logo
//import logo from '../assets/logo.svg';
import fire_logo from "../assets/fire_logo.png";
import Footer from "./Footer";
import Header from "./Header";
import Context from "./MenuContext";
import Exception403 from "../pages/Exception/403";
const { modulesSupport, hideL2Path } = global;
const { Content } = Layout;

// 函数的参数 routes, 就是 frontend/public/router.config.js 里定义的所有.
function buildRoutes(routes) {
  let realRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    let curR = routes[i];
    if (!curR.name) {
      realRoutes.push(curR);
      continue;
    }
    if (modulesSupport.indexOf(curR.name) != -1) {
      let curReal = JSON.parse(JSON.stringify(curR));
      let localHide = hideL2Path[curR.name];
      if (curR.routes && localHide) {
        curReal.routes = [];
        for (let k = 0; k < curR.routes.length; k++) {
          let routeOne = curR.routes[k];
          if (localHide.indexOf(routeOne.name) == -1) {
            curReal.routes.push(routeOne);
          }
        }
      }
      realRoutes.push(curReal);
    }
  }
  return realRoutes;
}

// Conversion router to menu.
function formatter(data, parentPath = "", parentAuthority, parentName) {
  return data
    .map(item => {
      let locale = "menu";
      if (parentName && item.name) {
        locale = `${parentName}.${item.name}`;
      } else if (item.name) {
        locale = `menu.${item.name}`;
      } else if (parentName) {
        locale = parentName;
      }
      if (item.path) {
        const result = {
          ...item,
          locale,
          authority: item.authority || parentAuthority
        };
        if (item.routes) {
          const children = formatter(
            item.routes,
            `${parentPath}${item.path}/`,
            item.authority,
            locale
          );
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      }

      return null;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    rendering: true,
    isMobile: false,
    menuData: this.getMenuData()
  };

  // BasicLayout 页面会在加载时, 请求后台的 get_current_user api.
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "user/fetchCurrent"
    });
    dispatch({
      type: "setting/getSetting"
    });
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile
        });
      }
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap
    };
  }

  // this.props.route = config/router.config.js 中所有的路由, 是一个数组
  // this.props.route = [
  // {"path": "/", "redirect": "/welcome", ....},
  // {"path": "/ml", "name": "ml", "routes": [...]},
  // ...
  //]
  getMenuData() {
    const {
      route: { routes }
    } = this.props;
    let realRoutes = buildRoutes(routes);
    return memoizeOneFormatter(realRoutes);
    // return memoizeOneFormatter(routes);
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      // return 'Ant Design Pro';
      // 这个暂时不知道哪里显示
      return "Kevin Huo";
    }
    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name
    });
    // return `${message} - Ant Design Pro`;
    // 这个是浏览器标签页显示的内容
    return `${message} - HUO Ke`;
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== "topmenu" && !isMobile) {
      return {
        paddingLeft: collapsed ? "80px" : "256px"
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: "24px 24px 0",
      paddingTop: fixedHeader ? 64 : 0
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if (
      (rendering || process.env.NODE_ENV === "production") &&
      APP_TYPE !== "site"
    ) {
      return null;
    }
    return <SettingDrawer />;
  }

  render() {
    // console.log(
    //   "BasicLayout.js, render函数, this.state= " + JSON.stringify(this.state)
    // );
    //console.log("BasicLayout.js, render函数, this.props.routes= " + JSON.stringify(this.props.route));
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname }
    } = this.props;
    const { isMobile, menuData } = this.state;
    const isTop = PropsLayout === "topmenu";
    const routerConfig = this.matchParamsPath(pathname);
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            //logo={logo}
            logo={fire_logo}
            Authorized={Authorized}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: "100vh"
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Authorized
              authority={routerConfig.authority}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {/*this.renderSettingDrawer()*/}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting
}))(BasicLayout);
