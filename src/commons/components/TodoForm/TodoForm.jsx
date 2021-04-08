/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  faPencilAlt,
  faPlus,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import "./TodoForm.css";
import PropTypes from "prop-types";

const TodoForm = (props) => {
  const {title, isAddTodo, onFormCloseChild} = props;

  const handleCloseFormClick = () => {
    onFormCloseChild(0);
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
          <input id="todoName" type="text" className="form-control form-name" />
        </div>

        <div className="form-group">
          <label htmlFor="todoStatus">Trạng Thái:</label>
          <select className="form-control select-form" name="status">
            <option value={-1}>Ẩn</option>
            <option value={1}>Kích hoạt</option>
          </select>
        </div>

        <div className="form-group form-btn form-btn-left">
          {isAddTodo ? (
            <button type="button" className="btn btn-primary btn-primary-res">
              <FontAwesomeIcon icon={faPlus} />
              <span>Tạo mới</span>
            </button>
          ) : (
            <button type="button" className="btn btn-warning">
              <FontAwesomeIcon icon={faPencilAlt} />
              <span>Lưu lại</span>
            </button>
          )}
          <button type="button" className="btn btn-danger">
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
};

export default TodoForm;
