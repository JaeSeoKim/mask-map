import { useSelector } from "react-redux";

const { kakao } = window

var kakaoMap= {};

const useGeolocation = () => {

  const { map } = useSelector(state => ({ map: state.maskMap.map }), []);

  kakaoMap = map;
  
  const getGeo = () => {
    if (navigator.geolocation) {
      if (kakaoMap !== null) {
        navigator.geolocation.getCurrentPosition(position => {
          kakaoMap.panTo(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }
        );
      }
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
  }
  return {getGeo} ;
}

export default useGeolocation;