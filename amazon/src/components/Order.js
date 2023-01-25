import React, { useEffect } from 'react';
import '../styles/Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>
                {moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}
            </p>
            <p>{order.data.address}</p>
            <p className='order_id'>
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    quantity={item.quantity}
                    id={item.content.id}
                    title={item.content.title}
                    image={item.content.image}
                    price={item.content.price}
                    rating={item.content.rating}
                    isOrder={true}
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <h3 className='order_total'>Order Total: {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />
        </div>
    )
}

export default Order