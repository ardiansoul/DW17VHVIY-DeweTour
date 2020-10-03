import React from "react";

function GuaranteeCard({ title, image, desc }) {
  return (
    <div className="guarantee-card">
      <img src={image} className="guarantee-card-image" alt={title} />
      <h5 className="guarantee-card-title">{title}</h5>
      <p className="guarantee-card-desc">{desc}</p>
    </div>
  );
}

export default GuaranteeCard;
