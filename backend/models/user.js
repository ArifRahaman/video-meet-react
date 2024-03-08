//gpt help
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const SECRET_KEY = process.env.SECRET_KEY;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  profession: {
    type: String,
    // required: true,
  },
  year: {
    type: Number, // Changed from 'integer' to 'Number'
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
});



//gpt
// UserSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     try {
//       const hashedPassword = bcrypt.hashSync(this.password, 26);
//       const hashedCPassword = bcrypt.hashSync(this.cpassword, 26);
//       this.password = hashedPassword;
//       this.cpassword = hashedCPassword;
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// });

//gpt
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10); // increase saltRounds for better security
      this.password = hashedPassword;
      const hashedCPassword = await bcrypt.hash(this.cpassword, 10); // same saltRounds as password hashing
      this.cpassword = hashedCPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("done")
    return token;
  } catch (err) {
    console.error("Not done"); // Log the error
    throw err; // Throw the error so it's propagated
  }
};




const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
