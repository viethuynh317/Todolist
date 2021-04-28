import {LinearProgress} from "@material-ui/core";
import Proptypes from "prop-types";
import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {
  sortTodoDown,
  sortTodoHidden,
  sortTodoTrigger,
  sortTodoUp,
} from "../../actions/todoActions";
import Toastify from "../../commons/components/Toastify";
import "./Todo.css";

const Todo = (props) => {
  const {
    dispatchSortTodoDown,
    dispatchSortTodoUp,
    dispatchSortTodoHidden,
    dispatchSortTodoTrigger,
    children,
    numberCheckSort,
  } = props;

  useEffect(() => {
    switch (numberCheckSort) {
      case 0:
        dispatchSortTodoDown();
        break;
      case 1:
        dispatchSortTodoUp();
        break;
      case 2: {
        dispatchSortTodoTrigger();
        break;
      }
      case 3: {
        dispatchSortTodoHidden();
        break;
      }
      default:
        dispatchSortTodoDown();
    }
  }, [numberCheckSort]);

  return (
    <div className="container">
      <div className="todo-header">
        <h1>Quản lý công việc</h1>
      </div>

      <Suspense fallback={<LinearProgress />}>{children}</Suspense>
      <Toastify />
    </div>
  );
};

Todo.propTypes = {
  children: Proptypes.element,
  numberCheckSort: Proptypes.number,
  dispatchSortTodoDown: Proptypes.func,
  dispatchSortTodoUp: Proptypes.func,
  dispatchSortTodoHidden: Proptypes.func,
  dispatchSortTodoTrigger: Proptypes.func,
};

Todo.defaultProps = {
  children: null,
  numberCheckSort: 0,
  dispatchSortTodoDown: null,
  dispatchSortTodoUp: null,
  dispatchSortTodoHidden: null,
  dispatchSortTodoTrigger: null,
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  isActionTodo: state.todos.isActionTodo,
  numberCheckSort: state.actionTodos.numberCheckSort,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSortTodoDown() {
    dispatch(sortTodoDown());
  },
  dispatchSortTodoUp() {
    dispatch(sortTodoUp());
  },
  dispatchSortTodoHidden() {
    dispatch(sortTodoHidden());
  },
  dispatchSortTodoTrigger() {
    dispatch(sortTodoTrigger());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
