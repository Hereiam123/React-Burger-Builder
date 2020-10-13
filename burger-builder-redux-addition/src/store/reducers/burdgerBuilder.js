import * as Types from "../types/Types";

const initialState = {
  ingredients: null,
  totalPrice: 1.5,
  error: false,
  building: false,
};

//Ingredient Prices for burger item
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 0.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
        building: true,
      };
    case Types.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
        building: true,
      };
    case Types.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        totalPrice: 1.5,
        error: false,
        building: false,
      };
    case Types.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
