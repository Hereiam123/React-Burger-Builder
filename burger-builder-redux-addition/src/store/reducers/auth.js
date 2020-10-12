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
      return {
        ...state,
        loading: false,
        authToken: action.idToken,
        userId: action.displayName,
        error: null,
      };
    case Types.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default reducer;
