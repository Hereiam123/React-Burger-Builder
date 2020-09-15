import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import axios from "../../axiosInstance";

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
    loading: false,
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

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        alert("You ordered!");
      })
      .catch((e) => {
        console.log(e);
        alert("Error in ordering!");
      })
      .finally(() => {
        this.setState({ loading: false, purchasing: false });
      });
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
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purcahseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice}
            />
          )}
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

export default withErrorHandler(BurgerBuilder, axios);
