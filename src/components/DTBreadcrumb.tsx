import React, {useEffect, useState} from "react";
import {Breadcrumb, Menu} from "antd";
import {routeItem} from "../routes/utils";
import "../style/DTBreadcrumb.scss";
import {JumpRoute} from "../Layout/Slide/Slide";
import SubMenu from "antd/lib/menu/SubMenu";
import {withRouter} from "react-router-dom"
import {IState} from '../store/index';
import {Dispatch} from 'redux';
import {IRouteAction} from "../store/reducers/routeReducer";
import {connect} from "react-redux";


function createBreads(target: routeItem | undefined): routeItem[] {
    if (!target) return [];
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
          let Item = sub.subs ? (
              <SubMenu
                  key={sub.name}
                  title={[sub.icon && [<sub.icon key={sub.name}/>, "  "], sub.name].filter(
                      Boolean
                  )}
              >
                  {createDropDownMenu(sub.subs)}
              </SubMenu>
          ) : (
              <Menu.Item key={sub.name}>
                  <div
                      key={sub.name}
                      onClick={() => {
                          JumpRoute(sub.path || sub.redirect!);
                      }}
                  >
                      {[sub.icon && [<sub.icon key={sub.name}/>, "  "], sub.name].filter(Boolean)}
                  </div>
              </Menu.Item>
          )
          return Item;
      })}
    </>
  );
}

const DTBreadcrumb = (props: any) => {
    let [target, setTarget] = useState(props.routes.find((route: any) => route.path === props.location.pathname));
    useEffect(() => {
        props.history.listen((location: any) => {
            let target = props.routes.find((route: any) => route.path === location.pathname);
            console.log(target);
            setTarget(target);
        })
    })
    return (
        <Breadcrumb className="dt_breadcrumb">
            {createBreads(target as routeItem).map((item) => {
                return (
                    <Breadcrumb.Item
                        key={item.name || item.path}
                        overlay={
                            (item.subs && <Menu>{createDropDownMenu(item.subs)}</Menu>) ||
                            (item.groups && (
                                <Menu>{createDropDownMenu(item.groups as routeItem[])}</Menu>
                            )) ||
                            undefined
                        }
                    >
                        {[item.icon && [<item.icon key={item.name}/>, "  "], item.name]}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default withRouter(connect(
    (state: IState) => {
        return {
            target: state.routes.target,
        };
    },
    (dispatch: Dispatch<IRouteAction>) => {
        return {dispatch};
    }
)(DTBreadcrumb));
