import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./topbar"; // นำเข้า Topbar
import Login from "./login";
import Register from "./register";
import Home from "./home";
import SellerPage from "./sellerpage";
import WishlistPage from "./wishlistpage";
import StatusPage from "./statuspage";
import AboutUsPage from "./aboutuspage";
import AvailableProduct from "./availableproduct";
import ConfirmPayment from "./confirmpayment";
import DeliveringProduct from "./deliveringproduct"; 
import UnavailableProduct from "./unavailableproduct"; 
import ProfilePage from "./profile";
import ProductDetail from "./productdetail";
import Checkout from "./checkout"; // นำเข้า Checkout

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบเส้นทางปัจจุบัน
  const hideTopbar = location.pathname === "/" || location.pathname === "/register"; // ซ่อน Topbar ในหน้า Login และ Register

  return (
    <>
      {!hideTopbar && <Topbar />} {/* แสดง Topbar หากไม่ใช่หน้า Login หรือ Register */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/availableproduct" element={<AvailableProduct />} />
        <Route path="/confirmpayment" element={<ConfirmPayment />} /> 
        <Route path="/deliveringproduct" element={<DeliveringProduct />} /> 
        <Route path="/unavailableproduct" element={<UnavailableProduct />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;