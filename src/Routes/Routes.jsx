import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import PrivateLayoutRoute from "./LayoutRoutes/PrivateLayoutRoute";
import {privateRoutes} from "./routeConfig";

const Routes = () => (
  <Switch>
    {privateRoutes.map((route) => {
      const {key, exact, path, component} = route;
      return (
        <PrivateLayoutRoute key={key} exact={exact} path={path} component={component} />
      );
    })}
    <Route exact path="/">
      <Redirect to="/todos" />
    </Route>
  </Switch>
);

Routes.propTypes = {};

export default Routes;
