import React, { Component } from "react";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { HashRouter, Route, Switch } from "react-router-dom";
import { checkUser, userLogOut } from "./redux/actions/users";
import "./scss/style.scss";
import AuthRoute from "./utils/AuthRoute";
import DashboardRoute from "./utils/DashboardRoute";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const ScanQrcode = React.lazy(() => import("./pages/qrcode"));

const App = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    jwt.verify(localStorage.getItem("token"), "simpeg123", (err, decode) => {
      if (err) {
        dispatch(userLogOut());
      } else {
        dispatch(checkUser(localStorage.getItem("token")));
      }
    });
  }
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/scan-absensi"
            name="Absensi"
            render={(props) => <ScanQrcode />}
          />
          <AuthRoute path="/login" name="Login Page" />

          <DashboardRoute path="/" name="Home" />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
