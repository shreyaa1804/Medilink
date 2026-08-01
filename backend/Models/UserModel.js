const { Schema, model } = require('../connection');

const mySchema = new Schema({

 name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String },
  password: { type: String, required: true },

  otp: { type: String },
  otpExpiry: { type: Date },

  isVerified: {
    type: Boolean,
    default: false
  },

  createdAt: { type: Date, default: Date.now }
});
// const mySchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   contact: { type: String },
//   password: { type: String, required: true },

//   role: {
//     type: String,
//     enum: ["admin", "doctor", "patient"],
//     default: "patient"
//   },

//   otp: String,
//   otpExpiry: Date,

//   isVerified: {
//     type: Boolean,
//     default: false
//   },

//   createdAt: { type: Date, default: Date.now }
// });

module.exports = model('user', mySchema);