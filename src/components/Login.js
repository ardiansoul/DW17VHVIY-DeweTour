import React from "react";
// import "./login.css";
import { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import hibicus from "../images/hibicus.svg";
import palm from "../images/palm.svg";
import { baseUrl } from "../dbConfig";

// import { UserDatas } from "../../fakedatas/UserDatas";

function Login({ setShowModalRegister, setShowModalLogin, showModalLogin }) {
  const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { setImage, setRole, setUserId, setIsLogin } = useContext(authContext);

  // const location = useLocation();
  // const history = useHistory();
  // const currentPathname = location.pathname;

  function loginChange(event) {
    setInputLogin({ ...inputLogin, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}api/v1/login`, inputLogin);
      console.log(res.data.data);
      const account = res.data.data;
      localStorage.setItem("token", account.accessToken);
      setRole(account.role);
      setUserId(account.id);
      setIsLogin(true);
      setImage(account.image);
    } catch (err) {
      setError(err.response.data.message);
      console.log({ err }, err);
      console.log(error);
    }
  };
  return (
    <div className="login-register modal">
      <img src={hibicus} className="hibicus" alt="hibicus" />
      <img src={palm} className="palm" alt="palm" />
      <div className="modal-header">
        <h5 className="modal-title">Login</h5>
        {error && <div className="modal-alert">{error}</div>}
      </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="modal-form"
      >
        <div className="modal-body">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputLogin.email}
            onChange={loginChange}
            placeholder="Email"
            className="form-control"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputLogin.password}
            onChange={loginChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="modal-button">
          <button type="submit" className="btn btn-register">
            Login
          </button>
          <p className="modal-login-register">
            Don't have an account? Klik{" "}
            <span
              onClick={() => {
                setShowModalRegister(!showModalLogin);
                setShowModalLogin(false);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
