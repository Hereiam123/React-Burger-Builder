import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { logoutSucceed, logout } from "../actions/auth";

export function* logoutSaga(action) {
  yield localStorage.removeItem("burgerToken");
  yield localStorage.removeItem("burgerTokenExpirationDate");
  yield localStorage.removeItem("burgerUserId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}
