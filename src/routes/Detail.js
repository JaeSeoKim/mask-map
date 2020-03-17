import React, { useEffect, useState } from "react";
import { Card, Collapse, } from "antd";
import Error_page from "./Error_page";
import useMaskdata from "../action/useMaskData";
import MaskStoreList from "../components/MaskStoreList";

const Detail = (props) => {

  const {
    address,
    count,
    stores,
    getMaskDataAddr
  } = useMaskdata();
  useEffect(() => {
    if (props.location.state === undefined) {
      props.history.push('/');
    } else {
      getMaskDataAddr(props.location.state.location);
    }
  }, []);

  const data = props.location.state;

  return <div>
    {data === undefined ? <Error_page />
      :
      <div>
        <h1>개발중..........</h1>
        <Card style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }}
          title={data.location + "\t" + data.date} >
          {data.msg}
        </Card>
        {count === 0 ?
          <div className="maskStoreList" />
          :
          <MaskStoreList stores={stores} address={address}>
          </MaskStoreList>
        }
      </div>
    }
  </div>
};

export default Detail;


