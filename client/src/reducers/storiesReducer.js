import {
  FETCHING_STORIES,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADDING_STORY,
  ADD_FAILURE,
  ADD_SUCCESS
} from "../actions/types";

const initialState = {
  stories: [],
  fetchingStories: false,
  addingStory: false,
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

    case ADDING_STORY:
      return {
        ...state,
        addingStory: action.payload
      };
    case ADD_SUCCESS:
      return {
        ...state,
        addingStory: action.payload
      };
    case ADD_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
