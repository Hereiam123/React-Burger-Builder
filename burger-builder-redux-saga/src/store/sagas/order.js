import axios from "../../axiosInstance";
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFailed,
} from "../actions/order";
import { put, call } from "redux-saga/effects";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield call(
      axios.post,
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (e) {
    yield put(purchaseBurgerFailed(e));
  }
}
