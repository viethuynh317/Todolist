import PropTypes from "prop-types";
import React, {useState} from "react";
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
    onFormClose,
  } = props;

  const [filter, setFilter] = useState({
    filterName: "",
    filterStatus: 0,
  });

  const handleFilterTodoChange = (e) => {
    const {name, value} = e.target;

    setFilter({
      ...filter,
      [name]: value,
    });
  };

  let selectData = [...data];

  const {filterName, filterStatus} = filter;

  const filterTodoChange = () => {
    if (filterName) {
      selectData = filterName
        ? selectData.filter((todo) =>
            stringToSlug(todo.name).includes(stringToSlug(filterName))
          )
        : selectData;
    }

    selectData = selectData.filter((todo) => {
      if (Number(filterStatus) === 0) return todo;
      return Number(todo.statusValue) === Number(filterStatus);
    });
  };

  filterTodoChange();

  const myData = keySearchValue
    ? selectData.filter((todo) =>
        stringToSlug(todo.name).includes(stringToSlug(keySearchValue))
      )
    : selectData;

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
  keySearchValue: "",
};

export default TodoTableList;
