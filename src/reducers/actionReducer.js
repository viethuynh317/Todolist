import {CHANGE_NUMBER_SORT, UPDATE_DELETE_TODO} from "../constants/actionType";

const initialState = {
  numberCheckSort: 0,
  todo: {},
};

const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NUMBER_SORT: {
      return {
        ...state,
        numberCheckSort: action.payload,
      };
    }

    case UPDATE_DELETE_TODO: {
      return {
        ...state,
        todo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default actionReducer;
