import React from "react";

function HeroImage(props) {
  const searchHandle = (e) => {
    props.setQuery(e.target.value);
  };

  return (
    <div className="hero-image">
      <div className="hero-content">
        <h1 className="hero-title">Explore</h1>
        <h5 className="hero-desc">your amazing ciry together</h5>
        <div className="search-bar">
          <span>Find great places to holliday</span>
          <input
            type="text"
            className="search-input"
            name="query"
            value={props.query}
            onChange={searchHandle}
          />
          <button
            className="btn search-btn"
            onClick={() => {
              props.searchQuery();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
