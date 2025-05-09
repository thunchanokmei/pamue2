import React, { useState } from "react";
import ProfileLeft from "./layout"; // นำเข้า ProfileLeft
import "./sellerpage.css"; // นำเข้า CSS

const SellerPage = () => {
  const [content, setContent] = useState("< < Seller"); // กำหนดค่าเริ่มต้น

  return (
    <div className="seller-page">
      {/* ด้านซ้าย: ProfileLeft */}
      <div className="seller-left">
        <ProfileLeft />
      </div>

      {/* ด้านขวา: ข้อมูลที่เปลี่ยนแปลงตามปุ่ม */}
      <div className="seller-right">
        <h2>{content}</h2>
        <div className="seller-content">
          {content === "สินค้ารอยืนยันการชำระ" && <p>นี่คือสินค้ารอยืนยันการชำระ</p>}
          {content === "สินค้ากำลังจัดส่ง" && <p>นี่คือสินค้ากำลังจัดส่ง</p>}
          {content === "สินค้าที่ขายแล้ว" && <p>นี่คือสินค้าที่ขายแล้ว</p>}
        </div>
        <div className="seller-options">
          <button onClick={() => setContent("สินค้าของฉัน")}>สินค้าของฉัน</button>
          <button onClick={() => setContent("สินค้ารอยืนยันการชำระ")}>สินค้ารอยืนยันการชำระ</button>
          <button onClick={() => setContent("สินค้ากำลังจัดส่ง")}>สินค้ากำลังจัดส่ง</button>
          <button onClick={() => setContent("สินค้าที่ขายแล้ว")}>สินค้าที่ขายแล้ว</button>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;