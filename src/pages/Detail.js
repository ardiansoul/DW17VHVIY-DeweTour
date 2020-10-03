import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import {
  faCalendarDay,
  faClock,
  faHotel,
  faPlane,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Increment from "../components/Increment";
import { useQuery } from "react-query";
import { baseUrl } from "../dbConfig";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// moment().format();

function Detail({
  setShowModalLogin,
  setShowModalRegister,
  showModalLogin,
  showModalRegister,
}) {
  const [deniedModal, setDeniedModal] = useState(false);

  const { id } = useParams();

  const { isLoading, error, data } = useQuery("detailTrip", () => {
    return axios.get(`${baseUrl}api/v1/trip/${id}`);
  });

  let images;

  return (
    <>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      {deniedModal && (
        <div
          className="denied modal"
          onClick={() => setDeniedModal(false)}
          style={{ cursor: "pointer" }}
        >
          Admin tidak dapat melakukan pembelian
        </div>
      )}
      {isLoading ? (
        <div className="spinner">
          <div className="bounce"></div>
        </div>
      ) : error ? (
        <div className="denied modal">{error}</div>
      ) : (
        <div className="detail section">
          <div className="detail-header">
            <h3 className="detail-title">{data.data.data.title}</h3>
            <p className="detail-country">{data.data.data.country.name}</p>
          </div>
          <div className="detail-image-group">
            {
              ((images = data.data.data.image.slice(
                0,
                data.data.data.image.length - 1
              )),
              images.length !== 0 &&
                images
                  .split(",")
                  .map((image) => (
                    <img
                      src={`${baseUrl}${image}`}
                      alt={data.data.data.title}
                    />
                  )))
            }
          </div>
          <div className="detail-info">
            <h4 className="detail-info-title">Information Trip</h4>
            <div className="detail-info-grid">
              <InfoCard
                head="Accommodation"
                title={data.data.data.accommodation}
                icon={faHotel}
              />
              <InfoCard
                head="Transportation"
                title={data.data.data.transportation}
                icon={faPlane}
              />
              <InfoCard
                head="Eat"
                title={data.data.data.eat}
                icon={faUtensils}
              />
              <InfoCard
                head="Duration"
                title={`${data.data.data.day} Day ${data.data.data.night} Night`}
                icon={faClock}
              />
              <InfoCard
                head="Date Trip"
                title={data.data.data.dateTrip}
                icon={faCalendarDay}
              />
            </div>
          </div>
          <div className="description">
            <h4 className="desc-title">Description</h4>
            <p className="desc-content">{data.data.data.description}</p>
          </div>
          <Increment
            price={data.data.data.price}
            tripid={id}
            setDeniedModal={setDeniedModal}
            setShowModalLogin={setShowModalLogin}
          />
        </div>
      )}
      <Footer />
    </>
  );
}

export default Detail;
