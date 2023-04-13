const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: "30d",
    },
  },
  {
    timestamps: true,
  }
);

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

module.exports = BlacklistedToken;
