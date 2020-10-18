import axios from "../../axiosInstance";
import {
  setIngredients,
  fetchIngredientFailed,
} from "../actions/burgerBuilder";
import { put, call } from "redux-saga/effects";

export function* initIngredientsSaga() {
  try {
    const response = yield call(axios.get, "/ingredients.json");
    yield put(setIngredients(response.data));
  } catch (e) {
    yield put(fetchIngredientFailed());
  }
}
