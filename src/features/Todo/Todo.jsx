import React, {useEffect} from "react";
import {connect} from "react-redux";
import Proptypes from "prop-types";
import TodoCreateForm from "./components/TodoCreateForm/TodoCreateForm";
import TodoEditForm from "./components/TodoEditForm/TodoEditForm";
import TodoHeaderAction from "./components/TodoHeaderAction/TodoHeaderAction";
import TodoTableList from "./components/TodoTableList/TodoTableList";
import "./Todo.css";
import Toastify from "../../commons/components/Toastify";
import {
  sortTodoDown,
  sortTodoHidden,
  sortTodoTrigger,
  sortTodoUp,
} from "../../actions/todoActions";

const Todo = (props) => {
  const {
    dispatchSortTodoDown,
    dispatchSortTodoUp,
    dispatchSortTodoHidden,
    dispatchSortTodoTrigger,
    isActionTodo,
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

  const renderAction = (value) => (value === 2 ? <TodoEditForm /> : <TodoCreateForm />);

  return (
    <div className="container">
      <div className="todo-header">
        <h1>Quản lý công việc</h1>
      </div>

      <div className={isActionTodo ? "form-wrap" : "form-wrap hidden-form"}>
        {isActionTodo ? (
          <div className="left-form">{renderAction(isActionTodo)}</div>
        ) : (
          ""
        )}
        <div className="right-form">
          <TodoHeaderAction />

          <TodoTableList />
        </div>
      </div>
      <Toastify />
    </div>
  );
};

Todo.propTypes = {
  isActionTodo: Proptypes.number,
  numberCheckSort: Proptypes.number,
  dispatchSortTodoDown: Proptypes.func,
  dispatchSortTodoUp: Proptypes.func,
  dispatchSortTodoHidden: Proptypes.func,
  dispatchSortTodoTrigger: Proptypes.func,
};

Todo.defaultProps = {
  isActionTodo: 0,
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
