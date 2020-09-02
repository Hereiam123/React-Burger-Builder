import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./Burger.module.css";

const Burger = (props) => {
  return (
    <div className={styles.burger}>
      <Ingredient type="bread-top" />
      <Ingredient type="cheese" />
      <Ingredient type="bacon" />
      <Ingredient type="salad" />
      <Ingredient type="meat" />
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
