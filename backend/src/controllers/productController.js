const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};


const addProduct = async (req, res) => {
  const { name, description, price, condition, saleDate, CategoryID, sellerId } = req.body;

  try {
    // ตรวจสอบว่ามีไฟล์อัปโหลดหรือไม่
    const imageUrl = req.file ? `http://localhost:5001/uploads/${req.file.filename}` : null;

    // เพิ่มสินค้าใหม่
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        condition: parseInt(condition, 10),
        saleDate: new Date(saleDate),
        sellerId: parseInt(sellerId, 10),
        CategoryID: parseInt(CategoryID, 10),
        status: 'AVALIABLE',
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { ProductID: parseInt(id) },
      include: {
        category: true,
        seller: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const purchaseProduct = async (req, res) => {
  const { productId, customerId, paymentDate } = req.body;

  try {
    const product = await prisma.product.findUnique({ where: { ProductID: productId } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { ProductID: productId },
      data: {
        customerId,
        status: 'PAYMENT_CONFIRMATION',
        paymentDate: new Date(paymentDate), // บันทึกเวลาที่โอนเงิน
      },
    });    

    res.status(200).json({ message: 'Product purchased successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error purchasing product:', error);
    res.status(500).json({ error: 'Failed to purchase product' });
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = categoryId
      ? await prisma.product.findMany({
          where: { CategoryID: parseInt(categoryId) },
          include: { category: true, seller: true },
        })
      : await prisma.product.findMany({
          include: { category: true, seller: true },
        });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductsByStatus = async (req, res) => {
  const { status } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: { status },
      include: { 
        category: true, 
        seller: true, 
        customer: true },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by status:", error);
    res.status(500).json({ error: "Failed to fetch products by status" });
  }
};

const updateProductStatus = async (req, res) => {
  const { productId, status, paymentDate } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { ProductID: parseInt(productId, 10) },
      data: {
        status,
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      },
    });

    res.status(200).json({ message: "Product status updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ error: "Failed to update product status" });
  }
};

const getCustomerProducts = async (req, res) => {
  const { customerId } = req.query;

  try {
    if (!customerId || isNaN(parseInt(customerId, 10))) {
      return res.status(400).json({ error: "Invalid customerId" });
    }

    const products = await prisma.product.findMany({
      where: { customerId: parseInt(customerId, 10) },
      include: {
        category: true, // ดึงข้อมูลหมวดหมู่
        seller: true,   // ดึงข้อมูลผู้ขาย
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching customer products:", error);
    res.status(500).json({ error: "Failed to fetch customer products" });
  }
};

const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // ลบสินค้าที่ซ้ำกันใน Wishlist
    await prisma.wishList.deleteMany({
      where: {
        UserID: parseInt(userId, 10),
        ProductID: parseInt(productId, 10),
      },
    });

    // เพิ่มสินค้าใหม่ลงใน Wishlist
    const wishlistItem = await prisma.wishList.create({
      data: {
        UserID: parseInt(userId, 10),
        ProductID: parseInt(productId, 10),
      },
    });

    res.status(201).json({ message: "Added to wishlist", wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

const getWishlistByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    const wishlistItems = await prisma.wishList.findMany({
      where: { UserID: parseInt(userId, 10) },
      include: {
        product: {
          include: {
            seller: true,
          },
        },
      },
    });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

module.exports = {
  getAllCategories,
  addProduct,
  getProductById,
  purchaseProduct,
  getProductsByCategory,
  getProductsByStatus,
  updateProductStatus,
  getCustomerProducts,
  addToWishlist,
  getWishlistByUser,
};