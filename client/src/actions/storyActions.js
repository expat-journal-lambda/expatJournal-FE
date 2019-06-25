import axios from "axios";
import {
  FETCHING_STORIES,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETING_STORIES
} from "./types";

const apiUrl = "https://expat-stack.herokuapp.com/api";

// FETCH STORIES
const fetchSuccess = friends => ({
  type: FETCH_SUCCESS,
  payload: friends
});

const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error
});

const fetching = status => ({
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

// DELETE STORIES
const deleteSuccess = stories => ({
  type: DELETE_SUCCESS,
  payload: stories
});

const deleteFailure = error => ({
  type: DELETE_FAILURE,
  payload: error
});

const deleting = status => ({
  type: DELETING_STORIES,
  payload: status
});

export const deleteStory = id => dispatch => {
  const url = `${apiUrl}/stories/delete/${id}`;
  dispatch(deleting(true));
  axios
    .delete(url)
    .then(res => {
      dispatch(fetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(deleteFailure(err.message));
    })
    .finally(() => dispatch(deleting(false)));
};
