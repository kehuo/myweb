import React, { Fragment } from "react";
import { Layout, Icon } from "antd";
import GlobalFooter from "@/components/GlobalFooter";

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        // {
        //   key: 'Pro 首页',
        //   title: 'Pro 首页',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <Icon type="github" />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
        {
          // key 不会显示, title 才是显示在页面底部的文字
          key: "HUO Ke",
          title: "hkhuoke@hotmail.com",
          //href: "http://www.basebit.me",
          blankTarget: true
        }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2020 - 2021 HUO Ke
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
