import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../dbConfig";

function TourCard({ data }) {
  const newTitle = data.title.substr(0, 25) + "...";
  const pricecurrency = "IDR." + new Intl.NumberFormat("id").format(data.price);
  const images = data.image.split(",");

  return (
    <>
      <Link to={`/detail/${data.id}`}>
        <div className="tour-card">
          <span className="tour-card-quota">{`${data.quota}`}</span>
          <img
            className="tour-card-image"
            src={`${baseUrl}${images[0]}`}
            alt={data.title}
          />
          <div className="tour-card-content">
            <h4 className="tour-card-title">{`${data.day}D/${data.night}M ${newTitle}`}</h4>
            <div className="tour-card-desc">
              <span className="tour-card-price">{pricecurrency}</span>
              <span className="tour-card-country">{data.country.name}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TourCard;
