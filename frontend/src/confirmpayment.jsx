import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./confirmpayment.css";

const ConfirmPayment = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchPaymentConfirmationProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/products/status?userId=${user.UserID}&status=PAYMENT_CONFIRMATION`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching payment confirmation products:", error);
        }
      };

      fetchPaymentConfirmationProducts();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login";
    }
  }, []);

  const handleConfirmOrder = async (productId) => {
    try {
      const response = await fetch("http://localhost:5001/api/products/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, status: "DELIVERING" }),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.ProductID !== productId)
        );
        alert("ยืนยันคำสั่งซื้อสำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการยืนยันคำสั่งซื้อ");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("เกิดข้อผิดพลาดในการยืนยันคำสั่งซื้อ");
    }
  };

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2>สินค้ารอยืนยันการชำระ</h2>
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
                  <button
                    className="confirm-button"
                    onClick={() => handleConfirmOrder(product.ProductID)}
                  >
                    ยืนยันคำสั่งซื้อ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่มีสินค้ารอยืนยันการชำระ</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
