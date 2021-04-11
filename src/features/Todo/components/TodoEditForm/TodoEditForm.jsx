import React from "react";
import PropTypes from "prop-types";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";


const TodoEditForm = (props) => {
  const {onFormClose, data, handleUpdateTodo, todo} = props;
  return (
    <TodoForm
      title="Cập Nhật Công Việc"
      isAddTodo={false}
      onFormCloseChild={onFormClose}
      data={data}
      todo={todo}
      handleUpdateTodo={handleUpdateTodo}
    />
  );
};

TodoEditForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
  todo: PropTypes.instanceOf(Object),
};

TodoEditForm.defaultProps = {
  data: [],
  todo: {}
}

export default TodoEditForm;
