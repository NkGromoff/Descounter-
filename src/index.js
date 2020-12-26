import React from "react";
import ReactDOM from "react-dom";
import "./css/normolize.css";
import "./css/nouislider.min.css";
import "./css/swiper.min.css";
import "./css/style.css";
import App from "./App";
import { Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
