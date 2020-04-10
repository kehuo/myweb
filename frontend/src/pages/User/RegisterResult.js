import React from "react";
import { formatMessage, FormattedMessage } from "umi/locale";
import { Button } from "antd";
import Link from "umi/link";
import Result from "@/components/Result";
import styles from "./RegisterResult.less";

const actions = (
  <div className={styles.actions}>
    {/* 激活邮箱功能暂时没有, 所以先注释掉 */}

    {/* <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.view-mailbox" />
      </Button>
    </a> */}

    {/* 加了 type="primary" 后, 按钮颜色是蓝色*/}
    <Link to="/">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.back-sign-in-page" />
        {/* <FormattedMessage id="app.register-result.back-home" /> */}
      </Button>
    </Link>
  </div>
);

// location 就是从 pages/Register.js 的 componentDigUpdate 函数中, 传过来的.
// location.state.account = 传过来的 account = 用户注册的 name
const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="app.register-result.msg"
          values={{
            name: location.state.account
          }}
          // values={{
          //   email: location.state
          //     ? location.state.account
          //     : "AntDesign@example.com"
          // }}
        />
      </div>
    }
    // 激活邮箱的提示先注释掉.
    // description={formatMessage({ id: "app.register-result.activation-email" })}
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
