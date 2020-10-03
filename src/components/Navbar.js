import React, { useContext } from "react";
import { authContext } from "../context/auth";
import Avatar from "./Avatar";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import HeroImage from "../images/HeroImage.svg";

function Navbar({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  const location = useLocation.pathname;
  const { isLogin } = useContext(authContext);
  return (
    <>
      <div
        className="navbar"
        style={{
          background: location === "/" ? "transparent" : `url(${HeroImage})`,
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        {isLogin ? (
          <Avatar />
        ) : (
          <div>
            <button
              className="btn btn-login"
              onClick={() => {
                setShowModalRegister(false);
                setShowModalLogin(!showModalLogin);
              }}
            >
              Login
            </button>
            <button
              className="btn btn-register"
              onClick={() => {
                setShowModalLogin(false);
                setShowModalRegister(!showModalRegister);
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
