const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Doctor = require('../models/Doctor');

const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/add-doctor', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Create User
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor"
    });

    // 2. Create Doctor Profile
    const newDoctor = await Doctor.create({
      userId: newUser._id
    });

    res.json({ newUser, newDoctor });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating doctor" });
  }
});

module.exports = router;