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
  Tabs,
  Card,
  Collapse
} from "antd";

// 折叠板形式展示数据
const { Panel } = Collapse;

import ElementComponent from "../../../../Template/ElementComponent";
import { Tagger } from "../../../../MasterData/TaggingSub/Tagger";
import * as TUtils from "../../../../MasterData/TaggingSub/TaggingUtils";
import LosslessVectorTable from "../../../../ExamStandard/LosslessVectorTable";
//import NormalizedVectorTable from "./NormalizedVectorTable";

import styles from "./Section1.less";
let underscore = require("underscore");
import { routerRedux } from "dva/router";

// showAlgorithmsPage.js >> 里面设置了namespace = "showAlgorithmsSectionPage"
@connect(({ showAlgorithmsSectionPage }) => ({
  showAlgorithmsSectionPage
}))
export default class ShowAlgorithmsSectionPage extends ElementComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      taggerContent: null,
      lossless: null,
      normalized: null,
      touchIndex: -1
    };
  }

  componentDidMount() {
    // 下面这一段判断, 是因为这个页面本身是针对1个 exam standard 数据进行渲染的.
    // 所以会先看有没有 id, 如果没有, 则直接报错
    // 但是现在我把它改写成 渲染整个 算法导论某小节的内容, 不需要检查id
    // 所以我把它注释掉.
    // const { location, dispatch } = this.props;
    // let id = location.query.id;

    // if (!id) {
    //   message.error("无效id!");
    // }
    const { dispatch } = this.props;
    dispatch({
      type: "showAlgorithmsSectionPage/init",
      // 传给后台的参数: 第4部分 第 15 章 第1小节
      payload: {
        part: "4",
        chapter: "15",
        section: "1"
      }
      //callback: this.updateAll.bind(this)
    });
  }

  // 这里触发，返回所有检查报告列表的页面
  onReturnList() {
    let webPath = `/exam-standard/show-exam-report-list`;
    this.props.dispatch(routerRedux.push(webPath));
  }

  // data = 后台返回的 res["data"]
  // data = {"exam_standard":{"text": "肝脏正常,...", "target": [[tag1], [tag2], ..]}, "norm":[]}
  updateAll(data) {
    let taggerContent = {
      content: data["text"],
      label: JSON.stringify({
        entity: data["target"],
        parseWordsSeq: []
      })
    };

    this.setState({
      taggerContent: taggerContent,
      lossless: data.lossless,
      normalized: data.normalized
    });
  }

  onSelectPosFromTaggingView(idx) {
    this.setState({
      touchIndex: idx
    });
  }

  // 11-14 huoke注释: 该函数处理标签部分
  buildTagger() {
    console.log(
      "buildTagger函数开始, this.state= " + JSON.stringify(this.state)
    );
    console.log(
      "buildTagger函数开始, this.props中的section_page_data= " +
        JSON.stringify(this.props.showAlgorithmsSectionPage.section_page_data)
    );

    // const { taggerContent } = this.state;
    // if (!taggerContent) {
    //   return null;
    // }

    // return (
    //   <Card title="内容区" size="small">
    //     <div className="bbTable bbTable_tab2" style={{ marginTop: 10 }}>
    //       {/* 11-15周五注释 这个 bbTagger bbTagger-entity_0 就是空出来放标注好的文本的地方 */}
    //       <Tagger
    //         tag={"entity_0"}
    //         ref="taggerBB"
    //         data={taggerContent}
    //         tools={[]}
    //         defaultColor={"#ffcc00"}
    //         onChange={null}
    //         tagProps={TUtils.TagColorSetting}
    //         op="view"
    //         showColorSelector={true}
    //         tagStyle={{ tagPerLine: 4 }}
    //         onSelectView={this.onSelectPosFromTaggingView.bind(this)}
    //       />
    //     </div>
    //   </Card>
    // );
  }

  // 11-15 注释  该函数处理右下方部分
  onSelectVectorItem(entityOne) {
    let tags = entityOne.misc.tags;
    let rangePos = [tags[0][0], tags[0][1]];
    for (let i = 1; i < tags.length; i++) {
      let curT = tags[i];
      rangePos[0] = Math.min(curT[0], rangePos[0]);
      rangePos[1] = Math.max(curT[1], rangePos[1]);
    }
    this.refs["taggerBB"].drawEdgeHighlight(rangePos);
  }

  onShowAllEvents() {
    this.setState({
      touchIndex: -1
    });
  }

  buildVectorTable() {
    const { lossless, normalized, touchIndex } = this.state;
    if (!lossless || !normalized) {
      return null;
    }

    let extra = (
      <Button
        onClick={this.onShowAllEvents.bind(this)}
        style={{ marginLeft: 6 }}
        type="primary"
      >
        展示所有事件
      </Button>
    );

    return (
      <Card title="事件区" size="small" extra={extra}>
        <Tabs
          className="sdpTabs"
          type="card"
          animated={false}
          style={{ marginTop: 5 }}
        >
          <Tabs.TabPane tab="原始事件" key="lossless">
            <LosslessVectorTable
              tag="lossless"
              data={lossless}
              touchIndex={touchIndex}
              onSelectRow={this.onSelectVectorItem.bind(this)}
            />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="规范事件" key="normalized">
            <NormalizedVectorTable
              tag="normalized"
              data={normalized}
              touchIndex={touchIndex}
              onSelectRow={this.onSelectVectorItem.bind(this)}
            />
          </Tabs.TabPane> */}
        </Tabs>
      </Card>
    );

    // return (
    // 	// <Card title="事件区" size="small" extra={extra}>
    // 	<Card title="事件区" size="small">
    // 		<NormalizedVectorTable tag="normalized"
    // 			data={normalized}
    // 			touchIndex={touchIndex}
    // 			onSelectRow={this.onSelectVectorItem.bind(this)}
    // 		/>
    // 	</Card>
    // );
  }

  // 显示 标题 + overview + 伪代码 + 我自己的代码实现
  buildAlgorithmPage() {
    //console.log("buildTagger函数开始, this.state= " + JSON.stringify(this.state));
    //console.log("buildTagger函数开始, this.props中的section_page_data= " + JSON.stringify(this.props.showAlgorithmsSectionPage.section_page_data));

    const {
      part,
      chapter,
      main
    } = this.props.showAlgorithmsSectionPage.section_page_data;
    if (!part || !chapter || !main) {
      return null;
    }
    const page_title =
      "第" +
      part.num +
      "部分 / 第" +
      chapter.num +
      "章" +
      "/" +
      "第" +
      main.num +
      "节";
    return (
      // <Card title={page_title} size="small">
      //     <div>
      //         <p>{main.title}</p>
      //         <p>{main.content.overview}</p>
      //         {/* pre 标签可以让带\n换行符的代码, 以漂亮的方式(pretty)将代码展示在前端 */}
      //         <pre>{main.content.pseudo_code}</pre>
      //     </div>
      // </Card>
      // <h2>{page_title}</h2>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Overview" key="1">
          <pre>{main.content.overview}</pre>
        </Panel>
        <Panel header="Explanation of the algorithm" key="2">
          <p>Building...</p>
          <a href="https://github.com/kehuo/algorithms_py3/">
            See my code at Github
          </a>
        </Panel>
        <Panel header="Pseudo code" key="3">
          <pre>{main.content.pseudo_code[0]}</pre>
          <br />
          <pre>{main.content.pseudo_code[1]}</pre>
          <br />
          <pre>{main.content.pseudo_code[2]}</pre>
        </Panel>
        <Panel header="My code" key="4">
          <pre>{main.content.my_code[0]}</pre>
          <br />
          <pre>{main.content.my_code[1]}</pre>
          <br />
          <pre>{main.content.my_code[2]}</pre>
        </Panel>
        <Panel header="Test my code" key="5">
          <p>递归方案测试</p>
          <input placeholder="type an input here" />
          <button>Run (Building...)</button>
          <br />

          <p>自顶向下带备忘的 动态规划方案测试</p>
          <input placeholder="type an input here" />
          <button>Run (Building...)</button>
          <br />

          <p>自底向上的动态规划 方案测试</p>
          <input placeholder="type an input here" />
          <button>Run (Building...)</button>
        </Panel>
      </Collapse>
    );
  }

  render() {
    // section_page_data 里包含了一个页面所需要的所有信息, 按需要render到页面即可.
    const { section_page_data } = this.props.showAlgorithmsSectionPage;

    return (
      <div style={{ minWidth: 1000, backgroundColor: "white", padding: 20 }}>
        <Row>
          <h1>动态规划 - 钢条切割</h1>
          <Col span={12}>{this.buildAlgorithmPage()}</Col>
          {/* <Col span={12}>{this.buildTagger()}</Col>
          <Col span={12}>{this.buildVectorTable()}</Col> */}
        </Row>
      </div>
    );
  }
}
