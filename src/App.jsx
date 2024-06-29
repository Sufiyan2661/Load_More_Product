import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(false);
  const [count, setCount] = useState(0);

  const skip = count === 0 ? 0 : count * 20;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip}`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products.length === 100) {
      setDisable(true);
    }
  },[products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((product, index) => {
              return (
                <div key={`${product.id}`} className="product">
                  <img src={product.thumbnail} />
                  <p>{product.title}</p>
                </div>
              );
            })
          : null}
      </div>
      <div className="button-container">
        <button disabled={disable} onClick={() => setCount(count + 1)}>
          Load Nore Products
        </button>
        {disable ? <p>You have reached the limit of 100</p> : null}
      </div>
    </div>
  );
}

export default App;
