import { routeInfo, staticMenu } from "../../routes";
import {actionTypes} from "./types"

export interface IMenuState {
  menus: Array<routeInfo>;
}

export interface IMenuAction {
  type: Symbol;
  menus: Array<routeInfo>
  [prop: string]: any;
}

let initMenus: IMenuState = {
  menus: staticMenu,
};

export default function menuReducer(
  state: IMenuState = initMenus,
  action: IMenuAction
): IMenuState {
  switch (action.type) {
    case actionTypes.SETMENUS:
      return { ...state };

    default:
      return { ...state };
  }
}
