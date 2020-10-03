import Axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "../context/auth";
import { baseUrl, config } from "../dbConfig";
import logo from "../images/logo.svg";
import moment from "moment";

const BookingCard = (props) => {
  const { userId } = useContext(authContext);
  const location = useLocation();

  const [file, setFile] = useState({});
  const [preview, setpreview] = useState(null);
  const [fileError, setFileError] = useState(false);

  const handleImage = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    reader.onloadend = (e) => {
      setpreview([reader.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const pay = async () => {
    try {
      const formData = new FormData();
      formData.append("tripId", props.data.trips.id);
      formData.append("counterQty", props.data.counterQty);
      formData.append("total", props.data.total);
      formData.append("userId", userId);
      formData.append("status", "Waiting Approve");
      formData.append("attachment", file);

      await Axios.patch(
        `${baseUrl}api/v1/transaction/${props.data.id}`,
        formData,
        config
      ).then((res) => console.log(res));
      props.setRefetch(true);
      props.setConfirmModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const pricecurrency =
    "IDR." + new Intl.NumberFormat("id").format(props.data.total);

  return (
    <>
      {fileError && (
        <div
          className="denied modal"
          onClick={() => {
            setFileError(false);
          }}
        >
          Proof of transfer has not been entered
        </div>
      )}

      <div className="booking-card">
        <div className="booking-card-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="booking-card-date">
            <h2>Booking</h2>
            <h5>{moment(props.data.createdAt).format("dddd, DD MMM YYYY")}</h5>
          </div>
        </div>
        <div className="booking-card-trip">
          <div className="booking-card-tour">
            <h3 className="booking-card-title">{props.data.trips.title}</h3>
            <p className="booking-card-country">
              {props.data.trips.country.name}
            </p>
            <p className={`booking-card-status ${props.data.status}`}>
              {props.data.status}
            </p>
          </div>
          <div className="booking-card-info">
            <div className="booking-card-info-item">
              <h6>Date Trip</h6>
              <p>{props.data.trips.dateTrip}</p>
            </div>
            <div className="booking-card-info-item">
              <h6>Accommodation</h6>
              <p>{props.data.trips.accommodation}</p>
            </div>
            <div className="booking-card-info-item">
              <h6>Duration</h6>
              <p>{`${props.data.trips.day} day ${props.data.trips.night} Night`}</p>
            </div>
            <div className="booking-card-info-item">
              <h6>Transportation</h6>
              <p>{props.data.trips.transportation}</p>
            </div>
          </div>
          <div className="booking-card-attachment">
            {location.pathname === "/profile" ? (
              <>
                <div className="booking-card-attachment-preview">
                  <img
                    src={`${baseUrl}${props.data.attachment}`}
                    alt="bukti"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </>
            ) : props.data.attachment !== null ? (
              <>
                <div className="booking-card-attachment-preview">
                  <img
                    src={`${baseUrl}${props.data.attachment}`}
                    alt="bukti"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </>
            ) : preview !== null ? (
              <>
                <div
                  className="booking-card-attachment-preview
                    "
                >
                  <img
                    src={preview}
                    alt="bukti"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <input type="file" onChange={handleImage} />
              </>
            ) : (
              <>
                <div className="booking-card-attachment-preview">
                  <h6
                    style={{
                      textAlign: "center",
                      lineHeight: "200px",
                    }}
                  >
                    Add your attachment
                  </h6>
                </div>
                <input type="file" accept="image/*" onChange={handleImage} />
              </>
            )}
          </div>
        </div>
        <div className="booking-card-user">
          <table>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Phone</th>
            </tr>
            <tr>
              <td>1</td>
              <td>{props.data.users.fullName}</td>
              {/* <td>{transaction.users.gender}</td> */}
              <td>Laki-Laki</td>
              <td>{props.data.users.phone}</td>
              <td className="booking-card-total">
                <h4>Qty :</h4>
              </td>
              <td>{props.data.counterQty}</td>
            </tr>
            <tr>
              <td colSpan="4"></td>
              <td className="booking-card-total">
                <h4>Total :</h4>
              </td>
              <td className="Cancelled">{pricecurrency}</td>
            </tr>
          </table>
        </div>
        <div className="approve-btn">
          {props.data.status !== "Waiting Payment" ? (
            ""
          ) : (
            <button
              className="btn"
              style={{
                backgroundColor: "#ffbc03",
                color: "#fff",
              }}
              onClick={() => {
                if (preview === null) {
                  setFileError(true);
                } else {
                  pay();
                }
              }}
            >
              PAY
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingCard;
