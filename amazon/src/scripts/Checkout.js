import React, { useState, useEffect } from 'react';
import '../styles/Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';

function Checkout() {
  const [{ basket, searchInput }, dispatch] = useStateValue();
  const [searchProducts, setSearchProducts] = useState([]);

  // creates list of searched for items
  useEffect(() => {
    // if input is empty return every checkout item
    if (searchInput == '') {
      setSearchProducts(basket.map(item => ({
        quantity: item.quantity,
        content: item.content,
      })));
      return;
    }
    let arr = [];
    // get items with searched for value inside title
    for (let item of basket) {
      if (item.content.title.toLowerCase().includes(searchInput.toLowerCase())) {
        arr.push(item);
      }
    }
    // return searched item list
    setSearchProducts(arr.map(item => ({
      quantity: item.quantity,
      content: item.content,
    })));
  }, [searchInput, basket])

  return (
    <div>
      <div className='checkout'>
        <div className='checkout_left'>
          <div>
            <h2 className='checkout_title'>
              Shopping Cart
            </h2>

            {searchProducts.map(item => (
              <CheckoutProduct
                quantity= {item.quantity}
                id={item.content.id}
                title={item.content.title}
                image={item.content.image}
                price={item.content.price}
                rating={item.content.rating}
              />
            ))}
          </div>
        </div>
        <div className='checkout_right'>
          <Subtotal />
        </div>
      </div>
    </div>
  )
}

export default Checkout