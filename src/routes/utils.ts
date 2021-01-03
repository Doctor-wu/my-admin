import { routeInfo } from "./index";
export interface routeItem extends routeInfo{
  path: string;
  component: JSX.Element;
  parent?:routeInfo;
  [prop: string]: any;
}
export const flattenRoute: (
  menus: Array<routeInfo>
) => Array<routeItem | undefined> = (menus) => {
  return menus.map((menu) => iterateRoute(menu)).flat(1);
};

const iterateRoute = function (
  route: routeInfo,
  parent?:routeItem
): routeItem | routeItem[] | undefined {
  if (!route) return;
  parent && ((route as routeItem).parent = parent);
  let results: routeItem[] = [];
  if (route.subs) {
    route.subs.forEach((r) => {
      let item = iterateRoute(r,route as routeItem);
      if (!Array.isArray(item)) {
        item = [item!];
      }
      results = results.concat(item.filter(Boolean));
    });
    return results;
  }
  if (route.groups) {
    route.groups.forEach((r) => {
      let item = iterateRoute(r, route as routeItem);
      if (!Array.isArray(item)) {
        item = [item!];
      }
      results = results.concat(item.filter(Boolean));
    });
    return results;
  }
  if (route.path && route.component) {
    return {
      ...route,
      path: route.path!,
      component: route.component!,
      parent
    };
  }
};
