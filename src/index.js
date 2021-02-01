import React from "react";
import ReactDOM from "react-dom";
import "./css/normolize.css";
import "./css/nouislider.min.css";
import "./css/swiper.min.css";
import "./css/style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
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

reportWebVitals();
