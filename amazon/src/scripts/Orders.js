import React, { useEffect, useState } from 'react';
import '../styles/Orders.css';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import Order from './Order';

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  
  // get orders from database
  useEffect(() => {
    if (user) {
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
      })
    }
  })

  return (
    <div className='orders'>
      <h1>Your orders</h1>

      <div className='orders_order'>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders