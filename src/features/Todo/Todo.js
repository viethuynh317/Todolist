/* eslint-disable react/jsx-filename-extension */
import React from "react";
import TodoHeaderAction from "./components/TodoHeaderAction/TodoHeaderAction";
import "./Todo.css";

const Todo = () => (
  <div className="container">
    <div className="todo-header">
      <h1>Quản lý công việc</h1>
    </div>

    <TodoHeaderAction />
    {/* --- Test --- */}
    {/* <TodoForm /> */}
    {/* --- Test --- */}
  </div>
);

Todo.propTypes = {};

export default Todo;
