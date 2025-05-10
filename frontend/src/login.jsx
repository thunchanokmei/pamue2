import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับเปลี่ยนหน้า
import "./login.css"; // นำเข้าไฟล์ CSS
import logo from "./image/profilexoxo.gif"; // อิมพอร์ตรูปโลโก้

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ส่งข้อมูล formData ไปยัง backend
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("User logged in:", result);

        // ส่งชื่อผู้ใช้ไปยังหน้า Profile
        const username = result.username || "Guest"; // รับชื่อผู้ใช้จาก backend หรือใช้ "Guest" เป็นค่าเริ่มต้น
        navigate("/profile", { state: { username } }); // เปลี่ยนหน้าไปยัง Profile พร้อมส่งชื่อผู้ใช้
      } else {
        alert(`Error: ${result.error}`);
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* โลโก้ */}
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>

      {/* กล่องฟอร์ม */}
      <div className="form-container">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail (@dome.tu.ac.th)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentCode"></label>
            <input
              type="text"
              id="studentCode"
              name="studentCode"
              value={formData.studentCode}
              onChange={handleChange}
              placeholder="Student ID"
              required
            />
          </div>
          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
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