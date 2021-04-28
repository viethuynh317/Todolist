import React from "react";
import TodoForm from "../../../../commons/components/TodoForm/TodoForm";
import TodoHeaderAction from "../TodoHeaderAction/TodoHeaderAction";
import TodoTableList from "../TodoTableList/TodoTableList";

const TodoEditForm = () => (
  <div className="form-wrap ">
    <div className="left-form">
      <TodoForm title="Cập nhật công việc" isAddTodo={false} />
    </div>
    <div className="right-form">
      <TodoHeaderAction />
      <TodoTableList />
    </div>
  </div>
);

export default TodoEditForm;
