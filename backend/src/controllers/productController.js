const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
  const { name, description, price, imageUrl, condition, saleDate, CategoryID, sellerId } = req.body;

  try {
    // เพิ่มสินค้าใหม่ โดยใช้ CategoryID และ sellerId ตรง ๆ
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        condition,
        saleDate: new Date(saleDate), // แปลง saleDate เป็น Date object
        sellerId,
        CategoryID,
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
        category: true, // ดึงข้อมูล Category ที่เชื่อมโยง
        seller: true,   // ดึงข้อมูล User ที่เชื่อมโยง (ถ้ามีฟิลด์ seller)
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
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

module.exports = {
  getAllCategories,
  addProduct,
  getProductById,
  purchaseProduct,
};