const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const shelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
    },
    number: {
        type: Number,
        required: [true, "The room name is required"],
    },
    roomId: {
        type: String,
        required: [true, "The roomId is required"],
    },
});


module.exports = mongoose.model("shelf", shelfSchema);