import { combineReducers } from "redux";
import calendar from "./calendar";
import modal from "./modal";
import schedule from "./schedule";
import restDay from "./restDay";

const rootReducer = combineReducers({
  calendar,
  schedule,
  restDay,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
