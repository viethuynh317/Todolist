import PropTypes from "prop-types";
import React, {useState} from "react";
import {connect} from "react-redux";
import TodoListItem from "../TodoListItem/TodoListItem";
import "./TodoTableList.css";

function TodoTableList(props) {
  const {todos: data} = props;

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
          {data.map((todo, index) => (
            <TodoListItem todo={todo} key={todo.id} numericalOrder={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TodoTableList.propTypes = {
  todos: PropTypes.instanceOf(Array).isRequired,
};

TodoTableList.defaultProps = {};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTableList);
