import { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/store";

const useMaskData = () => {
  /*
  주소 기준 동네별 공적 마스크 판매정보 제공 서비스주소 기준 동네별 공적 마스크 판매정보 제공 서비스

  address     주소	            string			검색 기준이 될 주소
  count	      조회 수	          integer			조회 데이터 수
  addr	      판매처 주소       string			판매처 주소
  code	      식별코드          string			
  created_at	데이터 생성일자   string			
  remain_stat	재고 상태	        string			100개 이상(녹색): 'plenty' / 
                                            30개 이상 100개미만(노랑색): 'some' / 
                                            2개 이상 30개 미만(빨강색): 'few' / 
                                            1개 이하(회색): 'empty' / 
                                            판매중지: 'break'
  stock_at	  입고시간	        string			
  lat	        위도	            number($float)			wgs84 좌표계 / 
                                                    최소:33.0, 최대:43.0
  lng	        경도	            number($float)			wgs84 표준 / 
                                                    최소:124.0, 최대:132.0
  name	      이름	            string			
  type	      판매처 유형	      string			약국: '01', 우체국: '02', 농협: '03'
  */

  const dispatch = useDispatch();

  const [maskData, setMaskData] = useState(
    {
      address: "",
      count: 0,
      stores: [
        {
          addr: "",
          code: "",
          created_at: "",
          lat: 0,
          lng: 0,
          name: "",
          remain_stat: "",
          stock_at: "",
          type: ""
        }
      ]
    }
  );

  const getMaskDataAddr = async (location) => {
    console.log("location: ", location);
    await Axios.get(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${location}`)
      .then(response => {
        const { address,
          count,
          stores } = response.data
        console.log(response);
        setMaskData(
          {
            address,
            count,
            stores
          }
        );
        console.log(stores);
      }).catch(error => {
        console.log(error);
      });
  };

  /*
  url	/storesByGeo/json
  key	항목명(국문)	type	기본값	필수	항목설명
  Lat	위도	number		N	wgs84 좌표계 / 
  최소:33.0, 최대:43.0
  lng	경도	number		N	wgs84 표준 / 
  최소:124.0, 최대:132.0
  m	반경(미터)	integer		N	최대 5000(5km)까지 조회 가능
  */

  const getMaskDataGeo = async (lat, lng, m) => {
    console.log("lat: ", lat, " lng: ", lng, " m: ", m);
    await Axios.get(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${m}`)
      .then(response => {
        const {
          stores } = response.data
        dispatch(actionCreators.setStoreList(stores));
        console.log(stores.length);
      }).catch(error => {
        console.log(error);
      });
  };

  return { ...maskData, getMaskDataAddr, getMaskDataGeo };
}

export default useMaskData;