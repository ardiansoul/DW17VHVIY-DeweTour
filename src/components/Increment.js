import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../context/auth";
import { baseUrl, config } from "../dbConfig";
import Login from "./Login";

const Increment = ({ setDeniedModal, tripid, price, setShowModalLogin }) => {
  const { role, userId, isLogin } = useContext(authContext);
  const [input, setInput] = useState({
    userId: 0,
    counterQty: 1,
    total: price,
    status: "Waiting Payment",
    tripId: tripid,
    attachment: null,
  });

  useEffect(() => {
    setInput({ ...input, userId: userId });
  }, [userId]);

  const [isRedirect, setIsRedirect] = useState(false);
  const pricecurrency = "IDR." + new Intl.NumberFormat("id").format(price);
  const totalcurrency =
    "IDR." + new Intl.NumberFormat("id").format(input.total);

  function increment() {
    const newInput = {
      ...input,
      counterQty: input.counterQty + 1,
      total: input.total + price,
    };
    setInput(newInput);
  }
  function decrement() {
    if (input.counterQty === 1) {
      setInput({ ...input, counterQty: input.counterQty });
    } else {
      const newInput = {
        ...input,
        counterQty: input.counterQty - 1,
        total: input.total - price,
      };
      setInput(newInput);
    }
  }

  const payment = async () => {
    try {
      if (!localStorage.token) {
        setShowModalLogin(true);
      } else if (role === "admin") {
        setDeniedModal(true);
      } else {
        await Axios.post(`${baseUrl}api/v1/transaction/`, input, config);
        setIsRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isRedirect ? (
        <Redirect to="/payment" />
      ) : (
        <>
          <div className="increment-section">
            <div className="increment-wrapper">
              <h3 className="increment-price">
                {`${pricecurrency} / `}
                <span
                  style={{
                    color: "#000",
                    fontSize: "20px",
                  }}
                >
                  Person
                </span>
              </h3>
              <div className="increment-decrement">
                <button className="increment quota-btn" onClick={decrement}>
                  -
                </button>
                <h3 className="increment-input">{input.counterQty}</h3>
                <button className="decrement quota-btn" onClick={increment}>
                  +
                </button>
              </div>
            </div>
            <div className="increment-wrapper">
              <h3>Total: </h3>
              <h3 className="increment-price">{totalcurrency}</h3>
            </div>
            <button
              className="increment-btn btn"
              onClick={() => {
                isLogin
                  ? role === "admin"
                    ? setDeniedModal(true)
                    : payment()
                  : setShowModalLogin(true);
              }}
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Increment;
