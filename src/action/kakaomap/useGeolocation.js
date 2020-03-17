import { useSelector } from "react-redux";
import useIpAddr from "../useIpAddr";
import useMaskData from "../useMaskData";
import useSetMarker from "./useSetMarker";
const { kakao } = window

var kakaoMap = {};

const useGeolocation = () => {

  const { map } = useSelector(state => ({ map: state.maskMap.map }), []);

  const { getIpAddr } = useIpAddr();
  const { getMaskDataGeo } = useMaskData();
  const { setMarker } = useSetMarker();

  kakaoMap = map;

  const getGeo = () => {
    if (navigator.geolocation) {
      if (kakaoMap !== null) {
        navigator.geolocation.getCurrentPosition(position => {
          getMaskDataGeo(position.coords.latitude, position.coords.longitude, 3000).then(() => {
            setMarker();
          })

          kakaoMap.panTo(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }
          , () => getIpAddr());
      }
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
  }
  return { getGeo };
}

export default useGeolocation;