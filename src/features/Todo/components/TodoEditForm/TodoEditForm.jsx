import React from "react";
import PropTypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";

const TodoEditForm = (props) => {
  const {onFormClose, data, handleUpdateTodo, todo, handleSetToast} = props;
  return (
    <TodoForm
      title="Cập Nhật Công Việc"
      isAddTodo={false}
      onFormCloseChild={onFormClose}
      data={data}
      todo={todo}
      handleSetToast={handleSetToast}
      handleUpdateTodo={handleUpdateTodo}
    />
  );
};

TodoEditForm.propTypes = {
  onFormClose: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleSetToast: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  todo: PropTypes.instanceOf(Object),
};

TodoEditForm.defaultProps = {
  data: [],
  todo: {},
  onFormClose: null,
  handleUpdateTodo: null,
  handleSetToast: null,
};

export default TodoEditForm;
