import axios from "../../axiosInstance";
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFailed,
} from "../actions/order";
import { put } from "redux-saga/effects";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (e) {
    yield put(purchaseBurgerFailed(e));
  }
}
