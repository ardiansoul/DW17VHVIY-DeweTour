import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

import { authContext } from "./context/auth";
import Login from "./components/Login";
import Register from "./components/Register";

import UserRoute from "./pages/User/UserRoute";
import Payment from "./pages/User/Payment";
import Profile from "./pages/User/Profile";

import AdminRoute from "./pages/Admin/AdminRoute";
import Transaction from "./pages/Admin/Transaction";
import IncomeTrip from "./pages/Admin/IncomeTrip";
import AddTrip from "./pages/Admin/AddTrip";

import NotFound from "./pages/NotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setShowModalLogin(false);
    setShowModalRegister(false);
  }, [isLogin]);
  return (
    <authContext.Provider
      value={{
        image,
        setImage,
        role,
        setRole,
        setUserId,
        userId,
        isLogin,
        setIsLogin,
      }}
    >
      {showModalLogin && (
        <Login
          setShowModalRegister={setShowModalRegister}
          setShowModalLogin={setShowModalLogin}
          showModalRegister={showModalRegister}
        />
      )}
      {showModalRegister && <Register />}
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
              showModalLogin={showModalLogin}
              showModalRegister={showModalRegister}
            />
          </Route>

          <Route path="/detail/:id" exact>
            <Detail
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
              showModalLogin={showModalLogin}
              showModalRegister={showModalRegister}
            />
          </Route>
          <UserRoute path="/profile" component={Profile} exact />
          <UserRoute path="/Payment" component={Payment} exact />
          <AdminRoute path="/admin/transaction" component={Transaction} exact />
          <AdminRoute path="/admin/income-trip" component={IncomeTrip} exact />
          <AdminRoute path="/admin/add-trip" component={AddTrip} exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </authContext.Provider>
  );
}

export default App;
