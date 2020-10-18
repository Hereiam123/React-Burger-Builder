import React from "react";
import styles from "./Order.module.css";

const Order = ({ ingredients, price }) => {
  const presentationIngredients = [];
  for (let ingredient in ingredients) {
    presentationIngredients.push({
      name: ingredient,
      amount: ingredients[ingredient],
    });
  }
  const ingredientOutput = presentationIngredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0px 8px",
          border: "1px solid #ccc",
          padding: "3px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={styles.order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p>
        Price: <strong>${price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
