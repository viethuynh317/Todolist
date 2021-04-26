import {
  ADD_TODO,
  CHANGE_STATUS_TODO,
  DELETE_TODO,
  FILTER_SEARCH_TODO,
  FILTER_STATUS_TODO,
  SEARCH_TODO,
  SORT_TODO_DOWN,
  SORT_TODO_HIDDEN,
  SORT_TODO_TRIGGER,
  SORT_TODO_UP,
  UPDATE_TODO,
  ACTION_ADD_EDIT_CLICK,
  CHANGE_NUMBER_SORT,
  SET_TOAST_ACTION,
  UPDATE_DELETE_TODO,
} from "../constants/actionType";

export const addTodo = (data) => ({
  type: ADD_TODO,
  payload: data,
});

export const updateTodo = (data) => ({
  type: UPDATE_TODO,
  payload: data,
});

export const deleteTodo = (data) => ({
  type: DELETE_TODO,
  payload: data,
});

export const sortTodoDown = () => ({
  type: SORT_TODO_DOWN,
});

export const sortTodoUp = () => ({
  type: SORT_TODO_UP,
});

export const sortTodoHidden = () => ({
  type: SORT_TODO_HIDDEN,
});

export const sortTodoTrigger = () => ({
  type: SORT_TODO_TRIGGER,
});

export const searchTodo = (data) => ({
  type: SEARCH_TODO,
  payload: data,
});

export const filterSearchTodo = (data) => ({
  type: FILTER_SEARCH_TODO,
  payload: data,
});

export const filterStatusTodo = (data) => ({
  type: FILTER_STATUS_TODO,
  payload: data,
});

export const filterTodo = (data) => ({
  type: FILTER_STATUS_TODO,
  payload: data,
});

export const changeStatusTodo = (data) => ({
  type: CHANGE_STATUS_TODO,
  payload: data,
});

export const actionAddOrEditClick = (number) => ({
  type: ACTION_ADD_EDIT_CLICK,
  payload: number,
});

export const changeNumberSort = (number) => ({
  type: CHANGE_NUMBER_SORT,
  payload: number,
});

export const setToastAction = (toast) => ({
  type: SET_TOAST_ACTION,
  payload: toast,
});

export const deleteOrUpdateTodo = (todo) => ({
  type: UPDATE_DELETE_TODO,
  payload: todo,
});
