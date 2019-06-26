import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions/types";

const initialState = {
  userId: null,
  username: "",
  loggingIn: false,
  registeringUser: false,
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
        error: action.payload
      };
    case REGISTERING:
      return {
        ...state,
        registeringUser: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        userId: action.payload.id,
        username: action.payload.username
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
