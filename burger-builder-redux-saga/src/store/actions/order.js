import * as Types from "../types/Types";
import axios from "../../axiosInstance";

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
  return (disptach) => {
    disptach(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        disptach(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        disptach(purchaseBurgerFailed(err));
      });
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
  return (disptach) => {
    disptach(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo=' + '"' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        disptach(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        disptach(fetchOrdersFail(err));
      });
  };
};
