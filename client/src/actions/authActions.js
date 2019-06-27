import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  LOGGING_IN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTERING,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  SET_ERROR_MESSAGE
} from "./types";

const apiUrl = "https://expat-stack.herokuapp.com/api";

const loggingIn = status => ({
  type: LOGGING_IN,
  payload: status
});

const loginFailure = message => ({
  type: LOGIN_FAILURE,
  payload: message
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  payload: message
});

export const loginUser = user => dispatch => {
  dispatch(loggingIn(true));
  const url = `${apiUrl}/users/login`;
  axios
    .post(url, user)
    .then(res => {
      const { token } = res.data;
      const userData = jwtDecode(token);
      localStorage.setItem("token", token);
      const user = {
        id: userData.subject,
        username: userData.username
      };
      dispatch(loginSuccess(user));
    })
    .catch(err => dispatch(loginFailure(err.message)))
    .finally(() => dispatch(loggingIn(false)));
};

// register user
const registeringUser = status => ({
  type: REGISTERING,
  payload: status
});

const registerFailure = status => ({
  type: REGISTER_FAILURE,
  payload: status
});

const registerSuccess = user => ({
  type: REGISTER_SUCCESS,
  payload: user
});

export const registerUser = user => dispatch => {
  dispatch(registeringUser(true));
  const url = `${apiUrl}/users/register`;
  axios
    .post(url, user)
    .then(res => {
      const { token } = res.data;
      const userData = jwtDecode(token);
      localStorage.setItem("token", token);
      const user = {
        id: userData.subject,
        username: userData.username
      };
      dispatch(registerSuccess(user));
    })
    .catch(err => dispatch(registerFailure(err.message)))
    .finally(() => dispatch(registeringUser(false)));
};
