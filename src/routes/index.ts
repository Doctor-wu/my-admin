import Content from "../components/Content";
import { BarsOutlined, FolderOutlined, GroupOutlined, HomeOutlined } from "@ant-design/icons";
import { flattenRoute } from "./utils";
export interface routeInfo {
  path?: string;
  name?: string;
  redirect?: string;
  hide?: boolean;
  icon?: any;
  component?: JSX.Element;
  subs?: Array<routeInfo>;
  groups?: Array<routeInfo>;
  fullPage?:Boolean;
}

export const staticMenu: Array<routeInfo> = [
  {
    path: "/",
    component: Content({ show: "首页" }),
    icon: HomeOutlined,
    name: "首页",
  },
  {
    icon: FolderOutlined,
    name: "Hello",
    subs: [
        {
          path: "/hello",
          name: "hello",
          component: Content({ show: "hello" }),
          icon: GroupOutlined,
          redirect: "/world"
        },
        {
          path: "/world",
          name: "world",
          component: Content({ show: "world" }),
          icon: GroupOutlined,
        },
    ],
  },
  {
    icon: FolderOutlined,
    name: "Group",
    subs: [
      {
        name: "groupItem1",
        icon: BarsOutlined,
        groups: [
          {
            path: "/group/item1-1",
            name: "groupItem1-1",
            icon: GroupOutlined,
            component: Content({ show: "groupItem1-1" }),
          },
          {
            path: "/group/item1-2",
            name: "groupItem1-2",
            icon: GroupOutlined,
            component: Content({ show: "groupItem1-2" }),
          },
          {
            path: "/group/item1-3",
            name: "groupItem1-3",
            icon: GroupOutlined,
            component: Content({ show: "groupItem1-3" }),
          },
        ],
      },
      {
        name: "groupItem2",
        icon: BarsOutlined,
        groups: [
          {
            path: "/group/item2-1",
            name: "groupItem2-1",
            icon: GroupOutlined,
            component: Content({ show: "groupItem2-1" }),
          },
          {
            path: "/group/item2-2",
            name: "groupItem2-2",
            icon: GroupOutlined,
            component: Content({ show: "groupItem2-2" }),
          },
          {
            path: "/group/item2-3",
            name: "groupItem2-3",
            icon: GroupOutlined,
            component: Content({ show: "groupItem2-3" }),
            fullPage:true
          },
        ],
      },
    ],
  },
  {
    icon: FolderOutlined,
    name: "Nest-Sub",
    subs: [
        {
          path: "/world2",
          name: "world2",
          component: Content({ show: "world2" }),
          icon: GroupOutlined,
        },
        {
          path: "/nest-sub",
          name: "nest-sub",
          icon: FolderOutlined,
          subs:[
            {
              path: "/sub2",
              name: "sub2",
              component: Content({ show: "sub2" }),
              icon: GroupOutlined,
            },
          ]
        },
    ],
  },
];

console.log(flattenRoute(staticMenu));

