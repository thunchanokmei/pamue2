import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar"; // นำเข้า SearchBar
import "./home.css";
import banner1 from "./image/banner1.jpg"; // นำเข้าภาพแบนเนอร์
import banner2 from "./image/banner2.jpg"; // นำเข้าภาพแบนเนอร์

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ดึงข้อมูลหมวดหมู่
  useEffect(() => {
    fetch("http://localhost:5001/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProducts = async () => {
      const url = selectedCategory
        ? `http://localhost:5001/api/products/products?categoryId=${selectedCategory}`
        : "http://localhost:5001/api/products/products";

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched Products:", data); // ตรวจสอบข้อมูลสินค้า
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // ฟังก์ชันสำหรับกรองสินค้าตามคำค้นหา
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="home-container">
      {/* ใช้ SearchBar แทน Topbar */}
      <SearchBar onSearch={setSearchQuery} />
      {/* ส่วนแสดงแบนเนอร์ */}
    <div className="banners">
      <div className="banner1">
        <img src={banner1} alt="Banner 1" />
      </div>
      <div className="banner2">
        <img src={banner2} alt="Banner 2" />
      </div>
    </div>
      {/* ส่วนแสดงปุ่ม Category */}
      <div className="categories">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.CategoryID}
            className={selectedCategory === category.CategoryID ? "active" : ""}
            onClick={() => setSelectedCategory(category.CategoryID)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* ส่วนแสดงสินค้า */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price} THB</p>
              <p>Category: {product.category?.name || "No Category"}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;