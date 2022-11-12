import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'

function Checkout() {
  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <div>
          <h2 className='checkout_title'>
            Your Shopping Basket
          </h2>
        </div>
      </div>

      <div className='checkout_right'>
        <Subtotal/>
        <h2>The subtotal</h2>
      </div>
    </div>
  )
}

export default Checkout