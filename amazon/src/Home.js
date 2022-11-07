import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        {/* <img src='https://images-eu.ssl-image-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'></img> */}
        <div className='home_row'>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </div>
        <div className='home_row'>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </div>
        <div className='home_row'>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </div>
      </div>
    </div>
  )
}

export default Home
