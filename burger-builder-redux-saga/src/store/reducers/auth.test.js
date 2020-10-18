import reducer from "./auth";
import * as actionTypes from "../types/Types";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      authToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirect: "/",
    });
  });

  it("should store token on login", () => {
    expect(
      reducer(
        {
          authToken: null,
          userId: null,
          error: null,
          loading: false,
          authRedirect: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "someToken",
          userId: "someID",
        }
      )
    ).toEqual({
      authToken: "someToken",
      userId: "someID",
      error: null,
      loading: false,
      authRedirect: "/",
    });
  });
});
