import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import stories from "../reducers/storiesReducer";
import auth from "../reducers/authReducer";

const reducers = combineReducers({
  stories,
  auth
});
const enhanceComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export default createStore(
  reducers,
  enhanceComposer(applyMiddleware(thunk, logger))
);
