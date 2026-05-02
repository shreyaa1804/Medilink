// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res , next)=>{
    
//        const token = req.headers['x-auth-token'];
//        jwt.verify(
//         token, process.env.JWT_SECRET,
    
//        (err,payload)=> {
//         if(err){
//             console.log(err);
//             res.status(500).json(err);
//         } else {
//             req.user = payload;
//             next();
//         }
//        })
// }

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");
require('dotenv').config();
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;