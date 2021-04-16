import {
  faPencilAlt,
  faPlus,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import "./TodoForm.css";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import stringToSlug from "../../../constants/slugify";

const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc"),
});

const TodoForm = (props) => {
  const {
    title,
    isAddTodo,
    onFormCloseChild,
    data,
    handleUpdateTodo,
    handleAddTodo,
    handleSetToast,
    todo,
  } = props;

  const {register, handleSubmit, errors} = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [todoName, setTodoName] = useState("");
  const [statusValue, setStatusValue] = useState(-1);

  useEffect(() => {
    setTodoName(todo.name);
    setStatusValue(todo.statusValue || -1);
  }, [todo]);

  const handleCloseFormClick = () => {
    onFormCloseChild(0);
  };

  const handleAddTodoClick = (myData) => {
    const dataLocal = JSON.parse(localStorage.getItem("data")) || [];
    const cloneData = [...dataLocal];
    const isName = cloneData.some(
      (todoItem) => stringToSlug(todoItem.name) === stringToSlug(myData.name)
    );
    if (!isName) {
      const newTodo = {
        id: uuidv4(),
        name: myData.name,
        statusValue,
      };
      cloneData.push(newTodo);
      handleAddTodo(cloneData);
      handleSetToast({
        type: "success",
        message: `Tạo mới công việc thành công`,
        isOpen: true,
      });
    } else {
      handleSetToast({
        type: "error",
        message: `Công việc ${myData.name} đã tồn tại`,
        isOpen: true,
      });
    }

    onFormCloseChild(0);
  };

  const handleUpdateTodoClick = (myData) => {
    setTodoName(myData.name);
    const isName = data.some(
      (todoItem) => stringToSlug(todoItem.name) === stringToSlug(myData.name)
    );

    const prevTodo = data.find(
      (todoItem) => stringToSlug(todoItem.name) === stringToSlug(myData.name)
    );

    const isStatus = prevTodo
      ? Number(statusValue) === Number(prevTodo.statusValue)
      : true;

    if (!isStatus || !isName) {
      const cloneData = data.map((itemTodo) => {
        if (itemTodo.id === todo.id)
          return {
            ...itemTodo,
            name: myData.name,
            statusValue,
          };
        return itemTodo;
      });
      handleUpdateTodo(cloneData);
      handleSetToast({
        type: "success",
        message: `Cập nhật công việc ${myData.name} thành công`,
        isOpen: true,
      });
    } else {
      handleSetToast({
        type: "error",
        message: `Công việc ${myData.name} đã tồn tại`,
        isOpen: true,
      });
    }

    onFormCloseChild(0);
  };

  const handleTodoNameChange = (e) => {
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
        <div className={errors.name ? "form-group form-errors" : "form-group"}>
          <label htmlFor="todoName">Tên</label>
          <input
            id="todoName"
            type="text"
            name="name"
            className="form-control form-name"
            placeholder={todoName}
            onChange={handleTodoNameChange}
            ref={register}
          />
          {errors.name?.message && <span>{errors.name?.message}</span>}
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
              onClick={handleSubmit(handleAddTodoClick)}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Tạo mới</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleSubmit(handleUpdateTodoClick)}
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
  onFormCloseChild: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleAddTodo: PropTypes.func,
  handleSetToast: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  todo: PropTypes.instanceOf(Object),
};

TodoForm.defaultProps = {
  data: [],
  todo: {},
  handleAddTodo: null,
  handleUpdateTodo: null,
  onFormCloseChild: null,
  handleSetToast: null,
};

export default TodoForm;
