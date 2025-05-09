import React, { useState, useEffect } from "react";
import "./confirmpayment.css";

const ConfirmPayment = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลสินค้าที่มีสถานะ PAYMENT_CONFIRMATION
    const fetchPaymentConfirmationProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products?status=PAYMENT_CONFIRMATION");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching payment confirmation products:", error);
      }
    };

    fetchPaymentConfirmationProducts();
  }, []);

  return (
    <div className="confirm-payment-container">
      <h2>สินค้ารอยืนยันการชำระ</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <h3>{product.name}</h3>
              <p>Price: {product.price} THB</p>
              <button className="confirm-button">ยืนยัน</button>
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