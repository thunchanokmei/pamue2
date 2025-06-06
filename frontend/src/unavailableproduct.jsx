import React, { useState, useEffect } from "react";
import "./unavailableproduct.css";

const UnavailableProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUnavailableProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products/status?status=COMPLETED"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching unavailable products:", error);
      }
    };

    fetchUnavailableProducts();
  }, []);

  return (
    <div className="unavailable-product-container">
      <h2>สินค้าที่ขายแล้ว</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <h3>{product.name}</h3>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าที่ขายแล้ว</p>
        )}
      </div>
    </div>
  );
};

export default UnavailableProduct;