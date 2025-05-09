import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Topbar from "./topbar"; // นำเข้า Topbar
import AvailableProduct from "./availableproduct";
import SellerPage from "./sellerpage";

// คอมโพเนนต์สำหรับแสดง Topbar เฉพาะบางหน้า
const Layout = ({ children }) => {
  const location = useLocation();

  // ตรวจสอบเส้นทางปัจจุบัน
  const hideTopbar = location.pathname === "/" || location.pathname === "/register"|| location.pathname === "/home";

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
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/availableproduct" element={<AvailableProduct />} />
          <Route path="/status" element={<div>Status Page</div>} />
          <Route path="/aboutus" element={<div>About Us Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;