const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const upload = multer({ dest: 'src/uploads/' });
const { verifyToken } = require('../controllers/userController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



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

module.exports = router;