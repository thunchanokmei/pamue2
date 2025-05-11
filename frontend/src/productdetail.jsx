import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // ดึง ProductID จาก URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/id/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log("Product data:", data);
        console.log("Product ID:", id);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToWishlist = async () => {
    const userId = 1 ; 

    try {
      const response = await fetch("http://localhost:5001/api/products/addwishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: product.ProductID }),
      });

      if (response.ok) {
        alert("เพิ่มสินค้าลงใน Wish List สำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงใน Wish List");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${id}`);
  };

  const renderStars = (condition) => {
    const stars = [];
    for (let i = 0; i < condition; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.imageUrl || "https://via.placeholder.com/150"} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">{product.price} THB</p>
        <div className="product-stars">{renderStars(product.condition)}</div>
        <p className="product-description">{product.description}</p>
        <p className="product-seller">Seller: {product.seller?.name || "N/A"}</p>
        <p className="product-sale-date">{new Date(product.saleDate).toLocaleDateString()}</p>
        <div className="product-buttons">
          <button className="wishlist-button-dt" onClick={handleAddToWishlist}>
            Add to Wish List
          </button>
          <button className="buy-button" onClick={handleBuyNow}>
            Buy Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;