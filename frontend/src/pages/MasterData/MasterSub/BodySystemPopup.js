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
import ElementComponent from "../../Template/ElementComponent";

let underscore = require("underscore");
let Immutable = require("immutable");
let moment = require("moment");

import styles from "../MasterData.less";

export default class BodySystemPopup extends ElementComponent {
  constructor(props) {
    super(props);
    this.state = this.updateOne(props.item);
  }

  componentWillReceiveProps(nextProps) {
    let isSame = this.props.visible == nextProps.visible || !nextProps.visible;
    if (isSame) {
      return;
    }
    let newState = this.updateOne(nextProps.item);
    this.setState(newState);
  }

  updateOne(item) {
    let newState = {
      id: 0,
      name: "",
      code: "",
      source: "",
      description: "",
      english_name: ""
    };
    if (item && Object.keys(item).length > 0) {
      newState = {
        id: item.id,
        name: item.name,
        code: item.code,
        source: item.source,
        description: item.description,
        english_name: item.english_name
      };
    }
    return newState;
  }

  buildFormPart() {
    const lines = [
      {
        split: 24,
        items: [
          {
            layout: { title: 6, element: 16 },
            elementType: "input",
            title: "名称",
            tag: "name"
          }
        ]
      },
      {
        split: 24,
        items: [
          {
            layout: { title: 6, element: 16 },
            elementType: "input",
            title: "编码",
            tag: "code"
          }
        ]
      },
      {
        split: 24,
        items: [
          {
            layout: { title: 6, element: 16 },
            elementType: "input",
            title: "来源",
            tag: "source"
          }
        ]
      },
      {
        split: 24,
        items: [
          {
            layout: { title: 6, element: 16 },
            elementType: "input",
            title: "英文名称",
            tag: "english_name"
          }
        ]
      },
      {
        split: 24,
        items: [
          {
            layout: { title: 6, element: 16 },
            elementType: "textArea",
            title: "描述",
            tag: "description"
          }
        ]
      }
    ];
    return (
      <Card title="人体系统">{lines.map(this.renderLine.bind(this))}</Card>
    );
  }

  isValidateContent() {
    const { id, name, code, source, description, english_name } = this.state;
    let valid = true;
    let errMsg = [];
    if (!name) {
      errMsg.push("名称");
    }
    if (!code) {
      errMsg.push("编码");
    }
    if (!source) {
      errMsg.push("来源");
    }
    if (errMsg.length > 0) {
      valid = false;
    }
    return {
      valid: valid,
      errMsg: "请填写或选择" + errMsg.join(",")
    };
  }

  getContent() {
    const { id, name, code, source, description, english_name } = this.state;
    let x = {
      id: id,
      name: name,
      code: code,
      source: source,
      description: description,
      english_name: english_name
    };
    return x;
  }

  onSubmit(isUpdate) {
    if (!this.props.onSubmit) {
      return;
    }

    if (!isUpdate) {
      this.props.onSubmit(false, {});
      return;
    }

    let rst = this.isValidateContent();
    if (!rst.valid) {
      message.error(rst.errMsg);
      return;
    }

    let x = this.getContent();
    this.props.onSubmit(true, x);
  }

  render() {
    let title = "新建人体系统";
    if (this.state.id) {
      title = "编辑人体系统";
    }
    return (
      <Modal
        closable={false}
        title={title}
        visible={this.props.visible}
        onCancel={this.onSubmit.bind(this, false)}
        onOk={this.onSubmit.bind(this, true)}
      >
        {this.buildFormPart()}
      </Modal>
    );
  }
}
