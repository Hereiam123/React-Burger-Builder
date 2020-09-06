import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";

//Ingredient Prices for burger item
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = () => {
    if (this.state.totalPrice > 0) {
      this.setState({ purchasable: true });
    } else {
      this.setState({ purchasable: false });
    }
    /*const ingredients = {
      ...this.state.ingredients,
    };
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });*/
  };

  addIngredient = (type) => {
    const ingCount = this.state.ingredients[type] + 1;
    const newIngCount = {
      ...this.state.ingredients,
    };
    newIngCount[type] = ingCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngCount });
    this.updatePurchaseState();
  };

  removeIngredient = (type) => {
    const ingCount = this.state.ingredients[type] - 1;
    if (ingCount < 0) {
      return;
    }
    const newIngCount = {
      ...this.state.ingredients,
    };
    newIngCount[type] = ingCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngCount });
    this.updatePurchaseState();
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  render() {
    /*Check if less button should be disabled for ingredient controls*/
    const disabled = {
      ...this.state.ingredients,
    };
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }
    /*****************************************************************/
    return (
      <>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
          disabled={disabled}
          purchasable={this.state.purchasable}
          ordering={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
