import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import GuaranteeGrid from "../components/GuaranteeGrid";
import TourGrid from "../components/TourGrid";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import Axios from "axios";
import { baseUrl } from "../dbConfig";

function Home({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  const [query, setQuery] = useState("");

  const { isLoading, error, data, refetch } = useQuery("trips", () => {
    return Axios.get(`${baseUrl}api/v1/trip?query=${query || ""}`);
  });

  // const { data: transDatas } = useQuery("transactions", () => {
  //   return Axios.get(`${baseUrl}api/v1/transaction/`);
  // });

  const searchQuery = () => {
    refetch();
  };

  return (
    <>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      <HeroImage query={query} setQuery={setQuery} searchQuery={searchQuery} />
      <GuaranteeGrid />
      <h3 className="tour-group-title">Group Tour</h3>
      {isLoading ? (
        <div className="spinner">
          <div className="bounce"></div>
        </div>
      ) : error ? (
        <h3>{error.message}</h3>
      ) : data === undefined ? (
        <h3>Tour Belum Tersedia</h3>
      ) : (
        <TourGrid data={data.data.data} />
      )}
      <Footer />
    </>
  );
}

export default Home;
