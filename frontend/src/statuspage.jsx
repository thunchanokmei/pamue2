import React, { useState, useEffect } from "react";
import "./statuspage.css";

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
      window.location.href = "/login"; // เปลี่ยนไปหน้า login หากไม่ได้ล็อกอิน
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
    <div className="status-page-container">
      <h2>สถานะสินค้าที่ซื้อ</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: {product.price} THB</p>
              <p>Condition: {Array(product.condition).fill("★").join("")}</p>
              <p>Seller: {product.seller?.name || "N/A"}</p>
              <button
                className="status-button"
                onClick={() =>
                  product.status === "DELIVERING" && handleStatusChange(product.ProductID)
                }
                disabled={product.status !== "DELIVERING"}
              >
                {product.status === "DELIVERING" ? "ฉันได้รับสินค้าแล้ว" : product.status}
              </button>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าที่ซื้อ</p>
        )}
      </div>
    </div>
  );
};

export default StatusPage;