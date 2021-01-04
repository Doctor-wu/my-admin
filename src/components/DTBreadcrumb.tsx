import React from "react";
import { Breadcrumb, Menu } from "antd";
import { routeItem } from "../routes/utils";
import "../style/DTBreadcrumb.scss";
import { JumpRoute } from "../Layout/Slide/Slide";
import SubMenu from "antd/lib/menu/SubMenu";

interface IBreadcrumbProps {
  target: routeItem;
}

function createBreads(target: routeItem): routeItem[] {
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
                title={[sub.icon && [<sub.icon />, "  "], sub.name].filter(
                  Boolean
                )}
              >
                {createDropDownMenu(sub.subs)}
              </SubMenu>
            ) : (
              <Menu.Item>
                <div
                  onClick={() => {
                    JumpRoute(sub.path || sub.redirect!);
                  }}
                >
                  {[sub.icon && [<sub.icon />, "  "], sub.name].filter(Boolean)}
                </div>
              </Menu.Item>
            )}
          </>
        );
      })}
    </>
  );
}

const DTBreadcrumb = (props: IBreadcrumbProps) => {
  console.log(props);

  return (
    <Breadcrumb className="dt_breadcrumb">
      {createBreads(props.target).map((item) => {
        return (
          <Breadcrumb.Item
            overlay={
              (item.subs && <Menu>{createDropDownMenu(item.subs)}</Menu>) ||
              (item.groups && (
                <Menu>{createDropDownMenu(item.groups as routeItem[])}</Menu>
              )) ||
              undefined
            }
          >
            {[item.icon && [<item.icon />, "  "], item.name]}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default DTBreadcrumb;
