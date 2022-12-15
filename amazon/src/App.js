import './App.css';
import React, { useEffect } from 'react'
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();

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
          <Route path = "/login" element={<Login />} />
          <Route path = "/signUp" element={<SignUp />} />
          <Route path = '/' element={[<Header />, <Home />]} />
          <Route path = '*' element={[<Navigate to='/' />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
