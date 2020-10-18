import axios from "../../axiosInstance";
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFailed,
  fetchOrdersSuccess,
  fetchOrdersStart,
  fetchOrdersFail,
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

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo=' +
    '"' +
    action.userId +
    '"';
  try {
    const response = yield call(axios.get, "/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (e) {
    yield put(fetchOrdersFail(e));
  }
}
