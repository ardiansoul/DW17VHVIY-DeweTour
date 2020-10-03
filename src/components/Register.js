import React, { useContext, useState } from "react";
import { authContext } from "../context/auth";
import Axios from "axios";
import hibicus from "../images/hibicus.svg";
import palm from "../images/palm.svg";
import { baseUrl } from "../dbConfig";
function Register() {
  const [inputRegister, setInputRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    phone: null,
    address: "",
  });

  const [error, setError] = useState("");
  const { fullName, email, password, phone, address } = inputRegister;

  const { setUserId, setRole, setIsLogin } = useContext(authContext);

  function registerChange(e) {
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Axios.post(`${baseUrl}api/v1/register`, inputRegister)
      .then((res) => {
        const account = res.data.data;
        localStorage.setItem("token", account.token);
        setRole(account.role);
        setUserId(account.id);
        setIsLogin(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(error);
      });
  };
  return (
    <div className="login-register modal">
      <img src={hibicus} className="hibicus" alt="hibicus" />
      <img src={palm} className="palm" alt="palm" />

      <div className="modal-header">
        <h5 className="modal-title">Register</h5>
        {error && <div className="modal-alert">{error}</div>}
      </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="modal-form"
      >
        <div className="modal-body">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={fullName}
            onChange={registerChange}
            placeholder="Full Name"
          />
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={registerChange}
            placeholder="Email"
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={registerChange}
            placeholder="password"
          />
          <label>Phone</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            value={phone}
            onChange={registerChange}
            placeholder="Phone"
          />
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            onChange={registerChange}
            placeholder="address"
          />
        </div>
        <div className="modal-button">
          <button type="submit" className="btn btn-register">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
