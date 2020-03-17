import React from "react";
import { Collapse, Card, Tag } from "antd";
import { useSelector } from "react-redux";

const { Panel } = Collapse;
const { kakao } = window;

var kakaoMap = null;
var stores = [];

const MaskStoreList = () => {

  const { storeList, map } = useSelector(state => ({
    storeList: state.maskMap.storeList,
    map: state.maskMap.map
  }));

  kakaoMap = map;
  stores = storeList;

  const onclickHandle = (lat, lng) => {
    kakaoMap.panTo(new kakao.maps.LatLng(lat, lng));
  };

  const scrollUpDelay = 1;
  const scrollUpSpeed = 60;
  
  const scrollUp = () => {
    console.log("scrollUp");
    if (document.documentElement.scrollTop < 1) {
      return;
    }
    document.documentElement.scrollTop = document.documentElement.scrollTop - scrollUpSpeed;
    setTimeout(() => {
      scrollUp();
    }, scrollUpDelay);
  }

  return (
    <div className="more_Info">
      <Collapse style={{ maxWidth: 500, margin: "auto", marginBottom: 13, marginTop: 15 }}>
        <Panel header={"지도의 기준 현재 구매 가능한 마스크 판매처"} key="maskMap">
          <h3 style={{ textAlign: "left" }}>
            <p>지도의 중심 기준 1KM 반경의 판매처를 가지고 사용합니다.</p>
            <p>현재 1개 이상 재고를 소유한 판매처만 목록화 했습니다.</p>
            <p>해당 카드를 클릭 하시면 지도가 해당 판매처를 가리키게 됩니다!</p>
          </h3>
          {storeList.map((value, index) => (
            typeof value.remain_stat !== "undefined" && value.remain_stat !== "" && value.remain_stat !== null && value.remain_stat !== "break" && value.remain_stat !== "empty" &&
            <div key={value.code}>
              <Card hoverable onClick={() => {
                onclickHandle(value.lat, value.lng);
                scrollUp();
              }} style={{ maxWidth: 500, margin: "auto", marginBottom: 13 }}
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
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );

}

export default MaskStoreList;