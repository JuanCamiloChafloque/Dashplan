import { SET_CURRENT_USER } from "../actions/types";

const booleanActionPayload = (payload) => {
  if (payload) return true;
  return false;
};

export const authReducer = (state = { user: {}, valid: false }, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        valid: booleanActionPayload(action.payload),
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
