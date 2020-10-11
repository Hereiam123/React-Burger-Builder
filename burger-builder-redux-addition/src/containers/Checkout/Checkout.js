import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

class Checkout extends Component {
  checkOutCancelled = () => {
    this.props.history.goBack();
  };

  checkOutContinued = () => {
    this.props.history.replace("/checkout/contact-page");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancelled={this.checkOutCancelled}
          onCheckoutContinued={this.checkOutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-page"}
          render={(props) => (
            <ContactData
              ingredients={this.props.ings}
              price={this.props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
