import React from "react";
import { Collapse, Card, Tag } from "antd";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const MaskStoreList = () => {

  const { storeList } = useSelector(state => ({
    storeList: state.maskMap.storeList,
  }));

  return (
    <div className="more_Info">
      <Collapse style={{ maxWidth: 500, margin: "auto", marginBottom: 13, marginTop: 15 }}>
        <Panel header={"지도의 기준 현재 구매 가능한 마스크 판매처"} key="maskMap">
          <h3 style={{textAlign:"left"}}>
            <p>지도의 중심 기준 1000M 반경의 판매처를 가지고 사용합니다.</p>
            <p>현재 구매 가능한 구매처만 목록화 했습니다.</p>
            <p>해당 카드를 클릭 하시면 판매처 주소를 확인 할 수 있습니다.</p>
          </h3>
          {storeList.map((value, index) => (
            typeof value.remain_stat !== "undefined"  && value.remain_stat !== ""  && value.remain_stat !== null && value.remain_stat !== "break" && value.remain_stat !== "empty" &&
              <a href={"https://map.kakao.com/link/map/" + value.name + "," + value.lat + "," + value.lng} target="_blank" key={value.code}>
                <Card style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }}
                  title={value.name} >
                  <div style={{ textAlign: "left" }}>
                    <p>주소 : {value.addr}</p>
                    <p>마지막 업데이트 : {value.created_at}</p>
                    <p>입고 시간 : {value.stock_at}</p>
                    <p>
                      {value.remain_stat === "plenty" && <Tag color="#87d068">100개 이상</Tag>}
                      {value.remain_stat === "some" && <Tag color="#2db7f5">30개 이상 100개 미만</Tag>}
                      {value.remain_stat === "few" && <Tag color="#f50">30개 미만</Tag>}
                    </p>
                  </div>
                </Card>
              </a>
          ))}
        </Panel>
      </Collapse>
    </div>
  );

}

export default MaskStoreList;