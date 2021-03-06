import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axiosInstance";
import withErroHandler from "../withErrorHandler/withErrorHandler";
import * as orderActions from "../../store/actions/order";

class Orders extends Component {
  componentDidMount() {
    this.props.onInitFetchOrders(this.props.authToken, this.props.userId);
  }
  render() {
    return (
      <div>
        {!this.props.loading ? (
          this.props.orders.map((order) => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    authToken: state.auth.authToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitFetchOrders: (token, userId) => {
      dispatch(orderActions.fetchOrders(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErroHandler(Orders, axios));
