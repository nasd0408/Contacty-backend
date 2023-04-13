const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",

    },
    name: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    phone: {
        type: String,
        require: [true, "El telefono es obligatorio"]
    },
    email: {
        type: String,
        require: [true, "El email es obligatorio"]
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);