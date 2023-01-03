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

export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const res = await axios.get("/api/backlog/" + backlog_id);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getPTbyBacklogId =
  (backlog_id, pt_id, navigate) => async (dispatch) => {
    try {
      const res = await axios.get("/api/backlog/" + backlog_id + "/" + pt_id);
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      });
    } catch (err) {
      navigate("/dashboard");
    }
  };

export const updatePTbyBacklogId =
  (backlog_id, pt_id, projectTask, navigate) => async (dispatch) => {
    try {
      await axios.patch(
        "/api/backlog/" + backlog_id + "/" + pt_id,
        projectTask
      );
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

export const deletePTbyBacklogId = (backlog_id, pt_id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the project task and cannot be undone!"
    )
  ) {
    await axios.delete("/api/backlog/" + backlog_id + "/" + pt_id);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: pt_id,
    });
  }
};
