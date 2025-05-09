import React from "react";
import { useNavigate } from "react-router-dom";
import "./sellerpage.css";

const SellerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-page-container">
      <h2>Seller</h2>
      <div className="seller-options">
        <button onClick={() => navigate("/availableproduct")}>สินค้าของฉัน</button>
        <button onClick={() => navigate("/confirmpayment")}>สินค้ารอยืนยันการชำระ</button>
        <button>สินค้ากำลังจัดส่ง</button>
        <button>สินค้าที่ขายแล้ว</button>
      </div>
    </div>
  );
};

export default SellerPage;