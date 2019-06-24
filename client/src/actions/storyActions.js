import axios from "axios";
import { FETCHING_STORIES, FETCH_FAILURE, FETCH_SUCCESS } from "./types";

const apiUrl = "https://expat-stack.herokuapp.com/api";

export const fetchSuccess = friends => ({
  type: FETCH_SUCCESS,
  payload: friends
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error
});

export const fetching = status => ({
  type: FETCHING_STORIES,
  payload: status
});

export const fetchStories = () => dispatch => {
  const url = `${apiUrl}/stories`;
  dispatch(fetching(true));
  axios
    .get(url)
    .then(res => {
      dispatch(fetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchFailure(err.message));
    })
    .finally(() => dispatch(fetching(false)));
};
