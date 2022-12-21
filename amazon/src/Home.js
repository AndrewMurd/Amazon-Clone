import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        {/* <img src='https://images-eu.ssl-image-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'></img> */}
        <div className='home_row'>
            <Product 
            id={1}
            title='Charmin Ultra Strong Toilet Paper 24 Mega Rolls, 242 Sheets Per Roll' 
            price={25.39} 
            image='https://m.media-amazon.com/images/I/81Zuka0blmL._AC_SL1500_.jpg'
            rating={4}/>
            <Product 
            id={2}
            title='Lenovo Flex 5 Chromebook, 13" Touchscreen Convertible Laptop, Intel Core i3 Processor, 8 GB RAM, 64GB eMMC, ChromeOS, Blue, 82M70050CC' 
            price={422.99} 
            image='https://m.media-amazon.com/images/I/81RFAJO-31S._AC_SL1500_.jpg'
            rating={5}/>
        </div>
        <div className='home_row'>

        </div>
        <div className='home_row'>
            
        </div>
      </div>
    </div>
  )
}

export default Home
