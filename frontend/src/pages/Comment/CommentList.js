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
let underscore = require("underscore");

@connect(({ commentList }) => ({
  commentList
}))
export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,

      showPopup: false,
      hotOne: {}
    };
  }

  buildListQueryParams() {
    const { page, pageSize } = this.state;
    let params = {
      page: page,
      pageSize: pageSize
    };
    return params;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "commentList/init",
      payload: this.buildListQueryParams()
    });
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

  editComment(record) {
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

  buildOpBar() {
    return (
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col span={4} offset={1}>
          <Button type="primary" onClick={this.onShowNewPopup.bind(this, null)}>
            新建评论
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

  onShowNewPopup() {
    let x = {
      id: 0,
      name: ""
    };
    this.setState({
      showPopup: true,
      hotOne: x
    });
  }

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

  onSubmit(isUpdate, record) {
    let callback = null;
    if (isUpdate) {
      callback = this.realEditComment.bind(this, record);
    }
    this.setState(
      {
        showPopup: false,
        hotOne: record
      },
      callback
    );
  }

  //   onSearchDepartment(orgCode) {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: "userBB/queryDepartments",
  //       payload: {
  //         orgCode: orgCode,
  //         page: 1,
  //         pageSize: 200
  //       }
  //     });
  //   }

  render() {
    const { data, total } = this.props.commentList;
    const { page, pageSize, showPopup, hotOne } = this.state;
    const columns = [
      { dataIndex: "id", title: "ID" },
      { dataIndex: "creator", title: "创建者" },
      { dataIndex: "content", title: "内容" },
      { dataIndex: "created_at", title: "评论时间" }
      //{ dataIndex: "id", title: "操作", render: this.opRender.bind(this) }
    ];
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
        <Table columns={columns} dataSource={data} pagination={pageOpts} />
        <CommentPopup
          visible={showPopup}
          item={hotOne}
          onSubmit={this.onSubmit.bind(this)}
          //onSearchDepartment={this.onSearchDepartment.bind(this)}
          //roleOptions={roleOptions}
          //orgOptions={orgOptions}
          //departmentOptions={departmentOptions}
        />
      </div>
    );
  }
}
