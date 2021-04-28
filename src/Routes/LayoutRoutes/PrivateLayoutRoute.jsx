/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import Todo from "../../features/Todo/Todo";

const PrivateLayoutRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <Todo>
        <Component {...routeProps} />
      </Todo>
    )}
  />
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateLayoutRoute;
