import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Checkout = (props) => {
  const checkOutCancelled = () => {
    props.history.goBack();
  };

  const checkOutContinued = () => {
    props.history.replace("/checkout/contact-page");
  };

  return (
    <div>
      {props.ings && !props.purchased ? (
        <>
          <CheckoutSummary
            ingredients={props.ings}
            onCheckoutCancelled={checkOutCancelled}
            onCheckoutContinued={checkOutContinued}
          />
          <Route
            path={props.match.path + "/contact-page"}
            component={ContactData}
          />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
