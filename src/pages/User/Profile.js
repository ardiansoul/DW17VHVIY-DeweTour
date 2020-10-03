import React, { useContext, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import BookingCard from "../../components/BookingCard";
import { authContext } from "../../context/auth";
import Axios from "axios";
import { useQuery } from "react-query";
import { baseUrl, config } from "../../dbConfig";

function Profile() {
  const [input, setInput] = useState(false);
  const [file, setFile] = useState({});
  const { userId, setImage } = useContext(authContext);

  const { isLoading, error, data, refetch } = useQuery("user", () => {
    return Axios.get(`${baseUrl}api/v1/user/${userId}`, config);
  });
  const { data: paymentData } = useQuery("payment", () => {
    return Axios.get(`${baseUrl}api/v1/user/${userId}/payment/`, config);
  });

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setInput(true);
    }
  };

  const btnImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", data.data.data.fullName);
    formData.append("email", data.data.data.email);
    formData.append("phone", data.data.data.phone);
    formData.append("address", data.data.data.address);
    formData.append("role", data.data.data.role);
    formData.append("image", file);

    try {
      const data = await Axios.patch(
        `${baseUrl}api/v1/user/${userId}`,
        formData,
        config
      );
      setImage(data.data.data.image);
      setInput(false);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="section">
          <div className="spinner">
            <div className="bounce"></div>
          </div>
        </div>
      ) : error ? (
        <div className="denied modal">{error}</div>
      ) : data && paymentData ? (
        <>
          <div className="profile">
            <div className="profile-desc">
              <h2>Personal Info</h2>
              <div className="profile-card">
                <FontAwesomeIcon icon={faUser} className="icon-profile" />
                <div>
                  <h4>{data.data.data.fullName}</h4>
                  <p>Full Name</p>
                </div>
              </div>
              <div className="profile-card">
                <FontAwesomeIcon icon={faEnvelope} className="icon-profile" />
                <div>
                  <h4>{data.data.data.email}</h4>
                  <p>Email</p>
                </div>
              </div>
              <div className="profile-card">
                <FontAwesomeIcon icon={faPhone} className="icon-profile" />
                <div>
                  <h4>{data.data.data.phone}</h4>
                  <p>Phone</p>
                </div>
              </div>
              <div className="profile-card">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="icon-profile"
                />
                <div>
                  <h4>{data.data.data.address}</h4>
                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="profile-image">
              {data.data.data.image === null ? (
                <div className="profile-image-preview">Photo not added</div>
              ) : (
                <img
                  className="profile-image-preview"
                  src={`${baseUrl}${data.data.data.image}`}
                  alt="profileimage"
                />
              )}
              {input ? (
                <button className="profile-image-input" onClick={btnImage}>
                  Change Photo
                </button>
              ) : (
                <input
                  onChange={handleImage}
                  accept="image/*"
                  className="profile-image-input"
                  type="file"
                  hidden
                />
              )}
            </div>
          </div>

          <h2 className="tour-group-title">History Transaction</h2>

          {paymentData.data.data.map((transaction) => {
            if (transaction.status === "Booking Approved")
              return <BookingCard data={transaction} />;
          })}
        </>
      ) : (
        <div className="section"></div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
