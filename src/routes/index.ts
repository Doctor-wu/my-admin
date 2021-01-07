import Content from "../components/Content";
import { BarsOutlined, FolderOutlined, GroupOutlined, HomeOutlined } from "@ant-design/icons";
import { flattenRoute } from "./utils";
import Login from "../views/Login";
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
    path: "/Login",
    component: Login(),
    hide: true,
    name: "登录",
    fullPage:true
  },
  {
    icon: FolderOutlined,
    name: "订单管理",
    subs: [
        {
          path: "/hello",
          name: "订单列表",
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
        redirect: "/group/item1-1",
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
        redirect: "/group/item2-1",
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
          name: "nest-sub",
          icon: FolderOutlined,
          subs:[
            {
              path: "/sub2",
              name: "sub2",
              component: Content({ show: "sub2" }),
              icon: GroupOutlined,
            },
            {
              path: "/sub3",
              name: "sub3",
              component: Content({ show: "sub3" }),
              icon: GroupOutlined,
            },
          ]
        },
    ],
  },
];

console.log(flattenRoute(staticMenu));

