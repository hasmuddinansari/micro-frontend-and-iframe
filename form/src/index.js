import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

window.renderForm = (containerId, history, handler) => {
  ReactDOM.render(
    <App {...{ handler, history }} />,
    document.getElementById(containerId)
  );
};

window.unmountForm = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("Form-container")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
