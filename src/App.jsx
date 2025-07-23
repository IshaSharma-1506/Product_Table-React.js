import { useEffect, useState } from "react";
import React from 'react';
import './App.css';

function App () {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await fetch (`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
      const data = await response.json();
      setProduct(data.products);
    }
    catch(error) {
      console.log("Error:", error);
    }
  }
  useEffect(() => {
      fetchProduct();
  }, [page]);

  const handlePrev = () => {
    if(page > 1) {
      setPage(page - 1);
    }
  }
  const handleNxt = () => {
      setPage(page + 1);
    }
 return (
  <div className="tableContent">
    <h1>Product Table</h1>
   <table border={1} cellPadding={10} cellSpacing={5}>
    <thead>
      <tr>
      <th>Id</th>
      <th>Product</th>
      <th>Description</th>
      <th>Price</th>
      <th>Availability Status</th>
      <th>Brand</th>
      </tr>
    </thead>
    <tbody>
      {product.map((product) => (
      <tr key={product.id}>
      <td>{product.id}</td>
      <td>
        <img src={product.images[0]} alt={product.name} width={130} />
      </td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.availabilityStatus}</td>
      <td>{product.brand}</td>
      </tr>
      ))}
    </tbody>
   </table>
   <div className='footer'>
      <button className='prev' onClick={handlePrev} disabled={page === 1}>Previous</button>
      <span>Page : {page}</span>
      <button className='nxt' onClick={handleNxt}>Next</button>
   </div>
  </div>
 );
}
export default App;