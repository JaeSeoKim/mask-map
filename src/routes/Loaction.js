import React from "react";
import { Select, Affix } from "antd";
import MsgContainer from "../components/MsgContainer";
import { actionCreators } from "../store/store";
import { useDispatch } from "react-redux";

const { Option } = Select;

var location = "";

const Location = () => {

  const dispatch = useDispatch();

  const setQuery = (value) => {
    console.log(`selected ${value}`);
    dispatch(actionCreators.setMsgSearchQuery(value));
  }


  return (
    <div>
      <Affix offsetTop={50} style={{marginBottom:10}}>
        <Select
          showSearch
          style={{ maxWidth: 500, width: "100%" }}
          placeholder="지역을 선택해 주세요."
          optionFilterProp="children"
          onChange={setQuery}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="강원도">강원도</Option>
          <Option value="경기도">경기도</Option>
          <Option value="경상남도">경상남도</Option>
          <Option value="경상북도">경상북도</Option>
          <Option value="광주광역시">광주광역시</Option>
          <Option value="대구광역시">대구광역시</Option>
          <Option value="대전광역시">대전광역시</Option>
          <Option value="부산광역시">부산광역시</Option>
          <Option value="서울특별시">서울특별시</Option>
          <Option value="울산광역시">울산광역시</Option>
          <Option value="인천광역시">인천광역시</Option>
          <Option value="전라남도">전라남도</Option>
          <Option value="전라북도">전라북도</Option>
          <Option value="제주특별자치도">제주특별자치도</Option>
          <Option value="충청남도">충청남도</Option>
          <Option value="충청북도">충청북도</Option>
          <Option value="세종특별자치시">세종특별자치시</Option>
        </Select>
      </Affix>
      <MsgContainer Location={location} />
    </div>
  );
};

export default Location;
