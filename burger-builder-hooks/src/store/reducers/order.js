import * as Types from "../types/Types";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case Types.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case Types.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case Types.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case Types.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
