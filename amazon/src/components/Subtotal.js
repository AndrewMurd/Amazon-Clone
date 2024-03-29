import React from "react";
import "../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../services/StateProvider";
import { useNavigate } from "react-router-dom";
import { getBasketSubtotal } from "../services/reducer";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            {/* <small className='subtotal_gift'>
                            <input type='checkbox' /> This order contains a gift
                        </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketSubtotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        disabled={basket.length === 0 ? true : false}
        onClick={(e) => {
          if (user) {
            navigate("/payment");
          } else {
            navigate("/login");
          }
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
