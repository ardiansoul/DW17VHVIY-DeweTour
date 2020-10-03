import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useQuery } from "react-query";
import { baseUrl, config } from "../../dbConfig";
import ApproveModal from "../../components/ApproveModal";

function Transaction() {
  const [modalApprove, setModalApprove] = useState(false);
  const [detail, setDetail] = useState({});

  const { isLoading, error, data, refetch } = useQuery("transactions", () => {
    return Axios.get(`${baseUrl}api/v1/transaction`, config);
  });

  useEffect(() => {
    refetch();
  }, [modalApprove]);

  const detailTransaction = async (id) => {
    await Axios.get(`${baseUrl}api/v1/transaction/${id}`, config).then(
      (res) => {
        setDetail(res.data.data);
        setModalApprove(true);
      }
    );
  };

  return (
    <>
      {modalApprove && (
        <ApproveModal detail={detail} setModalApprove={setModalApprove} />
      )}
      <Navbar />
      <div className="transaction section">
        <h2>Incoming Transaction</h2>

        {isLoading ? (
          <div className="spinner">
            {/* <div>Loading</div> */}
            <div className="bounce"></div>
          </div>
        ) : error || data.data.data.length === 0 ? (
          <div className="denied modal">Transaction not Found</div>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Trip</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.data.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.users.fullName}</td>
                  <td>{transaction.trips.title}</td>
                  <td>{transaction.attachment}</td>
                  <td
                    className={transaction.status}
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    {transaction.status}
                  </td>
                  <td>
                    <button
                      className="transaction-btn"
                      onClick={() => {
                        detailTransaction(transaction.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Transaction;
