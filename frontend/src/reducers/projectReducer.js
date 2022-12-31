import { GET_PROJECTS } from "../actions/types";

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

    default: {
      return state;
    }
  }
};
