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
import "./TodoHeader.css";

const TodoHeaderAction = (props) => {
  const {
    onAddClick,
    preValueForm,
    data,
    handleSearchTodoClick,
    handleSortTodo,
    setStatusSortTodo,
  } = props;
  const [isShowSortList, setIsShowSortList] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const handleShowSortList = () => {
    setIsShowSortList(!isShowSortList);
  };

  const [activeCheck, setActiveCheck] = useState(0);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearchTodoClick(searchValue);
  };

  const handleActiveCheck = (number) => {
    setStatusSortTodo(number);
    setActiveCheck(number);
    setIsShowSortList(!isShowSortList);
  };

  const handleSortAlphaDown = () => {
    const cloneData = [...data];
    const newData = cloneData.sort((a, b) => (a.name > b.name ? 1 : -1));

    handleSortTodo(newData);
    handleActiveCheck(0);
  };

  const handleSortAlphaUp = () => {
    const cloneData = [...data];
    const newData = cloneData.sort((a, b) => (a.name < b.name ? 1 : -1));

    handleSortTodo(newData);
    handleActiveCheck(1);
  };

  const handleSortTrigger = () => {
    const filterTodoTrigger = data.filter((todo) => Number(todo.statusValue) === 1);

    const filterTodoHidden = data.filter((todo) => Number(todo.statusValue) === -1);

    const newData = filterTodoTrigger.concat(filterTodoHidden);

    handleSortTodo(newData);
    handleActiveCheck(2);
  };

  const handleSortHidden = () => {
    const filterTodoTrigger = data.filter((todo) => Number(todo.statusValue) === 1);

    const filterTodoHidden = data.filter((todo) => Number(todo.statusValue) === -1);

    const newData = filterTodoHidden.concat(filterTodoTrigger);

    handleSortTodo(newData);
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

          <div className="sort-list">
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
  onAddClick: PropTypes.func,
  handleSearchTodoClick: PropTypes.func,
  handleSortTodo: PropTypes.func,
  setStatusSortTodo: PropTypes.func,
  preValueForm: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array),
};

TodoHeaderAction.defaultProps = {
  data: [],
  onAddClick: null,
  handleSearchTodoClick: null,
  handleSortTodo: null,
  setStatusSortTodo: null,
};

export default TodoHeaderAction;
