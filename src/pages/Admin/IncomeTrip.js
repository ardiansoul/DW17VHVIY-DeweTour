import Axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import TourGrid from "../../components/TourGrid";
import { baseUrl } from "../../dbConfig";

function IncomeTrip() {
  const { isLoading,  data } = useQuery("trips", () => {
    return Axios.get(`${baseUrl}api/v1/trip`);
  });

  // const { transData } = useQuery("transaction", () => {
  //   return Axios.get(`${baseUrl}api/v1/transaction`);
  // });

  // if (data !== undefined) {
  //   for (let i = 0; 1 < transData.data.data.length; i++) {
  //     const transaction = transData.data.data[i];
  //     let counterQty;
  //     for (let j = 0; j < data.data.data.length; j++) {
  //       const trips = data.data.data[j];
  //       if (transaction.trips.id === trips.id) {
  //         counterQty += transaction.counterQty;
  //       }
  //       console.log(counterQty);
  //     }
  //   }
  // }

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="spinner">
          <div className="bounce"></div>
        </div>
      ) : (
        // data.data.data.price +=
        <div className="incoming-trip section">
          <div className="incoming-trip-header">
            <h2>Income Trip</h2>
            <Link to="/admin/add-trip">
              <button className="btn btn-register">Add Trip</button>
            </Link>
          </div>
          <TourGrid data={data.data.data} />
        </div>
      )}
      <Footer />
    </>
  );
}

export default IncomeTrip;
