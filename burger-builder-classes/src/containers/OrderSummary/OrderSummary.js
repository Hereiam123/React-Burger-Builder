import React from "react";

const OrderSummary = ({ ingredients }) => {
  //Create ingredient summary
  const ingredientSummary = Object.keys(ingredients).map((ingredient) => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>
          {ingredient}: {ingredients[ingredient]}
        </span>
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>Binding Burger Ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </>
  );
};

export default OrderSummary;
