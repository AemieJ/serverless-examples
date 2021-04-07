const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6, 
        max: 256
    },
    refreshToken: {
        type: String,
        required: false,
        min: 6
    }
});

module.exports = mongoose.model("User", userSchema);