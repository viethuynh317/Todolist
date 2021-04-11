import React, {useEffect, useState} from "react";
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
    statusValue: -1,
  },
  {
    id: uuidv4(),
    name: "Todo 2",
    statusValue: 1,
  },

  {
    id: uuidv4(),
    name: "Todo 3",
    statusValue: -1,
  },

  {
    id: uuidv4(),
    name: "Todo 4",
    statusValue: 1,
  },
];

const Todo = () => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [isActionTodo, setIsActionTodo] = useState(0);
  const [currentTodo, setCurrentTodo] = useState({});

  const [dataSearch, setDataSearch] = useState([]);

  const [actionDependency, setActionDependency] = useState(false);

  const [statusSort, setStatusSort] = useState(0);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("data")) || initialData;
    console.log(statusSort);
    let defaultSortData;
    switch (statusSort) {
      case 0:
        defaultSortData = localStorageData.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 1:
        defaultSortData = localStorageData.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case 2: {
        const filterTodoTrigger = data.filter((todo) => Number(todo.statusValue) === 1);

        const filterTodoHidden = data.filter((todo) => Number(todo.statusValue) === -1);

        defaultSortData = filterTodoTrigger.concat(filterTodoHidden);
        break;
      }

      case 3: {
        const filterTodoTrigger = data.filter((todo) => Number(todo.statusValue) === 1);

        const filterTodoHidden = data.filter((todo) => Number(todo.statusValue) === -1);

        defaultSortData = filterTodoHidden.concat(filterTodoTrigger);
        break;
      }

      default:
        defaultSortData = localStorageData;
    }

    setData(defaultSortData);
  }, [actionDependency]);

  const handleAddTodo = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    setActionDependency(!actionDependency);
  };

  const handleUpdateTodo = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    setActionDependency(!actionDependency);
  };

  const handleDeleteTodo = ({id}) => {
    const newData = data.filter((itemTodo) => itemTodo.id !== id);
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
  };

  const handleAddClick = (value) => {
    setIsActionTodo(value);
  };

  const handleEditClick = ({todo, value}) => {
    setCurrentTodo(todo);
    setIsActionTodo(value);
  };

  const handleChangeStatusTodo = (newTodo) => {
    const newData = data.map((itemTodo) => {
      if (itemTodo.id === newTodo.id)
        return {
          ...itemTodo,
          statusValue: newTodo.statusValue,
        };
      return itemTodo;
    });
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    setActionDependency(!actionDependency);
  };

  const handleFormClose = (value) => {
    setIsActionTodo(value);
  };

  // Handle logic search todo

  const handleSearchTodoClick = (name) => {
    const cloneData =
      dataSearch.length === 0 ? JSON.parse(localStorage.getItem("data")) : dataSearch;
    const newData = name
      ? cloneData.filter((todo) => todo.name.toLowerCase().includes(name.toLowerCase()))
      : JSON.parse(localStorage.getItem("data"));

    setData(newData);
    setDataSearch(newData);
  };

  const handleSearchTodoChange = (name) => {
    const cloneData =
      dataSearch.length === 0 ? JSON.parse(localStorage.getItem("data")) : dataSearch;
    const newData = name
      ? cloneData.filter((todo) => todo.name.toLowerCase().includes(name.toLowerCase()))
      : JSON.parse(localStorage.getItem("data"));

    setData(newData);
    setDataSearch(newData);
  };

  const handleSortTodo = (newData) => {
    setDataFilter([]);
    setData(newData);
  };

  const handleSortTodoSecond = (newData) => {
    setDataFilter(newData);
  };

  const setStatusSortTodo = (status) => {
    setStatusSort(status);
  };

  // Handle logic search todo

  const renderAction = (value) =>
    value === 2 ? (
      <TodoEditForm
        onFormClose={handleFormClose}
        handleUpdateTodo={handleUpdateTodo}
        data={data}
        todo={currentTodo}
      />
    ) : (
      <TodoCreateForm
        onFormClose={handleFormClose}
        handleAddTodo={handleAddTodo}
        data={data}
      />
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
            handleSearchTodoClick={handleSearchTodoClick}
            handleSortTodo={handleSortTodo}
            setStatusSortTodo={setStatusSortTodo}
            data={data}
          />

          <TodoTableList
            preValueForm={isActionTodo}
            onEditClick={handleEditClick}
            data={data}
            dataFilter={dataFilter}
            handleDeleteTodo={handleDeleteTodo}
            handleChangeStatusTodo={handleChangeStatusTodo}
            handleSearchTodoChange={handleSearchTodoChange}
            handleSortTodo={handleSortTodoSecond}
            onFormClose={handleFormClose}
          />
        </div>
      </div>
    </div>
  );
};

Todo.propTypes = {};

export default Todo;
