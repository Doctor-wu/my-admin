import React from "react";
import { Breadcrumb, Menu } from "antd";
import { routeItem } from "../routes/utils";
import "../style/DTBreadcrumb.scss";
import { JumpRoute } from "../Layout/Slide/Slide";
import SubMenu from "antd/lib/menu/SubMenu";
import { IState } from '../store/index';
import { Dispatch } from 'redux';
import { IRouteAction } from "../store/reducers/routeReducer";
import { connect } from "react-redux";


function createBreads(target: routeItem|undefined): routeItem[] {
    if(!target) return [];
  let result = [];
  while (target.parent) {
    result.unshift(target);
    target = target.parent;
  }
  result.unshift(target);
  return result;
}

function createDropDownMenu(subs: routeItem[]) {
  return (
    <>
      {subs.map((sub) => {
        return (
          <>
            {sub.subs ? (
              <SubMenu
                key={sub.name}
                title={[sub.icon && [<sub.icon key={sub.name} />, "  "], sub.name].filter(
                  Boolean
                )}
              >
                {createDropDownMenu(sub.subs)}
              </SubMenu>
            ) : (
              <Menu.Item 
                key={sub.name}
              >
                <div
                  key={sub.name}
                  onClick={() => {
                    JumpRoute(sub.path || sub.redirect!);
                  }}
                >
                  {[sub.icon && [<sub.icon key={sub.name} />, "  "], sub.name].filter(Boolean)}
                </div>
              </Menu.Item>
            )}
          </>
        );
      })}
    </>
  );
}

const DTBreadcrumb = (props: any) => {
  console.log(props);
  return (
    <Breadcrumb className="dt_breadcrumb">
      {createBreads(props.target as routeItem).map((item) => {
        return (
          <Breadcrumb.Item
          key={item.name}
            overlay={
              (item.subs && <Menu>{createDropDownMenu(item.subs)}</Menu>) ||
              (item.groups && (
                <Menu>{createDropDownMenu(item.groups as routeItem[])}</Menu>
              )) ||
              undefined
            }
          >
            {[item.icon && [<item.icon key={item.name} />, "  "], item.name]}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default connect(
    (state: IState) => {
      return {
        target: state.routes.target,
      };
    },
    (dispatch: Dispatch<IRouteAction>) => {
      return { dispatch };
    }
  )(DTBreadcrumb);