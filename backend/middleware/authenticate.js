// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const SECRET_KEY = process.env.SECRET_KEY;
// dotenv.config({ path: "./config.env" });

// const User = require("../models/user");
// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken;
//     console.log("Received token:", token);

//     if (!token) {
//       throw new Error("No token provided");
//     }

//     const verifyToken = jwt.verify(token, SECRET_KEY);
//     console.log("Decoded token:", verifyToken);

//     if (!verifyToken || !verifyToken._id) {
//       throw new Error("Invalid token structure");
//     }

//     const rootUser = await User.findById({
//       _id: verifyToken._id,
//       "tokens.token": token,
//     });

//     if (!rootUser) {
//       throw new Error("User not found");
//     }

//     req.token = token;
//     req.rootUser = rootUser;
//     req.userID = rootUser._id;
//     next(); // Call the next middleware or route handler
//   } catch (err) {
//     console.error("Authentication error:", err.message);
//     res.status(401).send("Unauthorized: No valid token provided");
//   }
// };

// module.exports = authenticate;

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log("Received token:", token);

    if (!token) {
      throw new Error("No token provided");
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", verifyToken);

    // Check token expiry
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (verifyToken.exp && verifyToken.exp < currentTimeInSeconds) {
      throw new Error("Token has expired");
    }

    if (!verifyToken || !verifyToken._id) {
      throw new Error("Invalid token structure");
    }

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).send("Unauthorized: No valid token provided");
  }
};

module.exports = authenticate;
