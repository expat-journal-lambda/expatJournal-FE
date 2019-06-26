import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

const initialState = {
  userId: null,
  username: "",
  loggingIn: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        loggingIn: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.id,
        username: action.payload.username
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
