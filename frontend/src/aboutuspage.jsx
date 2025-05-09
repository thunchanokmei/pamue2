import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./aboutuspage.css"; // นำเข้าไฟล์ CSS
import profilepic from "./image/profilepic.jpg";
import iconseller from "./image/iconseller.png";
import iconwishlist from "./image/iconwishlist.png";
import iconstatus from "./image/iconstatus.png";
import iconaboutus from "./image/iconaboutus.png";
import iconprofile from "./image/profileicon.png";
import aboutUsImage from "./image/logo.png"; // รูปภาพสำหรับ About Us

const AboutUsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "Guest"; // รับชื่อผู้ใช้จาก state หรือใช้ "Guest" เป็นค่าเริ่มต้น

  const handleUpload = () => {
    alert("Upload button clicked!"); // เพิ่มฟังก์ชันสำหรับการอัปโหลด
  };

  return (
    <div className="aboutus-page">
      {/* ด้านซ้าย: Profile Menu */}
      <div className="profile-left">
        <div className="profile-menu">
          {/* รูปภาพโปรไฟล์ */}
          <div className="profile-image-container">
            <img
              src={profilepic} // รูปภาพเริ่มต้น
              alt="Profile"
              className="profile-image"
            />
            <p className="profile-name">{username}</p> {/* แสดงชื่อผู้ใช้ */}
            <button className="upload-button" onClick={handleUpload}>
              Upload Image
            </button>
          </div>

          {/* ปุ่มเมนู */}
          <button onClick={() => navigate("/profile")} className="menu-button profile-button">
            <img src={iconprofile} alt="Profile Icon" className="menu-icon" />
            Profile
          </button>
          <button onClick={() => navigate("/seller")} className="menu-button seller-button">
            <img src={iconseller} alt="Seller Icon" className="menu-icon" />
            Seller
          </button>
          <button onClick={() => navigate("/wishlist")} className="menu-button wishlist-button">
            <img src={iconwishlist} alt="Wish List Icon" className="menu-icon" />
            Wish List
          </button>
          <button onClick={() => navigate("/status")} className="menu-button status-button">
            <img src={iconstatus} alt="Status Icon" className="menu-icon" />
            Status
          </button>
          <button onClick={() => navigate("/aboutus")} className="menu-button aboutus-button">
            <img src={iconaboutus} alt="About Us Icon" className="menu-icon" />
            About Us
          </button>
        </div>
      </div>

      {/* ด้านขวา: About Us Content */}
      <div className="aboutus-right">
        <div className="aboutus-content">
          {/* รูปภาพด้านบน */}
          <img src={aboutUsImage} alt="About Us" className="aboutus-image" />
          {/* ข้อความ */}
          <p>
            Welcome to our platform! "We are deeply honored by your visit to our website.
            As a newly established startup founded by first-year university students, we are committed to innovation and continuous growth."
          </p>
          <p>
            If you have any questions or feedback, feel free to contact us. Thank
            you for being a part of our community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;