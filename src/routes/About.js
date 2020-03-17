import React from "react";
import { Typography } from "antd";
import { GithubOutlined, IdcardOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <Typography>
      <a href="https://github.com/JaeSeoKim/mask-map/">
        <Title>mask-map</Title>
      </a>
      <Paragraph>
        이 프로젝트는 한국 공공데이터 포털에서 제공하는 `건강보험심사평가원_공적 마스크 판매 정보 API` 를 이용하여 제작 하였습니다.
        </Paragraph>
      <a href="https://github.com/JaeSeoKim">
        <Title level={4}><GithubOutlined /> Github</Title>
      </a>
      <a href="https://jaeseokim.tistory.com/">
        <Title level={4}><IdcardOutlined /> Blog</Title>
      </a>
      <Title level={4}>Copyright 2020. 김재서. All rights reserved.</Title>
    </Typography>
  );
};

export default About;
