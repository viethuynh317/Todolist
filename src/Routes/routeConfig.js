import {lazy} from "react";

export const publicRoutes = [
  {
    key: "todos",
    exact: true,
    path: "/todos",
    destricted: false,
    component: lazy(() =>
      import("../features/Todo/components/TodoRightForm/TodoRightForm")
    ),
  },
  {
    key: "signIn",
    exact: true,
    destricted: true,
    login: true,
    path: "/auth/sign-in",
    component: lazy(() => import("../features/Auth/SignIn/SignIn")),
  },
];

export const privateRoutes = [
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
