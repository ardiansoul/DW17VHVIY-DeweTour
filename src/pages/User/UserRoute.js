import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../../context/auth";
import Login from "../../components/Login";

function UserRoute(props) {
  const { role, isLogin } = useContext(authContext);

  if (isLogin) {
    if (role === "user") {
      return <Route path={props.path} component={props.component} />;
    } else {
      return <Redirect to="/" />;
    }
  }
  return <Redirect to="/" />;
}

export default UserRoute;
