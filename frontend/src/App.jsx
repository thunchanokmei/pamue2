import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // นำเข้า React Router
import Login from "./login"; // นำเข้าหน้า Login
import Register from "./register"; // นำเข้าหน้า Register

const App = () => {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login */}
        <Route path="/" element={<Login />} />

        {/* เส้นทางสำหรับหน้า Register */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;