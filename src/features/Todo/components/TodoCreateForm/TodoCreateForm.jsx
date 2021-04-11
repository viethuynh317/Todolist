import React from "react";
import PropTypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";

const TodoCreateForm = (props) => {
  const {onFormClose, handleAddTodo, data} = props;

  return (
    <TodoForm
      title="Thêm Công Việc"
      isAddTodo
      onFormCloseChild={onFormClose}
      handleAddTodo={handleAddTodo}
      data={data}
    />
  );
};

TodoCreateForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
};

TodoCreateForm.defaultProps = {
  data: [],
};

export default TodoCreateForm;
