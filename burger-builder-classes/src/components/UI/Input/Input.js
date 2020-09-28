import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = <input {...props.elementConfig} value={props.value} />;
      break;
    case "textarea":
      inputElement = <textarea {...props.elementConfig} value={props.value} />;
      break;
    case "select":
      inputElement = (
        <select value={props.value}>
          {props.elementConfig.options.map((option) => {
            return <option value={option.value}>{option.display}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} value={props.value} />;
  }
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
