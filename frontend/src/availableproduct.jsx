import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./availableproduct.css";

const AvailableProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // เก็บหมวดหมู่สินค้า
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: 1,
    saleDate: "",
    image: null,
    categoryId: "", // เพิ่มฟิลด์สำหรับหมวดหมู่สินค้า
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const fetchAvailableProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/products/status?userId=${user.UserID}&status=AVALIABLE`
          );
          const data = await response.json();
          console.log("Fetched products:", data);
          setProducts(data);
        } catch (error) {
          console.error("Error fetching available products:", error);
        }
      };

      const fetchCategories = async () => {
        try {
          const response = await fetch("http://localhost:5001/api/products/categories");
          const data = await response.json();
          setCategories(data); // เก็บหมวดหมู่สินค้าใน state
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchAvailableProducts();
      fetchCategories();
    } else {
      alert("กรุณาล็อกอินก่อน");
      window.location.href = "/login";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.UserID) {
      alert("กรุณาล็อกอินก่อน");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("condition", formData.condition);
    form.append("saleDate", formData.saleDate);
    form.append("image", formData.image);
    form.append("sellerId", user.UserID);
    form.append("CategoryID", formData.categoryId); // เพิ่ม CategoryID

    try {
      const response = await fetch("http://localhost:5001/api/products/add", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("เพิ่มสินค้าสำเร็จ!");
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงสินค้าที่เพิ่มใหม่
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2 className="page-title">สินค้าที่พร้อมขาย</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.ProductID} className="product-card">
                <img
                  src={`${product.imageUrl}` }
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} บาท</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">ไม่มีสินค้าที่พร้อมขาย</p>
          )}
        </div>

        {/* ฟอร์มเพิ่มสินค้า */}
        <form className="product-form" onSubmit={handleSubmit}>
          <h3>เพิ่มสินค้าใหม่</h3>
          <input
            type="text"
            name="name"
            placeholder="ชื่อสินค้า"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="รายละเอียดสินค้า"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="ราคา"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
          >
            <option value={1}>★</option>
            <option value={2}>★★</option>
            <option value={3}>★★★</option>
            <option value={4}>★★★★</option>
            <option value={5}>★★★★★</option>
          </select>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleInputChange}
            required
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">เลือกหมวดหมู่</option>
            {categories.map((category) => (
              <option key={category.CategoryID} value={category.CategoryID}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
          <button type="submit" className="btn-submit">เพิ่มสินค้า</button>
        </form>
      </div>
    </div>
  );
};

export default AvailableProduct;