import _ from "lodash";
import PropTypes from "prop-types";
import React, {useCallback, useState} from "react";
import stringToSlug from "../../../../constants/slugify";
import TodoListItem from "../TodoListItem/TodoListItem";
import "./TodoTableList.css";

function TodoTableList(props) {
  const {
    onEditClick,
    preValueForm,
    data,
    keySearchValue,
    handleDeleteTodo,
    handleChangeStatusTodo,
    handleSetToast,
    handleUpdateData,
    onFormClose,
  } = props;

  const [filter, setFilter] = useState({
    filterName: "",
    filterStatus: 0,
  });

  const filterTodoChange = (myFilter, myData) => {
    const {filterName, filterStatus} = myFilter;

    let cloneData = [...myData];
    cloneData = filterName
      ? data.filter((todo) => stringToSlug(todo.name).includes(stringToSlug(filterName)))
      : data;

    cloneData = cloneData.filter((todo) => {
      if (Number(filterStatus) === 0) return todo;
      return Number(todo.statusValue) === Number(filterStatus);
    });
    handleUpdateData(cloneData);
  };

  const debounceSearchName = useCallback(
    _.debounce((nextFilter, myData) => filterTodoChange(nextFilter, myData), 700),
    []
  );

  const handleFilterTodoChange = (e) => {
    const {name, value} = e.target;

    setFilter({
      ...filter,
      [name]: value,
    });
    debounceSearchName(
      {
        ...filter,
        [name]: value,
      },
      data
    );
  };

  // data = [...selectData];
  const myData = keySearchValue
    ? data.filter((todo) =>
        stringToSlug(todo.name).includes(stringToSlug(keySearchValue))
      )
    : data;

  return (
    <div className="todo-table">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{}</td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filter.filterName}
                onChange={handleFilterTodoChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filter.filterStatus}
                onChange={handleFilterTodoChange}
              >
                <option value={0}>Tất cả</option>
                <option value={-1}>Ẩn</option>
                <option value={1}>Kích hoạt</option>
              </select>
            </td>
            <td>{}</td>
          </tr>
          {myData.map((todo, index) => (
            <TodoListItem
              onEditClick={onEditClick}
              handleDeleteTodo={handleDeleteTodo}
              handleChangeStatusTodo={handleChangeStatusTodo}
              handleFormClose={onFormClose}
              handleSetToast={handleSetToast}
              preValueForm={preValueForm}
              todo={todo}
              key={todo.id}
              numericalOrder={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TodoTableList.propTypes = {
  onEditClick: PropTypes.func,
  preValueForm: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array),
  handleDeleteTodo: PropTypes.func,
  handleChangeStatusTodo: PropTypes.func,
  handleSetToast: PropTypes.func,
  handleUpdateData: PropTypes.func,
  onFormClose: PropTypes.func,
  keySearchValue: PropTypes.string,
};

TodoTableList.defaultProps = {
  data: [],
  onEditClick: null,
  handleDeleteTodo: null,
  handleChangeStatusTodo: null,
  handleSetToast: null,
  onFormClose: null,
  handleUpdateData: null,
  keySearchValue: "",
};

export default TodoTableList;
