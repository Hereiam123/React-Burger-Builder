import { put } from "redux-saga/effects";
import * as Types from "../types/Types";

export function* logoutSaga(action) {
  yield localStorage.removeItem("burgerToken");
  yield localStorage.removeItem("burgerTokenExpirationDate");
  yield localStorage.removeItem("burgerUserId");
  yield put({
    type: Types.AUTH_LOGOUT,
  });
}
