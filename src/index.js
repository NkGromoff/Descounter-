import React from "react";
import ReactDOM from "react-dom";
import "./css/normolize.css";
import "./css/nouislider.min.css";
import "./css/style.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryParamProvider } from "use-query-params";

ReactDOM.render(
  <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryParamProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
