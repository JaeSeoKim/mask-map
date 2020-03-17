import React, { useState, useEffect } from "react";
import { Card, message, Button } from "antd";
import InfinityScroll from "../action/InfinityScroll";
import useDisasterMsgAPI from '../action/useDisasterMsgAPI'
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


let isLoding = false
let no;

const MsgContainer = ({ data, pageNo, searchQuery }) => {
  no = pageNo;
  console.log("Query : ", searchQuery)
  const { get } = useDisasterMsgAPI(pageNo);

  InfinityScroll(async () => {
    if (!isLoding) {
      isLoding = true;
      await get(no);
      isLoding = false;
      message.success({ content: "Loaded!", key: no, duration: 2 });
    }
  });

  useEffect(() => {
    get(pageNo);
  }, []);

  if (data.length === 0) {
    return <div>
      <Card loading={true} style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }} />
    </div>

  } else if (searchQuery !== "") {
    const filterData = data.filter(value =>
      value.location_name.includes(searchQuery));

    return <div >
      {filterData.map((value, index) => (
        <div style={{ margin: "auto", maxWidth: 550 }} key={index} >
          <Link to={{
            pathname: `/detail/${value.md101_sn}`,
            state: {
              location: value.location_name,
              date: value.create_date,
              msg: value.msg,
              id: value.md101_sn
            }
          }} >
            <Card hoverable style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }}
              title={value.location_name + "\t" + value.create_date} >
              {value.msg}
            </Card>
          </Link>
        </div>
      ))
      }
      <Button style={{ maxWidth: 500, marginBottom: 13 }}
        onClick={async () => {
          await get(no);
          message.success({ content: "Loaded!", key: no, duration: 2 });
        }} block>더보기</Button>
    </div>
  } else {
    return <div >
      {data.map((value, index) => (
        <div style={{ margin: "auto", maxWidth: 550 }} key={index} >
          <Link to={{
            pathname: `/detail/${value.md101_sn}`,
            state: {
              location: value.location_name,
              date: value.create_date,
              msg: value.msg,
              id: value.md101_sn
            }
          }} >
            <Card hoverable style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }}
              title={value.location_name + "\t" + value.create_date} >
              {value.msg}
            </Card>
          </Link>
        </div>
      ))
      }
      <Button style={{ maxWidth: 500, marginBottom: 13 }}
        onClick={async () => {
          await get(no);
          message.success({ content: "Loaded!", key: no, duration: 2 });
        }} block>더보기</Button>
    </div>
  }

}


const mapStateToProps = (state) => {
  return {
    data: state.disasterMsg.data,
    pageNo: state.disasterMsg.pageNo,
    searchQuery: state.disasterMsg.searchQuery
  };
}

export default connect(mapStateToProps)(MsgContainer);