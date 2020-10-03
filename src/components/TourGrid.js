import React from "react";
import TourCard from "./TourCard";

function TourGrid(props) {
  return (
    <>
      <div className="tour-grid">
        {props.data.map((data, i) => {
          return <TourCard key={i} data={data} />;
        })}
      </div>
    </>
  );
}

export default TourGrid;
