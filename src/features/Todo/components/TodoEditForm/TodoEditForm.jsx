import React from "react";
import Proptypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";

const TodoEditForm = (props) => {
  const {onFormClose} = props;
  return (
    <TodoForm
      title="Cập Nhật Công Việc"
      isAddTodo={false}
      onFormCloseChild={onFormClose}
    />
  );
};

TodoEditForm.propTypes = {
  onFormClose: Proptypes.func.isRequired,
};

export default TodoEditForm;
