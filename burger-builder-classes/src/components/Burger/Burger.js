import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./Burger.module.css";

const Burger = (props) => {
  /*Map out ingredients from props above into ingredient components*/
  const ingredients = Object.keys(props.ingredients).map((ingKey) => {
    return [...Array(props.ingredients[ingKey])].map((_, i) => {
      return <Ingredient key={ingKey + i} type={ingKey} />;
    });
  });
  console.log(ingredients);
  return (
    <div className={styles.burger}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
