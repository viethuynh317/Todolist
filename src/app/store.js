import {combineReducers, createStore} from "@reduxjs/toolkit";
import actionReducer from "../reducers/actionReducer";
import todoReducer from "../reducers/todoReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  actionTodos: actionReducer,
});

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
