/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import {Redirect, Route} from "react-router-dom";
import Todo from "../../features/Todo/Todo";
import {isLogin} from "../../services/tokenServices";

const PublicLayoutRoute = ({component: Component, login, destricted, ...rest}) => (
  <Route
    {...rest}
    render={(routeProps) =>
      // eslint-disable-next-line no-nested-ternary
      isLogin() && destricted ? (
        <Redirect to="/todos" />
      ) : login ? (
        <Component {...routeProps} />
      ) : (
        <Todo>
          <Component {...routeProps} />
        </Todo>
      )
    }
  />
);

PublicLayoutRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  login: PropTypes.bool,
  destricted: PropTypes.bool.isRequired,
};

PublicLayoutRoute.defaultProps = {
  login: false,
};

export default PublicLayoutRoute;
