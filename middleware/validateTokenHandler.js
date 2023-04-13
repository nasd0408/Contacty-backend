const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/blacklistedTokenModel");

const validateToken = asyncHandler(async(req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Error de auth");
  }

  const blacklistedToken = await BlacklistedToken.findOne({ token });
  if (blacklistedToken) {
    res.status(401);
    throw new Error("Token blacklisted");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("usuario no autorizado");
    }
    req.user = decoded.user;
    next();
  });
});

module.exports = validateToken;
