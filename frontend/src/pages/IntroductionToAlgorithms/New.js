// import React from 'react'
import ReactDOM from "react-dom";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
const ReactMarkdown = require("react-markdown");

//const input = '# This is a header\n\nAnd this is a paragraph'

import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Input,
  Select,
  Icon,
  Table,
  Drawer,
  message,
  Button,
  Popconfirm
} from "antd";
//import ModelPopup from "./ModelPopup";

//import styles from "./Template.less";
//let underscore = require("underscore");

@connect(({ testMarkdownPage }) => ({
  testMarkdownPage
}))
export default class MarkdownPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //page: 1,
      //pageSize: 10,
      keyword: ""

      //showPopup: false,
      //hotOne: {}
    };
  }

  buildListQueryParams() {
    const { page, pageSize, keyword } = this.state;
    let params = {
      //   page: page,
      //   pageSize: pageSize,
      //   keyword: keyword
    };
    return params;
  }

  componentDidMount() {
    this.fetchListData();
  }

  onListPageChange(page, pageSize) {
    this.setState(
      {
        page: page,
        pageSize: pageSize
      },
      this.fetchListData.bind(this)
    );
  }

  // 请求后台 md 文件
  fetchListData() {
    const { dispatch } = this.props;
    dispatch({
      type: "testMarkdownPage/init",
      payload: this.buildListQueryParams()
    });
  }

  // 渲染md的核心函数
  buildMarkdownComponent() {
    //const input = '# This is a header\n\nAnd this is a paragraph';
    //console.log(this.props.testMarkdownPage.markdown_data)
    const input = this.props.testMarkdownPage.markdown_data;
    // 页面初始化加载时, this.props 是空的, 所以为了避免 undeifned error, 有以下if的判断
    if (!input) {
      return null;
    }
    return <ReactMarkdown source={input} />;
  }

  render() {
    const { markdown_data } = this.props.testMarkdownPage;
    //console.log("mardown_data in page: "+ JSON.stringify(markdown_data))

    return (
      <div
        style={{
          width: 1000,
          margin: "auto",
          backgroundColor: "white",
          padding: 20
        }}
      >
        {/* <button>test button</button> */}
        {this.buildMarkdownComponent()}
      </div>
    );
  }
}
