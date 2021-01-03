import {Dispatch} from "redux";
import { IMenuAction, IMenuState } from "../reducers/meunReducer";
import { actionTypes } from "../reducers/types";


export const setMenuAction:(...args:Array<any>)=>any = (menus:Array<any>)=>
    (dispacth: Dispatch<IMenuAction>) => {
        dispacth({type:actionTypes.SETMENUS, menus})
    }