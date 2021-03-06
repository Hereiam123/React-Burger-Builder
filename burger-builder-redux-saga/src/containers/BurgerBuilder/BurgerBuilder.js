import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import axios from "../../axiosInstance";
import * as burgerBuilderActions from "../../store/actions/burgerBuilder";
import * as orderActions from "../../store/actions/order";
import * as authActions from "../../store/actions/auth";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    /*Check if less button should be disabled for ingredient controls*/
    const disabled = {
      ...this.props.ings,
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
          {this.props.ings && (
            <OrderSummary
              ingredients={this.props.ings}
              purchaseCancelled={this.purchaseCancelHandler}
              purcahseContinued={this.purchaseContinueHandler}
              price={this.props.price}
            />
          )}
        </Modal>
        {this.props.ings ? (
          <>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              price={this.props.price}
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              isAuth={this.props.isAuthenticated}
              disabled={disabled}
              purchasable={this.props.price > 0}
              ordering={this.purchaseHandler}
            />
          </>
        ) : this.props.error ? (
          <p>Ingredients have not loaded error.</p>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.authToken !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(burgerBuilderActions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      dispatch(burgerBuilderActions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(burgerBuilderActions.initIngredients());
    },
    onInitPurchase: () => {
      dispatch(orderActions.purchaseInit());
    },
    onSetRedirectPath: (path) => {
      dispatch(authActions.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
