import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { authContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../dbConfig";

function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const { image } = useContext(authContext);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        style={{
          background: "none",
          outline: "none",
          border: "none",
          marginRight: 20,
        }}
      >
        {image !== null ? (
          <img src={`${baseUrl}${image}`} alt="avatar" className="avatar" />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="avatar"
            style={{
              width: 50,
              padding: 15,
            }}
          />
        )}
      </button>

      {showDropdown && <Dropdown />}
    </div>
  );
}

export default Avatar;
