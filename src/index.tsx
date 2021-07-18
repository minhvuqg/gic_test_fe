import { enableES5 } from "immer";
import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "src/__mocks__";
import App from "src/App";
import store from "src/store";

enableES5();

ReactDOM.render(
  <Provider store={store}>
    <div id="modal-root" />
    <App />
  </Provider>,
  document.getElementById("root"),
);