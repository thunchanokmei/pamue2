import React from "react";
import { useNavigate } from "react-router-dom";
import "./topbar.css"; // นำเข้าไฟล์ CSS
import logo from "./image/hometoplogo.png"; // โลโก้
import wishlistIcon from "./image/wishlist.png"; // ไอคอน Wish List
import profileIcon from "./image/profile.png"; // ไอคอน Profile

const Topbar = ({ onSearch }) => {
  
  const navigate = useNavigate();

  return (
    <div className="topbar">
      {/* Left Section: Logo */}
      <div className="topbar-left">
        <img
          src={logo}
          alt="Logo"
          className="topbar-logo"
          onClick={() => navigate("/home")} // เพิ่ม onClick เพื่อกลับไปหน้าโฮม
          style={{ cursor: "pointer" }} // เพิ่ม cursor pointer เพื่อแสดงว่ากดได้
        />
      </div>

      {/* Center Section: Search Bar */}
      <div className="topbar-center">
        <input
          type="text"
          className="topbar-search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)} // ส่งคำค้นหาไปยัง Home
        />
      </div>

      {/* Right Section: Icons */}
      <div className="topbar-right">
        <img
          src={wishlistIcon}
          alt="Wish List"
          className="wishlist-icon"
          onClick={() => navigate("/wishlist")}
        />
        <img
          src={profileIcon}
          alt="Profile"
          className="profile-icon"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default Topbar;