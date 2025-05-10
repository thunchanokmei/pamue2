import React, { useState, useEffect } from "react";
import "./deliveringproduct.css";

const DeliveringProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDeliveringProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products/status?status=DELIVERING"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching delivering products:", error);
      }
    };

    fetchDeliveringProducts();
  }, []);

  return (
    <div className="delivering-product-container">
      <h2>สินค้ากำลังจัดส่ง</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <h3>{product.name}</h3>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้ากำลังจัดส่ง</p>
        )}
      </div>
    </div>
  );
};

export default DeliveringProduct;