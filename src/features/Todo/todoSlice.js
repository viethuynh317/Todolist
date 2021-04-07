import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo() {},
  },
});

const {reducer: todoReducer, actions} = todoSlice;
export const {state, action} = actions;

export default todoReducer;
