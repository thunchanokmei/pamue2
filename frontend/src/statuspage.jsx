import React, { useState, useEffect } from "react";
import "./statuspage.css";
import ProfileLeft from "./layout"; // เพิ่ม Sidebar

const StatusPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchCustomerProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/products/customer?customerId=${user.UserID}`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching customer products:", error);
        }
      };

      fetchCustomerProducts();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login";
    }
  }, []);

  const handleStatusChange = async (productId) => {
    try {
      const response = await fetch("http://localhost:5001/api/products/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, status: "COMPLETED" }),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ProductID === productId ? { ...product, status: "COMPLETED" } : product
          )
        );
        alert("สถานะเปลี่ยนเป็น COMPLETED สำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
    }
  };

  return (
    <div className="status-page-wrapper">
      <ProfileLeft />
      <div className="status-page-container">
      <div className="status-content-box">
        <h2 className="status-title">สถานะสินค้าที่ซื้อ</h2>
        <div className="status-card">
          {products.length > 0 ? (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.ProductID} className="product-card">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>ราคา: {product.price} THB</p>
                  <p>สภาพสินค้า: {Array(product.condition).fill("★").join("")}</p>
                  <p>ผู้ขาย: {product.seller?.name || "N/A"}</p>
                  <button
                    className="status-button-dt"
                    onClick={() =>
                      product.status === "DELIVERING" && handleStatusChange(product.ProductID)
                    }
                    disabled={product.status !== "DELIVERING"}
                  >
                    {product.status === "DELIVERING"
                      ? "ฉันได้รับสินค้าแล้ว"
                      : product.status}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>ไม่มีสินค้าที่ซื้อ</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default StatusPage;
