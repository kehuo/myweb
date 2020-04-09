import React, { PureComponent } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Icon,
  Tooltip,
  Button,
  Card,
  Modal,
  message,
  Divider,
  Radio,
  Checkbox
} from "antd";
let underscore = require("underscore");
let Immutable = require("immutable");

import styles from "./Comment.less";

// 1 - constructor(props)
// 2 - render 函数
// 3 - componentWillReceiveProps 函数 (这是一个react的内置函数, 当this.props变化时会被调用)

// STEP 1 初始化进入 CommentList.js 页面的时, 就会触发 CommentPopup.js 的这个组件.
// 在调用 initData 之前 this:
// this= {"props":{"visible":false,"item":{}},"refs":{},"updater":{}}

// 调用 initData 之后:
// 初始化的 this = {"props": {"visible":false,"item":{}},
//                 "refs":{},
//                 "updater":{},
//                 "state":{"id":0,
//                          "comment_id":"",
//                          "creator":"",
//                          "content":"",
//                          "created_at":false}}
export default class CommentPopup extends React.Component {
  constructor(props) {
    // STEP 1
    super(props);
    console.log(
      "Popup.js constructor函数, initData之前 this= " + JSON.stringify(this)
    );
    this.state = this.initData(props.item);
    console.log(
      "Popup.js constructor函数, initData之后 this= " + JSON.stringify(this)
    );
  }

  // 第一次加载 CommentList.js page时, items = {} 空字典.
  // 当点击CmomentList.js 的按钮后, 从 pages/CommentList.js 的 items:
  // items = {"comment_id":"679718ff13c5541eb20a98acd022d934",
  //          "content":"测试文本",
  //          "created_at":"2020-04-08 20:55:17",
  //          "creator":"tmj",
  //          "id":1
  //         }
  initData(item) {
    console.log("popup.js, initData函数,  参数item=" + JSON.stringify(item));
    let newState = {
      id: 0,
      comment_id: "",
      creator: "",
      content: "",
      created_at: ""
    };
    if (item && item.id) {
      newState.id = item.id;
      newState.comment_id = item.comment_id;
      ewState.content = item.content;
      newState.creator = item.creator;
      newState.created_at = item.created_at;
    }
    return newState;
  }

  // 默认是 nextProps = {"visible": false, "item": {}}
  // 如果从 CommentList.js 中选择一条评论, 点击后, this.props 变了, 所以会调用该函数:
  // nextProps= {"visible":true,
  //             "item":{"comment_id":"679718ff13c5541eb20a98acd022d934",
  //                     "content":"hello, tmj is here 1!",
  //                     "created_at":"2020-04-08 20:55:17",
  //                     "creator":"tmj","id":1}
  //            }
  componentWillReceiveProps(nextProps) {
    // nextProps.item = [object, object] =
    console.log(
      "popup.js, componentWillReceiveProps函数 开始 (当前visible= " +
        JSON.stringify(nextProps.visible) +
        ")"
    );
    console.log("参数 nextProps= " + JSON.stringify(nextProps));
    let isSame = this.props.visible == nextProps.visible || !nextProps.visible;
    if (isSame) {
      return;
    }
    let newState = this.initData(nextProps.item);
    this.setState(newState, this.updateDepartments.bind(this));
  }

  // 如果是点 "新建评论" 并且输入内容点了 "确认":
  // 那么 this.state= {"id":0,
  //                  "comment_id":"",
  //                  "creator":"",
  //                  "content":"测试评论内容",
  //                  "created_at":false}

  // this.props= {"visible":true,"item":{"id":0,"name":""}}
  onSubmit(isUpdate) {
    console.log(
      "Popup.js, onSubmit函数, this.state= " + JSON.stringify(this.state)
    );
    console.log(
      "Popup.js, onSubmit函数, this.props= " + JSON.stringify(this.props)
    );
    const { id, comment_id, creator, content, created_at } = this.state;
    if (!this.props.onSubmit) {
      return;
    }
    if (!isUpdate) {
      this.props.onSubmit(false, null);
      return;
    }

    if (!content) {
      message.error("请检查评论内容是否正确填写!");
      return;
    }
    let x = {
      id: id,
      comment_id: comment_id,
      content: content,
      creator: creator,
      created_at: created_at
    };
    this.props.onSubmit(true, x);
  }

  onChange(tag, val) {
    let curState = this.state;
    if (["comment_id", "creator", "content", "created_at"].indexOf(tag) != -1) {
      curState[tag] = val.target.value;
    } else {
      curState[tag] = val;
    }
    let callback = null;
    // if (tag == "org_code") {
    //   callback = this.updateDepartments.bind(this);
    // }
    this.setState(curState, callback);
  }

  updateDepartments() {
    if (this.props.onSearchDepartment) {
      this.props.onSearchDepartment(this.state.org_code);
    }
  }

  // 第一次加载 CommentList.js 的页面时, this.state = 空
  // this.state = {"id":0,
  //               "comment_id":"",
  //               "creator":"",
  //               "content":"",
  //               "created_at":false}

  // 第一次加载 this.props = {"visible":false,"item":{}}
  render() {
    console.log(
      "进入popup的render函数, this.state=" + JSON.stringify(this.state)
    );
    console.log(
      "进入popup的render函数, this.props=" + JSON.stringify(this.props)
    );
    const { id, comment_id, creator, content, created_at } = this.state;
    const { visible, item } = this.props;
    //const { visible, roleOptions, orgOptions, departmentOptions } = this.props;
    let title = "新建评论";
    if (id) {
      title = "编辑评论";
    }
    return (
      <Modal
        title={title}
        visible={visible}
        closable={false}
        okText="确定"
        onOk={this.onSubmit.bind(this, true)}
        cancelText="取消"
        onCancel={this.onSubmit.bind(this, false)}
      >
        <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            内容:
          </Col>
          <Col span={16} offset={1}>
            <Input
              style={{ width: "100%" }}
              value={content}
              //onChange函数保证每输入一个字就动态更新 this.state.content字段
              onChange={this.onChange.bind(this, "content")}
            />
          </Col>
        </Row>
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            姓名:
          </Col>
          <Col span={16} offset={1}>
            <Input
              style={{ width: "100%" }}
              value={fullname}
              onChange={this.onChange.bind(this, "fullname")}
            />
          </Col>
        </Row> */}
      </Modal>
    );
  }
}
