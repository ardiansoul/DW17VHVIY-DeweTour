import Axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import BookingCard from "../../components/BookingCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { authContext } from "../../context/auth";
import { baseUrl, config } from "../../dbConfig";

function Payment() {
  const { userId } = useContext(authContext);
  const [confirmModal, setConfirmModal] = useState(false);

  const { isLoading, data, refetch } = useQuery("transaction", () => {
    return Axios.get(`${baseUrl}api/v1/user/${userId}/payment`, config);
  });

  const setRefetch = () => {
    refetch();
  };

  return (
    <>
      <Navbar />
      {confirmModal && (
        <div
          className="confirm modal"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setConfirmModal(false);
          }}
        >
          Your payment will be confirmed within 1 x 24 hours To see orders click
          Here thank you
        </div>
      )}
      {isLoading ? (
        <div className="spinner">
          <div className="bounce"></div>
        </div>
      ) : (
        <div>
          {data.data.data.map((transaction) => {
            if (
              transaction.status === "Waiting Payment" ||
              transaction.status === "Waiting Approve"
            )
              return (
                <BookingCard
                  data={transaction}
                  setRefetch={setRefetch}
                  setConfirmModal={setConfirmModal}
                />
              );
          })}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Payment;
