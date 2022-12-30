import axios from "axios";
import { GET_ERRORS } from "./types";

export const createProject = (project) => async (dispatch) => {
  try {
    const res = await axios.post("/api/project", project);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
