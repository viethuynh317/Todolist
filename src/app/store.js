import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSlice";

const rootReducer = {
  todos: todoReducer,
};

export default configureStore({
  reducer: rootReducer,
});
