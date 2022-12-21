import './App.css';
import React, { useEffect } from 'react'
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
import { Element, Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51MHE1HHDlqV6YN3kqQkG8FMlOKzgDfavH94oDZ9JibesdbugG3rcZk8VfO7VY9BRjCZO0NZWgT0IiTMPfAazV1JK00ThK09Ca7'
);

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The User is >>>', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/payment" element={[<Header />, <Elements stripe={promise}> <Payment /> </Elements>]} />
          <Route path="/orders" element={[<Header />, <Orders />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/' element={[<Header />, <Home />]} />
          <Route path='*' element={[<Navigate to='/' />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
