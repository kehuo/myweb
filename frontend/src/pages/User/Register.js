import React, { Component } from "react";
import { connect } from "dva";
import { formatMessage, FormattedMessage } from "umi/locale";
import Link from "umi/link";
import router from "umi/router";
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from "antd";
import styles from "./Register.less";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  )
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects["register/submit"]
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86"
  };

  // this.props.register = {"status":{"code":"SUCCESS","data":{"id":15,"role_name":"enduser","user_id":"4c5517ed9b6f518f882027adbbee35c4","username":"gg"}}
  // this.props.submitting = true
  componentDidUpdate() {
    const { form, register } = this.props;
    //const account = form.getFieldValue("mail");

    // 这个 account 的作用, 是在 register-result 界面, 显示 "你的帐号 xxx 已经注册成功"
    // 如果你想显示 xxx 是邮箱, 那么就 form.getFieldValue("email");
    // 如果你想显示 xxx 是用户名, 那么 form.getFieldValue("name");
    // account = "huoke"
    const account = form.getFieldValue("name");

    //console.log("pages/Register.js componentDidUpdate 函数, this.props= "+ JSON.stringify(this.props))
    // 从 models.register.js 的reducer中, 已经将后台返回的 code 返回给this.props了

    //if (register.status === "ok") {
    if (register.status) {
      if (register.status.code === "SUCCESS") {
        router.push({
          pathname: "/user/register-result",
          state: {
            account
          }
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  // 点击 "submit" 按钮后, 将会调用 models/register.js 中的 submit 函数.
  // this.state = {"count":0,"confirmDirty":false,"visible":true,"help":"","prefix":"86"}
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      //console.log("err: " + JSON.stringify(err))
      //console.log("value: " + JSON.stringify(value))
      if (!err) {
        const { prefix } = this.state;
        // 很奇怪
        // form = {}
        // this.props.form = {}
        // this.state 也没有req body 的数据, 那数据如何传递到 models/register.js 的submit函数的？
        // 经过 console.log(value), 发现是 value 传递的, 但是value变量是如何拿到reqp body的呢?
        // 有待研究

        dispatch({
          type: "register/submit",
          payload: {
            ...values,
            prefix
          }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(formatMessage({ id: "validation.password.twice" }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: "validation.password.required" }),
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({
        help: ""
      });
      if (!visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback("error");
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>

        {/* 输入邮箱的地方 */}
        {/* 注意: */}
        {/* getFieldDecorator 里的值, 是post请求发出的req body 里的关键字. 比如:
        getFieldDecorator("useraccount", 那么post请求的req body 里就会有
        {"useraccount": xxx} */}

        {/* 所以, 由于后台必须填的post req body 是 name 和 password 2个字段, 所以只要这2个即可.
        当然, email 可填， 也可空 */}
        <Form onSubmit={this.handleSubmit}>
          {/* 输入用户名 */}
          <FormItem>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "form.useraccount.required" })
                }
                // {
                //   type: "useraccount",
                //   message: formatMessage({
                //     id: "validation.email.wrong-format"
                //   })
                // }
              ]
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: "form.useraccount.placeholder"
                })}
              />
            )}
          </FormItem>

          {/* 后台支持的字段是 email, 不是mail, 改过来: */}
          <FormItem>
            {/* {getFieldDecorator("mail", { */}
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "validation.email.required" })
                },
                {
                  type: "email",
                  message: formatMessage({
                    id: "validation.email.wrong-format"
                  })
                }
              ]
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: "form.email.placeholder" })}
              />
            )}
          </FormItem>

          {/* 输入密码 */}
          {/* 后台支持的 req body 字段是 password, 所以 getFieldDecorator("password" */}
          <FormItem help={help}>
            <Popover
              content={
                <div style={{ padding: "4px 0" }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: "form.password.placeholder"
                  })}
                />
              )}
            </Popover>
          </FormItem>

          {/* 第二次输入密码, 进行确认的地方 */}
          <FormItem>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "validation.confirm-password.required"
                  })
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: "form.confirm-password.placeholder"
                })}
              />
            )}
          </FormItem>

          {/* 手机号, 暂时不需要 */}
          {/* <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{ width: "20%" }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator("mobile", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: "validation.phone-number.required"
                    })
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: formatMessage({
                      id: "validation.phone-number.wrong-format"
                    })
                  }
                ]
              })(
                <Input
                  size="large"
                  style={{ width: "80%" }}
                  placeholder={formatMessage({
                    id: "form.phone-number.placeholder"
                  })}
                />
              )}
            </InputGroup>
          </FormItem> */}

          {/* 手机验证码, 暂时不需要 */}
          {/* <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: "validation.verification-code.required"
                      })
                    }
                  ]
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: "form.verification-code.placeholder"
                    })}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({
                        id: "app.register.get-verification-code"
                      })}
                </Button>
              </Col>
            </Row>
          </FormItem> */}

          {/* "注册" 按钮 */}
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>

            {/* 这个Link 是使用已有账户登陆 */}
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
