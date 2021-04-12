import {
  faPencilAlt,
  faPlus,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import "./TodoForm.css";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

const TodoForm = (props) => {
  const {
    title,
    isAddTodo,
    onFormCloseChild,
    data,
    handleUpdateTodo,
    handleAddTodo,
    todo,
  } = props;

  const [todoName, setTodoName] = useState("");

  const [statusValue, setStatusValue] = useState(-1);

  useEffect(() => {
    setTodoName(todo.name || "");
    setStatusValue(todo.statusValue || -1);
  }, [todo]);

  const handleCloseFormClick = () => {
    onFormCloseChild(0);
  };

  const handleAddTodoClick = () => {
    const dataLocal = JSON.parse(localStorage.getItem("data"));
    const cloneData = [...dataLocal];
    const newTodo = {
      id: uuidv4(),
      name: todoName,
      statusValue,
    };
    cloneData.push(newTodo);
    handleAddTodo(cloneData);
    setTodoName("");
    onFormCloseChild(0);
  };

  const handleUpdateTodoClick = () => {
    const cloneData = data.map((itemTodo) => {
      if (itemTodo.id === todo.id)
        return {
          ...itemTodo,
          name: todoName,
          statusValue,
        };
      return itemTodo;
    });
    handleUpdateTodo(cloneData);
    setTodoName("");
    onFormCloseChild(0);
  };

  const handleTodoNameChange = (e) => {
    // e.target.value = todoName;
    setTodoName(e.target.value);
  };

  const handleTodoStatusChange = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <div className="action-form">
      <div className="action-form__header">
        <h4>{title}</h4>
        <FontAwesomeIcon icon={faTimesCircle} onClick={handleCloseFormClick} />
      </div>
      <div className="action-form__form">
        <div className="form-group">
          <label htmlFor="todoName">Tên</label>
          <input
            id="todoName"
            type="text"
            className="form-control form-name"
            value={todoName}
            placeholder={todo.name}
            onChange={handleTodoNameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="todoStatus">Trạng Thái:</label>
          <select
            id="todoStatus"
            className="form-control select-form"
            name="status"
            onChange={handleTodoStatusChange}
            value={statusValue}
          >
            <option value={-1}>Ẩn</option>
            <option value={1}>Kích hoạt</option>
          </select>
        </div>

        <div className="form-group form-btn form-btn-left">
          {isAddTodo ? (
            <button
              type="button"
              className="btn btn-primary btn-primary-res"
              onClick={handleAddTodoClick}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Tạo mới</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleUpdateTodoClick}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
              <span>Lưu lại</span>
            </button>
          )}
          <button type="button" className="btn btn-danger" onClick={handleCloseFormClick}>
            <FontAwesomeIcon icon={faTimes} />
            <span>Hủy bỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  isAddTodo: PropTypes.bool.isRequired,
  onFormCloseChild: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func,
  handleAddTodo: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  todo: PropTypes.instanceOf(Object),
};

TodoForm.defaultProps = {
  data: [],
  todo: {},
  handleAddTodo: null,
  handleUpdateTodo: null,
};

export default TodoForm;
