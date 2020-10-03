import {
  faFileInvoice,
  faFileInvoiceDollar,
  faSignOutAlt,
  faSuitcaseRolling,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth";

function Dropdown() {
  const { role, setIsLogin } = useContext(authContext);
  function logoutHandle() {
    setIsLogin(false);
    localStorage.clear();
  }

  return (
    <div>
      {role === "admin" ? (
        <ul className="dropdown-list">
          <Link to="/admin/transaction" className="dropdown-item">
            <FontAwesomeIcon icon={faFileInvoice} className="icon" />
            <h5>Transaction</h5>
          </Link>
          <Link to="/admin/income-trip" className="dropdown-item">
            <FontAwesomeIcon icon={faSuitcaseRolling} className="icon" />
            <h5>Income Tour</h5>
          </Link>
          <Link onClick={logoutHandle} to="/" className="dropdown-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <h5>Logout</h5>
          </Link>
        </ul>
      ) : (
        <ul className="dropdown-list">
          <Link to="/profile" className="dropdown-item">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>Profile</span>
          </Link>
          <Link to="/payment" className="dropdown-item">
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
            <span>Pay</span>
          </Link>
          <Link onClick={logoutHandle} to="/" className="dropdown-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <span>Logout</span>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
