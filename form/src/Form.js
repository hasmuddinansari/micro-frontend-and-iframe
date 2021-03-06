import React, { useRef } from "react";

import "./App.css";
import { getQueryParams } from "./utils";

export const Form = ({ handler, history }) => {
  const ref = useRef(null);

  const handleFormSubmit = () => {
    window.parent.postMessage(
      { message: "age", value: ref.current.value },
      "*"
    );
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (history.location.search.includes("isIframe")) {
      handleFormSubmit();
      return;
    }
    if (handler?.submit) {
      handler.submit(e);
      return;
    }
    return null;
  };

  const getNameAndHandler = () => {
    const search = history.location.search ?? "";
    const isIframe = search.includes("isIframe");
    return {
      submit: handleSumbit,
      name: isIframe ? getQueryParams(history.location.search, "name"): handler.name,
      counter: isIframe ? getQueryParams(history.location.search, "counter") : handler.counter,
    };
  };

  const { name, counter, submit } = getNameAndHandler();

  

  return (
    <div className="container mt-5">
      <div className="row">
        <h4>Hello {name}</h4>
        <strong>{counter}</strong>
        <form onSubmit={submit}>
          <label htmlFor="age">Age</label> <br />
          <input ref={ref} placeholder="enter your age" name="age" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

Form.defaultProps = {
  handler: {
    name: "Template form",
    submit: (e) => e.preventDefault(),
  },
};
