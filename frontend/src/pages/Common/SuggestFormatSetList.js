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
import SuggestFormatPopup from "./SuggestFormatPopup";

import styles from "./Common.less";
let underscore = require("underscore");

@connect(({ orgSuggestFormat }) => ({
  orgSuggestFormat
}))
export default class SuggestFormatSetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      keyword: "",

      showPopup: false,
      hotOne: {}
    };
  }

  buildListQueryParams() {
    const { page, pageSize, keyword } = this.state;
    let params = {
      page: page,
      pageSize: pageSize,
      keyword: keyword
    };
    return params;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "orgSuggestFormat/init",
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
      type: "orgSuggestFormat/fetch",
      payload: this.buildListQueryParams()
    });
  }

  editDataSource(record) {
    this.setState({
      showPopup: true,
      hotOne: record
    });
  }

  deleteDataSource(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "orgSuggestFormat/delete",
      payload: {
        updateParams: {
          id: record.id
        },
        queryParams: this.buildListQueryParams()
      }
    });
  }

  opRender(text, record, index) {
    let editOp = (
      <span
        className={styles.ListOpEdit}
        onClick={this.editDataSource.bind(this, record)}
        style={{ marginLeft: 16 }}
      >
        <Icon type="edit" theme="outlined" />
        编辑
      </span>
    );
    let deleteOp = (
      <span className={styles.ListOpDisable} style={{ marginLeft: 16 }}>
        <Popconfirm
          title="确定删除"
          onConfirm={this.deleteDataSource.bind(this, record)}
          onCancel={null}
        >
          <Icon type="delete" theme="outlined" />
          删除
        </Popconfirm>
      </span>
    );
    return (
      <div>
        {deleteOp}
        {editOp}
      </div>
    );
  }

  contentRender(text, record, index) {
    const NameMap = {
      examOrder: "检查推荐",
      prescription: "处方推荐",
      diagnosis: "诊断",
      referral: "转诊"
    };
    let xObj = JSON.parse(text);
    let names = [];
    for (let k in xObj) {
      let kCn = NameMap[k];
      if (!kCn) {
        names.push(k);
      }
      names.push(kCn);
    }
    let all = names.join(",");
    return all;
  }

  onKeywordChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  onKeywordSearch(value) {
    this.setState(
      {
        keyword: value,
        page: 1
      },
      this.fetchListData.bind(this)
    );
  }

  buildOpBar() {
    const { keyword } = this.state;
    return (
      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col span={8}>
          关键词:{" "}
          <Input.Search
            style={{ width: "70%" }}
            placeholder="input search text"
            onChange={this.onKeywordChange.bind(this)}
            onSearch={this.onKeywordSearch.bind(this)}
            value={keyword}
          />
        </Col>

        <Col span={4} offset={1}>
          <Button type="primary" onClick={this.onShowNewPopup.bind(this, null)}>
            新建机构配置
          </Button>
        </Col>
      </Row>
    );
  }

  onChange(tag, val) {
    let curState = this.state;
    let callback = null;
    curState[tag] = val;
    this.setState(curState, callback);
  }

  onShowNewPopup() {
    let x = {
      id: 0,
      name: "",
      content: ""
    };
    this.setState({
      showPopup: true,
      hotOne: x
    });
  }

  realEditDataSource(record) {
    const { dispatch } = this.props;
    dispatch({
      type: "orgSuggestFormat/edit",
      payload: {
        updateParams: record,
        queryParams: this.buildListQueryParams()
      }
    });
  }

  onSubmit(isUpdate, record) {
    let callback = null;
    if (isUpdate) {
      callback = this.realEditDataSource.bind(this, record);
    }
    this.setState(
      {
        showPopup: false,
        hotOne: record
      },
      callback
    );
  }

  render() {
    const {
      data,
      total,
      orgOpts,
      contentOptions
    } = this.props.orgSuggestFormat;
    const { page, pageSize, showPopup, hotOne } = this.state;
    const columns = [
      { dataIndex: "org_name", title: "机构" },
      {
        dataIndex: "content",
        title: "推荐数据配置",
        render: this.contentRender.bind(this)
      },
      { dataIndex: "id", title: "操作", render: this.opRender.bind(this) }
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
        <SuggestFormatPopup
          visible={showPopup}
          item={hotOne}
          onSubmit={this.onSubmit.bind(this)}
          orgOpts={orgOpts}
          contentOptions={contentOptions}
        />
      </div>
    );
  }
}
