const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const User = require("../models/userModel");
const BlacklistedToken = require("../models/blacklistedTokenModel");


// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Usuario ya existe");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user Created ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("datos no validos");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if(!email||!password){
    res.status(400);
    throw new Error ("Todos los campos son obligatorios")
  }
  const user = await User.findOne({email});
  //compare password with hashed one
  if (user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user:{
        username: user.username,
        email: user.email,
        id:user.id,
      },
    }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "15m"}
    )
    res.status(200).json({
      accessToken
    });
  }else {
    res.status(401);
    throw new Error("Email o Password no son vlaidas")
  }
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});
// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  await BlacklistedToken.create({ token });

  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
