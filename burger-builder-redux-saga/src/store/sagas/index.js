import { takeEvery } from "redux-saga/effects";
import { logoutSaga, checkAuthTimeoutSaga } from "./auth";
import * as actionTypes from "../types/Types";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
