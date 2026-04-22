// const mongoose = require('mongoose');
// require('dotenv').config();
// const url = process.env.MONGO_URI;

// // const url='mongodb://localhost:27017/CareLinkHub'

// // asynchronous function - Promise object
// mongoose.connect(url)
// .then((result) => {
//     console.log('database connected');
    
// }).catch((err) => {
//     console.log(err);
// });

// module.exports = mongoose;
// const mongoose = require('mongoose');
// require('dotenv').config();

// const url = process.env.MONGO_URI;

// // asynchronous function - Promise object
// mongoose.connect(url)
// .then(() => {
//     console.log('database connected'); // ✅ correct
// })
// .catch((err) => {
//     console.log(err);
// });

// module.exports = mongoose;
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI;

mongoose.connect(url)
.then(() => {
    console.log('database connected');

    // 🔥 ADD THIS LINE
    console.log("Connected DB:", mongoose.connection.name);
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;