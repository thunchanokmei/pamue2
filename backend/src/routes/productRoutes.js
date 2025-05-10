const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// ตั้งค่า multer สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // เก็บไฟล์ใน src/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // ดึงนามสกุลไฟล์
    cb(null, uniqueSuffix + ext); // ตั้งชื่อไฟล์ไม่ให้ซ้ำ
  },
});
const upload = multer({ storage });

router.get('/categories', productController.getAllCategories);
router.post('/add', upload.single('image'), productController.addProduct); // เพิ่ม middleware upload
router.post('/purchase', productController.purchaseProduct);
router.get('/products', productController.getProductsByCategory);
router.get('/id/:id', productController.getProductById);
router.get('/status', productController.getProductsByStatus);
router.patch('/status', productController.updateProductStatus);
router.get('/customer', productController.getCustomerProducts);
router.post('/addwishlist', productController.addToWishlist);
router.get('/userwishlist', productController.getWishlistByUser);


module.exports = router;