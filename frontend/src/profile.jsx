
import React from "react";
import ProfileLeft from "./layout"; // นำเข้า layout สำหรับด้านซ้าย
import "./profile.css"; // นำเข้า CSS สำหรับหน้า Profile
import { useLocation } from "react-router-dom"; // ใช้ useLocation เพื่อรับข้อมูลจาก login หรือ register

const ProfilePage = () => {
  const location = useLocation();
  const userData = location.state || {}; // รับข้อมูลที่ส่งมาจากหน้า login หรือ register

  return (
    <div className="profile-page">
      {/* ด้านซ้าย: ProfileLeft */}
      <div className="profile-left">
        <ProfileLeft />
      </div>

      {/* ด้านขวา: ข้อมูลผู้ใช้ */}
      <div className="profile-right">
        <h1>My Profile</h1>
        <div className="profile-content">
          <p><strong>Name:</strong> {userData.name || "N/A"}</p>
          <p><strong>Email:</strong> {userData.email || "N/A"}</p>
          <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
          <p><strong>Student ID:</strong> {userData.studentCode || "N/A"}</p>
          <p><strong>Address:</strong> {userData.address || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;