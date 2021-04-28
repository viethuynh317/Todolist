import {lazy} from "react";

export const publicRoutes = [];

export const privateRoutes = [
  {
    key: "todos",
    exact: true,
    path: "/todos",
    component: lazy(() =>
      import("../features/Todo/components/TodoRightForm/TodoRightForm")
    ),
  },
  {
    key: "todos-createTodo",
    exact: true,
    path: "/todos/createTodo",
    component: lazy(() =>
      import("../features/Todo/components/TodoCreateForm/TodoCreateForm")
    ),
  },
  {
    key: "todos-updateTodo",
    exact: true,
    path: "/todos/updateTodo",
    component: lazy(() =>
      import("../features/Todo/components/TodoEditForm/TodoEditForm")
    ),
  },
];
