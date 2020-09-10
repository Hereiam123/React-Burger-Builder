import React from "react";
import Button from "../../components/UI/Button/Button";

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
      <Button btnType="danger">CANCEL</Button>
      <Button btnType="success">CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
