import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const TheLayout = React.lazy(() => import("../containers/TheLayout"));

const DashboardRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((data) => data.users.currentUser);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          currentUser == null ? (
            <Redirect to="/login" />
          ) : (
            <TheLayout {...props} />
          )
        }
      />
    </>
  );
};

export default DashboardRoute;
