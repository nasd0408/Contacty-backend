const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Introduzca un nombre de usuario"],
    unique: [true,"Ya existe el nombre de usuario"]
  },
  email: {
    type: String,
    required: [true, "Introduzca un email"],
    unique: [true,"Ya existe el email"]
  },
  password: {
    type: String,
    required: [true, "Introduzca una contraseña"],
  },
},{
    timestamps:true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
