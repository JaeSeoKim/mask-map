import Axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const { kakao } = window;

var kakaoMap = null;

const useIpAddr = () => {

  const { map } = useSelector(state => ({ map: state.maskMap.map }), []);

  kakaoMap = map;

  const getIpAddr = async () => {
    await Axios.get("https://ipapi.co/json")
      .then((response) => {
        if (kakaoMap !== null) {
          kakaoMap.panTo(new kakao.maps.LatLng(response.data.latitude,response.data.longitude));
          message.info({ content: "IP 위치 사용(오차 발생)", key: "IpInfo", duration: 2 });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { getIpAddr };
};
export default useIpAddr;
