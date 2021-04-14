import React from "react";
import PropTypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";

const TodoCreateForm = (props) => {
  const {onFormClose, handleAddTodo, handleSetToast, data} = props;

  return (
    <TodoForm
      title="Thêm Công Việc"
      isAddTodo
      onFormCloseChild={onFormClose}
      handleAddTodo={handleAddTodo}
      handleSetToast={handleSetToast}
      data={data}
    />
  );
};

TodoCreateForm.propTypes = {
  onFormClose: PropTypes.func,
  handleAddTodo: PropTypes.func,
  handleSetToast: PropTypes.func,
  data: PropTypes.instanceOf(Array),
};

TodoCreateForm.defaultProps = {
  data: [],
  onFormClose: null,
  handleAddTodo: null,
  handleSetToast: null,
};

export default TodoCreateForm;
