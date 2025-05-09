import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Topbar from "./topbar"; // นำเข้า Topbar

// คอมโพเนนต์สำหรับแสดง Topbar เฉพาะบางหน้า
const Layout = ({ children }) => {
  const location = useLocation();

  // ตรวจสอบเส้นทางปัจจุบัน
  const hideTopbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideTopbar && <Topbar />} {/* แสดง Topbar เฉพาะหน้าที่ไม่ใช่ Login และ Register */}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<div>Wish List Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;