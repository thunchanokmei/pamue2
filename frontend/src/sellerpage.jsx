import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import ProfileLeft from "./layout"; // นำเข้า ProfileLeft
import "./sellerpage.css"; // นำเข้า CSS

const SellerPage = () => {
  const [content] = useState("< < Seller"); // กำหนดค่าเริ่มต้น
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับเปลี่ยนเส้นทาง

  return (
    <div className="seller-page">
      {/* ด้านซ้าย: ProfileLeft */}
      <div className="seller-left">
        <ProfileLeft />
      </div>

      {/* ด้านขวา: ข้อมูลที่เปลี่ยนแปลงตามปุ่ม */}
      <div className="seller-right">
        <h2>{content}</h2>
        <div className="seller-options">
          {/* ปุ่มเปลี่ยนเส้นทางไปยัง AvailableProduct */}
          <button onClick={() => navigate("/availableproduct")}>สินค้าของฉัน</button>
          <button onClick={() => navigate("/confirmpayment")}>สินค้ารอยืนยันการชำระ</button>
          <button onClick={() => navigate("/deliveringproduct")}>สินค้ากำลังจัดส่ง</button>
          <button onClick={() => navigate("/unavailableproduct")}>สินค้าที่ขายแล้ว</button>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;