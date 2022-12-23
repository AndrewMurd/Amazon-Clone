import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './Product';
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [{ searchInput }, dispatch] = useStateValue();

  useEffect(() => {
    db
      .collection('products')
      .onSnapshot(snapshot => {
        setSearchProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
      })
  }, [])

  useEffect(() => {
    db
      .collection('products')
      .onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
      })
    if (searchInput == '') {
      setSearchProducts(products.map(element => ({
        id: element.id,
        data: element.data,
      })));
      return;
    }
    let arr = [];
    for (let prod of products) {
      if (prod.data.title.toLowerCase().includes(searchInput.toLowerCase())) {
        arr.push(prod);
      }
    }
    setSearchProducts(arr.map(element => ({
      id: element.id,
      data: element.data,
    })));
  }, [searchInput])

  return (
    <div className='home'>
      <div className='home_container'>
        <div className='home_row'>
          {searchProducts?.map((product, index) => {
            return (
              <Product
                id={product.id}
                title={product.data.title}
                price={product.data.price}
                image={product.data.image}
                rating={product.data.rating}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
