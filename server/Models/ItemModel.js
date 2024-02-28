const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The item name is required"],
    },
    description: {
        type: String,
        required: [true, "The item description is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    imageUrl: {
        type: String,
        required: [true, "The ImageUrl is required"],
    }
});

module.exports = mongoose.model("item", itemSchema);