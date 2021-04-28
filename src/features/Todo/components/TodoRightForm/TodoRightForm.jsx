import React from "react";
import TodoHeaderAction from "../TodoHeaderAction/TodoHeaderAction";
import TodoTableList from "../TodoTableList/TodoTableList";

const TodoRightForm = () => (
  <div className="form-wrap hidden-form">
    <div className="right-form">
      <TodoHeaderAction />
      <TodoTableList />
    </div>
  </div>
);

export default TodoRightForm;
