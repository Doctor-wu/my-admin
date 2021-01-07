import React from "react";
import "./Slide.scss";
import { Menu } from "antd";
import { IState } from "../../store/index";
import { Dispatch } from "redux";
import { IMenuAction } from "../../store/reducers/meunReducer";
import { connect } from "react-redux";
import { routeInfo } from "../../routes";

const { SubMenu } = Menu;

const handleClick = (e: any) => {
  console.log("click ", e);
};

export const JumpRoute = (to: string) => {
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
