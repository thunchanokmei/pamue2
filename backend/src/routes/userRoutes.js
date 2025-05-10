const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.post('/uploadQR', upload.single('qrImage'), userController.uploadQRImage);

module.exports = router;