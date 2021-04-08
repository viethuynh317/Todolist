/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  faCaretDown,
  faCheck,
  faPlus,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Proptypes from "prop-types";
import React, {useState} from "react";
import "./TodoHeader.css";

const TodoHeaderAction = (props) => {
  const {onAddClick, preValueForm} = props;
  const [isShowSortList, setIsShowSortList] = useState(false);

  // const [isShowAddForm, setIsShowAddForm] = useState(false);

  const handleShowSortList = () => {
    setIsShowSortList(!isShowSortList);
  };

  const [activeCheck, setActiveCheck] = useState(null);

  const handleActiveCheck = (number) => {
    setActiveCheck(number);
    setIsShowSortList(!isShowSortList);
  };

  const handleSortAlphaDown = () => {
    // Hanlde sort logic here

    // Set active icon check;
    handleActiveCheck(0);
  };

  const handleSortAlphaUp = () => {
    // Hanlde sort logic here

    // Set active icon check;
    handleActiveCheck(1);
  };

  const handleSortTrigger = () => {
    // Hanlde sort logic here

    // Set active icon check;
    handleActiveCheck(2);
  };

  const handleSortHidden = () => {
    // Hanlde sort logic here

    // Set active icon check;
    handleActiveCheck(3);
  };

  const handleAddClick = () => {
    if (preValueForm === 2) onAddClick(1);
    else if (preValueForm === 0) onAddClick(1);
    else onAddClick(0);
  };

  return (
    <div className="header-action">
      <div className="btn-wrap btn-add">
        <button className="btn btn-primary" type="button" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm Công Việc</span>
        </button>
      </div>
      <div className="btn-others">
        <div className="form-search">
          <input
            className="form-control input-search"
            type="text"
            placeholder="Nhập từ khóa ..."
          />
          <button className="btn btn-primary btn-search" type="button">
            <FontAwesomeIcon icon={faSearch} />
            <span>Tìm</span>
          </button>
        </div>
        <div className="sort-action">
          <div className="btn-sort">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShowSortList}
            >
              <span>Sắp xếp</span>
              <FontAwesomeIcon className="select-icon" icon={faCaretDown} />
            </button>
          </div>

          {isShowSortList && (
            <div className="sort-list">
              <div className="sort-alpha">
                <div className="sort sort-alphaDown" onClick={handleSortAlphaDown}>
                  <FontAwesomeIcon icon={faSortAlphaDown} />
                  <span>Tên A-Z</span>
                  {activeCheck === 0 && <FontAwesomeIcon icon={faCheck} />}
                </div>

                <div className="sort sort-alphaUp" onClick={handleSortAlphaUp}>
                  <FontAwesomeIcon icon={faSortAlphaUp} />
                  <span>Tên Z-A</span>
                  {activeCheck === 1 && <FontAwesomeIcon icon={faCheck} />}
                </div>
              </div>

              <div className="sort-status">
                <div className="sort-trigger" onClick={handleSortTrigger}>
                  <span>Trạng Thái Kích Hoạt</span>
                  {activeCheck === 2 && <FontAwesomeIcon icon={faCheck} />}
                </div>
                <div className="sort-hidden" onClick={handleSortHidden}>
                  <span>Trạng Thái Ẩn</span>
                  {activeCheck === 3 && <FontAwesomeIcon icon={faCheck} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TodoHeaderAction.propTypes = {
  onAddClick: Proptypes.func.isRequired,
  preValueForm: Proptypes.number.isRequired,
};

export default TodoHeaderAction;
