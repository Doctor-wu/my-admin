import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import Header from "./Header/Header";
import Slide from "./Slide/Slide";
import "./layout.scss";
import {IState} from "../store/index";
import {IRouteAction} from "../store/reducers/routeReducer";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {routeItem} from "../routes/utils";
import DTBreadcrumb from "../components/DTBreadcrumb";
import {Divider} from "antd";
import FullPageRoute from "./FullPageRoute";

const Layout = (props: {
    dispatch?: Dispatch<IRouteAction>;
    routes: Array<routeItem>;
    target: routeItem;
}) => {
    return (
        <div className="layout">
            {!props.target.fullPage && <Header/>}
            {!props.target.fullPage && <Slide/>}
            <div className={`content-wrapper${props.target.fullPage ? " fullPage" : ""}`}>
                <div className="content">
                    <HashRouter>
                        {
                            // @ts-ignore
                            !props.target.fullPage && <><DTBreadcrumb routes={props.routes}/><Divider
                                style={{margin: "7px 0"}}/></>}
                        <Switch>
                            {props.routes.map((route: routeItem) => {
                                return (
                                    <Route
                                        path={route.path}
                                        key={route.path}
                                        exact
                                        render={() => {
                                            return route.redirect ? (
                                                <Redirect key={route.name + "1"} to={route.redirect}/>
                                            ) : (
                                                route.fullPage ?
                                                    <FullPageRoute>
                                                        {route.component}
                                                    </FullPageRoute>
                                                    // @ts-ignore
                                                    : <route.component key={route.name + "1"}/>
                                            )
                                                ;
                                        }}
                                    />
                                );
                            })}
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: IState) => {
        return {
            routes: state.routes.routes,
            target: state.routes.target
        };
    },
    (dispatch: Dispatch<IRouteAction>) => {
        return {dispatch};
    }
// @ts-ignore
)(Layout);
