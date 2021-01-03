import { staticMenu } from "../../routes";
import { flattenRoute } from "../../routes/utils";

export interface IRouteState {
  routes: Array<any>;
}

export interface IRouteAction {
  type: Symbol;
  routes: Array<any>
  [prop: string]: any;
}

let initRoutes: IRouteState = {
  routes: flattenRoute(staticMenu),
};

export default function routeReducer(
  state: IRouteState = initRoutes,
  action: IRouteAction
): IRouteState {
  switch (action.type) {
    case Symbol():
      return { ...state };

    default:
      return { ...state };
  }
}
