import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    navigate("/dashboard");
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

export const getProjectById = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get("/api/project/" + id);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    navigate("/dashboard");
  }
};

export const deleteProjectById = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it!"
    )
  ) {
    await axios.delete("/api/project/" + id);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
