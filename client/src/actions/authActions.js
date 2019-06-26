import axios from "axios";
import { LOGGING_IN, LOGIN_FAILURE } from "./types";

const apiUrl = "https://expat-stack.herokuapp.com/api";

const loggingIn = status => ({
  type: LOGGING_IN,
  payload: status
});

const loginFailure = status => ({
  type: LOGIN_FAILURE,
  payload: status
});

export const loginUser = user => dispatch => {
  dispatch(loggingIn(true));
  const url = `${apiUrl}/users/login`;
  axios
    .post(url, user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
    })
    .catch(err => dispatch(loginFailure(err.message)))
    .finally(() => dispatch(loggingIn(false)));
};
