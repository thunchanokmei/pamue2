const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { name, phone, email, studentCode } = req.body;

  // ตรวจสอบว่า email มีนามสกุล @dome.tu.ac.th หรือไม่
  if (!email.endsWith('@dome.tu.ac.th')) {
    return res.status(400).json({ error: 'Email must end with @dome.tu.ac.th' });
  }

  try {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        studentCode,
        password: studentCode, // ใช้ studentCode เป็น password
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = {
  registerUser,
};