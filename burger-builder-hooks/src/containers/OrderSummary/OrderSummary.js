import React from "react";
import Button from "../../components/UI/Button/Button";

const OrderSummary = (props) => {
  //Create ingredient summary
  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>
          {ingredient}: {props.ingredients[ingredient]}
        </span>
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>Burger Ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={props.purcahseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
