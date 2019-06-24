import {
  FETCHING_STORIES,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from "../actions/types";

const initialState = {
  stories: [],
  fetchingStories: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STORIES:
      return {
        ...state,
        fetchingStories: action.payload
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        stories: action.payload
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
