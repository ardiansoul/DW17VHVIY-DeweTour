import Axios from "axios";
import React from "react";
import { baseUrl, config } from "../dbConfig";
import logo from "../images/logo.svg";
import moment from "moment";

const ApproveModal = ({ detail, setModalApprove }) => {
  const approveButton = async () => {
    return await Axios({
      method: "PATCH",
      url: `${baseUrl}api/v1/transaction/${detail.id}`,
      data: {
        counterQty: detail.counterQty,
        total: detail.total,
        status: "Booking Approved",
        attachment: detail.attachment,
        tripId: detail.tripId,
        userId: detail.userId,
      },
      ...config,
    }).then(() => {
      setModalApprove(false);
    });
  };

  const cancelButton = async () => {
    return await Axios({
      method: "PATCH",
      url: `${baseUrl}api/v1/transaction/${detail.id}`,
      data: {
        counterQty: detail.counterQty,
        total: detail.total,
        status: "Booking Cancelled",
        attachment: detail.attachment,
        tripId: detail.tripId,
        userId: detail.userId,
      },
      ...config,
    }).then(() => {
      setModalApprove(false);
    });
  };

  const pricecurrency =
    "IDR." + new Intl.NumberFormat("id").format(detail.total);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        background: "transparent",
        top: 0,
        left: 0,
      }}
      onClick={() => {
        setModalApprove(false);
      }}
    >
      <div className="Approve-section modal">
        <div className="booking-card-header">
          <img src={logo} alt="logo" />
          <div className="booking-card-date">
            <h2>Booking</h2>
            <h6>{moment(detail.createdAt).format("dddd, DD MMM YYYY")}</h6>
          </div>
        </div>
        <div className="booking-card-trip">
          <div className="booking-card-tour">
            <h3 className="booking-card-title">{detail.trips.title}</h3>
            <p className="booking-card-country">{detail.trips.country.name}</p>
            <p className="booking-card-status">{detail.status}</p>
          </div>
          <div className="booking-card-info">
            <div className="booking-card-info-item">
              <h5>Date Trip</h5>
              <p>{moment(detail.trips.dateTrip).format("dddd, DD MMM YYYY")}</p>
            </div>
            <div className="booking-card-info-item">
              <h5>Accommodation</h5>
              <p>{detail.trips.accommodation}</p>
            </div>
            <div className="booking-card-info-item">
              <h5>Duration</h5>
              <p>{`${detail.trips.day} day ${detail.trips.night} Night`}</p>
            </div>
            <div className="booking-card-info-item">
              <h5>Transportation</h5>
              <p>{detail.trips.transportation}</p>
            </div>
          </div>
          <div className="booking-card-attachment">
            <img
              src={`${baseUrl}${detail.attachment}`}
              alt="bukti"
              className="booking-card-attachment-preview"
            />
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
              <td>{detail.users.fullName}</td>
              {/* <td>{transaction.users.gender}</td> */}
              <td>Laki-Laki</td>
              <td>{detail.users.phone}</td>
              <td className="booking-card-total">
                <h4>Qty :</h4>
              </td>
              <td>{detail.counterQty}</td>
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
        {detail.status === "Booking Approved" ||
        detail.status === "Booking Cancelled" ? (
          ""
        ) : (
          <div className="approve-btn">
            <button
              className="btn cancel"
              onClick={() => {
                cancelButton();
              }}
            >
              Cancel
            </button>
            <button
              className="btn approve"
              onClick={() => {
                approveButton();
              }}
            >
              approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveModal;
