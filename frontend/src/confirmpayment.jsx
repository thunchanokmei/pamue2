import React, { useState, useEffect } from "react";
import "./confirmpayment.css";

const ConfirmPayment = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPaymentConfirmationProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products/status?status=PAYMENT_CONFIRMATION"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching payment confirmation products:", error);
      }
    };

    fetchPaymentConfirmationProducts();
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

  // ฟังก์ชันสำหรับแสดงดาวตาม condition
  const renderStars = (condition) => {
    const stars = [];
    for (let i = 0; i < condition; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  return (
    <div className="confirm-payment-container">
      <h2>สินค้ารอยืนยันการชำระ</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: {product.price} THB</p>
              <p>Condition: {renderStars(product.condition)}</p>
              <div className="customer-info">
                <p>
                  <strong>Customer Name:</strong> {product.customer?.name || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {product.customer?.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {product.customer?.address || "N/A"}
                </p>
              </div>
              <button
                className="confirm-button"
                onClick={() => handleConfirmOrder(product.ProductID)}
              >
                ยืนยันคำสั่งซื้อ
              </button>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้ารอยืนยันการชำระ</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmPayment;