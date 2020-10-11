import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 1,
    cheese: 0,
  },
  totalPrice: 1.5,
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
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
      };
    default:
      return state;
  }
};

export default reducer;
