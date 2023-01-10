import '../styles/App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Payment from './Payment';
import Orders from './Orders';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { db } from './firebase';
import ShippingAddress from './ShippingAddress';

const promise = loadStripe(
  'pk_test_51MHE1HHDlqV6YN3kqQkG8FMlOKzgDfavH94oDZ9JibesdbugG3rcZk8VfO7VY9BRjCZO0NZWgT0IiTMPfAazV1JK00ThK09Ca7'
);

const localStorageBasket = JSON.parse(localStorage.getItem('basket'));

function App() {
  const [{ popup, basket, user }, dispatch] = useStateValue();

  // updates the database or local storage with current basket of items
  useEffect(() => {
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .set({
          basket: basket,
        }, { merge: true });
    } else {
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  }, [basket])

  // sets global variables in data layer (reducer) when user logs in or out
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
        db
          .collection('users')
          .doc(authUser.uid)
          .onSnapshot(doc => {
            if (doc.data().email == authUser.email) {
              dispatch({
                type: 'SET_NAME',
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
              });
              dispatch({
                type: 'SET_ADDRESS',
                address: doc.data().address,
              });
              dispatch({
                type: 'SET_BASKET',
                basket: doc.data().basket,
              });
            }
          });
      } else {
        dispatch({
          type: 'SET_BASKET',
          basket: localStorageBasket,
        });
        dispatch({
          type: 'SET_USER',
          user: null,
        });
        dispatch({
          type: 'SET_NAME',
          firstName: null,
          lastName: null,
        });
      }
    })
  }, [])

  return (
    <Router>
      <div className='app'>
        <div onClick={() => {
          dispatch({
            type: 'OPEN_POPUP',
            popup: !popup,
          });
        }} className={popup ? 'cover' : ''}></div>
        <Routes>
          <Route path="/checkout" element={[<Header />, <ShippingAddress></ShippingAddress>, <Checkout />]} />
          <Route path="/payment" element={[<Header />, <ShippingAddress></ShippingAddress>, <Elements stripe={promise}> <Payment /> </Elements>]} />
          <Route path="/orders" element={[<Header />, <ShippingAddress></ShippingAddress>, <Orders />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/' element={[<Header />, <ShippingAddress></ShippingAddress>, <Home />]} />
          <Route path='*' element={[<Navigate to='/' />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
