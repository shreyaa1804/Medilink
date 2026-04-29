const express = require('express');
const Model = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const verifyToken = require('../Middlewares/verifytoken');


router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});


//getall
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/getbyemail/:email', (req, res) => {
    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



//getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/get-detail', verifyToken, (req, res) => {
    Model.findById(req.user._id)

        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/signup", async (req, res) => {
  try {
    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 🔢 generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const user = new Model({
      ...req.body,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min
    });

    await user.save();

    // 📧 send OTP email
    await sendEmail(
      user.email,
      "OTP Verification",
      `Your OTP is ${otp}`
    );

    res.status(200).json({
      message: "User registered & OTP sent",
      userId: user._id,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await Model.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Account verified successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================== LOGIN (JWT) ==================

router.post("/login", async (req, res) => {
  try {
    const user = await Model.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ❗ block unverified users
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🎟️ generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//authenticate
// router.post('/authenticate', (req, res) => {
//     Model.findOne(req.body)
//         .then((result) => {
//             if (result) {
//                 // payload, secretkey, expiry
//                 const { _id, email, password } = result;
//                 const payload = { _id, email, password };
//                 jwt.sign(
//                     payload,
//                     process.env.JWT_SECRET,
//                     { expiresIn: '1hr' },
//                     (err, token) => {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).json(err);
//                         } else {
//                             res.status(200).json({ token: token });
//                         }
//                     }
//                 )

//             } else {
//                 res.status(400).json({ message: 'Invalid Credential' })
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })

    
module.exports = router;