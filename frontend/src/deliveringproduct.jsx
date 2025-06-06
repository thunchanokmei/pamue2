import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./deliveringproduct.css";

const DeliveringProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchDeliveringProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/products/status?userId=${user.UserID}&status=DELIVERING`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching delivering products:", error);
        }
      };

      fetchDeliveringProducts();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2>สินค้ากำลังจัดส่ง</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.ProductID} className="product-card">
                <img
                  src={`${product.imageUrl}`}
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
            <p>ไม่มีสินค้ากำลังจัดส่ง</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveringProduct;