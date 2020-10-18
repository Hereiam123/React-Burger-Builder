import { takeEvery } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import * as actionTypes from "../types/Types";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INITIAL, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_SET_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
