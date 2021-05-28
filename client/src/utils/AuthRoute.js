import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// const TheLayout = React.lazy(() => import("../containers/TheLayout"));
const Login = React.lazy(() => import("../pages/auth/Login"));

const AuthRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((data) => data.users.currentUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Redirect to="/" /> : <Login {...props} />
      }
    />
  );
};

export default AuthRoute;
