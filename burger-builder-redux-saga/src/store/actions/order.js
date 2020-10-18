import * as Types from "../types/Types";

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: Types.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: order,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: Types.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: Types.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: Types.PURCHASE_BURGER,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: Types.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: Types.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: Types.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: Types.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: Types.FETCH_ORDERS,
    token,
    userId,
  };
};
