import _ from "lodash";
import {
  ACTION_ADD_EDIT_CLICK,
  ADD_TODO,
  CHANGE_STATUS_TODO,
  DELETE_TODO,
  FILTER_SEARCH_TODO,
  FILTER_STATUS_TODO,
  FILTER_TODO,
  SEARCH_TODO,
  SET_TOAST_ACTION,
  SORT_TODO_DOWN,
  SORT_TODO_HIDDEN,
  SORT_TODO_TRIGGER,
  SORT_TODO_UP,
  UPDATE_TODO,
} from "../constants/actionType";
import stringToSlug from "../constants/slugify";

const dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));

const initialState = {
  todos: dataFromLocalStorage || [],
  toast: {
    type: "",
    messsage: "",
    isOpen: false,
  },
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const todos = dataFromLocalStorage;
      const {todos: stateTodos} = state;
      const newTodos = [...todos, action.payload];
      localStorage.setItem("data", JSON.stringify(newTodos));
      return {
        ...state,
        todos: [...stateTodos, action.payload],
      };
    }
    case UPDATE_TODO: {
      const todos = dataFromLocalStorage;
      const {todos: stateTodos} = state;
      const todosAfterUpdate = todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      localStorage.setItem("data", JSON.stringify(todosAfterUpdate));
      return {
        ...state,
        todos: stateTodos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    }

    case DELETE_TODO: {
      const {todos} = state;
      const newTodos = todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("data", JSON.stringify(newTodos));
      return {
        ...state,
        todos: newTodos,
      };
    }
    case SORT_TODO_DOWN: {
      const {todos} = state;
      const newTodos = _.cloneDeep(todos);
      newTodos.sort((a, b) => (stringToSlug(a.name) > stringToSlug(b.name) ? 1 : -1));
      return {
        ...state,
        todos: newTodos,
      };
    }
    case SORT_TODO_UP: {
      // const {todos} = dataFromLocalStorage;
      const newTodos = _.cloneDeep(dataFromLocalStorage);
      newTodos.sort((a, b) => (stringToSlug(a.name) < stringToSlug(b.name) ? 1 : -1));
      return {
        ...state,
        todos: newTodos,
      };
    }
    case SORT_TODO_HIDDEN: {
      // const {todos} = dataFromLocalStorage;
      const todos = [...dataFromLocalStorage];
      const filterTodoTrigger = todos.filter((todo) => Number(todo.statusValue) === 1);

      const filterTodoHidden = todos.filter((todo) => Number(todo.statusValue) === -1);

      return {
        ...state,
        todos: [...filterTodoHidden, ...filterTodoTrigger],
      };
    }
    case SORT_TODO_TRIGGER: {
      const todos = dataFromLocalStorage;
      const filterTodoTrigger = todos.filter((todo) => Number(todo.statusValue) === 1);

      const filterTodoHidden = todos.filter((todo) => Number(todo.statusValue) === -1);

      return {
        ...state,
        todos: [...filterTodoTrigger, ...filterTodoHidden],
      };
    }
    case SEARCH_TODO: {
      const todos = JSON.parse(localStorage.getItem("data"));
      const searchValue = action.payload;
      const todosAfterSearch = searchValue
        ? todos.filter((todo) =>
            stringToSlug(todo.name).includes(stringToSlug(searchValue))
          )
        : todos;
      return {
        ...state,
        todos: todosAfterSearch,
      };
    }
    case FILTER_TODO: {
      const {todos} = state;
      const {filterName, filterStatus} = action.payload;
      let filterTodos = todos.filter((todo) =>
        stringToSlug(todo.name)
          .toLowerCase()
          .includes(stringToSlug(filterName).toLowerCase())
      );
      filterTodos = filterTodos.filter((todo) => {
        if (Number(filterStatus) === 0) return todo;
        return Number(todo.statusValue) === Number(filterStatus);
      });
      return {
        ...state,
        todos: filterTodos,
      };
    }
    case FILTER_SEARCH_TODO:
      return state;
    case FILTER_STATUS_TODO:
      return state;
    case CHANGE_STATUS_TODO: {
      const {todos} = state;

      const newTodos = todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

      localStorage.setItem("data", JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos,
      };
    }

    case ACTION_ADD_EDIT_CLICK: {
      return {
        ...state,
        isActionTodo: action.payload,
      };
    }

    case SET_TOAST_ACTION: {
      return {
        ...state,
        toast: action.payload,
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
