/* jshint esversion: 11 */
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ShowViedo from "./showVideo";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ShowViedo />
    <App />
  </React.StrictMode>,
  rootElement
);

