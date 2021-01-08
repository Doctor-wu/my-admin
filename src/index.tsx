import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/index.scss";
import "../node_modules/antd/dist/antd.css";
import store from "./store/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
