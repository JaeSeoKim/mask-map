import React, { useEffect } from "react";
import useMaskData from "../action/useMaskData";
import KaKaoMap from "../components/kakaoMap/KakaoMap";
import useGeolocation from "../action/kakaomap/useGeolocation";
import useSetMarker from "../action/kakaomap/useSetMarker";
import useCenterChanged from "../action/kakaomap/useCenterChanged";


const MaskMap = () => {

  const { getMaskDataGeo } = useMaskData();
  const { setMarker } = useSetMarker();
  const { getGeo } = useGeolocation();
  const { setEvent } = useCenterChanged();

  useEffect(() => {
    getMaskDataGeo(37.4388, 127.1396, 10000).then(() => {
      getGeo();
      setMarker();
      setEvent();
    });
  }, []);
  return <div>
    <div>
      <h3>공적 마스크 지도 입니다.</h3>
      <h4>해당 마커을 클릭 하시면 자세한 정보를 확인 할 수 있습니다.</h4>
      <h4>* 실제정보와 5분정도의 시간차이가 있습니다.</h4>
    </div>
    <div style={{ height: "75vh", paddingLeft: "10px", paddingRight: "10px" }}>
      <KaKaoMap >
      </KaKaoMap>
    </div>
  </div>
}

export default MaskMap;