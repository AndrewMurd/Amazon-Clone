import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div>
      <div className='checkout'>
        <div className='checkout_left'>
          <div>
            <h2 className='checkout_title'>
              Shopping Cart
            </h2>

            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
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