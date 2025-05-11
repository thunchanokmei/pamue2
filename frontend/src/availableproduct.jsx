import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./availableproduct.css";

const AvailableProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchAvailableProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/products/status?userId=${user.UserID}&status=AVALIABLE`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching available products:", error);
        }
      };

      fetchAvailableProducts();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login"; // เปลี่ยนไปหน้า login หากไม่ได้ล็อกอิน
    }
  }, []);

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2 className="page-title">สินค้าที่พร้อมขาย</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.ProductID} className="product-card">
                <img
                  src={`http://localhost:5001${product.imageUrl}`}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} บาท</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">ไม่มีสินค้าที่พร้อมขาย</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableProduct;