import React, { useState } from "react";
import "./register.css"; // นำเข้าไฟล์ CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentCode: "",
    address: "", // เพิ่ม state สำหรับ address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // คุณสามารถเพิ่ม logic สำหรับส่งข้อมูลไปยัง backend ได้ที่นี่
  };

  return (
    <div className="container-register">
      <div className="form-container-register">
      <h2>Join our Memberships 📦 </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-register">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group-register">
          <label htmlFor="email">E-mail:</label>
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
        <div className="form-group-register">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </div>
        <div className="form-group-register">
          <label htmlFor="studentCode">Student ID:</label>
          <input
            type="text"
            id="studentCode"
            name="studentCode"
            value={formData.studentCode}
            onChange={handleChange}
            placeholder="Student ID"
          />
        </div>
        <div className="form-group-register">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            rows="3"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default Register;