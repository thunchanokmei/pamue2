import React, { useState, useEffect } from "react";
import "./availableproduct.css";

const AvailableProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลสินค้าที่มีสถานะ AVALIABLE
    const fetchAvailableProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products/status?status=AVALIABLE");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching available products:", error);
      }
    };

    fetchAvailableProducts();
  }, []);

  return (
    <div className="available-product-container">
      <h2>สินค้าของฉัน</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: {product.price} THB</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าในสถานะนี้</p>
        )}
      </div>
    </div>
  );
};

export default AvailableProduct;