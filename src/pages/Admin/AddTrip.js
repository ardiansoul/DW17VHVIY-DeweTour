import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { baseUrl, config } from "../../dbConfig";

function AddTrip() {
  const [formTrip, setFormTrip] = useState({
    title: "",
    countryId: 0,
    accommodation: "",
    transportation: "",
    eat: "",
    day: 0,
    night: 0,
    dateTrip: "",
    price: 0,
    quota: 0,
    description: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState([]);
  // const [preview, setPreview] = useState(null);

  const { isLoading, data } = useQuery("country", () => {
    return Axios.get(`${baseUrl}api/v1/country`, config);
  });

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formTrip.title);
      data.append("countryId", formTrip.countryId);
      data.append("accommodation", formTrip.accommodation);
      data.append("transportation", formTrip.transportation);
      data.append("eat", formTrip.eat);
      data.append("day", formTrip.day);
      data.append("night", formTrip.night);
      data.append("dateTrip", formTrip.dateTrip);
      data.append("price", formTrip.price);
      data.append("quota", formTrip.quota);
      data.append("description", formTrip.description);
      data.append("image", file[0]);
      data.append("image", file[1]);
      data.append("image", file[2]);
      await Axios.post(`${baseUrl}api/v1/trip`, data, config).then((res) => {
        setRedirect(true);
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setFormTrip({ ...formTrip, [event.target.name]: event.target.value });
  };

  const handleImage = (e) => {
    // let reader = new FileReader();
    if (e.target.files) {
      setFile([...file, e.target.files[0]]);
    }
    // reader.onloadend = (e) => {
    //   setPreview([reader.result]);
    //   console.log(reader);
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };
  const fileDelete = (i) => {
    file.splice(i, 1);
  };
  console.log(file);

  return (
    <>
      <Navbar />
      {redirect ? (
        <Redirect to="/admin/incoming-trip" />
      ) : (
        <div className="add-trip section">
          <h2>Add Trip</h2>
          <div className="form-trip">
            <label className="form-trip-label">Title Trip</label>
            <input
              type="text"
              className="form-trip-input"
              name="title"
              onChange={handleChange}
              value={formTrip.title}
            />
            <label className="form-trip-label">Country</label>
            <select
              className="form-trip-input"
              name="countryId"
              value={formTrip.countryId}
              onChange={handleChange}
            >
              {isLoading ? (
                <option>Laoding...</option>
              ) : (
                (console.log(data.data.data),
                data.data.data.map((country) => (
                  <option value={country.id}>{country.name}</option>
                )))
              )}
            </select>
            <label className="form-trip-label">Accommodation</label>
            <input
              type="text"
              className="form-trip-input"
              name="accommodation"
              onChange={handleChange}
              value={formTrip.accommodation}
            />
            <label className="form-trip-label">Transportation</label>
            <input
              type="text"
              className="form-trip-input"
              name="transportation"
              onChange={handleChange}
              value={formTrip.transportation}
            />
            <label className="form-trip-label">Eat</label>
            <input
              type="text"
              className="form-trip-input"
              name="eat"
              onChange={handleChange}
              value={formTrip.eat}
            />
            <label className="form-trip-label">Duration</label>
            <div className="form-trip-group">
              <label className="form-trip-label">Day</label>
              <input
                type="number"
                onChange={handleChange}
                name="day"
                value={formTrip.day}
                className="form-input-half"
              />
              <label className="form-trip-label">Night</label>
              <input
                type="number"
                name="night"
                onChange={handleChange}
                value={formTrip.night}
                className="form-input-half"
              />
            </div>
            <label className="form-trip-label">Date Trip</label>
            <input
              type="date"
              className="form-trip-input"
              name="dateTrip"
              onChange={handleChange}
              value={formTrip.dateTrip}
            />
            <label className="form-trip-label">Price</label>
            <input
              type="number"
              className="form-trip-input"
              name="price"
              onChange={handleChange}
              value={formTrip.price}
            />
            <label className="form-trip-label">Quota</label>
            <input
              type="number"
              className="form-trip-input"
              name="quota"
              onChange={handleChange}
              value={formTrip.quota}
            />
            <label className="form-trip-label">Description</label>
            <textarea
              className="form-trip-input"
              name="description"
              onChange={handleChange}
              value={formTrip.description}
              style={{
                height: 150,
              }}
            ></textarea>
            <label className="form-trip-label">Image</label>

            <div className="form-trip-group">
              <div
                style={{
                  marginBottom: 20,
                }}
              >
                <input
                  type="file"
                  className="form-trip-input-image"
                  onChange={handleImage}
                  name="image"
                  accept="image/*"
                />
                {file.length !== 0
                  ? file.map((file, i) => (
                      <div className="image-list">
                        {file.name.substr(0, 20) + "..."}
                        <button
                          onClick={() => {
                            fileDelete(i);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    ))
                  : ""}
              </div>
              {/* <img src={preview} className="form-trip-image-review" /> */}
            </div>
            <div className="modal-button">
              <button onClick={handleSubmit} className="btn btn-register">
                Add Trip
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default AddTrip;
