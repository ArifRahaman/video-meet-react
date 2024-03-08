const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const Usermodel = require("./models/user");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const SECRET_KEY=process.env.SECRET_KEY;
app.use(express.json());
const cookieParser = require("cookie-parser");
// const app = express();
app.use(cookieParser());
const authenticate=require("./middleware/authenticate")

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow sending cookies when making requests
  })
);
// app.use(cors());
mongoose.connect(
  "mongodb+srv://arifrahaman2606:<MY MONGODB PASSWORD>.emb8nvx.mongodb.net/user"
);
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   Usermodel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password == password) {
//         res.json("Successfully logged in");
//       } else {
//         res.json("Password iss incorrect");
//       }
//     } else {
//       res.json("No user exists");
//     }
//   });
// });

//gpt
//gpt
//gpt+me
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await user.generateAuthToken(); // Assuming user model has generateAuthToken method
        console.log(token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000), // Expires in 30 days
          httpOnly: true,
        });
        res.json("Successfully logged in");
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "No user exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.post("/register", async (req, res) => {
  try {
    const { name, email, profession, year, university,password,cpassword } = req.body;
    // console.log(password);
    // console.log(cpassword);
    if (!name || !email || !university || !year ||!password || !cpassword) {
      return res.status(404).json({
        error: "Please provide all the informations (You can skip Profession)",
      });
    } else {
      const user = new Usermodel({
        name: name,
        email: email,
        profession: profession,
        year: year,
        university: university,
        password: password,
        cpassword: cpassword
      });
      const savedUser = await user.save();
      res.status(201).json({ message: "Successfully registered" });
    }
  } catch (error) {
    console.log("error");
    res.status(405).json({ error: "Internal Server error" });
  }
});

app.get("/home", authenticate, (req, res) => {
  console.log("hello world this is about page");
  // res.send("hello world this is about page");
  res.send(req.rootUser);
});

app.listen(8001,()=>{
    console.log("Listening to the port on 8001");
})
