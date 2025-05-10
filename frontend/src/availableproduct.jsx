import React, { useState, useEffect } from "react";
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
    sellerId: 1, // สมมติว่า sellerId เป็น 1
    image: null,
  });

  useEffect(() => {
    // ดึงข้อมูลสินค้าที่มีสถานะ AVALIABLE
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

    // ดึงข้อมูลหมวดหมู่
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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("saleDate", formData.saleDate);
    formDataToSend.append("CategoryID", formData.CategoryID);
    formDataToSend.append("sellerId", formData.sellerId);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5001/api/products/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        alert("Product added successfully!");
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
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="available-product-container">
      <h2>สินค้าของฉัน</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: {product.price} THB</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีสินค้าในสถานะนี้</p>
        )}
      </div>

      <h2>เพิ่มสินค้าใหม่</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
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
        >
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
        <button type="submit">เพิ่มสินค้า</button>
      </form>
    </div>
  );
};

export default AvailableProduct;