import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout"; // นำเข้า layout สำหรับด้านซ้าย
import "./profile.css"; // นำเข้า CSS สำหรับหน้า Profile
import { useLocation } from "react-router-dom"; // ใช้ useLocation เพื่อรับข้อมูลจาก login หรือ register

const ProfilePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state || {});
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    // หากไม่มีข้อมูลใน location.state ให้ดึงข้อมูลจาก API หรือ localStorage
    if (!userData.UserID) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:5001/api/users/1"); // ดึงข้อมูลผู้ใช้จาก API
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("กรุณาเลือกไฟล์ก่อนอัปโหลด");
      return;
    }

    const formData = new FormData();
    formData.append("qrImage", selectedFile);
    formData.append("userId", userData.UserID);

    try {
      const response = await fetch("http://localhost:5001/api/users/uploadQR", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("อัปโหลดรูปภาพสำเร็จ!");
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงรูปภาพใหม่
      } else {
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
    
            {/* ส่วนสำหรับอัปโหลด QR Code */}
            
          <div className="upload-section">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload QR Image</button>
          </div>
          {userData.QRurl && (
            <div className="qr-image">
              <h3>Uploaded QR Code:</h3>
              <img src={`http://localhost:5001${userData.QRurl}`} alt="QR Code" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;