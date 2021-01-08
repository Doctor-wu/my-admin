import Content from "../components/Content";
import {
  FolderOutlined,
  GroupOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  OrderedListOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import {flattenRoute} from "./utils";
import Login from "../views/Login";
import CommodityList from "../views/CommodityList";

export interface routeInfo {
  path?: string;
  name?: string;
  redirect?: string;
  hide?: boolean;
  icon?: any;
  component?: JSX.Element | any;
  subs?: Array<routeInfo>;
  groups?: Array<routeInfo>;
  fullPage?: Boolean;
  useClass?: Boolean;
}

export const staticMenu: Array<routeInfo> = [
  {
    path: "/",
    component: () => Content({show: "首页"}),
    icon: HomeOutlined,
    name: "首页",
  },
  {
    path: "/Login",
    component: Login,
    hide: true,
    name: "登录",
    fullPage: true,
    useClass: true
  },
  {
    path: "/Login",
    component: Login,
    hide: true,
    name: "登录",
    fullPage: true
  },
  {
    icon: MoneyCollectOutlined,
    name: "订单管理",
    subs: [
      {
        path: "/hello",
        name: "订单列表",
        component: () => Content({show: "hello"}),
        icon: OrderedListOutlined,
      },
    ],
  },
  {
    icon: ShoppingOutlined,
    name: "商品管理",
    subs: [
      {
        path: "/commodityList",
        name: "商品列表",
        icon: OrderedListOutlined,
        component: CommodityList,
        useClass: true
      },
    ],
  },
  {
    icon: FolderOutlined,
    name: "Nest-Sub",
    // hide: true,
    subs: [
      {
        path: "/world2",
        name: "world2",
        component: () => Content({show: "world2"}),
        icon: GroupOutlined,
        fullPage: true
      },
      {
        name: "nest-sub",
        icon: FolderOutlined,
        subs: [
          {
            path: "/sub2",
            name: "sub2",
            component: () => Content({show: "sub2"}),
            icon: GroupOutlined,
          },
          {
            path: "/sub3",
            name: "sub3",
            component: () => Content({show: "sub3"}),
            icon: GroupOutlined,
          },
        ]
      },
    ],
  },
];

console.log(flattenRoute(staticMenu));

