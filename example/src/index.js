import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Reducer } from "reactstrap-toastify";
import logger from "redux-logger";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(
  combineReducers({
    toast: Reducer
  }),
  {},
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
