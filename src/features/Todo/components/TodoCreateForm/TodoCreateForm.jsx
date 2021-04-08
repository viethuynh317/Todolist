import React from "react";
import Proptypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";

const TodoCreateForm = (props) => {
  const {onFormClose} = props;

  return (
    <TodoForm title="Thêm Công Việc" isAddTodo onFormCloseChild={onFormClose} />
    // isAddTodo <==> isAddTodo={true}
  );
};

TodoCreateForm.propTypes = {
  onFormClose: Proptypes.func.isRequired,
};

export default TodoCreateForm;
