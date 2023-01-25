import React, { useState } from "react";
import "../styles/CheckoutProduct.css";
import { useStateValue } from "../services/StateProvider";

function CheckoutProduct({
  quantity,
  id,
  image,
  title,
  price,
  rating,
  isOrder,
}) {
  const [{}, dispatch] = useStateValue();
  const [qty, setQty] = useState(quantity);
  const [isSelect, setIsSelect] = useState(true);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct_DivImage">
        <img alt="" className="checkoutProduct_image" src={image} />
      </div>
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!isOrder ? (
          <div className="checkoutProduct_quantity">
            {isSelect ? (
              <select
                className="checkoutProduct_selector"
                onChange={(e) => {
                  if (Number(e.target.value) >= 10) {
                    setIsSelect(false);
                  } else {
                    setQty(Number(e.target.value));
                    dispatch({
                      type: "CHANGE_QTY",
                      quantity: Number(e.target.value),
                      id: id,
                    });
                  }
                }}
              >
                <option selected disabled hidden>
                  {qty}
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>+10</option>
              </select>
            ) : (
              <div className="checkoutProduct_10">
                <input
                  type="number"
                  value={qty}
                  onClick={(e) => e.target.select()}
                  onChange={(e) => {
                    let num = e.target.value;
                    const re = /^[1-9]+[0-9]*$/;
                    if (num == "-") {
                      setQty("");
                    }
                    if (num == "") {
                      setQty(num);
                    }
                    if (re.test(num)) {
                      setQty(Number(num));
                    }
                  }}
                ></input>
                <button
                  onClick={() => {
                    if (qty > 0 && qty != "") {
                      setIsSelect(true);
                      dispatch({
                        type: "CHANGE_QTY",
                        quantity: qty,
                        id: id,
                      });
                    }
                  }}
                >
                  Update
                </button>
              </div>
            )}
            <button onClick={removeFromBasket}>Remove from Basket</button>
          </div>
        ) : (
          <strong>Quantity: {quantity}</strong>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
