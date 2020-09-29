import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.input];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select value={props.value} onChange={props.changeHandler}>
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.display}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
  }
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
