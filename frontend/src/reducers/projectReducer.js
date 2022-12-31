import { GET_PROJECTS, GET_PROJECT } from "../actions/types";

export const projectReducer = (
  state = { projects: [], project: {} },
  action
) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return {
        ...state,
        projects: action.payload,
      };
    }

    case GET_PROJECT: {
      return {
        ...state,
        project: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
