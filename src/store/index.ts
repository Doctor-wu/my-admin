import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import menuReducer, { IMenuState } from "./reducers/meunReducer";
import routeReducer, { IRouteState } from './reducers/routeReducer';

export interface IState {
  menus: IMenuState;
  routes: IRouteState;
}

let rootReducer = combineReducers<IState>({
  menus: menuReducer,
  routes: routeReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
