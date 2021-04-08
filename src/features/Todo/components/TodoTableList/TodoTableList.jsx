import PropTypes from 'prop-types';
import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoTableList.css';

function TodoTableList(props) {
  const {onEditClick, preValueForm, data} = props;
  
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
                <input type="text" className="form-control" />
              </td>
              <td>
                <select className="form-control" name="todoStatus">
                  <option value={0}>Tất cả</option>
                  <option value={-1}>Ẩn</option>
                  <option value={1}>Kích hoạt</option>
                </select>
              </td>
              <td>{}</td>
            </tr>
            {
              data.map((todo, index) => (
                <TodoListItem onEditClick={onEditClick} preValueForm={preValueForm} todo={todo} key={todo.id} numericalOrder={index + 1} />
              ))    
            }
          </tbody>
        </table>
    </div>
  );
}

TodoTableList.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  preValueForm: PropTypes.number.isRequired,
  data: PropTypes.instanceOf(Array),
};

TodoTableList.defaultProps = {
  data: [],
}

export default TodoTableList;