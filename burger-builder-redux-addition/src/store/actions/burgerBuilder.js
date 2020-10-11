import * as Types from "../types/Types";

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
