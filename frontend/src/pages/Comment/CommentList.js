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
import CommentPopup from "./CommentPopup";

import styles from "./Comment.less";
import commentList from "../../models/commentList";
let underscore = require("underscore");

@connect(({ commentList }) => ({
  commentList
}))

// 1 CommmentList.js constructor
// this = {"props": {"history": {"length": 14, "action": "POP",
//                               "location": {"pathname": "/comment/list", "search": "", "hash": "", "query": {},
//                                            "key": "qbkgh2"}},
//                   "location": {"pathname": "/comment/list", "search": "", "hash": "", "query": {}, "key": "qbkgh2"},
//                   "match": {"path": "/comment/list", "url": "/comment/list", "isExact": true, "params": {}},
//                   "computedMatch": {"path": "/comment/list", "url": "/comment/list", "isExact": true, "params": {}},
//                   "route": {"path": "/comment/list", "name": "comment-list", "exact": true}, "children": null,
//                   "commentList": {"data": [], "total": 0}}, "refs": {}, "updater": {},
//         "state": {"page": 1, "pageSize": 10, "showPopup": false, "hotOne": {}}}
export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      page: 1,
      pageSize: 10,

      showPopup: false,
      hotOne: {}
    };
  }

  buildListQueryParams() {
    //const { page, pageSize } = this.state;

    // sortCol 和 sortOrder 是翻页时候用的
    const { page, pageSize, id, sortCol, sortOrder } = this.state;

    let params = {
      page: page,
      pageSize: pageSize
    };

    if (id) {
      params.id = id;
      if (sortCol) {
        params.sortCol = sortCol;
      }
      if (sortOrder) {
        params.sortOrder = sortOrder;
      }
    }

    return params;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/init",
      payload: this.buildListQueryParams()
    });
    console.log("didMount结束, this.props= " + JSON.stringify(this.props));
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

  fetchListData() {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/fetch",
      payload: this.buildListQueryParams()
    });
  }

  // 当点了 “编辑” 按钮时, 只是打开了 "编辑评论" 的小窗口, 并不是真正修改.
  // 所以这个叫 editComment, 而不是 realEditComment
  editComment(record) {
    console.log(
      "CommentList.js, editComment函数, this.state= " +
        JSON.stringify(this.state)
    );
    console.log(
      "CommentList.js, editComment函数, this.props= " +
        JSON.stringify(this.props)
    );
    this.setState({
      showPopup: true,
      hotOne: record
    });
  }

  disableComment(record, disabled) {
    const { dispatch } = this.props;
    record.disabled = disabled;
    dispatch({
      type: "commentList/edit",
      payload: {
        updateParams: record,
        queryParams: this.buildListQueryParams()
      }
    });
  }

  deleteComment(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/delete",
      payload: {
        updateParams: {
          id: record.id
        },
        queryParams: this.buildListQueryParams()
      }
    });
  }

  opRender(text, record, index) {
    let statusOp = (
      <span
        className={styles.ListOpDisable}
        onClick={this.disableComment.bind(this, record, 1)}
      >
        <Icon type="close-circle" theme="outlined" />
        禁用
      </span>
    );
    let editOp = (
      <span
        className={styles.ListOpEdit}
        onClick={this.editComment.bind(this, record)}
        style={{ marginLeft: 16 }}
      >
        <Icon type="edit" theme="outlined" />
        编辑
      </span>
    );
    let deleteOp = (
      <span className={styles.ListOpDelete} style={{ marginLeft: 16 }}>
        <Popconfirm
          title="确定删除"
          onConfirm={this.deleteComment.bind(this, record)}
          onCancel={null}
        >
          <Icon type="delete" theme="outlined" />
          删除
        </Popconfirm>
      </span>
    );
    // if (record.disabled == 1) {
    //   statusOp = (
    //     <span
    //       className={styles.ListOpEnable}
    //       onClick={this.disableComment.bind(this, record, 0)}
    //     >
    //       <Icon type="check-circle" theme="outlined" />
    //       启用
    //     </span>
    //   );
    // }
    return (
      <div>
        {statusOp}
        {deleteOp}
        {editOp}
      </div>
    );
  }

  // 这个组件就是 "新建评论" 按钮.
  // 在 buildBar 中:
  // this.state = {"page":1,"pageSize":10,"showPopup":false,"hotOne":{}}
  // this.props.commentList = {
  //   "commentList": {"data": [{"comment_id": "679718ff13c5541eb20a98acd022d934", "content": "hello, tmj is here 1!",
  //                             "created_at": "2020-04-08 20:55:17", "creator": "tmj", "id": 1},
  //                            {"comment_id": "1617f741688355bc8a032093b3abf50f", "content": "hello, hk is here 1!",
  //                             "created_at": "2020-04-08 21:24:40", "creator": "hk", "id": 2},
  //                            {"comment_id": "5114c14a73575729b8230e72e06511da", "content": "hello, hk is here new!",
  //                             "created_at": "2020-04-08 21:37:58", "creator": "hk", "id": 3}], "total": 3}}

  buildOpBar() {
    // 刚进入 buildOpBar 时, this.props.commentList 还是空
    console.log(
      "CommentList.js, buildOpBar函数, this.state= " +
        JSON.stringify(this.state)
    );
    console.log(
      "CommentList.js, buildOpBar函数, this.props= " +
        JSON.stringify(this.props)
    );
    return (
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col span={4} offset={1}>
          <Button type="primary" onClick={this.onShowNewPopup.bind(this, null)}>
            新建评论
          </Button>
        </Col>

        <Col span={4} offset={1}>
          <Button
            type="primary"
            onClick={this.onRefreshCommentList.bind(this, null)}
          >
            刷新页面
          </Button>
        </Col>
      </Row>
    );
  }

  onChange(tag, val) {
    let curState = this.state;
    curState[tag] = val;
    this.setState(curState);
  }

  // 按下 “新建评论” 的按钮后, 会触发这个函数 (和 buildOpBar 的this一样)
  // this.state= {"page":1,"pageSize":10,"showPopup":false,"hotOne":{}}
  // this.props = {
  //   "commentList": {"data": [
  //       {"comment_id": "679718ff13c5541eb20a98acd022d934", "content": "hello, tmj is here 1!",
  //        "created_at": "2020-04-08 20:55:17", "creator": "tmj", "id": 1},
  //       {"comment_id": "1617f741688355bc8a032093b3abf50f", "content": "hello, hk is here 1!",
  //        "created_at": "2020-04-08 21:24:40", "creator": "hk", "id": 2},
  //       {"comment_id": "5114c14a73575729b8230e72e06511da", "content": "hello, hk is here new!",
  //        "created_at": "2020-04-08 21:37:58", "creator": "hk", "id": 3}], "total": 3}}
  onShowNewPopup() {
    // 这里能popup的原理是: 调用了 this.setState, 将 showPopup 属性变成了true.
    // 同时, 在 <CommentPopup/> 组件中, 我们将 showPopup 值, 绑定到了 visible 上.
    // 所以, 当 showPopup 在当前函数中被手动改成 true 之后, this.props.visible 就变化了.
    // 所以, <CommentPopup/> 组件的 this.props 就检测到了变化.
    // 所以, 在 CommentPopup.js 中, react的内置函数 componentWillReceiveProps 函数就检测到了 this.props发生了变化.
    // 而且, componentWillReceiveProps 内置函数的触发原理就是 -- 当this.props变化时, 就会触发, 所以会Popup
    console.log(
      "CommentList.js, onShowNewPopup函数开始, this.state= " +
        JSON.stringify(this.state)
    );
    console.log(
      "CommentList.js, onShowNewPopup函数开始, this.props= " +
        JSON.stringify(this.props)
    );
    let x = {
      id: 0,
      name: ""
    };
    this.setState({
      showPopup: true,
      hotOne: x
    });
    console.log(
      "CommentList.js, onShowNewPopup函数结束, this.state= " +
        JSON.stringify(this.state)
    );
    console.log(
      "CommentList.js, onShowNewPopup函数结束, this.props= " +
        JSON.stringify(this.props)
    );
  }

  // 在onSubmit函数中, 如果 reocrd.comment_id == "", 那么是新建评论的操作
  realCreateComment(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/create",
      payload: {
        updateParams: record,
        queryParams: this.buildListQueryParams()
      }
    });
  }

  // 当onSubmit函数被调用时, 会将record传给这个函数.
  // 这个函数会回真正的和 models/commentList 交互, 发送请求给后台.
  realEditComment(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/edit",
      payload: {
        updateParams: record,
        queryParams: this.buildListQueryParams()
      }
    });
  }

  // 点击 “刷新页面”, 会请求 "models/fetch", 重新刷新页面
  // 其实不需要record, 但是为了保持格式和其他函数一致, 给了也无所谓
  onRefreshCommentList(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/fetch",
      payload: {
        updateParams: record,
        queryParams: this.buildListQueryParams()
      }
    });
  }

  // 在弹框中输入内容并确认后, 请求会在这里被发送到后台 (通过 realEditComment / realEditComment 函数)
  onSubmit(isUpdate, record) {
    // 当点 "确认"时, 会从 CommentPopup.js 的 onSubmit函数 回到当前CommentList.js的onSubmit函数.
    // 同时, 会携带在 CommentPopup.js 中输入的content内容, 存储在record.content中, 返回到这个函数中.
    let callback = null;
    if (isUpdate) {
      // 编辑已有评论
      if (record.comment_id) {
        // callback = this.realEditComment.bind(this, record);
        this.realEditComment.bind(this, record);
      }
      // 新建评论
      if (!record.comment_id) {
        // callback = this.realCreateComment.bind(this, record);
        this.realCreateComment.bind(this, record);
      }
    }

    this.setState(
      {
        showPopup: false,
        hotOne: record
      },
      callback
    );
  }

  handleTableChange(pagination, filters, sorter) {
    this.setState(
      {
        sortCol: sorter.columnKey,
        sortOrder: sorter.order
      },
      this.fetchListData.bind(this)
    );
  }

  render() {
    // 刚进入 render 的时候, this.props.commentList 其实还是空的
    // 我们继续追踪, 看看到底哪里开始, 将 models init 函数获取的值, 给到了 this.props
    const { data, total } = this.props.commentList;
    const { page, pageSize, showPopup, hotOne } = this.state;
    const columns = [
      { dataIndex: "id", title: "ID" },
      { dataIndex: "creator", title: "创建者" },
      { dataIndex: "content", title: "内容" },
      { dataIndex: "created_at", title: "评论时间" }
      //{ dataIndex: "id", title: "操作", render: this.opRender.bind(this) }
    ];
    // 页面有下脚的 换页按钮
    let pageOpts = {
      current: page,
      pageSize: pageSize,
      size: "small",
      total: total,
      onChange: this.onListPageChange.bind(this),
      onShowSizeChange: this.onListPageChange.bind(this)
    };
    return (
      <div
        style={{
          width: 1000,
          margin: "auto",
          backgroundColor: "white",
          padding: 20
        }}
      >
        {this.buildOpBar()}
        <Table
          columns={columns}
          dataSource={data}
          pagination={pageOpts}
          onChange={::this.handleTableChange}
        />
        {/* 以下就是 pages/CommentPopup.js, 下面的on_Submit 会将数据传递给Popup的组件. */}
        <CommentPopup
          visible={showPopup}
          item={hotOne}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}
