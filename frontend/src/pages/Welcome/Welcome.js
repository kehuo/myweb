import React from "react";
import { connect } from "dva";
import { Row, Col, Card, Tabs, DatePicker, Divider } from "antd";
import Bar from "../../components/Charts/Bar";

let underscore = require("underscore");
import numeral from "numeral";
import { getTimeDistance } from "@/utils/utils";

import styles from "./Welcome.less";

//***重要: 这里的2个 welcome, 都是 namespace, 和 models/welcome.js 的文件名无关.
// 换句话说, 如果文件名是 test.js, 但是文件中的 namespace 是 my_name_space, 那么这里应该是:
//@connect(({ my_name_space }) => ({
//  my_name_space
//}))

// 总之 -- 保证以下4个值相同, 就不会报错:
// src/models/welcome.js 中的 namaspace = "welcome";
// (当前文件 src/pages/Welcome/Welcome.js) 中下面这两个值, 必须和namespace一样, 也是 "welcome";
// 当前文件 buildNumbers 函数中, this.props.xxx, 这个 xxx 也必须和 namespace 一样, 是 this.props.welcome.
@connect(({ welcome }) => ({
  welcome
}))
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //rangePickerValue: getTimeDistance("month"),
      //tabKey: "record_count",
      //displayMode: "day"
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      // 这个 payload, 就是 src/models/welcome.js 中 init 函数的其中一个参数 payload.
      type: "welcome/init",
      payload: {
        //opType: "generate",
        //params: this.buildQueryParams()
      }
    });
  }

  // 如果你需要携带参数 params 请求后台, 那么这个函数可以定义params, 返回的x将作为params传到后台请求数据.
  // 因为 welcome 页面请求后台时不需要参数, 所以 let x = {} 空字典即可.
  buildQueryParams() {
    //const { rangePickerValue, tabKey, displayMode } = this.state;
    let x = {
      //start: rangePickerValue[0].format("YYYY-MM-DD"),
      //end: rangePickerValue[1].format("YYYY-MM-DD"),
      //mode: tabKey,
      //displayType: displayMode
    };
    return x;
  }

  // updateList() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: "userOperationStat/fetchOperationData",
  //     payload: {
  //       opType: "generate",
  //       params: this.buildQueryParams()
  //     }
  //   });
  // }

  // onChange(tag, val) {
  //   let callback = null;
  //   let curState = this.state;
  //   curState[tag] = val;
  //   if (tag == "tabKey") {
  //     callback = this.updateList.bind(this);
  //   }
  //   this.setState(curState, callback);
  // }

  // handleRangePickerChange(rangePickerValue) {
  //   this.setState(
  //     {
  //       rangePickerValue
  //     },
  //     this.updateList.bind(this)
  //   );
  // }

  // selectDate(type) {
  //   this.setState(
  //     {
  //       rangePickerValue: getTimeDistance(type)
  //     },
  //     this.updateList.bind(this)
  //   );
  // }

  // isActive(type) {
  //   const { rangePickerValue } = this.state;
  //   const value = getTimeDistance(type);
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return "";
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0], "day") &&
  //     rangePickerValue[1].isSame(value[1], "day")
  //   ) {
  //     return styles.aActive;
  //   }
  //   return styles.aInactive;
  // }

  // selectDisplayMode(mode) {
  //   this.setState(
  //     {
  //       displayMode: mode
  //     },
  //     this.updateList.bind(this)
  //   );
  // }

  // isActiveDisplayMode(mode) {
  //   if (mode == this.state.displayMode) {
  //     return styles.aActive;
  //   }
  //   return styles.aInactive;
  // }

  // 测试, 在这里, 使用后台 /api/v1/welcome/get_welcome_data 传回来的数据 作为 title.
  // 步骤:
  // <1> const {welcomeData} = this.props.welcome, 从 this.props 中读取相关数据.
  // <2> 在 <Row></Row>之间, 用 {welcomeData} 的方式, 调用这个数据.
  buildTitle() {
    console.log("this.props:");
    console.log(this.props.welcome);
    const { welcomeData } = this.props.welcome;
    return (
      <Row
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 32,
          fontWeight: "bold"
        }}
      >
        {welcomeData.title}
      </Row>
    );
  }

  // 注意，this.props.welcome 中的 "welcome", 是 src/models/welcome.js 中的 namespace 值.
  // 举例:
  // 如果 src/models/welcome.js 中的 namespace 值变成了 "testtest", 那么 这里要变成 this.props.testtest.
  // const {wecomeData} = this.props.welcome; 的含义:
  // <1> this.props.welcome 就等于 src/models/welcome.js 中 namespace = "welcome" 的模块传过来的数据.
  // <2> 因为 src/models/welcome.js 中, 保存了 welcomeData, 所以这里可以:
  // const {welcomeData} = this.props.welcome;
  buildNumbers() {
    const {
      welcomeData
      //numberOrganization,
      //numberDepartment,
      //numberOperator
    } = this.props.welcome;
    return (
      <Card bordered={false} style={{ marginTop: 10, marginBottom: 10 }}>
        {/* gutter是3个方块之间的距离. futter英文翻译:沟槽 */}
        <Row gutter={20} style={{ width: "100%", margin: 0, padding: 0 }}>
          <Col span={8}>
            <Card className={styles.numberCard}>
              <Row className={styles.numberCardTitle}>Azure Demo</Row>
              <Row className={styles.numberCardChildTitle}>
                OAuth2 Auhtorization Code
              </Row>
              <Row className={styles.numberCardChildTitle}>
                OAuth2 Access Token
              </Row>

              {/* <Row className={styles.numberCardNumber}>
                {numberOrganization}
              </Row> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card className={styles.numberCard}>
              <Row className={styles.numberCardTitle}>Machine Learning</Row>
              <Row className={styles.numberCardChildTitle}>NLP Tagging</Row>
              {/* <Row className={styles.numberCardNumber}>{numberDepartment}</Row> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card className={styles.numberCard}>
              <Row className={styles.numberCardTitle}>
                Introduction to Algorithms
              </Row>
              <Row className={styles.numberCardChildTitle}>基础知识</Row>
              <Row className={styles.numberCardChildTitle}>
                排序和顺序统计量
              </Row>
              <Row className={styles.numberCardChildTitle}>数据结构</Row>
              <Row className={styles.numberCardChildTitle}>
                高级设计和分析技术
              </Row>
              <Row className={styles.numberCardChildTitle}>高级数据结构</Row>
              <Row className={styles.numberCardChildTitle}>图算法</Row>
              <Row className={styles.numberCardChildTitle}>算法问题选编</Row>
              {/* <Row className={styles.numberCardNumber}>{numberOperator}</Row> */}
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }

  // listRender(item, i) {
  //   let y = i < 3 ? styles.active : "";
  //   let className = `${styles.rankingItemNumber} ${y}`;
  //   return (
  //     <li key={item.title}>
  //       <span className={className}>{i + 1}</span>
  //       <span className={styles.rankingItemTitle} title={item.title}>
  //         {item.title}
  //       </span>
  //       <span className={styles.rankingItemValue}>
  //         {numeral(item.total).format("0,0")}
  //       </span>
  //     </li>
  //   );
  // }

  // buildRecordCount() {
  //   const { recordCount } = this.props.userOperationStat;
  //   return (
  //     <Row>
  //       <Col xl={16} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesBar}>
  //           <Bar
  //             height={295}
  //             title="病历生成量趋势"
  //             data={recordCount.dataList}
  //           />
  //         </div>
  //       </Col>
  //       <Col xl={8} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesRank}>
  //           <h4 className={styles.rankingTitle}>诊断排名</h4>
  //           <ul className={styles.rankingList}>
  //             {recordCount.dataRank.map(this.listRender.bind(this))}
  //           </ul>
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // }

  // buildOperationTime() {
  //   const { operationTime } = this.props.userOperationStat;
  //   return (
  //     <Row>
  //       <Col xl={16} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesBar}>
  //           <Bar
  //             height={295}
  //             title="停留时间趋势"
  //             data={operationTime.dataList}
  //           />
  //         </div>
  //       </Col>
  //       <Col xl={8} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesRank}>
  //           <h4 className={styles.rankingTitle}>诊断排名</h4>
  //           <ul className={styles.rankingList}>
  //             {operationTime.dataRank.map(this.listRender.bind(this))}
  //           </ul>
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // }

  // buildOperationClick() {
  //   const { operationClick } = this.props.userOperationStat;
  //   return (
  //     <Row>
  //       <Col xl={16} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesBar}>
  //           <Bar
  //             height={295}
  //             title="操作次数趋势"
  //             data={operationClick.dataList}
  //           />
  //         </div>
  //       </Col>
  //       <Col xl={8} lg={12} md={12} sm={24} xs={24}>
  //         <div className={styles.salesRank}>
  //           <h4 className={styles.rankingTitle}>诊断排名</h4>
  //           <ul className={styles.rankingList}>
  //             {operationClick.dataRank.map(this.listRender.bind(this))}
  //           </ul>
  //         </div>
  //       </Col>
  //     </Row>
  //   );
  // }

  // buildOperationStatistics() {
  //   const { rangePickerValue, tabKey } = this.state;

  //   const dateExtra = (
  //     <Row style={{ marginBottom: 6 }}>
  //       <Col span={5}>
  //         <a
  //           className={this.isActive("week")}
  //           onClick={() => this.selectDate("week")}
  //         >
  //           最近一周&nbsp;&nbsp;
  //         </a>
  //         <a
  //           className={this.isActive("month")}
  //           onClick={() => this.selectDate("month")}
  //         >
  //           最近一月&nbsp;&nbsp;
  //         </a>
  //         <a
  //           className={this.isActive("year")}
  //           onClick={() => this.selectDate("year")}
  //         >
  //           最近一年
  //         </a>
  //       </Col>
  //       <Col span={1}>
  //         <Divider type="vertical" />
  //       </Col>
  //       <Col span={5}>
  //         <a
  //           className={this.isActiveDisplayMode("day")}
  //           onClick={() => this.selectDisplayMode("day")}
  //         >
  //           按天显示&nbsp;&nbsp;
  //         </a>
  //         <a
  //           className={this.isActiveDisplayMode("month")}
  //           onClick={() => this.selectDisplayMode("month")}
  //         >
  //           按月显示
  //         </a>
  //       </Col>
  //       <Col span={1}>
  //         <Divider type="vertical" />
  //       </Col>
  //       <Col span={6}>
  //         <DatePicker.RangePicker
  //           value={rangePickerValue}
  //           onChange={this.handleRangePickerChange.bind(this)}
  //           style={{ width: 256 }}
  //         />
  //       </Col>
  //     </Row>
  //   );

  //   return (
  //     <Card>
  //       {dateExtra}
  //       <Row className={styles.salesCard}>
  //         <Tabs
  //           size="large"
  //           tabPosition="left"
  //           tabBarStyle={{ marginBottom: 24 }}
  //           activeKey={tabKey}
  //           onChange={this.onChange.bind(this, "tabKey")}
  //         >
  //           <Tabs.TabPane tab="生成病历量" key="record_count">
  //             {this.buildRecordCount()}
  //           </Tabs.TabPane>
  //           <Tabs.TabPane tab="病历助手停留时间" key="time_avg">
  //             {this.buildOperationTime()}
  //           </Tabs.TabPane>
  //           <Tabs.TabPane tab="病历助手操作数" key="click_avg">
  //             {this.buildOperationClick()}
  //           </Tabs.TabPane>
  //         </Tabs>
  //       </Row>
  //     </Card>
  //   );
  // }

  // buildTitle: 显示 Welcome to HUO Ke Website!
  // buildNumbers: 显示 Azure Demo / Machine Learning / Introductin to Algorithms
  render() {
    return (
      <div
        style={{
          width: 1200,
          margin: "auto",
          backgroundColor: "transparent",
          padding: 20
        }}
      >
        {this.buildTitle()}
        {this.buildNumbers()}
        {/* {this.buildOperationStatistics()} */}
      </div>
    );
  }
}
