import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { backlogReducer } from "./backlogReducer";
import { errorReducer } from "./errorReducer";
import { projectReducer } from "./projectReducer";

export default combineReducers({
  project: projectReducer,
  backlog: backlogReducer,
  auth: authReducer,
  errors: errorReducer,
});
