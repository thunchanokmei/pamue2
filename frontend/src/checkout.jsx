import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = () => {
  const { id } = useParams(); // ดึง ProductID จาก URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
  const [product, setProduct] = useState(null); // เก็บข้อมูลสินค้า
  const [paymentTime, setPaymentTime] = useState(""); // เวลาชำระเงิน

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("กรุณาล็อกอินก่อนทำรายการ");
      navigate("/login"); // เปลี่ยนไปหน้า login
    }
  }, [navigate]);

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/id/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // อัปเดตเวลาชำระเงิน
  const handlePaymentTimeChange = (e) => {
    setPaymentTime(e.target.value);
  };

  // ยืนยันการชำระเงิน
  const handleConfirmPayment = async () => {
    if (!paymentTime) {
      alert("กรุณากรอกเวลาชำระเงินก่อน");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/products/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.ProductID,
          status: "PAYMENT_CONFIRMATION",
          paymentDate: paymentTime,
          customerId: user.UserID, // ใช้ UserID จากข้อมูลผู้ใช้
        }),
      });

      console.log("Response:", response);
      console.log("UserID:", user.UserID);
      if (response.ok) {
        alert("ยืนยันการชำระเงินสำเร็จ!");
        navigate("/status"); // เปลี่ยนไปยังหน้า StatusPage
      } else {
        alert("เกิดข้อผิดพลาดในการยืนยันการชำระเงิน");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  // แสดงดาวตามคุณภาพสินค้า
  const renderStars = (condition) => {
    const stars = [];
    for (let i = 0; i < condition; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  // หากยังโหลดข้อมูลสินค้าไม่เสร็จ
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <img src={product.imageUrl || "https://via.placeholder.com/150"} alt={product.name} />
        <h2>{product.name}</h2>
        <p className="checkout-price">{product.price} THB</p>
        <div className="checkout-stars">{renderStars(product.condition)}</div>
        <p>{product.description}</p>
        <p>Seller: {product.seller?.name || "N/A"}</p>
        <p>Sale Date: {new Date(product.saleDate).toLocaleDateString()}</p>
      </div>
      <div className="checkout-right">
        <img src={`${product.seller?.QRurl}`} alt="QR Code" className="qr-code" />
        <div className="payment-section">
          <input
            type="datetime-local"
            value={paymentTime}
            onChange={handlePaymentTimeChange}
            placeholder="กรอกเวลาชำระเงิน"
          />
          <button
            className="confirm-payment-button"
            onClick={handleConfirmPayment}
            disabled={!paymentTime} // ปุ่มจะกดไม่ได้ถ้ายังไม่ได้กรอกเวลา
          >
            ยืนยันการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;