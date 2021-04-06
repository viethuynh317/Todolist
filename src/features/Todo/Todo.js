import React from 'react'
import './Todo.css'
import PropTypes from 'prop-types'
import TodoHeaderAction from './components/TodoHeaderAction/TodoHeaderAction'

const Todo = props => {
  return (
    <div className="container" >
      <div className="todo-header">
        <h1>Quản lý công việc</h1>
      </div>
      <TodoHeaderAction />
    </div>
  )
}

Todo.propTypes = {

}

export default Todo
