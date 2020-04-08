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

export default class CommentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initData(props.item);
  }

  initData(item) {
    let newState = {
      id: 0,
      comment_id: "",
      creator: "",
      content: "",
      created_at: false
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

  componentWillReceiveProps(nextProps) {
    let isSame = this.props.visible == nextProps.visible || !nextProps.visible;
    if (isSame) {
      return;
    }
    let newState = this.initData(nextProps.item);
    this.setState(newState, this.updateDepartments.bind(this));
  }

  onSubmit(isUpdate) {
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

  render() {
    const { id, comment_id, creator, content, created_at } = this.state;
    const { visible } = this.props;
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
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            电子邮件:
          </Col>
          <Col span={16} offset={1}>
            <Input
              style={{ width: "100%" }}
              value={email}
              onChange={this.onChange.bind(this, "email")}
            />
          </Col>
        </Row> */}
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            密码:
          </Col>
          <Col span={16} offset={1}>
            <Input
              style={{ width: "100%" }}
              type="password"
              value={password}
              onChange={this.onChange.bind(this, "password")}
            />
          </Col>
        </Row> */}
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            角色:
          </Col>
          <Col span={16} offset={1}>
            <Select
              style={{ width: "100%" }}
              value={"" + role_id}
              placeholder="请选择角色"
              showArrow={false}
              filterOption={false}
              onChange={this.onChange.bind(this, "role_id")}
            >
              {roleOptions.map(o => (
                <Select.Option key={o.v}>{o.k}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row> */}
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            机构:
          </Col>
          <Col span={16} offset={1}>
            <Select
              style={{ width: "100%" }}
              value={"" + org_code}
              placeholder="请选择机构"
              showArrow={false}
              filterOption={false}
              onChange={this.onChange.bind(this, "org_code")}
            >
              {orgOptions.map(o => (
                <Select.Option key={o.v}>{o.k}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row> */}
        {/* <Row style={{ marginBottom: 6 }}>
          <Col span={6} style={{ textAlign: "right" }}>
            科室:
          </Col>
          <Col span={16} offset={1}>
            <Select
              style={{ width: "100%" }}
              value={"" + real_dept_id}
              placeholder="请选择科室"
              showArrow={false}
              filterOption={false}
              onChange={this.onChange.bind(this, "real_dept_id")}
            >
              {departmentOptions.map(o => (
                <Select.Option key={o.v}>{o.k}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row> */}
      </Modal>
    );
  }
}
