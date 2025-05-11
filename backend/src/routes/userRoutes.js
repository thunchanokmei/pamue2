const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const { verifyToken } = require('../controllers/userController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

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

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/uploadQR', upload.single('qrImage'), userController.uploadQRImage);
router.get('/profile', verifyToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { UserID: parseInt(req.user.userId, 10) }

  });
  res.json(user);
});
router.get('/:id', userController.getUserById);
router.get('/products/available', userController.getUserAvailableProducts);
router.get('/products/status', userController.getUserProductsByStatus);

module.exports = router;