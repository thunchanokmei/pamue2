import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับเปลี่ยนหน้า
import "./login.css"; // นำเข้าไฟล์ CSS
import logo from "./image/logo.png"; // อิมพอร์ตรูปโลโก้

const Login = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [formData, setFormData] = useState({
    email: "",
    studentCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
    // เพิ่ม logic สำหรับการเข้าสู่ระบบที่นี่
  };

  return (
    <div className="login-container">
      {/* โลโก้ */}
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>

      {/* กล่องฟอร์ม */}
      <div className="form-container">
        <h2>Welcome to Pamue 2</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail (@dome.tu):</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentCode">Student ID:</label>
            <input
              type="text"
              id="studentCode"
              name="studentCode"
              value={formData.studentCode}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">เข้าสู่ระบบ</button>
        </form>
        <p className="register-link">
          ยังไม่มีบัญชีใช่หรือไม่?{" "}
          <span onClick={() => navigate("/register")}>สมัครสมาชิก</span>
        </p>
      </div>
    </div>
  );
};

export default Login;