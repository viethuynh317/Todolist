import React from "react";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";
import TodoHeaderAction from "../TodoHeaderAction/TodoHeaderAction";
import TodoTableList from "../TodoTableList/TodoTableList";

const TodoCreateForm = () => (
  <div className="form-wrap ">
    <div className="left-form">
      <TodoForm title="Thêm Công Việc" isAddTodo />
    </div>
    <div className="right-form">
      <TodoHeaderAction />
      <TodoTableList />
    </div>
  </div>
);

export default TodoCreateForm;
