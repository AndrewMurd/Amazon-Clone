import './App.css';
import React from 'react'
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          {/* <Route path = "/login" element={<Login />} /> */}
          <Route path = '/' element={[<Header />, <Home />]} />
          <Route path = '*' element={[<Navigate to='/' />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
