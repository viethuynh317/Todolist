import {
  faCaretDown,
  faCheck,
  faPlus,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {connect} from "react-redux";
import {
  actionAddOrEditClick,
  changeNumberSort,
  deleteOrUpdateTodo,
  searchTodo,
} from "../../../../actions/todoActions";
import "./TodoHeader.css";

const TodoHeaderAction = (props) => {
  const {
    // todos: data,
    isActionTodo,
    dispatchAddOrEditClick,
    dispatchSearchTodo,
    dispatchNumberCheckSort,
    dispatchClearTodo,
  } = props;
  const [isShowSortList, setIsShowSortList] = useState(false);
  // console.log(data);
  const [searchValue, setSearchValue] = useState("");

  const handleShowSortList = () => {
    setIsShowSortList(!isShowSortList);
  };

  const [activeCheck, setActiveCheck] = useState(0);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    dispatchSearchTodo(searchValue);
  };

  const handleActiveCheck = (number) => {
    dispatchNumberCheckSort(number);
    setActiveCheck(number);
    setIsShowSortList(!isShowSortList);
  };

  const handleSortAlphaDown = () => {
    handleActiveCheck(0);
  };

  const handleSortAlphaUp = () => {
    handleActiveCheck(1);
  };

  const handleSortTrigger = () => {
    handleActiveCheck(2);
  };

  const handleSortHidden = () => {
    handleActiveCheck(3);
  };

  const handleAddClick = () => {
    dispatchClearTodo({
      name: "",
      statusValue: -1,
    });
    if (!isActionTodo || isActionTodo === 2) {
      dispatchAddOrEditClick(1);
      return;
    }
    dispatchAddOrEditClick(0);
  };

  return (
    <div className="header-action">
      <div className="btn-wrap btn-add">
        <button className="btn btn-primary" type="button" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm công việc</span>
        </button>
      </div>
      <div className="btn-others">
        <div className="form-search">
          <input
            className="form-control input-search"
            type="text"
            placeholder="Nhập từ khóa ..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button
            className="btn btn-primary btn-search"
            type="button"
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon icon={faSearch} />
            <span>Tìm</span>
          </button>
        </div>
        <div
          className={isShowSortList ? "sort-action open" : "sort-action"}
          aria-hidden="true"
        >
          <div className="btn-sort">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShowSortList}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>Sắp xếp</span>
              <FontAwesomeIcon className="select-icon" icon={faCaretDown} />
            </button>
          </div>

          <div className={isShowSortList ? "sort-list open" : "sort-list"}>
            <div className="sort-alpha">
              <div
                className="sort sort-alphaDown"
                onClick={handleSortAlphaDown}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={faSortAlphaDown} />
                <span>Tên A-Z</span>
                {activeCheck === 0 && <FontAwesomeIcon icon={faCheck} />}
              </div>

              <div
                className="sort sort-alphaUp"
                onClick={handleSortAlphaUp}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={faSortAlphaUp} />
                <span>Tên Z-A</span>
                {activeCheck === 1 && <FontAwesomeIcon icon={faCheck} />}
              </div>
            </div>

            <div className="sort-status">
              <div
                className="sort sort-trigger"
                onClick={handleSortTrigger}
                aria-hidden="true"
              >
                <span>Trạng Thái Kích Hoạt</span>
                {activeCheck === 2 && <FontAwesomeIcon icon={faCheck} />}
              </div>
              <div
                className="sort sort-hidden"
                onClick={handleSortHidden}
                aria-hidden="true"
              >
                <span>Trạng Thái Ẩn</span>
                {activeCheck === 3 && <FontAwesomeIcon icon={faCheck} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TodoHeaderAction.propTypes = {
  // todos: PropTypes.instanceOf(Array),
  isActionTodo: PropTypes.number,
  dispatchAddOrEditClick: PropTypes.func,
  dispatchSearchTodo: PropTypes.func,
  dispatchNumberCheckSort: PropTypes.func,
  dispatchClearTodo: PropTypes.func,
};

TodoHeaderAction.defaultProps = {
  // todos: [],
  isActionTodo: 0,
  dispatchAddOrEditClick: null,
  dispatchSearchTodo: null,
  dispatchNumberCheckSort: null,
  dispatchClearTodo: null,
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  isActionTodo: state.todos.isActionTodo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddOrEditClick(number) {
    dispatch(actionAddOrEditClick(number));
  },
  dispatchSearchTodo(searchValue) {
    dispatch(searchTodo(searchValue));
  },
  dispatchNumberCheckSort(number) {
    dispatch(changeNumberSort(number));
  },
  dispatchClearTodo(todo) {
    dispatch(deleteOrUpdateTodo(todo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeaderAction);
