import React, { PureComponent } from "react";
import { connect } from "dva";
import { Input, Button, Form } from "antd";

import styles from "./AADRedirectUri.less";

const FormItem = Form.Item;

@connect(({ azureAuthorizationCode }) => ({
  azureAuthorizationCode
}))
@Form.create()
export default class AADRedirectUri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete_req_url: ""
    };
  }

  componentDidMount() {
    this.fetctReqData();
  }

  buildQueryParams() {
    const { page, pageSize } = this.state;
    let params = {
      page: page,
      pageSize: pageSize
    };
    return params;
  }

  fetctReqData() {
    const { dispatch } = this.props;
    dispatch({
      type: "azureAuthorizationCode/fetch",
      payload: this.buildQueryParams()
    });
  }

  // 点击 "submit" 按钮后, 将会调用 models/azureAuthorizationCode.js 中的 submit 函数.
  // this.state = {"complete_req_url": ""}
  // values 就是表单中, 用户输入的每一个字段的值 = {"req_endpoint": xxx, "scope": xxx, ...}
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log("err: ", err);
      console.log("value: ", values);
      if (!err) {
        console.log(
          "handleSubmit函数, complete_rul= ",
          this.state.complete_req_url
        );
        // 点击 form 的提交按钮后, 做3件事
        // 1 用values中的最新值, 拼出一个最新的 complete_url
        const A = values.req_endpoint;
        const B = values.client_id;
        const C = values.response_type;
        const D = values.redirect_uri;
        const E = values.response_mode;
        const F = values.scope;
        const G = values.state;
        const new_complete_req_url = A + "?" + B + C + D + E + F + G;
        console.log("新的url: ", new_complete_req_url);
        // 2 更新 this.state.complete_req_url
        // 3 将 build_complete_display_box 作为回调函数, 保证异步函数 setState 可以立刻执行
        this.setState(
          {
            complete_req_url: new_complete_req_url
          },
          this.build_complete_display_box.bind(this)
        );

        // dispatch({
        //   type: "azureAuthorizationCode/submit",
        //   payload: {
        //     ...values
        //   }
        // });
      }
    });
  };

  // 构造 form 表单
  buildForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const default_req_data = this.props.azureAuthorizationCode.req_data;

    if (!default_req_data) {
      return null;
    }

    const req_params = default_req_data.params;
    //console.log("req_params= " + JSON.stringify(req_params))
    return (
      <div className={styles.main}>
        <Form name="generate_authZ_code_form" onSubmit={this.handleSubmit}>
          <FormItem label="Authorize endpoint">
            {getFieldDecorator("req_endpoint", {
              initialValue: req_params.req_endpoint
            })(<Input placeholder="authorize endpoint" />)}
          </FormItem>

          <FormItem label="AppClientID">
            {getFieldDecorator("client_id", {
              initialValue: req_params.client_id
            })(<Input placeholder="app client id" />)}
          </FormItem>

          <FormItem label="ResponseType">
            {getFieldDecorator("response_type", {
              initialValue: req_params.response_type
            })(<Input placeholder="response type" />)}
          </FormItem>

          <FormItem label="AADRedirectUri">
            {getFieldDecorator("redirect_uri", {
              initialValue: req_params.redirect_uri
            })(<Input placeholder="aad redirect uri" />)}
          </FormItem>

          <FormItem label="ResponseMode">
            {getFieldDecorator("response_mode", {
              initialValue: req_params.response_mode
            })(<Input placeholder="response mode" />)}
          </FormItem>

          <FormItem label="Scope">
            {getFieldDecorator("scope", { initialValue: req_params.scope })(
              <Input placeholder="scope" />
            )}
          </FormItem>

          <FormItem label="State">
            {getFieldDecorator("state", { initialValue: req_params.state })(
              <Input placeholder="state" />
            )}
          </FormItem>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Click to Generate
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // 这个组件用来展示已经生成好的完整url
  build_complete_display_box() {
    console.log(
      "display函数开始, this.state.url= ",
      this.state.complete_req_url
    );
    // 先看 this.state, 若有, 则展示; 若没有, 则看this.props. 若有则展示, 没有就return null
    var complete_req_url = this.state.complete_req_url;
    if (!complete_req_url) {
      const req_data = this.props.azureAuthorizationCode.req_data;
      if (!req_data) {
        return null;
      } else {
        complete_req_url = req_data.complete_req_url;
      }
    }

    console.log(
      "build_complete_display_box函数, complete_req_url: ",
      complete_req_url
    );
    return (
      <div
        style={{
          width: 700,
          margin: "auto",
          backgroundColor: "white",
          padding: 20
        }}
      >
        <p>{complete_req_url}</p>
        <a href={complete_req_url}>Click to request authZ Code</a>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          width: 800,
          margin: "auto",
          backgroundColor: "white",
          padding: 20
        }}
      >
        {this.buildForm()}
        {this.build_complete_display_box()}
      </div>
    );
  }
}
