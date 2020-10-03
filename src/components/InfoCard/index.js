import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function InfoCard({ head, title, icon }) {
  return (
    <div className="detail-info-card">
      <p className="detail-info-card-title">{head}</p>
      <div className="detail-info-card-content">
        <FontAwesomeIcon icon={icon} className="detail-info-card-icon" />
        <h6 className="detail-info-card-desc">{title}</h6>
      </div>
    </div>
  );
}

export default InfoCard;
