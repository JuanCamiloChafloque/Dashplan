import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const createNewUser = (newUser, navigate) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    navigate("/login");
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
