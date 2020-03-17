import React from "react";
import { NavLink } from "react-router-dom";

import { Menu, Affix } from 'antd';
import {
  InfoCircleOutlined,
  PushpinOutlined,
  NotificationOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const Navigation = () => {
  return (
    <Affix style={{ marginBottom: 10 }}>
      <div>
        <Menu
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['menu']}
          mode="horizontal"
          theme="white"
        >
          <Menu.Item key="home">
            <NotificationOutlined />
            <NavLink to="/">
              <span>재난문자 목록</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="location">
            <PushpinOutlined />
            <NavLink to="/location">
              <span>지역별 재난문자</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="maskMap">
            <EnvironmentOutlined />
            <NavLink to="/maskMap">
              <span>마스크맵</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="about">
            <InfoCircleOutlined />
            <NavLink to="/about">
              <span>About</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    </Affix>
  );
};

export default Navigation;
