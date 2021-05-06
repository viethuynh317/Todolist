import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import PrivateLayoutRoute from "./LayoutRoutes/PrivateLayoutRoute";
import PublicLayoutRoute from "./LayoutRoutes/PublicLayoutRoute";
import {privateRoutes, publicRoutes} from "./routeConfig";

const Routes = () => (
  <Switch>
    {privateRoutes.map((route) => {
      const {key, exact, path, component} = route;
      return (
        <PrivateLayoutRoute key={key} exact={exact} path={path} component={component} />
      );
    })}

    {publicRoutes.map(({key, exact, path, component, destricted, login}) => (
      <PublicLayoutRoute
        key={key}
        exact={exact}
        path={path}
        login={login}
        component={component}
        destricted={destricted}
      />
    ))}
    <Route exact path="/">
      <Redirect to="/todos" />
    </Route>
  </Switch>
);

Routes.propTypes = {};

export default Routes;
