import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import "./register.css";

const Register = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentCode: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        console.log("User registered:", result);

        // เปลี่ยนเส้นทางกลับไปที่หน้า Login
        navigate("/"); // เปลี่ยนไปที่หน้า Login
      } else {
        alert(`Error: ${result.error}`);
        console.error("Registration failed:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to register. Please try again.");
    }
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