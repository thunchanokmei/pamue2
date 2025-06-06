import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./wishlistpage.css";
import ProfileLeft from "./layout"; // ใส่ Sidebar

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.UserID) {
      console.error("User is not logged in or UserID is missing.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/products/userwishlist?userId=${user.UserID}`
        );
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const renderStars = (condition) => {
    const stars = [];
    for (let i = 0; i < condition; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  return (
    <div className="wishlist-page-wrapper">
      <ProfileLeft />
      <div className="wishlist-container">
        <h2>Wish List ของฉัน</h2>
        <div className="wishlist-items">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div key={item.ProductID} className="wishlist-card">
                <Link to={`/product/${item.ProductID}`}>
                  <img
                    src={item.product.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.product.name}
                  />
                  <h3>{item.product.name}</h3>
                </Link>
                <p className="wishlist-price">{item.product.price} THB</p>
                <div className="wishlist-stars">
                  {renderStars(item.product.condition)}
                </div>
                <p className="wishlist-description">{item.product.description}</p>
                <p className="wishlist-seller">
                  Seller: {item.product.seller?.name || "N/A"}
                </p>
                <p className="wishlist-sale-date">
                  {new Date(item.product.saleDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>ไม่มีสินค้าใน Wish List</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
