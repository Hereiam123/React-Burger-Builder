import React, { useEffect, useState } from "react";
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

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  /*Check if less button should be disabled for ingredient controls*/
  const disabled = {
    ...props.ings,
  };
  for (let key in disabled) {
    disabled[key] = disabled[key] <= 0;
  }
  /*****************************************************************/
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {props.ings && (
          <OrderSummary
            ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandler}
            purcahseContinued={purchaseContinueHandler}
            price={props.price}
          />
        )}
      </Modal>
      {props.ings ? (
        <>
          <Burger ingredients={props.ings} />
          <BuildControls
            price={props.price}
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            isAuth={props.isAuthenticated}
            disabled={disabled}
            purchasable={props.price > 0}
            ordering={purchaseHandler}
          />
        </>
      ) : props.error ? (
        <p>Ingredients have not loaded error.</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

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
