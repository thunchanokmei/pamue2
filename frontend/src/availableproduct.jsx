import React, { useState, useEffect } from "react";
import ProfileLeft from "./layout";
import "./availableproduct.css";

const AvailableProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: 1,
    saleDate: "",
    CategoryID: "",
    sellerId: 1,
    image: null,
  });

  useEffect(() => {
    const fetchAvailableProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products/status?status=AVALIABLE"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching available products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAvailableProducts();
    fetchCategories();
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
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5001/api/products/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        alert("เพิ่มสินค้าเรียบร้อยแล้ว");
        setFormData({
          name: "",
          description: "",
          price: "",
          condition: 1,
          saleDate: "",
          CategoryID: "",
          sellerId: 1,
          image: null,
        });
      } else {
        alert("ไม่สามารถเพิ่มสินค้าได้");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <ProfileLeft />
      <div className="product-page">
        <h2>สินค้าของฉัน</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img
                src={`http://localhost:5001${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">{product.price} บาท</p>
              </div>
            </div>
          ))}
        </div>

        <h2>เพิ่มสินค้าใหม่</h2>
        <form className="product-form" onSubmit={handleSubmit}>
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
          <select name="condition" value={formData.condition} onChange={handleInputChange}>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleInputChange}
            required
          />
          <select
            name="CategoryID"
            value={formData.CategoryID}
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
          <input type="file" name="image" onChange={handleFileChange} required />
          <div className="form-buttons">
            <button type="reset" className="btn-reset">ล้างฟอร์ม</button>
            <button type="submit" className="btn-submit">เพิ่มสินค้า</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailableProduct;
