/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import Todo from "../../features/Todo/Todo";
import {isLogin} from "../../services/tokenServices";

const PrivateLayoutRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(routeProps) =>
      isLogin() ? (
        <Todo>
          <Component {...routeProps} />
        </Todo>
      ) : (
        <Redirect to="/auth/sign-in" />
      )
    }
  />
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

export default PrivateLayoutRoute;
