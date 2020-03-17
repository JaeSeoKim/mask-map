import { useSelector } from "react-redux";
import useIpAddr from "../useIpAddr";

const { kakao } = window

var kakaoMap= {};

const useGeolocation = () => {

  const { map } = useSelector(state => ({ map: state.maskMap.map }), []);

  const { getIpAddr } = useIpAddr();

  kakaoMap = map;
  
  const getGeo = () => {
    if (navigator.geolocation) {
      if (kakaoMap !== null) {
        navigator.geolocation.getCurrentPosition(position => {
          kakaoMap.panTo(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }
        ,()=> getIpAddr());
      }
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
  }
  return {getGeo} ;
}

export default useGeolocation;