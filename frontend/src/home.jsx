import React, { useState, useEffect } from 'react';
import './home.css';

const Home = () => {
  const [categories, setCategories] = useState([]); // เก็บข้อมูลหมวดหมู่
  const [products, setProducts] = useState([]); // เก็บข้อมูลสินค้า
  const [selectedCategory, setSelectedCategory] = useState(null); // เก็บหมวดหมู่ที่เลือก

  // ดึงข้อมูลหมวดหมู่
  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:5001/api/products/products?categoryId=${selectedCategory}`
      : 'http://localhost:5001/api/products/products';

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  return (
    <div className="home-container">
      {/* ส่วนแสดงปุ่ม Category */}
      <div className="categories">
        <button
          className={!selectedCategory ? 'active' : ''}
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.CategoryID}
            className={selectedCategory === category.CategoryID ? 'active' : ''}
            onClick={() => setSelectedCategory(category.CategoryID)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* ส่วนแสดงสินค้า */}
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ProductID} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price} THB</p>
              <p>Category: {product.category?.name || 'No Category'}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;