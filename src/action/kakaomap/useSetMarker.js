import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../store/store";

const { kakao } = window;

var stores = [];
var kakaoMap = {};
var marker_old = [];
var overlay_old = [];

const useSetMarker = () => {

  const { map, storeList, oldMarker, oldOverlay } = useSelector(state => ({
    map: state.maskMap.map,
    storeList: state.maskMap.storeList,
    oldMarker: state.maskMap.oldMarker,
    oldOverlay: state.maskMap.oldOverlay
  }));
  const dispatcher = useDispatch();


  stores = storeList;
  kakaoMap = map;
  marker_old = oldMarker;
  overlay_old = oldOverlay;


  const setMarker = () => {

    // Marker 초기화
    marker_old.map(value => {
      value.setMap(null);
    });
    // overlay 초기화
    overlay_old.map(value => {
      value.setMap(null);
    });


    var marker_new = [];
    var overlay_new = [];

    // Marker 설정
    stores.map(value => {
      var imageSrc = ""
      var remain_stat = ""
      var remain_color = ""
      switch (value.remain_stat) {
        case "plenty":
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/green.png";
          remain_stat = "100개 이상";
          remain_color = "#87d068";
          break;
        case "some":
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/blue.png";
          remain_stat = "30개 이상 100개 미만";
          remain_color = "#2db7f5";
          break;
        case "few":
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/red.png";
          remain_stat = "30개 미만";
          remain_color = "#f50";
          break;
        case "empty":
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/gray.png";
          remain_stat = "1개 이하";
          remain_color = "#A9A9A9";
          break;
        case "break":
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/black.png";
          remain_stat = "판매중지";
          remain_color = "#A9A9A9";
          //재고 없는 거는 화면에 표시 안함
          //return;
          break;
        default:
          imageSrc = "https://raw.githubusercontent.com/JaeSeoKim/mask-map/master/resource/maskMapMarker/black.png";
          remain_stat = "ERROR";
          remain_color = "#A9A9A9";
          return;
      }

      const content =
        `<div style="margin-bottom: 40px; width: 300px;">` +
        `  <div class="ant-card ant-card-bordered ant-card-hoverable" style="font-size: 12px; border-radius: 5px;">` +
        `    <div class="ant-card-head" style="padding: 10px;">` +
        `      <div class="ant-card-head-wrapper" >` +
        `        <div class="ant-card-head-title" style="font-size: 13px; padding: 0px;">` +
        `          ${value.name}` +
        `        </div>` +
        `      </div>` +
        `    </div>` +
        `    <div class="ant-card-body" style="text-align: left; padding: 10px;">` +
        `      <a href="https://map.kakao.com/link/map/${value.name},${value.lat},${value.lng}" target="_blank" >` +
        `       <p style="width:290px; white-space:normal; ">주소: ${value.addr}</p>` +
        `      </a>` +
        `       <p>생성시간: ${value.created_at}</p>` +
        `       <p>입고시간: ${value.stock_at}</p>` +
        `       <span class="ant-tag ant-tag-has-color" style="background-color:${remain_color}">${remain_stat}</span>` +
        `   </div>` +
        `  </div>` +
        `</div>`


      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: null,
        position: new kakao.maps.LatLng(value.lat, value.lng),
        content: content,
        yAnchor: 1
      });


      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(30, 35);
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: kakaoMap, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(value.lat, value.lng), // 마커를 표시할 위치
        title: value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        console.log(kakaoMap.getLevel())
        if (kakaoMap.getLevel() >= 3) {
          kakaoMap.setLevel(3);
          kakaoMap.panTo(new kakao.maps.LatLng(value.lat + 0.0010, value.lng));
        } else if (kakaoMap.getLevel() === 2) {
          kakaoMap.panTo(new kakao.maps.LatLng(value.lat + 0.0005, value.lng));
        } else {
          kakaoMap.panTo(new kakao.maps.LatLng(value.lat + 0.0003, value.lng));
        }
        customOverlay.setMap(kakaoMap);
      });

      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 

      marker_new.push(marker);

      overlay_new.push(customOverlay)
    });

    dispatcher(actionCreators.addMarker(marker_new, overlay_new));
    console.log(marker_new, overlay_new);

  };
  return { setMarker };
}

export default useSetMarker;