import React from "react";
import styles from "./Ingredient.module.css";

const Ingredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styles.breadbottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={styles.breadtop}>
          <div className={styles.seeds1}></div>
          <div className={styles.seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={styles.meat}></div>;
      break;
    case "cheese":
      ingredient = <div className={styles.cheese}></div>;
      break;
    case "salad":
      ingredient = <div className={styles.salad}></div>;
      break;
    case "bacon":
      ingredient = <div className={styles.bacon}></div>;
      break;
    default:
      ingredient = null;
      break;
  }
  return ingredient;
};

export default Ingredient;
