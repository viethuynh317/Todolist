import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, {useEffect, useRef} from "react";

const TodoListItem = (props) => {
  const {
    onEditClick,
    preValueForm,
    todo,
    numericalOrder,
    handleDeleteTodo,
    handleChangeStatusTodo,
    handleFormClose,
  } = props;

  const {name, statusValue} = todo;

  const rememberIdRef = useRef();

  useEffect(() => {
    rememberIdRef.current = todo.id;
  });

  const handleEditClick = (editTodo) => {
    if (preValueForm === 1)
      onEditClick({
        todo: editTodo,
        value: 2,
      });
    else if (preValueForm === 0)
      onEditClick({
        todo: editTodo,
        value: 2,
      });
    else
      onEditClick({
        todo: editTodo,
        value: 2,
      });
  };

  const handleDeleteClick = (deleteTodo) => {
    handleDeleteTodo(deleteTodo);
    handleFormClose(0);
  };

  const handleChangeStatusClick = () => {
    handleChangeStatusTodo({
      ...todo,
      statusValue: statusValue === 1 ? -1 : 1,
    });
  };

  return (
    <tr>
      <td>{numericalOrder}</td>
      <td>{name}</td>
      <td>
        {Number(statusValue) === 1 ? (
          <div
            className="trigger-status"
            onClick={handleChangeStatusClick}
            aria-hidden="true"
          >
            <span>Kích hoạt</span>
          </div>
        ) : (
          <div
            className="hidden-status"
            onClick={handleChangeStatusClick}
            aria-hidden="true"
          >
            <span>Ẩn</span>
          </div>
        )}
      </td>
      <td>
        <div
          className={
            preValueForm ? "form-group form-btn form-btn-respon" : "form-group form-btn"
          }
        >
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => handleEditClick(todo)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
            <span>Sửa</span>
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteClick(todo)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Xóa</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

TodoListItem.propTypes = {
  onEditClick: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleChangeStatusTodo: PropTypes.func,
  handleFormClose: PropTypes.func,
  preValueForm: PropTypes.number.isRequired,
  numericalOrder: PropTypes.number.isRequired,
  todo: PropTypes.instanceOf(Object),
};

TodoListItem.defaultProps = {
  todo: {},
  onEditClick: null,
  handleDeleteTodo: null,
  handleChangeStatusTodo: null,
  handleFormClose: null,
};

export default TodoListItem;
