import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    navigate("/");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/project/all");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjectById = (id) => async (dispatch) => {
  try {
    const res = await axios.get("/api/project/" + id);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
