import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.authToken !== null;
  });

  const onIngredientAdded = (ingName) =>
    dispatch(burgerBuilderActions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(burgerBuilderActions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(orderActions.purchaseInit());
  const onSetRedirectPath = (path) =>
    dispatch(authActions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  /*Check if less button should be disabled for ingredient controls*/
  const disabled = {
    ...ings,
  };
  for (let key in disabled) {
    disabled[key] = disabled[key] <= 0;
  }
  /*****************************************************************/
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {ings && (
          <OrderSummary
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purcahseContinued={purchaseContinueHandler}
            price={price}
          />
        )}
      </Modal>
      {ings ? (
        <>
          <Burger ingredients={ings} />
          <BuildControls
            price={price}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            isAuth={isAuthenticated}
            disabled={disabled}
            purchasable={price > 0}
            ordering={purchaseHandler}
          />
        </>
      ) : error ? (
        <p>Ingredients have not loaded error.</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
