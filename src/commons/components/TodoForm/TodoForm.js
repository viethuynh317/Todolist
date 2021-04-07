/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {faPlus, faTimes, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import "./TodoForm.css";

const TodoForm = () => (
  <div className="action-form">
    <div className="action-form__header">
      <h4>Thêm Công Việc</h4>
      <FontAwesomeIcon icon={faTimesCircle} />
    </div>
    <div className="action-form__form">
      <div className="form-group">
        <label htmlFor="todoName">Tên</label>
        <input id="todoName" type="text" className="form-control form-name" />
      </div>

      <div className="form-group">
        <label htmlFor="todoStatus">Trạng Thái:</label>
        <select className="form-control select-form" name="status">
          <option value={0}>Ẩn</option>
          <option value={1}>Kích hoạt</option>
        </select>
      </div>

      <div className="form-group form-btn">
        <button type="button" className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} />
          <span>Tạo mới</span>
        </button>
        <button type="button" className="btn btn-danger">
          <FontAwesomeIcon icon={faTimes} />
          <span>Hủy bỏ</span>
        </button>
      </div>
    </div>
  </div>
);

TodoForm.propTypes = {};

export default TodoForm;
