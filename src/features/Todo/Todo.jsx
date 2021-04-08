/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import TodoCreateForm from "./components/TodoCreateForm/TodoCreateForm";
import TodoEditForm from "./components/TodoEditForm/TodoEditForm";
import TodoHeaderAction from "./components/TodoHeaderAction/TodoHeaderAction";
import TodoTableList from "./components/TodoTableList/TodoTableList";
import "./Todo.css";

const initialData = [
  {
    id: uuidv4(),
    name: "Todo 1",
    statusValue: 0,
  },
  {
    id: uuidv4(),
    name: "Todo 2",
    statusValue: 1,
  },

  {
    id: uuidv4(),
    name: "Todo 3",
    statusValue: 0,
  },

  {
    id: uuidv4(),
    name: "Todo 4",
    statusValue: 1,
  },
];

const Todo = () => {
  const [data, setData] = useState(initialData);
  const [isActionTodo, setIsActionTodo] = useState(0);
  const handleAddTodo = (newData) => {
    setData(newData);
  }

  const handleUpdateTodo = (newData) => {
    setData(newData);
  }

  const handleDeleteTodo = (newData) => {
    setData(newData);
  }

  const handleAddClick = (value) => {
    setIsActionTodo(value);
  };

  const handleEditClick = (value) => {
    setIsActionTodo(value);
  };

  const handleFormClose = (value) => {
    setIsActionTodo(value);
  };

  const renderAction = (value) =>
    value === 2 ? (
      <TodoEditForm onFormClose={handleFormClose} />
    ) : (
      <TodoCreateForm onFormClose={handleFormClose} />
    );

  return (
    <div className="container">
      <div className="todo-header">
        <h1>Quản lý công việc</h1>
      </div>

      <div className={isActionTodo ? "form-wrap" : "form-wrap hidden-form"}>
        {isActionTodo ? (
          <div className="left-form">{renderAction(isActionTodo)}</div>
        ) : (
          ""
        )}
        <div className="right-form">
          <TodoHeaderAction 
          preValueForm={isActionTodo} 
          onAddClick={handleAddClick} 
          handleAddTodo={handleAddTodo} />

          <TodoTableList 
          preValueForm={isActionTodo} onEditClick={handleEditClick} 
          data={data} 
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

Todo.propTypes = {};

export default Todo;
