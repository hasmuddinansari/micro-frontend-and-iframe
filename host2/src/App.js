import React, { useEffect } from "react";
import { MicroFrontend } from "./MicroFrontend";

import "./App.css";

const { REACT_APP_FORM_HOST: formHost } = process.env;

export const App = ({ history }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const age = event.target.age.value;
    alert(age);
  };

  const handler = {
    name: "From host 2",
    submit: handleSubmit,
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { message, value } = event.data;
      if (message === "age" && value) {
        alert(value);
      }
    });
  }, []);

  return (
    <div className="container">
      <div>
        <h3 className="container">Micro frontend</h3>
        <MicroFrontend
          {...{
            history,
            host: formHost,
            name: "Form",
            handler,
          }}
        />
      </div>
      <div>
        <h3 className="container">Iframe</h3>
        <iframe
          src={`${formHost}?isIframe&name=${handler.name}`}
          title="iframe-form"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
