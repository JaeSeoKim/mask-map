import React, { useEffect } from "react";
import KaKaoMap from "../components/kakaoMap/KakaoMap";
import useGeolocation from "../action/kakaomap/useGeolocation";
import useCenterChanged from "../action/kakaomap/useCenterChanged";
import MaskStoreList from "../components/MaskStoreList";
import { useSelector } from "react-redux";


const MaskMap = () => {
  const { map } = useSelector(state => ({ map: state.maskMap.map }), []);

  const { getGeo } = useGeolocation();
  const { setEvent } = useCenterChanged();
  useEffect(() => {
    getGeo();
    setEvent();
  }, [map]);
  
  return <div>
    <div>
      <h3>공적 마스크 지도 입니다.</h3>
      <h4>해당 마커를 클릭 하시면 자세한 정보를 확인 할 수 있습니다.</h4>
      <h4>* 실제정보와 5분정도의 시간차이가 있습니다.</h4>
    </div>
    <div style={{ height: "50vh", paddingLeft: "10px", paddingRight: "10px" }}>
      <KaKaoMap >
      </KaKaoMap>
      <MaskStoreList>
      </MaskStoreList>
    </div>
  </div>
}

export default MaskMap;