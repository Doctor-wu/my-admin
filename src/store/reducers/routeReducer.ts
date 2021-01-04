import { staticMenu } from "../../routes";
import { flattenRoute, routeItem } from "../../routes/utils";
import { routeInfo } from '../../routes/index';
import { actionTypes, IActionTypes } from './types';

export interface IRouteState {
  routes: Array<routeItem>;
  target: routeInfo;
}

export interface IRouteAction {
  type: Symbol;
  routes?: Array<any>;
  target?: routeInfo;
  [prop: string]: any;
}

let initRoutes: IRouteState = {
  routes: flattenRoute(staticMenu) as routeItem[],
  target: staticMenu[0]
};

export default function routeReducer(
  state: IRouteState = initRoutes,
  action: IRouteAction
): IRouteState {
  switch (action.type) {
    case actionTypes.SETROUTETARGET:
      return { ...state, target:action.target as routeInfo };

    default:
      return { ...state };
  }
}
