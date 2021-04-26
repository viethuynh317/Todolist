import React from "react";
import {Route, Switch} from "react-router-dom";
import "./App.css";
import TodoCreateForm from "./features/Todo/components/TodoCreateForm/TodoCreateForm";
import Todo from "./features/Todo/Todo";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/todos">
          <Todo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
