import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Slide from "./Slide/Slide";
import "./layout.scss";
import { IState } from "../store/index";
import { IRouteAction } from "../store/reducers/routeReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { routeItem } from "../routes/utils";
import DTBreadcrumb from "../components/DTBreadcrumb";
import { Divider } from "antd";
import { actionTypes } from "../store/reducers/types";

const Layout = (props: {
  dispatch?: Dispatch<IRouteAction>;
  routes: Array<routeItem>;
}) => {
  let [fullPage, setFullPage] = useState<Boolean>(false);
  console.log(props);

  return (
    <div className="layout">
      {!fullPage && <Header></Header>}
      {!fullPage && <Slide></Slide>}
      <div className={`content-wrapper${fullPage ? " fullPage" : ""}`}>
        <div className="content">
          <DTBreadcrumb />
          <Divider style={{ margin: "7px 0" }} />
          <HashRouter>
            <Switch>
              {props.routes.map((route: routeItem) => {
                return (
                  <Route
                    path={route.path}
                    key={route.path}
                    exact
                    render={() => {
                      props.dispatch!({
                        type: actionTypes.SETROUTETARGET,
                        target: route,
                      });
                      if (route.fullPage && fullPage === false) {
                        setFullPage(true);
                      } else if (!route.fullPage && fullPage === true) {
                        setFullPage(false);
                      }
                      return route.redirect ? (
                        <Redirect to={route.redirect}></Redirect>
                      ) : (
                        route.component
                      );
                    }}
                  ></Route>
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
    };
  },
  (dispatch: Dispatch<IRouteAction>) => {
    return { dispatch };
  }
)(Layout);
