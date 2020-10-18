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

export const fetchIngredientFailed = () => {
  return {
    type: Types.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: Types.SET_INGREDIENTS,
    ingredients,
  };
};

export const initIngredients = () => {
  return {
    type: Types.INIT_SET_INGREDIENTS,
  };
};
