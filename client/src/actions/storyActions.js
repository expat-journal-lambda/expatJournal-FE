import axios from "axios";
import {
  FETCHING_STORIES,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETING_STORIES,
  ADD_FAILURE,
  ADDING_STORY,
  ADD_SUCCESS,
  GET_FAILURE,
  GETTING_STORY,
  GET_SUCCESS,
  EDITING_STORY,
  UPDATING_STORY,
  UPDATE_FAILURE,
  UPDATE_SUCCESS
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
const deleteSuccess = status => ({
  type: DELETE_SUCCESS,
  payload: status
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
      dispatch(deleteSuccess());
      dispatch(fetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(deleteFailure(err.message));
    })
    .finally(() => dispatch(deleting(false)));
};

// ADD STORY
const addSuccess = status => ({
  type: ADD_SUCCESS,
  payload: status
});

const addFailure = error => ({
  type: ADD_FAILURE,
  payload: error
});

const adding = status => ({
  type: ADDING_STORY,
  payload: status
});

export const addStory = story => dispatch => {
  const url = `${apiUrl}/stories/new`;
  dispatch(adding(true));
  axios
    .post(url, story)
    .then(res => {
      dispatch(addSuccess(false));
      dispatch(fetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(addFailure(err.message));
    })
    .finally(() => dispatch(adding(false)));
};

// GET STORY
const getStorySuccess = error => ({
  type: GET_SUCCESS,
  payload: error
});

export const editingStory = status => ({
  type: EDITING_STORY,
  payload: status
});

const getStoryFailure = error => ({
  type: GET_FAILURE,
  payload: error
});

const gettingStory = status => ({
  type: GETTING_STORY,
  payload: status
});

export const getStory = id => dispatch => {
  const url = `${apiUrl}/stories/byId/${id}`;

  dispatch(gettingStory(true));
  axios
    .get(url)
    .then(res => dispatch(getStorySuccess(res.data.id)))
    .catch(err => {
      dispatch(getStoryFailure(err.message));
    })
    .finally(() => dispatch(gettingStory(false)));
};

// GET STORY
const updateSuccess = error => ({
  type: UPDATE_SUCCESS,
  payload: error
});

const updateFailure = error => ({
  type: UPDATE_FAILURE,
  payload: error
});

const updatingStory = status => ({
  type: UPDATING_STORY,
  payload: status
});

export const updateStory = story => dispatch => {
  const url = `${apiUrl}/stories/update/${story.id}`;
  dispatch(updatingStory(true));
  axios
    .put(url, story)
    .then(res => {
      dispatch(updateSuccess(false));
      dispatch(fetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(updateFailure(err.message));
    })
    .finally(() => dispatch(updatingStory(false)));
};
