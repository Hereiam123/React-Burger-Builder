import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./Burger.module.css";

const Burger = (props) => {
  console.log("Render");
  /*Map out ingredients from props above into ingredient components*/
  let ingredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <Ingredient key={ingKey + i} type={ingKey} />;
      });
    })
    .flat();
  console.log("Ingredients");
  console.log(ingredients);
  if (!ingredients.length) {
    ingredients = <p>Please add wanted ingredients!</p>;
  }
  return (
    <div className={styles.burger}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
