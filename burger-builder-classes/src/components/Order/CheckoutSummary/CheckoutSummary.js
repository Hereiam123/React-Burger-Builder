import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = ({ ingredients }) => {
  return (
    <div>
      <h1>Checkout Summary</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger">Cancel</Button>
      <Button btnType="Success">Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
