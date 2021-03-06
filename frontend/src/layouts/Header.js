import React, { PureComponent } from "react";
import { formatMessage } from "umi/locale";
import { Layout, message } from "antd";
import Animate from "rc-animate";
import { connect } from "dva";
import router from "umi/router";
import GlobalHeader from "@/components/GlobalHeader";
import TopNavHeader from "@/components/TopNavHeader";
import styles from "./Header.less";
import Authorized from "@/utils/Authorized";
import { routerRedux } from "dva/router";

// this.props.currentUser = {"status":true,
//                           "id":1,
//                           "userName":"hk",
//                           "fullName":"kevin",
//                           "email":"hkhuoke@hotmail.com",
//                           "disabled":0,
//                           "roleId":0}
const { Header } = Layout;
// class HeaderView extends PureComponent {
class HeaderView extends React.Component {
  state = {
    visible: true
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true
      };
    }
    return null;
  }

  // 加载BasicLayout 的Header时, BasicLayout 会把自己从后台请求到的 this.props.currentUser
  // 传递给当前的 Header.js 组件.
  componentDidMount() {
    const { currentUser } = this.props;
    document.addEventListener("scroll", this.handScroll, { passive: true });
    if (["admin", "support"].indexOf(currentUser.roleName) != -1) {
      this.getNoticeCount();
      setInterval(this.getNoticeCount.bind(this), 5 * 60 * 1000);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === "topmenu") {
      return "100%";
    }
    return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  };

  handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: "component.noticeIcon.cleared" })} ${formatMessage(
        { id: `component.globalHeader.${type}` }
      )}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: "global/clearNotices",
      payload: type
    });
  };

  // 右上角的小人头
  handleMenuClick = ({ key }) => {
    console.log(
      "当前src/layouts/Header.js. 进入右上角的小人头: " +
        JSON.stringify(this.props.currentUser)
    );
    console.log("参数key= " + JSON.stringify(key));
    const { dispatch } = this.props;
    if (key === "userCenter") {
      router.push("/account/center");
      return;
    }
    if (key === "triggerError") {
      router.push("/exception/trigger");
      return;
    }
    // 查看用户信息
    if (key === "userinfo") {
      // router.push('/account/settings/base');
      router.push("/user/userInfo");
      return;
    }
    // 增加注册的按钮
    if (key === "userinfo") {
      // router.push('/account/settings/base');
      router.push("/user/userInfo");
      return;
    }
    // 登出
    if (key === "logout") {
      const { currentUser } = this.props;
      dispatch({
        type: "login/logout",
        payload: {
          userName: currentUser.userName
        }
      });
    }
  };

  // handleNoticeVisibleChange = visible => {
  //   if (visible) {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'global/fetchNotices',
  //     });
  //   }
  // };

  getNoticeCount() {
    const { dispatch, currentUser } = this.props;
    dispatch({
      type: "global/fetchNotices",
      payload: {
        page: 1,
        pageSize: 1,
        status: "WAIT"
      }
    });
  }

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  // 右上角的小铃铛
  gotoNotification() {
    let webPath = "/notification";
    this.props.dispatch(routerRedux.push(webPath));
  }

  render() {
    const { isMobile, handleMenuCollapse, setting, noticeCount } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === "topmenu";
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width }}
        className={fixedHeader ? styles.fixedHeader : ""}
      >
        {/*isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            Authorized={Authorized}
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            count={count}
            gotoNotification={this.gotoNotification.bind(this)}
            {...this.props}
          />
        )*/}
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onNoticeClear={this.handleNoticeClear}
          onMenuClick={this.handleMenuClick}
          count={noticeCount}
          gotoNotification={this.gotoNotification.bind(this)}
          {...this.props}
        />
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices,
  noticeCount: global.noticeCount,
  setting
}))(HeaderView);
