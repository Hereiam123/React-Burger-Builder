import * as Types from "../types/Types";
import axios from "../../axiosInstance";

export const addIngredient = (name) => {
  return {
    type: Types.ADD_INGREDIENTS,
    payload: { ingredientName: name },
  };
};

export const removeIngredient = (name) => {
  return {
    type: Types.REMOVE_INGREDIENTS,
    payload: { ingredientName: name },
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch({
          type: Types.SET_INGREDIENTS,
          payload: { ingredients: response.data },
        });
      })
      .catch((e) => {
        dispatch({
          type: Types.FETCH_INGREDIENTS_FAILED,
        });
      });
    return;
  };
};
