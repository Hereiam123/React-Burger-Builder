import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  switch (props.type) {
    case "input":
      inputElement = <input {...props} />;
      break;
    case "textarea":
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input {...props} />;
  }
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
