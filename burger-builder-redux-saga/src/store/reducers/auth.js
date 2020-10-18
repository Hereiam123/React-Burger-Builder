import * as Types from "../types/Types";

const initialState = {
  authToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.idToken,
        userId: action.userId,
        error: null,
      };
    case Types.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case Types.AUTH_LOGOUT:
      return {
        ...state,
        authToken: null,
        userId: null,
      };
    case Types.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirect: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
