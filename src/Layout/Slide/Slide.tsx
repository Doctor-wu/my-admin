import React from "react";
import "./Slide.scss";
import { Menu } from "antd";
import { IState } from "../../store/index";
import { Dispatch } from "redux";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { IMenuAction } from "../../store/reducers/meunReducer";
import { connect } from "react-redux";
import { routeInfo } from "../../routes";
// import { IProps } from "../index.d";

const { SubMenu } = Menu;

const handleClick = (e: any) => {
  console.log("click ", e);
};

const JumpRoute = (to: string) => {
  window.location.hash = `#${to}`;
};

export const createRoute = (menu: routeInfo) => {
  if (menu.hide) return;
  if (menu.subs) {
    return (
      <SubMenu key={menu.path || menu.name} title={menu.name} icon={<menu.icon />}>
        {menu.subs.map(createRoute)}
      </SubMenu>
    );
  }
  if (menu.component && menu.path) {
    // 有component就一定是叶子
    return (
      <Menu.Item
        onClick={() => JumpRoute(menu.path!)}
        icon={menu.icon && <menu.icon />}
        key={menu.path}
      >
        {menu.name}
      </Menu.Item>
    );
  }
  if (menu.groups && menu.name) {
    return (
      <Menu.ItemGroup
        key={"g" + menu.name}
        title={[menu.icon && ([<menu.icon />, "  "]), menu.name].filter(Boolean)}
      >
        {menu.groups.map(createRoute)}
      </Menu.ItemGroup>
    );
  }
};

export const createMenu: (menus: Array<routeInfo>) => JSX.Element = (menus) => {
  return <>{menus.map((menu) => createRoute(menu))}</>;
};

const Slide = (props: any) => {
  console.log(props);

  return (
    <div className="clip_scroller">
      <div className="slide_wrapper">
        <Menu
          onClick={(e) => handleClick(e)}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          {createMenu(props.menus)}
          {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub7"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    </div>
  );
};

export default connect(
  (state: IState) => {
    return {
      menus: state.menus.menus,
    };
  },
  (dispatch: Dispatch<IMenuAction>) => {
    return { dispatch };
  }
)(Slide);
