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

export const purchaseBurger = (orderData) => {
  return (disptach) => {
    disptach(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        disptach(purchaseBurgerSuccess(response.name, orderData));
      })
      .catch((err) => {
        disptach(purchaseBurgerFailed(err));
      });
  };
};
