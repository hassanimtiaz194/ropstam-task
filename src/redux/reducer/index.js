import { combineReducers } from "redux";
import carsReducer from "./carsReducer";
import loginReducer from "./loginReducer";
import categoryReducer from "./categoryReducer";
export const initialState = {
  
};

const appReducer = combineReducers({
  login: loginReducer,
  cars: carsReducer,
  category: categoryReducer,
});

const rootReducer = (state, action) => {
  /*   if (action.type === LOGOUT) {
      const href = action.payload;
      window.location.href = href || "/login";
      return initialState;
    } */
  return appReducer(state, action);
};


export default rootReducer;