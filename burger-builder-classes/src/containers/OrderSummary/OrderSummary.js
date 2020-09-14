import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("OrderSummary updated");
  }

  render() {
    //Create ingredient summary
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredient) => {
        return (
          <li key={ingredient}>
            <span style={{ textTransform: "capitalize" }}>
              {ingredient}: {this.props.ingredients[ingredient]}
            </span>
          </li>
        );
      }
    );

    return (
      <>
        <h3>Your Order</h3>
        <p>Binding Burger Ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="success" clicked={this.props.purcahseContinued}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
