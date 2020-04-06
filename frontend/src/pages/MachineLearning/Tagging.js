import React from "react";
import { connect } from "dva";
import { Row, Col, Card, Tabs, DatePicker, Divider } from "antd";
import Bar from "../../components/Charts/Bar";

let underscore = require("underscore");
import numeral from "numeral";
import { getTimeDistance } from "@/utils/utils";

import styles from "./Tagging.less";

@connect(({ mlTagging }) => ({
  mlTagging
}))
export default class Tagging extends React.Component {
  // buildTitle: 显示 Welcome to HUO Ke Website!
  // buildNumbers: 显示 Azure Demo / Machine Learning / Introductin to Algorithms
  render() {
    console.log("进入 tagging.js!");
    return (
      <div>
        <h1>Hello Tagging!</h1>
        <p>Coming Soon...</p>
      </div>
    );
  }
}
