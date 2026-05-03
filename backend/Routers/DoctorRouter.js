const express = require('express');
const Model = require('../Models/DoctorModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const verifyToken = require('../Middlewares/verifytoken');
const cloudinary=require('../utils/cloudinary');

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

router.get('/get-detail',verifyToken,(req, res) => {
    Model.findById(req.user._id)
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


router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



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
// router.put('/update', verifyToken, (req, res) => {
//     Model.findByIdAndUpdate(req.user._id, req.body, { new: true })
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.put('/update', verifyToken, async (req, res) => {
  try {
    const doctorId = req.user._id;

    const doctor = await Model.findById(doctorId);

    // 🔥 DELETE OLD IMAGE (important)
    if (doctor && req.body.public_id && doctor.public_id && req.body.public_id !== doctor.public_id) {
      await cloudinary.uploader.destroy(doctor.public_id);
    }

    const updatedDoctor = await Model.findByIdAndUpdate(
      doctorId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedDoctor);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // payload, secretkey, expiry
                const { _id, email,password } = result;
                const payload = { _id, email };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '200000000' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token: token, ...result._doc });
                        }
                    }
                )

            } else {
                res.status(400).json({ message: 'Invalid Credential' })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;