import * as Types from "../types/Types";
import { firebaseAPIKey } from "../../firebaseAuthKey";
import axios from "axios";

export const authStart = () => {
  return {
    type: Types.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: Types.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: Types.AUTH_FAILED,
    error,
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
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
