import React from 'react'
import './Product.css';

function Product() {
  return (
    <div className='product'>
        <div className='product_info'>
            <p>amika PERK UP Dry Shampoo , 150.0 ml (Pack of 1)</p>
            <div className='product_rating'>
                <p>⭐</p>
            </div>
            <p className='product_price'><small>$</small><strong>34.00</strong></p>
        </div>
        <img src='https://m.media-amazon.com/images/I/61D3QkLO9VL._SX466_.jpg' alt=''></img>
        <button>Add to Basket</button>
    </div>
  )
}

export default Product
