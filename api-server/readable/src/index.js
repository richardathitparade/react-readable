import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
