const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

// กำหนดตำแหน่งและชื่อไฟล์สำหรับจัดเก็บรูปภาพ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // โฟลเดอร์สำหรับเก็บรูปภาพ
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ชื่อไฟล์ที่ไม่ซ้ำกัน
  },
});

const upload = multer({ storage });

const registerUser = async (req, res) => {
  const { name, phone, email, studentCode, address } = req.body;

  if (!email.endsWith('@dome.tu.ac.th')) {
    return res.status(400).json({ error: 'Email must end with @dome.tu.ac.th' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        studentCode,
        address, // เพิ่ม address
        password: studentCode,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

const loginUser = async (req, res) => {
  const { email, studentCode } = req.body;

  try {
    // ตรวจสอบว่า email มีอยู่ในระบบหรือไม่
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ตรวจสอบว่า studentCode ตรงกันหรือไม่
    if (user.password !== studentCode) {
      return res.status(401).json({ error: 'Invalid student code' });
    }

    const token = jwt.sign({ userId: user.UserID }, 'secret-key', { expiresIn: '1h' });

    // ส่งข้อมูลผู้ใช้กลับไป (สามารถเพิ่ม token ได้ในอนาคต)
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login user' });
  }
};

// ฟังก์ชันสำหรับอัปโหลดรูปภาพและอัปเดต QRurl
const uploadQRImage = async (req, res) => {
  const { userId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const qrUrl = `/uploads/${req.file.filename}`;
    const updatedUser = await prisma.user.update({
      where: { UserID: parseInt(userId, 10) },
      data: { QRurl: qrUrl },
    });

    res.status(200).json({ message: 'QR image uploaded successfully', user: updatedUser });
  } catch (error) {
    console.error('Error uploading QR image:', error);
    res.status(500).json({ error: 'Failed to upload QR image' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing ID parameter" });
  
  try {
    const user = await prisma.user.findUnique({
      where: { UserID: parseInt(id, 10) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  uploadQRImage,
  getUserById,
  verifyToken,
};