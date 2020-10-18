import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = ({
  ingredients,
  onCheckoutCancelled,
  onCheckoutContinued,
}) => {
  return (
    <div className={styles.checkoutSummary}>
      <h1>Checkout Summary</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="danger" clicked={onCheckoutCancelled}>
        Cancel
      </Button>
      <Button btnType="success" clicked={onCheckoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
