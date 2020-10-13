import * as Types from "../types/Types";
import { firebaseAPIKey } from "../../firebaseAuthKey";
import axios from "axios";

export const authStart = () => {
  return {
    type: Types.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: Types.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: Types.AUTH_FAILED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("burgerToken");
  localStorage.removeItem("burgerTokenExpirationDate");
  localStorage.removeItem("burgerUserId");
  return {
    type: Types.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    axios
      .post(url + firebaseAPIKey, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("burgerToken", response.data.idToken);
        localStorage.setItem("burgerTokenExpirationDate", expirationDate);
        localStorage.setItem("burgerUserId", response.data.displayName);
        dispatch(authSuccess(response.data.idToken, response.data.displayName));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: Types.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("burgerToken");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(
        localStorage.getItem("burgerTokenExpirationDate")
      );
      if (expirationTime > new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("burgerUserId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            expirationTime.getSeconds() - new Date().getSeconds()
          )
        );
      }
    }
  };
};
