import {
  faPencilAlt,
  faPlus,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import * as yup from "yup";
import {
  actionAddOrEditClick,
  addTodo,
  setToastAction,
  updateTodo,
} from "../../../actions/todoActions";
import stringToSlug from "../../../constants/slugify";
import "./TodoForm.css";

const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc"),
});

const TodoForm = (props) => {
  const {
    todos: data,
    todo,
    dispatchAddTodo,
    dispatchUpdateTodo,
    dispatchToastAction,
    dispatchActionHiddenClick,
    isAddTodo,
    title,
  } = props;

  const {register, handleSubmit, errors} = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [todoName, setTodoName] = useState("");
  const [statusValue, setStatusValue] = useState(-1);

  const history = useHistory();

  useEffect(() => {
    setTodoName(todo.name);
    setStatusValue(todo.statusValue || -1);
  }, [todo]);

  const handleCloseFormClick = () => {
    dispatchActionHiddenClick(0);
    history.push("/todos");
  };

  const handleAddTodoClick = (myData) => {
    const isName = data.some(
      (todoItem) => stringToSlug(todoItem.name) === stringToSlug(myData.name)
    );
    if (!isName) {
      const newTodo = {
        id: uuidv4(),
        name: myData.name,
        statusValue,
      };
      dispatchAddTodo(newTodo);
      dispatchToastAction({
        type: "success",
        message: `Tạo mới công việc thành công`,
        isOpen: true,
      });
    } else {
      dispatchToastAction({
        type: "error",
        message: `Công việc ${myData.name} đã tồn tại`,
        isOpen: true,
      });
    }
    history.push("/todos");
    dispatchActionHiddenClick(0);
  };

  const handleUpdateTodoClick = (myData) => {
    setTodoName(myData.name);
    const isName = data.some(
      (todoItem) => stringToSlug(todoItem.name) === stringToSlug(myData.name)
    );

    if (!isName) {
      dispatchUpdateTodo({
        ...todo,
        name: myData.name,
        statusValue,
      });
      dispatchToastAction({
        type: "success",
        message: `Cập nhật công việc ${myData.name} thành công`,
        isOpen: true,
      });
    } else {
      dispatchToastAction({
        type: "error",
        message: `Công việc ${myData.name} đã tồn tại`,
        isOpen: true,
      });
    }

    dispatchActionHiddenClick(0);
    history.push("/todos");
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
            value={todoName}
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
          <NavLink style={{textDecoration: "none"}} to="/todos">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCloseFormClick}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span>Hủy bỏ</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

TodoForm.propTypes = {
  todos: PropTypes.instanceOf(Array),
  todo: PropTypes.instanceOf(Object),
  dispatchAddTodo: PropTypes.func,
  dispatchUpdateTodo: PropTypes.func,
  dispatchToastAction: PropTypes.func,
  title: PropTypes.string.isRequired,
  isAddTodo: PropTypes.bool.isRequired,
  dispatchActionHiddenClick: PropTypes.func,
};

TodoForm.defaultProps = {
  todos: [],
  todo: {},
  dispatchAddTodo: null,
  dispatchUpdateTodo: null,
  dispatchToastAction: null,
  dispatchActionHiddenClick: null,
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  todo: state.actionTodos.todo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo(todo) {
    dispatch(addTodo(todo));
  },
  dispatchUpdateTodo(todo) {
    dispatch(updateTodo(todo));
  },
  dispatchToastAction(toast) {
    dispatch(setToastAction(toast));
  },
  dispatchActionHiddenClick(number) {
    dispatch(actionAddOrEditClick(number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
