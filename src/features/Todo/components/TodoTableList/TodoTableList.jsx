import PropTypes from "prop-types";
import React, {useState} from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import "./TodoTableList.css";

function TodoTableList(props) {
  const {
    onEditClick,
    preValueForm,
    data,
    dataFilter,
    handleDeleteTodo,
    handleChangeStatusTodo,
    handleSearchTodoChange,
    handleSortTodo,
    onFormClose,
  } = props;

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    handleSearchTodoChange(e.target.value);
  };

  const handleChangeSortTodo = (e) => {
    const newData = [...data];
    if (Number(e.target.value) === 0) handleSortTodo(newData);
    if (Number(e.target.value) === 1)
      handleSortTodo(newData.filter((todo) => Number(todo.statusValue) === 1));
    if (Number(e.target.value) === -1)
      handleSortTodo(newData.filter((todo) => Number(todo.statusValue) === -1));
  };

  const myData = dataFilter.length ? dataFilter : data;

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
                value={searchValue}
                onChange={handleSearchChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="todoStatus"
                onChange={handleChangeSortTodo}
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
  dataFilter: PropTypes.instanceOf(Array),
  handleDeleteTodo: PropTypes.func,
  handleChangeStatusTodo: PropTypes.func,
  handleSearchTodoChange: PropTypes.func,
  onFormClose: PropTypes.func,
  handleSortTodo: PropTypes.func,
};

TodoTableList.defaultProps = {
  data: [],
  dataFilter: [],
  onEditClick: null,
  handleDeleteTodo: null,
  handleChangeStatusTodo: null,
  handleSearchTodoChange: null,
  onFormClose: null,
  handleSortTodo: null,
};

export default TodoTableList;
