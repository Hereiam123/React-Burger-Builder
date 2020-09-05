import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../BuildControls/BuildControls";

//Ingredient Prices for burger item
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
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
  };

  addIngredient = (type) => {
    const ingCount = this.state.ingredients[type] + 1;
    const newIngCount = {
      ...this.state.ingredients,
    };
    newIngCount[type] = ingCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngCount });
  };

  removeIngredient = (type) => {};
  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredient} />
      </>
    );
  }
}

export default BurgerBuilder;
