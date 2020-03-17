import React from "react";
import { NavLink } from "react-router-dom";

import { Menu, Affix } from 'antd';
import {
  InfoCircleOutlined,
  NotificationOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const Navigation = () => {
  return (
    <Affix style={{ marginBottom: 10 }}>
      <div>
        <Menu
          defaultSelectedKeys={['maskMap']}
          defaultOpenKeys={['menu']}
          mode="horizontal"
          theme="white"
        >
          <Menu.Item key="maskMap">
            <EnvironmentOutlined />
            <NavLink to="/">
              <span>마스크맵</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="disasterMsg">
            <NotificationOutlined />
            <a href="http://msg.devjs.cf/">
              <span>재난문자 목록</span>
            </a>
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
