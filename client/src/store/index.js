import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import stories from "../reducers/storiesReducer";
import auth from "../reducers/authReducer";

const reducers = combineReducers({
  stories,
  auth
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
