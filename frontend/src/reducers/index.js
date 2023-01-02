import { combineReducers } from "redux";
import { backlogReducer } from "./backlogReducer";
import { errorReducer } from "./errorReducer";
import { projectReducer } from "./projectReducer";

export default combineReducers({
  project: projectReducer,
  backlog: backlogReducer,
  errors: errorReducer,
});
