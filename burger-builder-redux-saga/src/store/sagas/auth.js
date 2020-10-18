import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { firebaseAPIKey } from "../../firebaseAuthKey";
import axios from "axios";
import {
  logoutSucceed,
  logout,
  authStart,
  authSuccess,
  checkAuthTimeout,
  authFail,
} from "../actions/auth";

export function* logoutSaga() {
  yield localStorage.removeItem("burgerToken");
  yield localStorage.removeItem("burgerTokenExpirationDate");
  yield localStorage.removeItem("burgerUserId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  try {
    const response = yield axios.post(url + firebaseAPIKey, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("burgerToken", response.data.idToken);
    yield localStorage.setItem("burgerTokenExpirationDate", expirationDate);
    yield localStorage.setItem("burgerUserId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (e) {
    console.log(e);
    yield put(authFail(e));
  }
}
