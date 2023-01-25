import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../services/StateProvider";
import { Link } from "react-router-dom";
import "../styles/Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketSubtotal } from "../services/reducer";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { db } from "../services/firebase";

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user, address, popup }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    if (basket.length == 0) {
      navigate("/");
    }

    // generate the stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in a currencies subunits (*100)
        url: `/payments/create?total=${parseInt(
          getBasketSubtotal(basket) * 100
        )}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  // submit and complete payment order to stripec
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error) {
      return;
    }

    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // send order to database
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            address: address,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    if (address) {
      setDisabled(e.empty);
    }
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery address</h3>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "OPEN_POPUP",
                popup: !popup,
              });
            }}
            className="payment_address"
          >
            <p>{user?.email}</p>
            <p className={address ? "" : "payment_addressLineTwo-error"}>
              {address
                ? address
                : "Click Here to Select an Address before Proceeding!"}
            </p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                quantity={item.quantity}
                id={item.content.id}
                title={item.content.title}
                image={item.content.image}
                price={item.content.price}
                rating={item.content.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketSubtotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
