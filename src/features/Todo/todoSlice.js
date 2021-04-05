import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {

  }
}
);

const {reducer: todoReducer, actions} = todoSlice;
export const {} = actions;

export default todoReducer;