// import React from 'react'
import ReactDOM from "react-dom";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

// 3个图标, 在顶部导航栏使用
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";

const ReactMarkdown = require("react-markdown");

//const input = '# This is a header\n\nAnd this is a paragraph'

import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Menu,
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

const { SubMenu } = Menu;

@connect(({ introductionToAlgorithms }) => ({
  introductionToAlgorithms
}))
export default class IntroductionToAlgorithmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // current_menu_item_key 作用 - 按下顶部目录时, 更新当前menu.item 的 key
      current_menu_item_key: "1.1.1",
      part: "-1",
      chapter: "-1",
      section: "-1"

      // 以下3个参数的作用 - 请求后台某1章节的md文件时, 想后台发送这3个参数
    };
  }

  componentDidMount() {
    // 肯定要请求的是 fetchMdPageData
    // 仅第一次需要请求 fetchCatalogData, 即 this.props.introductionToAlgorithms.catalog 为空
    this.fetchMdPageData();

    if (!this.props.introductionToAlgorithms.catalog) {
      this.fetchCatalogData();
    }
  }

  // 构造get请求的query string 参数
  buildGetRequestQueryParams() {
    const { part, chapter, section } = this.state;
    let params = {
      part: part,
      chapter: chapter,
      section: section
    };
    return params;
  }

  // 请求后台 初始的数据 (比如目录文件catalog.json)
  fetchCatalogData() {
    const { dispatch } = this.props;
    dispatch({
      type: "introductionToAlgorithms/fetch_catalog",
      payload: this.buildGetRequestQueryParams()
    });
  }

  // 请求后台 某一章节的 md 数据 (返回的格式是 string 类型)
  fetchMdPageData() {
    const { dispatch } = this.props;
    dispatch({
      type: "introductionToAlgorithms/init",
      payload: this.buildGetRequestQueryParams()
    });
  }

  // 渲染md的核心函数
  buildMD() {
    const input = this.props.introductionToAlgorithms.md;
    // 页面初始化加载时, this.props 是空的, 所以为了避免 undeifned error, 有以下if的判断
    if (!input) {
      return null;
    }
    return <ReactMarkdown source={input} />;
  }

  str2array(raw_str) {
    // 功能函数 - 把 "1.2.3" 转成 ["1", "2", "3"]
    const array = raw_str.split(".");
    return array;
  }

  // 功能函数 - 在buildTopMenu函数中调用, 当点击顶部目录的某一个按钮后, 触发该函数
  handleClickCatalog = menu_item => {
    // menu_item 是一个字典 = {key: "section1", keyPath: ["chapter2", "part4"]}
    // menu_item.key = "part.chapter.section"
    const x = this.str2array(menu_item.key);
    this.setState(
      {
        part: x[0],
        chapter: x[1],
        section: x[2],
        current_menu_item_key: menu_item.key
      },
      // 因为setState是异步函数, 所以要在这里, 将fetchMdPageData作为回调函数
      // 下面这种方法, this.state的值就是最新的了, 不会有异步延迟的问题.
      this.fetchMdPageData.bind(this)
    );
  };

  test_single_section(curr_section_dict, part_idx, chapter_idx, section_idx) {
    // curr_section_dict = {"name": "xxxsection名字"}

    // curr_section_dict 作用 - 获取 content 值 = curr_section_dict["name"]
    // part_idx, chapter_idx, section_idx 作用:
    // 这3个值分别代表了 自己是第几部分, 第几章, 第几小节, 用来构造Menu组件的 title 和 key

    //console.log("buildSection函数, part_idx= " + part_idx + "### curr_chapter_idx= " + chapter_idx + "### curr_section_dict= " + section_idx + "curr_part_dict= " + JSON.stringify(curr_section_dict))

    const key = part_idx + "." + chapter_idx + "." + section_idx;
    const content = key + " -- " + curr_section_dict["name"];
    // content = "1.2.4 -- 快速排序原理"
    // key = "1.2.4" -- 代表 第1部分 第2章 第4小节
    return <Menu.Item key={key}>{content}</Menu.Item>;
  }

  test_single_chapter(curr_chapter_dict, part_idx, chapter_idx) {
    // curr_chapter_dict = {"name": xx,
    //                      "sections": {"1": {"name": "某节的名字"},
    //                                   "2": {"name": "某节的名字"}
    //                                  }
    //                     }

    // curr_chapter_dict 作用 - 循环遍历每一个 section, 放入all_sections
    // part_idx 和 chapter_idx 作用:
    // 代表了 自己是 第几章 第几部分, 用来构造 构造Menu组件的 title 和 key

    const all_sections = [];
    for (var k in curr_chapter_dict["sections"]) {
      // k = 第几小节
      // curr_section_dict = {"name": "xxxsection名字"}
      const curr_section_dict = curr_chapter_dict["sections"][k];
      all_sections.push(
        this.test_single_section(curr_section_dict, part_idx, chapter_idx, k)
      );
    }

    const title = "第" + chapter_idx + "章 -- " + curr_chapter_dict["name"];
    const key = part_idx + "." + chapter_idx;
    // key = "1.2" -- 代表 第一部分 第2章
    return (
      <Menu.ItemGroup title={title} key={key}>
        {all_sections}
      </Menu.ItemGroup>
    );
  }

  test_build_part(curr_part_dict, part_idx) {
    // curr_part_dict = {"name": xxx, "chapters": {"1": {}, "2": {}}}

    // curr_part_dict 作用 - 循环遍历每一个 chapter, 放入 all_chapters
    // part_idx 作用 - 这个值代表了 自己是第几部分, 所以用来构造SubMenu组件的 title 和 key

    const all_chapters = [];
    for (var k in curr_part_dict["chapters"]) {
      // k = 第几章
      // curr_chapter_dict = {"1": {"name": xx, "sections": {"1": {}, "2": {}}}}
      const curr_chapter_dict = curr_part_dict["chapters"][k];
      all_chapters.push(
        this.test_single_chapter(curr_chapter_dict, part_idx, k)
      );
    }

    const title = part_idx + " - " + curr_part_dict["name"];
    // const key = part_idx + 1;
    // key = "1"
    return (
      <SubMenu title={title} key={part_idx}>
        {all_chapters}
      </SubMenu>
    );
  }

  // 顶部的算法导论目录 导航栏
  // 官方文档 - https://ant.design/components/menu-cn/
  buildCatalog() {
    const c = this.props.introductionToAlgorithms.catalog;
    // 页面初始化加载时, this.props 是空的, 所以为了避免 undeifned error, 有以下if的判断
    if (!c) {
      return null;
    }

    const all_parts = [];
    // 对1-7个部分, 分别构建 <SubMentu> 导航栏组件
    // k="2", c[k]=某一章的子字典
    for (var k in c) {
      const curr_part_dict = c[k];
      // k = "1"
      // curr_part_dict = {"name": "xxx", "chapters": {"1": {}, "2": {}}}
      all_parts.push(this.test_build_part(curr_part_dict, k));
    }
    //console.log("selected key= " + this.state.current_menu_item_key)
    return (
      // selectedKeys 是默认选中 key = "section1.1" 那个 menu.item
      <Menu
        onClick={this.handleClickCatalog}
        mode="horizontal"
        selectedKeys={this.state.current_menu_item_key}
      >
        {all_parts}
      </Menu>
    );
  }

  render() {
    // md 交给 buildMD 函数
    // catalog 交给 buildCatalog 函数
    // const { md, catalog } = this.props.introductionToAlgorithms;
    //console.log("this.props.introductionToAlgorithms.catalog= " + JSON.stringify(catalog))

    return (
      <div
        style={{
          width: 1000,
          margin: "auto",
          backgroundColor: "white",
          padding: 20
        }}
      >
        {this.buildCatalog()}
        <br />
        {this.buildMD()}
      </div>
    );
  }
}
