import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./completedpage.css";

const CompletedPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchCompletedProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/products/status?userId=${user.UserID}&status=COMPLETED`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching completed products:", error);
        }
      };

      fetchCompletedProducts();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2>สินค้าที่ขายแล้ว</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.ProductID} className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">{product.price} บาท</p>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่มีสินค้าที่ขายแล้ว</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedPage;
