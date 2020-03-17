import React from "react";
import { Typography } from "antd";
import { GithubOutlined, IdcardOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <Typography>
      <a href="https://github.com/JaeSeoKim/disaster_message/">
        <Title>Disaster_message</Title>
      </a>
      <Paragraph>
        이 프로젝트는 한국 공공데이터 포털에서 제공하는 `재난문자방송 발령현황 서비스 API` 를 이용하여 제작 하였습니다.
        </Paragraph>
      <Title level={4}>Created by JaeSeoKim</Title>
      <a href="https://github.com/JaeSeoKim">
        <Title level={4}><GithubOutlined /> Github</Title>
      </a>
      <a href="https://jaeseokim.tistory.com/">
        <Title level={4}><IdcardOutlined /> Blog</Title>
      </a>
    </Typography>
  );
};

export default About;
