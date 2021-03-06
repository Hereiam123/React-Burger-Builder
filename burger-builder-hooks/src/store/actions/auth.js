import * as Types from "../types/Types";

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
  return {
    type: Types.AUTH_INIIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: Types.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: Types.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: Types.AUTH_USER,
    email,
    password,
    isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: Types.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: Types.AUTH_CHECK_INITIAL,
  };
};
