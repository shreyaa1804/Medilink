const mongoose = require('mongoose');

const url="REMOVED@shreya.gtjvu.mongodb.net/MediLink?retryWrites=true&w=majority&appName=Shreya";

// const url='mongodb://localhost:27017/CareLinkHub'

// asynchronous function - Promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;