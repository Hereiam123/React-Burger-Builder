import * as Types from "../types/Types";

const initialState = {
  authToken: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case Types.AUTH_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        authToken: action.authData.idToken,
        userId: action.authData.displayName,
        error: null,
      };
    case Types.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
