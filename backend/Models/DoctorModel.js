const { Schema, model } = require('../connection');


const mySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    bio: { type: String },
    image: {type: String},
    public_id:{type:String},
    // avatar: { type: String },
    contact: { type: String },
    address: { type: String },
    fees:{type: Number},
    createdAt: { type: Date, default: Date.now }
});


module.exports = model('doctor', mySchema);
// const { Schema, model } = require('../connection');

// const doctorSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//     required: true
//   },

//   specialization: String,
//   experience: Number,
//   image: String,
//   public_id: String,
//   bio: String,
//   address: String,
//   contact: String
// });

// module.exports = model('doctor', doctorSchema);