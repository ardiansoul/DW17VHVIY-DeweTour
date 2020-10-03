import React from "react";
import leaf from "../images/leaf.svg";

function Footer() {
  return (
    <>
      <div className="footer">
        <p>
          Copyright @ 2020 The Journey - Ardiyana Saputra - DW17VHIY. All Rights
          reserved
        </p>
        <img src={leaf} alt="footer" />
      </div>
    </>
  );
}

export default Footer;
