import axios from "axios";
import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  GET_ERRORS,
} from "./types";

export const addProjectTask =
  (backlog_id, projectTask, navigate) => async (dispatch) => {
    try {
      await axios.post("/api/backlog/" + backlog_id, projectTask);
      navigate("/board/" + backlog_id);
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
